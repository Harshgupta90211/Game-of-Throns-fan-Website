 import { HOUSES_META, CHARACTERS_META, FALLBACK_DATABASE, getCharacterAvatarHTML } from './data.js';

// Application State
const STATE = {
  activeTheme: 'obsidian',
  soundEnabled: true,
  currentRandomQuote: null,
  randomCount: 1,
  selectedCharacterSlug: 'tyrion',
  characterQuoteCount: 2,
  savedQuotes: JSON.parse(localStorage.getItem('got_saved_quotes') || '[]'),
  trivia: {
    currentQuote: null,
    correctAuthorSlug: null,
    options: [],
    score: 0,
    streak: 0,
    answered: false
  },
  posterSettings: {
    quote: null,
    theme: 'gold' // 'gold', 'fire', 'ice', 'steel'
  },
  allHouses: [],
  particleMode: 'embers' // 'embers', 'snow', 'off'
};

// API Endpoints
const API_BASE = 'https://api.gameofthronesquotes.xyz/v1';

// Web Audio Synthesizer for Procedural Medieval Sound FX
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playSwordClash() {
    if (!STATE.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }

  playParchmentClick() {
    if (!STATE.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }

  playVictoryChime() {
    if (!STATE.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      });
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }
}

const sfx = new SoundFX();

// ==========================================================================
// API FETCH HELPERS WITH RETRY & SEAMLESS FALLBACK
// ==========================================================================

async function fetchWithFallback(url, fallbackFn) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, isLive: true };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`API live fetch failed for ${url}, switching to built-in Westeros archives:`, err);
    return { data: fallbackFn(), isLive: false };
  }
}

/**
 * 1. Random quote endpoint: /v1/random or /v1/random/{count}
 */
export async function apiGetRandomQuote(count = 1) {
  const endpoint = count > 1 ? `${API_BASE}/random/${count}` : `${API_BASE}/random`;

  return fetchWithFallback(endpoint, () => {
    // Pick random from fallback
    const shuffled = [...FALLBACK_DATABASE.quotes].sort(() => 0.5 - Math.random());
    return count > 1 ? shuffled.slice(0, count) : shuffled[0];
  });
}

/**
 * 2. Author quotes endpoint: /v1/author/{slug}/{count}
 */
export async function apiGetAuthorQuotes(slug, count = 2) {
  const endpoint = `${API_BASE}/author/${slug.toLowerCase()}/${count}`;

  return fetchWithFallback(endpoint, () => {
    // Filter quotes matching author
    const matches = FALLBACK_DATABASE.quotes.filter(q => q.character.slug.toLowerCase() === slug.toLowerCase());
    if (matches.length > 0) {
      return matches.slice(0, count);
    }
    // If not found in primary fallback list, synthesize a fallback response
    const charMeta = CHARACTERS_META[slug.toLowerCase()] || { name: slug, houseSlug: null };
    return [{
      sentence: `A true warrior of Westeros speaks in actions, not only words.`,
      character: {
        name: charMeta.name,
        slug: slug,
        house: charMeta.houseSlug ? { name: HOUSES_META[charMeta.houseSlug]?.name || 'Noble House', slug: charMeta.houseSlug } : null
      }
    }];
  });
}

/**
 * 3. Houses endpoint: /v1/houses
 */
export async function apiGetHouses() {
  const endpoint = `${API_BASE}/houses`;

  return fetchWithFallback(endpoint, () => {
    return FALLBACK_DATABASE.houses;
  });
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================

export function showToast(message, icon = '🛡️') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// TEXT-TO-SPEECH NARRATOR (Web Speech API)
// ==========================================================================

export function speakQuote(text, author) {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported in this browser.', '⚠️');
    return;
  }

  window.speechSynthesis.cancel(); // Stop ongoing
  const utter = new SpeechSynthesisUtterance(`${text} ... Said by ${author}`);
  utter.rate = 0.92;
  utter.pitch = 0.88;

  // Prefer English UK or deep male/female voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
  if (englishVoice) {
    utter.voice = englishVoice;
  }

  window.speechSynthesis.speak(utter);
  showToast('Reciting quote...', '🔊');
}

// ==========================================================================
// FAVORITES / TOME OF WISDOM MANAGEMENT
// ==========================================================================

export function isQuoteSaved(quote) {
  if (!quote || !quote.sentence) return false;
  return STATE.savedQuotes.some(q => q.sentence === quote.sentence);
}

export function toggleSaveQuote(quote) {
  if (!quote || !quote.sentence) return;

  const index = STATE.savedQuotes.findIndex(q => q.sentence === quote.sentence);
  if (index >= 0) {
    STATE.savedQuotes.splice(index, 1);
    showToast('Quote removed from Tome of Wisdom', '🗑️');
  } else {
    STATE.savedQuotes.unshift(quote);
    showToast('Quote sealed into your Tome of Wisdom', '📜');
    sfx.playParchmentClick();
  }

  localStorage.setItem('got_saved_quotes', JSON.stringify(STATE.savedQuotes));
  updateFavoritesUI();
  updateStageFavoriteButton();
}

function updateFavoritesUI() {
  const countBadge = document.getElementById('fav-count-badge');
  if (countBadge) {
    countBadge.textContent = STATE.savedQuotes.length;
    countBadge.style.display = STATE.savedQuotes.length > 0 ? 'inline-block' : 'none';
  }

  const listContainer = document.getElementById('saved-quotes-list');
  if (!listContainer) return;

  if (STATE.savedQuotes.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">📜</p>
        <p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--gold-400);">The Tome is currently empty</p>
        <p style="font-size: 0.9rem; margin-top: 0.4rem;">Click the heart icon on any quote across the realm to save it here.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = STATE.savedQuotes.map((q, idx) => {
    const charSlug = q.character?.slug || '';
    const charMeta = CHARACTERS_META[charSlug] || {};
    const houseMeta = q.character?.house?.slug ? HOUSES_META[q.character.house.slug] : null;

    return `
      <div class="quote-stream-item" style="position: relative;">
        <p class="quote-stream-text">“${q.sentence}”</p>
        <div class="quote-stream-footer">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            ${getCharacterAvatarHTML(charSlug, 'avatar-sm')}
            <strong style="color: #fff;">${q.character?.name || 'Unknown'}</strong>
            ${houseMeta ? `<span style="color: var(--gold-400); font-size: 0.8rem;">(${houseMeta.name})</span>` : ''}
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-action" onclick="window.gotApp.speak('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}')" title="Narrate">🔊</button>
            <button class="btn-action" onclick="window.gotApp.copyQuote('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}')" title="Copy">📋</button>
            <button class="btn-action" onclick="window.gotApp.openPosterModalFromData('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}', '${escapeQuotes(q.character?.house?.slug || '')}')" title="Generate Poster">🎴</button>
            <button class="btn-action" onclick="window.gotApp.removeSavedQuote(${idx})" title="Remove" style="color: #feb2b2;">✕</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateStageFavoriteButton() {
  const favBtn = document.getElementById('stage-fav-btn');
  if (!favBtn || !STATE.currentRandomQuote) return;

  const saved = isQuoteSaved(STATE.currentRandomQuote);
  favBtn.innerHTML = saved ? '❤️ Saved' : '🤍 Save';
  favBtn.classList.toggle('active', saved);
}

// ==========================================================================
// HERO RANDOM QUOTE RENDERER
// ==========================================================================

export async function renderRandomQuoteStage() {
  const quoteTextEl = document.getElementById('stage-quote-text');
  const authorNameEl = document.getElementById('stage-author-name');
  const authorHouseEl = document.getElementById('stage-author-house');
  const authorAvatarEl = document.getElementById('stage-author-avatar');
  const stageCard = document.getElementById('random-quote-card');
  const multiContainer = document.getElementById('stage-multi-quotes-container');

  if (!quoteTextEl) return;

  // Add subtle load state
  quoteTextEl.style.opacity = '0.3';
  sfx.playSwordClash();

  const count = STATE.randomCount;
  const result = await apiGetRandomQuote(count);
  const data = result.data;

  quoteTextEl.style.opacity = '1';

  if (count === 1) {
    const quote = Array.isArray(data) ? data[0] : data;
    STATE.currentRandomQuote = quote;

    quoteTextEl.textContent = quote.sentence;
    authorNameEl.textContent = quote.character?.name || 'Westeros Chronicler';

    const charSlug = quote.character?.slug || '';
    const charMeta = CHARACTERS_META[charSlug] || {};
    const houseSlug = quote.character?.house?.slug;
    const houseMeta = houseSlug ? HOUSES_META[houseSlug] : null;

    if (authorAvatarEl) {
      authorAvatarEl.innerHTML = getCharacterAvatarHTML(charSlug, 'avatar-lg');
    }

    if (houseMeta) {
      authorHouseEl.innerHTML = `
        <span class="house-sigil-inline">${houseMeta.sigilSvg}</span>
        <span>${houseMeta.name}</span>
        <span style="opacity: 0.6; margin-left: 0.3rem;">• "${houseMeta.motto}"</span>
      `;
      authorHouseEl.style.display = 'inline-flex';
    } else {
      authorHouseEl.innerHTML = quote.character?.house?.name ? `<span>${quote.character.house.name}</span>` : `<span>The Realm of Westeros</span>`;
      authorHouseEl.style.display = 'inline-flex';
    }

    if (multiContainer) multiContainer.innerHTML = '';
    updateStageFavoriteButton();
  } else {
    // Multiple quotes selected (e.g. 3 or 5)
    const quotesList = Array.isArray(data) ? data : [data];
    STATE.currentRandomQuote = quotesList[0];

    // Main featured
    quoteTextEl.textContent = quotesList[0].sentence;
    authorNameEl.textContent = quotesList[0].character?.name || 'Westeros Chronicler';
    const mainCharSlug = quotesList[0].character?.slug || '';
    if (authorAvatarEl) {
      authorAvatarEl.innerHTML = getCharacterAvatarHTML(mainCharSlug, 'avatar-lg');
    }
    authorHouseEl.innerHTML = quotesList[0].character?.house?.name || 'Westeros';

    updateStageFavoriteButton();

    // Multi-grid for remaining
    if (multiContainer && quotesList.length > 1) {
      multiContainer.innerHTML = `
        <div style="grid-column: 1 / -1; margin-top: 1.5rem;">
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--gold-400); margin-bottom: 1rem;">
            Additional Summoned Quotes (${quotesList.length})
          </h4>
        </div>
        ${quotesList.slice(1).map(q => {
          const cSlug = q.character?.slug || '';
          const cMeta = CHARACTERS_META[cSlug] || {};
          const hSlug = q.character?.house?.slug;
          const hMeta = hSlug ? HOUSES_META[hSlug] : null;

          return `
            <div class="quote-stream-item">
              <p class="quote-stream-text">“${q.sentence}”</p>
              <div class="quote-stream-footer">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  ${getCharacterAvatarHTML(cSlug, 'avatar-sm')}
                  <strong style="color: #fff;">${q.character?.name || 'Unknown'}</strong>
                  ${hMeta ? `<span style="color: var(--text-gold); font-size: 0.8rem;">(${hMeta.name})</span>` : ''}
                </div>
                <div style="display: flex; gap: 0.3rem;">
                  <button class="btn-action" onclick="window.gotApp.speak('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}')" title="Narrate">🔊</button>
                  <button class="btn-action" onclick="window.gotApp.copyQuote('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}')" title="Copy">📋</button>
                  <button class="btn-action" onclick="window.gotApp.toggleSaveFromData('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || '')}', '${escapeQuotes(q.character?.slug || '')}', '${escapeQuotes(hSlug || '')}')" title="Save">❤️</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      `;
    }
  }
}

// ==========================================================================
// CHARACTER QUOTES EXPLORER RENDERER (/v1/author/{slug}/{count})
// ==========================================================================

export async function fetchAndRenderCharacterQuotes(slug = STATE.selectedCharacterSlug, count = STATE.characterQuoteCount) {
  STATE.selectedCharacterSlug = slug;
  STATE.characterQuoteCount = count;

  const bannerEl = document.getElementById('char-hero-banner');
  const streamEl = document.getElementById('char-quotes-stream');
  const countSelectEl = document.getElementById('char-count-select');
  const charSelectEl = document.getElementById('character-select-dropdown');

  if (countSelectEl) countSelectEl.value = count;
  if (charSelectEl) charSelectEl.value = slug;

  if (streamEl) {
    streamEl.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div class="spinner-gold"></div>
        <p style="margin-top: 1rem; color: var(--text-muted); font-family: var(--font-serif);">Consulting the Citadel archives for ${slug}...</p>
      </div>
    `;
  }

  sfx.playParchmentClick();
  const result = await apiGetAuthorQuotes(slug, count);
  const quotes = Array.isArray(result.data) ? result.data : [result.data];

  const charMeta = CHARACTERS_META[slug.toLowerCase()] || {
    name: quotes[0]?.character?.name || slug,
    title: 'Noble of the Realm',
    houseSlug: quotes[0]?.character?.house?.slug || null,
    avatar: '⚔️'
  };

  const houseSlug = charMeta.houseSlug || quotes[0]?.character?.house?.slug;
  const houseMeta = houseSlug ? HOUSES_META[houseSlug] : null;

  // Render Hero Banner
  if (bannerEl) {
    bannerEl.innerHTML = `
      <div class="char-profile-left">
        ${getCharacterAvatarHTML(slug, 'avatar-xl')}
        <div class="char-profile-meta">
          <h3>${charMeta.name || quotes[0]?.character?.name || slug}</h3>
          <p class="char-title">${charMeta.title || 'Iconic Figure of Westeros'}</p>
          <div class="char-house-info">
            ${houseMeta ? `<span class="house-sigil-inline">${houseMeta.sigilSvg}</span> <strong>${houseMeta.name}</strong> • <em>"${houseMeta.motto}"</em>` : `<span>Allegiance: Independent / Free Realm</span>`}
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
        <span class="char-query-api-badge">GET /v1/author/${slug}/${count}</span>
        <span style="font-size: 0.8rem; color: var(--gold-400); font-family: var(--font-serif);">${quotes.length} Quotes Retrieved</span>
      </div>
    `;
  }

  // Render Quotes Stream
  if (streamEl) {
    if (quotes.length === 0) {
      streamEl.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <p>No quotes recorded for ${charMeta.name} in this scroll.</p>
        </div>
      `;
      return;
    }

    streamEl.innerHTML = quotes.map((q, idx) => `
      <div class="quote-stream-item">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;">
          <p class="quote-stream-text">“${q.sentence}”</p>
          <span style="color: var(--gold-500); font-family: var(--font-serif); font-size: 0.85rem; font-weight: 700; opacity: 0.6;">#${idx + 1}</span>
        </div>
        <div class="quote-stream-footer">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${getCharacterAvatarHTML(slug, 'avatar-xs')}
            <span style="font-family: var(--font-serif); color: var(--gold-300);">— ${q.character?.name || charMeta.name}</span>
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-action" onclick="window.gotApp.speak('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || charMeta.name)}')" title="Narrate Quote">🔊 Voice</button>
            <button class="btn-action" onclick="window.gotApp.copyQuote('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || charMeta.name)}')" title="Copy to Clipboard">📋 Copy</button>
            <button class="btn-action" onclick="window.gotApp.openPosterModalFromData('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || charMeta.name)}', '${escapeQuotes(houseSlug || '')}')" title="Generate Poster">🎴 Poster</button>
            <button class="btn-action" onclick="window.gotApp.toggleSaveFromData('${escapeQuotes(q.sentence)}', '${escapeQuotes(q.character?.name || charMeta.name)}', '${escapeQuotes(slug)}', '${escapeQuotes(houseSlug || '')}')" title="Save Quote">❤️ Save</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update active chip styling
  document.querySelectorAll('.char-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.slug === slug);
  });
}

// ==========================================================================
// GREAT HOUSES & MEMBERS DIRECTORY RENDERER (/v1/houses)
// ==========================================================================

export async function loadAndRenderHouses() {
  const container = document.getElementById('houses-grid-container');
  if (!container) return;

  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
      <div class="spinner-gold"></div>
      <p style="margin-top: 1rem; color: var(--text-muted); font-family: var(--font-serif);">Summoning the High Lords and Great Houses...</p>
    </div>
  `;

  const result = await apiGetHouses();
  const houses = result.data;
  STATE.allHouses = houses;

  renderHousesList(houses);
}

function renderHousesList(houses) {
  const container = document.getElementById('houses-grid-container');
  if (!container) return;

  if (!houses || houses.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No houses found matching criteria.</p>`;
    return;
  }

  container.innerHTML = houses.map(house => {
    const meta = HOUSES_META[house.slug] || {
      name: house.name,
      motto: 'Honor and Valor',
      region: 'Westeros',
      seat: 'Ancestral Stronghold',
      color: '#d4af37',
      sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2" fill="none"/></svg>`
    };

    const members = house.members || [];

    return `
      <div class="house-card" data-house-slug="${house.slug}">
        <div class="house-header">
          <div class="house-sigil-badge" style="color: ${meta.color}; border-color: ${meta.color}44;">
            ${meta.sigilSvg}
          </div>
          <div class="house-title-area">
            <h3 class="house-name">${house.name}</h3>
            <p class="house-seat">📍 ${meta.seat} • <em>${meta.region}</em></p>
          </div>
        </div>

        <div class="house-motto-banner" style="color: ${meta.color}; border-color: ${meta.color}55;">
          "${meta.motto}"
        </div>

        <div class="house-members-section">
          <div class="members-heading">
            <span>House Members</span>
            <span style="color: var(--gold-400); font-weight: 700;">${members.length}</span>
          </div>
          <div class="members-tag-list">
            ${members.map(m => {
              return `
                <button class="member-pill" onclick="window.gotApp.selectCharacterAndScroll('${m.slug}')" title="View quotes from ${m.name}">
                  ${getCharacterAvatarHTML(m.slug, 'avatar-xs')}
                  <span>${m.name}</span>
                  <span style="color: var(--gold-400); font-size: 0.75rem;">↗</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Houses live search
export function filterHouses(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) {
    renderHousesList(STATE.allHouses);
    return;
  }

  const filtered = STATE.allHouses.filter(h => {
    const nameMatch = h.name.toLowerCase().includes(term);
    const slugMatch = h.slug.toLowerCase().includes(term);
    const memberMatch = h.members && h.members.some(m => m.name.toLowerCase().includes(term));
    const meta = HOUSES_META[h.slug];
    const regionMatch = meta && (meta.region.toLowerCase().includes(term) || meta.seat.toLowerCase().includes(term) || meta.motto.toLowerCase().includes(term));
    return nameMatch || slugMatch || memberMatch || regionMatch;
  });

  renderHousesList(filtered);
}

// ==========================================================================
// CITADEL TRIALS (WHO SAID IT? TRIVIA MINI-GAME)
// ==========================================================================

export async function initTriviaRound() {
  const quoteEl = document.getElementById('trivia-quote-display');
  const optionsGrid = document.getElementById('trivia-options-container');
  const nextBtn = document.getElementById('trivia-next-btn');

  if (!quoteEl || !optionsGrid) return;

  STATE.trivia.answered = false;
  if (nextBtn) nextBtn.style.display = 'none';

  quoteEl.textContent = 'Summoning a challenge from the archives...';
  optionsGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
      <div class="spinner-gold"></div>
    </div>
  `;

  // Pick random quote from fallback / API
  const res = await apiGetRandomQuote(1);
  const quoteObj = Array.isArray(res.data) ? res.data[0] : res.data;
  STATE.trivia.currentQuote = quoteObj;

  const correctSlug = quoteObj.character?.slug || 'tyrion';
  const correctName = quoteObj.character?.name || 'Tyrion Lannister';
  STATE.trivia.correctAuthorSlug = correctSlug;

  // Pick 3 decoy characters
  const allCharKeys = Object.keys(CHARACTERS_META).filter(k => k !== correctSlug);
  const shuffledDecoys = allCharKeys.sort(() => 0.5 - Math.random()).slice(0, 3);

  const options = [
    { slug: correctSlug, name: correctName, isCorrect: true },
    ...shuffledDecoys.map(slug => ({ slug, name: CHARACTERS_META[slug].name, isCorrect: false }))
  ].sort(() => 0.5 - Math.random());

  STATE.trivia.options = options;

  quoteEl.textContent = `“${quoteObj.sentence}”`;

  optionsGrid.innerHTML = options.map((opt, idx) => `
    <button class="trivia-option-btn" data-slug="${opt.slug}" data-correct="${opt.isCorrect}" onclick="window.gotApp.handleTriviaChoice(this, ${opt.isCorrect})">
      ${getCharacterAvatarHTML(opt.slug, 'avatar-sm')}
      <span>${opt.name}</span>
    </button>
  `).join('');
}

export function handleTriviaChoice(btnEl, isCorrect) {
  if (STATE.trivia.answered) return;
  STATE.trivia.answered = true;

  const scoreEl = document.getElementById('trivia-score-val');
  const streakEl = document.getElementById('trivia-streak-val');
  const nextBtn = document.getElementById('trivia-next-btn');

  // Reveal all options
  document.querySelectorAll('.trivia-option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    btnEl.classList.add('correct');
    STATE.trivia.score += 10;
    STATE.trivia.streak += 1;
    sfx.playVictoryChime();
    showToast(`Correct! +10 Honor. Current streak: ${STATE.trivia.streak}`, '👑');
  } else {
    btnEl.classList.add('wrong');
    STATE.trivia.streak = 0;
    showToast(`Incorrect! It was ${STATE.trivia.currentQuote.character?.name}.`, '⚔️');
  }

  if (scoreEl) scoreEl.textContent = STATE.trivia.score;
  if (streakEl) streakEl.textContent = STATE.trivia.streak;
  if (nextBtn) nextBtn.style.display = 'inline-flex';
}

// ==========================================================================
// QUOTE POSTER STUDIO (HTML5 Canvas Social Card Generator)
// ==========================================================================

export function openPosterModal(quote, author, houseSlug) {
  STATE.posterSettings.quote = {
    sentence: quote,
    author: author,
    houseSlug: houseSlug
  };

  const modal = document.getElementById('poster-modal');
  if (modal) {
    modal.classList.add('open');
    renderPosterCanvas();
  }
}

export function closePosterModal() {
  const modal = document.getElementById('poster-modal');
  if (modal) modal.classList.remove('open');
}

export function setPosterTheme(themeName) {
  STATE.posterSettings.theme = themeName;
  document.querySelectorAll('.theme-chip-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeName);
  });
  renderPosterCanvas();
}

function renderPosterCanvas() {
  const canvas = document.getElementById('poster-canvas');
  if (!canvas || !STATE.posterSettings.quote) return;

  const ctx = canvas.getContext('2d');
  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const { sentence, author, houseSlug } = STATE.posterSettings.quote;
  const houseMeta = houseSlug ? HOUSES_META[houseSlug] : null;
  const theme = STATE.posterSettings.theme;

  // Background Styles based on theme
  let bgGradient;
  let accentColor = '#e2b15b';
  let titleColor = '#ffffff';

  if (theme === 'fire') {
    bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#2d0808');
    bgGradient.addColorStop(0.5, '#190303');
    bgGradient.addColorStop(1, '#000000');
    accentColor = '#f56565';
  } else if (theme === 'ice') {
    bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0d2238');
    bgGradient.addColorStop(0.5, '#07131f');
    bgGradient.addColorStop(1, '#02060a');
    accentColor = '#78a9cf';
  } else if (theme === 'steel') {
    bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1a202c');
    bgGradient.addColorStop(0.5, '#12161f');
    bgGradient.addColorStop(1, '#07090e');
    accentColor = '#cbd5e0';
  } else {
    // Gold / Valyrian
    bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1c1505');
    bgGradient.addColorStop(0.5, '#0d0f17');
    bgGradient.addColorStop(1, '#050608');
    accentColor = '#d4af37';
  }

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Decorative Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Top Crest / Header
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 24px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('GAME OF THRONES', width / 2, 90);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '16px "Inter", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('WORDS OF WESTEROS', width / 2, 120);

  // Quote Text Wrapping
  ctx.fillStyle = titleColor;
  ctx.font = 'italic 38px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';

  const formattedQuote = `“${sentence}”`;
  wrapText(ctx, formattedQuote, width / 2, 270, width - 240, 52);

  // Decorative Divider Line
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 120, height - 160);
  ctx.lineTo(width / 2 + 120, height - 160);
  ctx.stroke();

  // Author & House
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 30px "Cinzel", Georgia, serif';
  ctx.fillText(`— ${author} —`, width / 2, height - 110);

  if (houseMeta) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'italic 20px "Cormorant Garamond", serif';
    ctx.fillText(`${houseMeta.name} • "${houseMeta.motto}"`, width / 2, height - 75);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

export function downloadPosterImage() {
  const canvas = document.getElementById('poster-canvas');
  if (!canvas) return;

  const authorSlug = STATE.posterSettings.quote?.author?.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'got_quote';
  const link = document.createElement('a');
  link.download = `got_quote_${authorSlug}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('Quote card downloaded!', '💾');
}

// ==========================================================================
// AMBIENT PARTICLE SYSTEM (Canvas WebGL / 2D)
// ==========================================================================

class AmbientCanvas {
  constructor() {
    this.canvas = document.getElementById('ambient-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 50;
    this.resize();
    this.initParticles();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() * -0.6) - 0.2, // Drift upward like embers
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.3 ? '#e2b15b' : '#feb2b2'
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.y < 0) {
        p.y = this.canvas.height;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================================================
// UTILITIES & GLOBAL BINDINGS
// ==========================================================================

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

export function copyToClipboard(text, author = '') {
  const attribution = author ? `\n— ${author} (Game of Thrones)` : '';
  const fullText = `"${text}"${attribution}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('Quote copied to clipboard!', '📋');
      sfx.playParchmentClick();
    }).catch(() => fallbackCopy(fullText));
  } else {
    fallbackCopy(fullText);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Quote copied!', '📋');
}

// Setup Event Listeners & Initialize
document.addEventListener('DOMContentLoaded', () => {
  new AmbientCanvas();

  // Populate Character dropdown
  const charDropdown = document.getElementById('character-select-dropdown');
  if (charDropdown) {
    charDropdown.innerHTML = Object.entries(CHARACTERS_META).map(([slug, meta]) => `
      <option value="${slug}">${meta.avatar || '👤'} ${meta.name}</option>
    `).join('');
  }

  // Header scroll detection
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  // Keyboard shortcut listener (Space or 'R' for random quote)
  window.addEventListener('keydown', (e) => {
    // Only if not in an input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      renderRandomQuoteStage();
    } else if (e.key === 'Escape') {
      closePosterModal();
      document.getElementById('saved-quotes-modal')?.classList.remove('open');
    }
  });

  // Initial loads
  renderRandomQuoteStage();
  fetchAndRenderCharacterQuotes('tyrion', 2);
  loadAndRenderHouses();
  initTriviaRound();
  updateFavoritesUI();
});

// Attach global interface for inline HTML handlers
window.gotApp = {
  summonRandom: renderRandomQuoteStage,
  setRandomCount: (count) => {
    STATE.randomCount = count;
    document.querySelectorAll('.count-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.count) === count);
    });
    renderRandomQuoteStage();
  },
  speak: speakQuote,
  copyQuote: copyToClipboard,
  toggleSaveStage: () => toggleSaveQuote(STATE.currentRandomQuote),
  toggleSaveFromData: (sentence, author, charSlug, houseSlug) => {
    toggleSaveQuote({
      sentence,
      character: {
        name: author,
        slug: charSlug,
        house: houseSlug ? { name: HOUSES_META[houseSlug]?.name || 'Noble House', slug: houseSlug } : null
      }
    });
  },
  removeSavedQuote: (index) => {
    STATE.savedQuotes.splice(index, 1);
    localStorage.setItem('got_saved_quotes', JSON.stringify(STATE.savedQuotes));
    updateFavoritesUI();
    updateStageFavoriteButton();
    showToast('Quote removed', '🗑️');
  },
  openPosterModalStage: () => {
    if (!STATE.currentRandomQuote) return;
    openPosterModal(
      STATE.currentRandomQuote.sentence,
      STATE.currentRandomQuote.character?.name || 'Westeros Chronicler',
      STATE.currentRandomQuote.character?.house?.slug
    );
  },
  openPosterModalFromData: openPosterModal,
  closePosterModal: closePosterModal,
  setPosterTheme: setPosterTheme,
  downloadPoster: downloadPosterImage,
  selectCharacter: (slug) => {
    const countSelect = document.getElementById('char-count-select');
    const count = countSelect ? parseInt(countSelect.value) : 2;
    fetchAndRenderCharacterQuotes(slug, count);
  },
  selectCharacterAndScroll: (slug) => {
    const charSection = document.getElementById('characters-section');
    if (charSection) {
      charSection.scrollIntoView({ behavior: 'smooth' });
    }
    const countSelect = document.getElementById('char-count-select');
    const count = countSelect ? parseInt(countSelect.value) : 2;
    fetchAndRenderCharacterQuotes(slug, count);
  },
  onCharacterSelectChange: (e) => {
    const countSelect = document.getElementById('char-count-select');
    const count = countSelect ? parseInt(countSelect.value) : 2;
    fetchAndRenderCharacterQuotes(e.target.value, count);
  },
  onCountSelectChange: (e) => {
    const charDropdown = document.getElementById('character-select-dropdown');
    const slug = charDropdown ? charDropdown.value : STATE.selectedCharacterSlug;
    fetchAndRenderCharacterQuotes(slug, parseInt(e.target.value));
  },
  filterHouses: (e) => filterHouses(e.target.value),
  handleTriviaChoice: handleTriviaChoice,
  nextTrivia: initTriviaRound,
  toggleSound: () => {
    STATE.soundEnabled = !STATE.soundEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.innerHTML = STATE.soundEnabled ? '🔊' : '🔇';
      btn.title = STATE.soundEnabled ? 'Mute sound effects' : 'Enable sound effects';
    }
    showToast(STATE.soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted', '🔔');
  },
  toggleTheme: () => {
    const themes = ['obsidian', 'fire', 'ice'];
    const currentIdx = themes.indexOf(STATE.activeTheme);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    STATE.activeTheme = nextTheme;
    document.body.setAttribute('data-theme', nextTheme);
    showToast(`Realm Theme: ${nextTheme.toUpperCase()}`, '🎨');
  },
  openSavedModal: () => {
    const modal = document.getElementById('saved-quotes-modal');
    if (modal) modal.classList.add('open');
  },
  closeSavedModal: () => {
    const modal = document.getElementById('saved-quotes-modal');
    if (modal) modal.classList.remove('open');
  },
  exportSavedQuotes: () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(STATE.savedQuotes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "westeros_quotes_collection.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Collection exported as JSON!', '📜');
  }
};
