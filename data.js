 /**
 * Westeros Lore & Metadata for Game of Thrones Quotes Web App
 */

export const HOUSES_META = {
  stark: {
    name: "House Stark of Winterfell",
    motto: "Winter is Coming",
    region: "The North",
    seat: "Winterfell",
    color: "#78a9cf",
    bgGradient: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)",
    sigilName: "Direwolf",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <path d="M50 15 L65 25 L80 20 L75 35 L85 45 L70 50 L80 65 L60 60 L50 85 L40 60 L20 65 L30 50 L15 45 L25 35 L20 20 L35 25 Z" opacity="0.15"/>
      <path d="M50 18 C58 24 72 26 76 34 C72 38 78 44 74 52 C68 48 64 54 58 52 C54 62 48 76 50 82 C46 72 42 62 38 52 C34 54 28 48 24 52 C22 44 28 38 24 34 C28 26 42 24 50 18 Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="43" cy="38" r="2" fill="currentColor"/>
      <circle cx="57" cy="38" r="2" fill="currentColor"/>
      <path d="M46 48 L50 54 L54 48" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  lannister: {
    name: "House Lannister of Casterly Rock",
    motto: "Hear Me Roar!",
    secondaryMotto: "A Lannister always pays his debts",
    region: "The Westerlands",
    seat: "Casterly Rock",
    color: "#e2b15b",
    bgGradient: "linear-gradient(135deg, #3d1313 0%, #1f0808 100%)",
    sigilName: "Golden Lion",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <path d="M50 15 C65 15 75 25 75 40 C75 55 65 65 50 85 C35 65 25 55 25 40 C25 25 35 15 50 15 Z" opacity="0.15"/>
      <path d="M50 20 C60 20 68 28 68 38 C68 48 60 55 50 72 C40 55 32 48 32 38 C32 28 40 20 50 20 Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M42 32 C45 28 55 28 58 32 C62 36 60 44 50 50 C40 44 38 36 42 32 Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="44" cy="36" r="2" fill="currentColor"/>
      <circle cx="56" cy="36" r="2" fill="currentColor"/>
      <path d="M50 42 L50 48 M45 46 L55 46" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  targaryen: {
    name: "House Targaryen of King's Landing",
    motto: "Fire and Blood",
    region: "The Crownlands",
    seat: "Dragonstone / King's Landing",
    color: "#e53e3e",
    bgGradient: "linear-gradient(135deg, #2b0b0b 0%, #120303 100%)",
    sigilName: "Three-Headed Dragon",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <path d="M50 15 C30 25 20 45 25 70 C35 65 40 75 50 85 C60 75 65 65 75 70 C80 45 70 25 50 15 Z" opacity="0.15"/>
      <circle cx="35" cy="35" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="50" cy="25" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="65" cy="35" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M30 45 C35 60 45 70 50 80 C55 70 65 60 70 45" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M22 45 Q 50 55 78 45" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  baratheon: {
    name: "House Baratheon of Dragonstone",
    motto: "Ours is the Fury",
    region: "The Stormlands",
    seat: "Storm's End / Dragonstone",
    color: "#d4af37",
    bgGradient: "linear-gradient(135deg, #2e260e 0%, #171204 100%)",
    sigilName: "Crowned Stag",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <path d="M30 20 L40 35 L50 45 L60 35 L70 20 L62 30 L65 40 L50 60 L35 40 L38 30 Z" opacity="0.15"/>
      <path d="M25 22 L38 32 L45 42 M75 22 L62 32 L55 42" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M45 42 C45 35 55 35 55 42 C55 55 52 65 50 80 C48 65 45 55 45 42 Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M43 36 L50 32 L57 36" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  greyjoy: {
    name: "House Greyjoy of Pyke",
    motto: "We Do Not Sow",
    region: "The Iron Islands",
    seat: "Pyke",
    color: "#a0aec0",
    bgGradient: "linear-gradient(135deg, #18222d 0%, #0d1217 100%)",
    sigilName: "Golden Kraken",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <ellipse cx="50" cy="35" rx="14" ry="18" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="45" cy="32" r="2" fill="currentColor"/>
      <circle cx="55" cy="32" r="2" fill="currentColor"/>
      <path d="M40 50 Q 25 65 20 80 M45 52 Q 35 70 35 85 M50 53 L 50 88 M55 52 Q 65 70 65 85 M60 50 Q 75 65 80 80" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  martell: {
    name: "House Martell of Sunspear",
    motto: "Unbowed, Unbent, Unbroken",
    region: "Dorne",
    seat: "Sunspear",
    color: "#dd6b20",
    bgGradient: "linear-gradient(135deg, #3d1e08 0%, #1e0d02 100%)",
    sigilName: "Red Sun & Spear",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <circle cx="50" cy="50" r="18" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M50 20 L50 80 M20 50 L80 50 M29 29 L71 71 M29 71 L71 29" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" stroke-width="3"/>
      <polygon points="80,20 70,22 78,30" fill="currentColor"/>
    </svg>`
  },
  tyrell: {
    name: "House Tyrell of Highgarden",
    motto: "Growing Strong",
    region: "The Reach",
    seat: "Highgarden",
    color: "#38a169",
    bgGradient: "linear-gradient(135deg, #0e291b 0%, #05140d 100%)",
    sigilName: "Golden Rose",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <circle cx="50" cy="45" r="12" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M50 25 C58 25 68 35 68 45 C68 55 58 65 50 65 C42 65 32 55 32 45 C32 35 42 25 50 25 Z" stroke="currentColor" stroke-width="2" fill="none" opacity="0.7"/>
      <path d="M50 65 Q 48 78 50 88 M42 75 Q 35 70 30 75 M58 80 Q 65 75 70 80" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  mormont: {
    name: "House Mormont of Bear Island",
    motto: "Here We Stand",
    region: "The North",
    seat: "Bear Island",
    color: "#48bb78",
    bgGradient: "linear-gradient(135deg, #132b1e 0%, #08140d 100%)",
    sigilName: "Wood Bear",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <ellipse cx="50" cy="50" rx="20" ry="24" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="35" cy="30" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="65" cy="30" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="43" cy="45" r="2" fill="currentColor"/>
      <circle cx="57" cy="45" r="2" fill="currentColor"/>
      <path d="M46 56 L50 60 L54 56" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  bolton: {
    name: "House Bolton of the Dreadfort",
    motto: "Our Blades Are Sharp",
    region: "The North",
    seat: "The Dreadfort",
    color: "#e53e3e",
    bgGradient: "linear-gradient(135deg, #2b0b14 0%, #140409 100%)",
    sigilName: "Flayed Man",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <line x1="30" y1="20" x2="70" y2="80" stroke="currentColor" stroke-width="3"/>
      <line x1="70" y1="20" x2="30" y2="80" stroke="currentColor" stroke-width="3"/>
      <circle cx="50" cy="30" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="50" y1="38" x2="50" y2="65" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  baelish: {
    name: "House Baelish of Harrenhal",
    motto: "Knowledge is Power",
    region: "The Riverlands",
    seat: "Harrenhal",
    color: "#b794f4",
    bgGradient: "linear-gradient(135deg, #201335 0%, #0d0617 100%)",
    sigilName: "Mockingbird",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <path d="M35 60 C35 45 45 35 60 30 C55 40 50 50 65 55 C55 65 40 70 35 60 Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M60 30 L 72 25 L 65 35" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M35 60 L 20 75 M38 65 L 25 80" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  clegane: {
    name: "House Clegane of Clegane's Keep",
    motto: "Loyalty and Ferocity",
    region: "The Westerlands",
    seat: "Clegane's Keep",
    color: "#ecc94b",
    bgGradient: "linear-gradient(135deg, #2c2409 0%, #120e02 100%)",
    sigilName: "Three Black Dogs",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <circle cx="35" cy="40" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="65" cy="40" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="50" cy="65" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  frey: {
    name: "House Frey of the Crossing",
    motto: "We Stand Together",
    region: "The Riverlands",
    seat: "The Twins",
    color: "#cbd5e0",
    bgGradient: "linear-gradient(135deg, #212730 0%, #0c0f14 100%)",
    sigilName: "Two Towers & Bridge",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <rect x="25" y="30" width="16" height="45" stroke="currentColor" stroke-width="2" fill="none"/>
      <rect x="59" y="30" width="16" height="45" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M41 55 L59 55 M41 62 L59 62" stroke="currentColor" stroke-width="2"/>
      <polygon points="23,30 33,20 43,30" stroke="currentColor" stroke-width="2" fill="none"/>
      <polygon points="57,30 67,20 77,30" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`
  },
  tarly: {
    name: "House Tarly of Horn Hill",
    motto: "First in Battle",
    region: "The Reach",
    seat: "Horn Hill",
    color: "#68d391",
    bgGradient: "linear-gradient(135deg, #132a1e 0%, #07130c 100%)",
    sigilName: "Huntsman with Bow",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <circle cx="50" cy="30" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="50" y1="38" x2="50" y2="65" stroke="currentColor" stroke-width="2"/>
      <path d="M35 45 Q 65 30 65 65" stroke="currentColor" stroke-width="2" fill="none"/>
      <line x1="30" y1="65" x2="70" y2="35" stroke="currentColor" stroke-width="2"/>
    </svg>`
  },
  tarth: {
    name: "House Tarth of Evenfall Hall",
    motto: "The Sapphire Isle",
    region: "The Stormlands",
    seat: "Evenfall Hall",
    color: "#63b3ed",
    bgGradient: "linear-gradient(135deg, #142838 0%, #081119 100%)",
    sigilName: "Suns & Crescents",
    sigilSvg: `<svg viewBox="0 0 100 100" class="sigil-icon" fill="currentColor">
      <circle cx="35" cy="35" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="65" cy="65" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M65 30 A 10 10 0 0 0 65 45 A 7 7 0 0 1 65 30" fill="currentColor"/>
      <path d="M35 60 A 10 10 0 0 0 35 75 A 7 7 0 0 1 35 60" fill="currentColor"/>
    </svg>`
  }
};

export const CHARACTERS_META = {
  tyrion: {
    name: "Tyrion Lannister",
    title: "Hand of the Queen / Master of Coin",
    houseSlug: "lannister",
    quoteCount: 19,
    avatar: "🦁",
    image: "https://thronesapi.com/assets/images/tyrion-lannister.jpg",
    tags: ["Lannister", "Wit", "Hand", "King's Landing"]
  },
  jon: {
    name: "Jon Snow",
    title: "King in the North / Lord Commander",
    houseSlug: "stark",
    quoteCount: 6,
    avatar: "🐺",
    image: "https://thronesapi.com/assets/images/jon-snow.jpg",
    tags: ["Stark", "Targaryen", "Night's Watch", "The North"]
  },
  daenerys: {
    name: "Daenerys Targaryen",
    title: "Mother of Dragons / Breaker of Chains",
    houseSlug: "targaryen",
    quoteCount: 11,
    avatar: "🐉",
    image: "https://thronesapi.com/assets/images/daenerys.jpg",
    tags: ["Targaryen", "Dragons", "Queen", "Fire"]
  },
  arya: {
    name: "Arya Stark",
    title: "No One / Assassin of Braavos",
    houseSlug: "stark",
    quoteCount: 5,
    avatar: "🗡️",
    image: "https://thronesapi.com/assets/images/arya-stark.jpg",
    tags: ["Stark", "Faceless Men", "Needle", "The North"]
  },
  cersei: {
    name: "Cersei Lannister",
    title: "Queen of the Seven Kingdoms",
    houseSlug: "lannister",
    quoteCount: 10,
    avatar: "👑",
    image: "https://thronesapi.com/assets/images/cersei.jpg",
    tags: ["Lannister", "Queen", "Iron Throne", "Schemes"]
  },
  ned: {
    name: "Eddard 'Ned' Stark",
    title: "Lord of Winterfell / Hand of the King",
    houseSlug: "stark",
    quoteCount: 5,
    avatar: "❄️",
    image: "https://thronesapi.com/assets/images/ned-stark.jpg",
    tags: ["Stark", "Honor", "Winterfell", "The North"]
  },
  jaime: {
    name: "Jaime Lannister",
    title: "The Kingslayer / Lord Commander of Kingsguard",
    houseSlug: "lannister",
    quoteCount: 6,
    avatar: "⚔️",
    image: "https://thronesapi.com/assets/images/jaime-lannister.jpg",
    tags: ["Lannister", "Knight", "Kingsguard"]
  },
  olenna: {
    name: "Olenna Tyrell",
    title: "The Queen of Thorns",
    houseSlug: "tyrell",
    quoteCount: 7,
    avatar: "🌹",
    image: "https://thronesapi.com/assets/images/olenna-tyrell.jpg",
    tags: ["Tyrell", "Thorns", "Highgarden", "Wit"]
  },
  baelish: {
    name: "Petyr Baelish",
    title: "Littlefinger / Master of Coin",
    houseSlug: "baelish",
    quoteCount: 6,
    avatar: "🪙",
    image: "https://thronesapi.com/assets/images/littlefinger.jpg",
    tags: ["Baelish", "Master of Coin", "Chaos", "Ladder"]
  },
  sandor: {
    name: "Sandor Clegane",
    title: "The Hound",
    houseSlug: "clegane",
    quoteCount: 4,
    avatar: "🐕",
    image: "https://thronesapi.com/assets/images/the-hound.jpg",
    tags: ["Clegane", "The Hound", "Warrior"]
  },
  varys: {
    name: "Lord Varys",
    title: "The Spider / Master of Whisperers",
    houseSlug: null,
    quoteCount: 7,
    avatar: "🕷️",
    image: "https://thronesapi.com/assets/images/varys.jpg",
    tags: ["Master of Whisperers", "The Realm", "Secrets"]
  },
  bran: {
    name: "Bran Stark",
    title: "The Three-Eyed Raven",
    houseSlug: "stark",
    quoteCount: 3,
    avatar: "🦅",
    image: "https://thronesapi.com/assets/images/bran-stark.jpg",
    tags: ["Stark", "Greenseer", "Three-Eyed Raven"]
  },
  brienne: {
    name: "Brienne of Tarth",
    title: "Knight of the Seven Kingdoms",
    houseSlug: "tarth",
    quoteCount: 4,
    avatar: "🛡️",
    image: "https://thronesapi.com/assets/images/brienne-tarth.jpeg",
    tags: ["Tarth", "Knight", "Honor", "Oathkeeper"]
  },
  sansa: {
    name: "Sansa Stark",
    title: "Queen in the North / Lady of Winterfell",
    houseSlug: "stark",
    quoteCount: 5,
    avatar: "👑",
    image: "https://thronesapi.com/assets/images/sansa-stark.jpeg",
    tags: ["Stark", "Winterfell", "Queen"]
  },
  tywin: {
    name: "Tywin Lannister",
    title: "Lord of Casterly Rock / Hand of the King",
    houseSlug: "lannister",
    quoteCount: 6,
    avatar: "🏰",
    image: "https://thronesapi.com/assets/images/tywin-lannister.jpg",
    tags: ["Lannister", "Hand", "Strategy", "Legacy"]
  },
  ramsay: {
    name: "Ramsay Bolton",
    title: "Lord of the Dreadfort",
    houseSlug: "bolton",
    quoteCount: 3,
    avatar: "⛓️",
    image: "https://thronesapi.com/assets/images/ramsey-bolton.jpg",
    tags: ["Bolton", "Dreadfort", "Cruelty"]
  },
  robb: {
    name: "Robb Stark",
    title: "The Young Wolf",
    houseSlug: "stark",
    quoteCount: 3,
    avatar: "🐺",
    image: "https://thronesapi.com/assets/images/robb-stark.jpg",
    tags: ["Stark", "King in the North", "Young Wolf"]
  },
  robert: {
    name: "Robert Baratheon",
    title: "King of the Andals and the First Men",
    houseSlug: "baratheon",
    quoteCount: 3,
    avatar: "🦌",
    image: "https://thronesapi.com/assets/images/king-robert.jpg",
    tags: ["Baratheon", "King", "War"]
  },
  catelyn: {
    name: "Catelyn Stark",
    title: "Lady of Winterfell",
    houseSlug: "stark",
    quoteCount: 3,
    avatar: "🕯️",
    image: "https://thronesapi.com/assets/images/catelyn-stark.jpg",
    tags: ["Stark", "Tully", "Winterfell"]
  },
  oberyn: {
    name: "Oberyn Martell",
    title: "The Red Viper of Dorne",
    houseSlug: "martell",
    quoteCount: 3,
    avatar: "🐍",
    image: "https://thronesapi.com/assets/images/red-viper.jpg",
    tags: ["Martell", "Dorne", "Red Viper", "Revenge"]
  },
  melisandre: {
    name: "Melisandre",
    title: "The Red Priestess",
    houseSlug: null,
    quoteCount: 4,
    avatar: "🔥",
    image: "https://thronesapi.com/assets/images/melisandre.jpg",
    tags: ["R'hllor", "Lord of Light", "Red Woman"]
  },
  samwell: {
    name: "Samwell Tarly",
    title: "Grand Maester of the Citadel",
    houseSlug: "tarly",
    quoteCount: 3,
    avatar: "📚",
    image: "https://thronesapi.com/assets/images/sam.jpg",
    tags: ["Tarly", "Citadel", "Night's Watch"]
  },
  theon: {
    name: "Theon Greyjoy",
    title: "Prince of the Iron Islands",
    houseSlug: "greyjoy",
    quoteCount: 3,
    avatar: "⚓",
    image: "https://thronesapi.com/assets/images/theon.jpg",
    tags: ["Greyjoy", "Pyke", "Ironborn"]
  },
  tormund: {
    name: "Tormund Giantsbane",
    title: "Leader of the Free Folk",
    houseSlug: null,
    quoteCount: 4,
    avatar: "🪓",
    image: "https://thronesapi.com/assets/images/tormund-giantsbane.jpg",
    tags: ["Free Folk", "Wildling", "Beyond the Wall"]
  },
  ygritte: {
    name: "Ygritte",
    title: "Spearwife of the Free Folk",
    houseSlug: null,
    quoteCount: 2,
    avatar: "🏹",
    image: "https://thronesapi.com/assets/images/ygritte.jpg",
    tags: ["Free Folk", "Wildling", "Beyond the Wall"]
  },
  lyanna: {
    name: "Lyanna Mormont",
    title: "Lady of Bear Island",
    houseSlug: "mormont",
    quoteCount: 3,
    avatar: "🐻",
    image: "https://thronesapi.com/assets/images/jorah-mormont.jpg",
    tags: ["Mormont", "Bear Island", "The North"]
  },
  joffrey: {
    name: "Joffrey Baratheon",
    title: "King on the Iron Throne",
    houseSlug: "baratheon",
    quoteCount: 2,
    avatar: "🗡️",
    image: "https://thronesapi.com/assets/images/joffrey.jpg",
    tags: ["Baratheon", "Lannister", "King"]
  },
  jaqen: {
    name: "Jaqen H'ghar",
    title: "Faceless Man of Braavos",
    houseSlug: null,
    quoteCount: 2,
    avatar: "🎭",
    image: "https://thronesapi.com/assets/images/jaqen-hghar.jpg",
    tags: ["Faceless Men", "Braavos", "Valar Morghulis"]
  },
  aemon: {
    name: "Aemon Targaryen",
    title: "Maester of the Night's Watch",
    houseSlug: "targaryen",
    quoteCount: 2,
    avatar: "📜",
    image: "https://thronesapi.com/assets/images/lord-commander-mormont.jpg",
    tags: ["Targaryen", "Castle Black", "Maester"]
  },
  hodor: {
    name: "Hodor",
    title: "Gentle Giant of Winterfell",
    houseSlug: null,
    quoteCount: 1,
    avatar: "🚪",
    image: "https://thronesapi.com/assets/images/hodor.jpg",
    tags: ["Winterfell", "Hodor"]
  },
  daario: {
    name: "Daario Naharis",
    title: "Commander of the Second Sons",
    houseSlug: null,
    quoteCount: 2,
    avatar: "🗡️",
    image: "https://thronesapi.com/assets/images/daario.jpg",
    tags: ["Second Sons", "Essos"]
  },
  davos: {
    name: "Davos Seaworth",
    title: "The Onion Knight / Hand of the King",
    houseSlug: null,
    quoteCount: 3,
    avatar: "🧅",
    image: "https://thronesapi.com/assets/images/davos-seaworth.png",
    tags: ["Onion Knight", "Hand", "Seaworth"]
  },
  joer: {
    name: "Jeor Mormont",
    title: "The Old Bear / Lord Commander",
    houseSlug: "mormont",
    quoteCount: 3,
    avatar: "🐻",
    image: "https://thronesapi.com/assets/images/lord-commander-mormont.jpg",
    tags: ["Mormont", "Night's Watch", "Old Bear"]
  },
  walder: {
    name: "Walder Frey",
    title: "Lord of the Crossing",
    houseSlug: "frey",
    quoteCount: 2,
    avatar: "🏰",
    image: "https://thronesapi.com/assets/images/pycelle.jpg",
    tags: ["Frey", "The Twins", "Red Wedding"]
  },
  qyburn: {
    name: "Qyburn",
    title: "Grand Maester of King's Landing",
    houseSlug: null,
    quoteCount: 2,
    avatar: "🧪",
    image: "https://thronesapi.com/assets/images/qyburn.jpg",
    tags: ["Master of Whisperers", "Maester"]
  },
  aerys: {
    name: "Aerys II Targaryen",
    title: "The Mad King",
    houseSlug: "targaryen",
    quoteCount: 2,
    avatar: "👑",
    image: "https://thronesapi.com/assets/images/viserys-targaryan.jpg",
    tags: ["Targaryen", "Mad King", "Wildfire"]
  }
};

/**
 * Returns HTML for a character's portrait picture with fallback
 */
export function getCharacterAvatarHTML(slug, sizeClass = '') {
  const meta = CHARACTERS_META[slug?.toLowerCase()] || {};
  const name = meta.name || slug || 'Character';
  const imgUrl = meta.image;
  const fallbackEmoji = meta.avatar || '⚔️';

  if (imgUrl) {
    return `<div class="char-avatar-frame ${sizeClass}">
      <img src="${imgUrl}" alt="${name}" class="char-avatar-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <span class="char-avatar-fallback" style="display: none;">${fallbackEmoji}</span>
    </div>`;
  }
  return `<div class="char-avatar-frame ${sizeClass}"><span class="char-avatar-fallback">${fallbackEmoji}</span></div>`;
}

/**
 * Full fallback database embedded to guarantee offline resilience and instant previews
 */
export const FALLBACK_DATABASE = {
  houses: [
    {
      slug: "stark",
      name: "House Stark of Winterfell",
      members: [
        { name: "Arya Stark", slug: "arya" },
        { name: "Bran Stark", slug: "bran" },
        { name: "Catelyn Stark", slug: "catelyn" },
        { name: "Eddard \"Ned\" Stark", slug: "ned" },
        { name: "Jon Snow", slug: "jon" },
        { name: "Robb Stark", slug: "robb" },
        { name: "Sansa Stark", slug: "sansa" }
      ]
    },
    {
      slug: "lannister",
      name: "House Lannister of Casterly Rock",
      members: [
        { name: "Cersei Lannister", slug: "cersei" },
        { name: "Jaime Lannister", slug: "jaime" },
        { name: "Tyrion Lannister", slug: "tyrion" },
        { name: "Tywin Lannister", slug: "tywin" }
      ]
    },
    {
      slug: "targaryen",
      name: "House Targaryen of King's Landing",
      members: [
        { name: "Aemon Targaryen", slug: "aemon" },
        { name: "Aerys II Targaryen", slug: "aerys" },
        { name: "Daenerys Targaryen", slug: "daenerys" }
      ]
    },
    {
      slug: "baratheon",
      name: "House Baratheon of Dragonstone",
      members: [
        { name: "Joffrey Baratheon", slug: "joffrey" },
        { name: "Robert Baratheon", slug: "robert" }
      ]
    },
    {
      slug: "greyjoy",
      name: "House Greyjoy of Pyke",
      members: [
        { name: "Theon Greyjoy", slug: "theon" }
      ]
    },
    {
      slug: "martell",
      name: "House Martell of Sunspear",
      members: [
        { name: "Oberyn Martell", slug: "oberyn" }
      ]
    },
    {
      slug: "tyrell",
      name: "House Tyrell of Highgarden",
      members: [
        { name: "Olenna Tyrell", slug: "olenna" }
      ]
    },
    {
      slug: "mormont",
      name: "House Mormont of Bear Island",
      members: [
        { name: "Joer Mormont", slug: "joer" },
        { name: "Lyanna Mormont", slug: "lyanna" }
      ]
    },
    {
      slug: "bolton",
      name: "House Bolton of the Dreadfort",
      members: [
        { name: "Ramsay Bolton", slug: "ramsay" }
      ]
    },
    {
      slug: "baelish",
      name: "House Baelish of Harrenhal",
      members: [
        { name: "Petyr Baelish", slug: "baelish" }
      ]
    },
    {
      slug: "clegane",
      name: "House Clegane of Clegane's Keep",
      members: [
        { name: "Sandor Clegane", slug: "sandor" }
      ]
    },
    {
      slug: "frey",
      name: "House Frey of the Crossing",
      members: [
        { name: "Walder Frey", slug: "walder" }
      ]
    },
    {
      slug: "tarly",
      name: "House Tarly of Horn Hill",
      members: [
        { name: "Samwell Tarly", slug: "samwell" }
      ]
    },
    {
      slug: "tarth",
      name: "House Tarth of Evenfall Hall",
      members: [
        { name: "Brienne of Tarth", slug: "brienne" }
      ]
    }
  ],

  quotes: [
    {
      sentence: "Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you.",
      character: { name: "Tyrion Lannister", slug: "tyrion", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "A mind needs books as a sword needs a whetstone, if it is to keep its edge.",
      character: { name: "Tyrion Lannister", slug: "tyrion", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "That's what I do: I drink and I know things.",
      character: { name: "Tyrion Lannister", slug: "tyrion", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "It's not easy being drunk all the time. If it were easy, everyone would do it.",
      character: { name: "Tyrion Lannister", slug: "tyrion", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "Death is so final, whereas life... ah, life is full of possibilities.",
      character: { name: "Tyrion Lannister", slug: "tyrion", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "When you play the game of thrones, you win or you die. There is no middle ground.",
      character: { name: "Cersei Lannister", slug: "cersei", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "Power is power.",
      character: { name: "Cersei Lannister", slug: "cersei", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "The more people you love, the weaker you are.",
      character: { name: "Cersei Lannister", slug: "cersei", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "I am not going to stop the wheel. I am going to break the wheel.",
      character: { name: "Daenerys Targaryen", slug: "daenerys", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "Dracarys.",
      character: { name: "Daenerys Targaryen", slug: "daenerys", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "If I look back I am lost.",
      character: { name: "Daenerys Targaryen", slug: "daenerys", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "I will do what queens do. I will rule.",
      character: { name: "Daenerys Targaryen", slug: "daenerys", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "The man who passes the sentence should swing the sword.",
      character: { name: "Eddard \"Ned\" Stark", slug: "ned", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "You know nothing, Jon Snow.",
      character: { name: "Ygritte", slug: "ygritte", house: null }
    },
    {
      sentence: "Winter is coming.",
      character: { name: "Eddard \"Ned\" Stark", slug: "ned", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "Leave one wolf alive and the sheep are never safe.",
      character: { name: "Arya Stark", slug: "arya", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "Tell them winter came for House Frey.",
      character: { name: "Arya Stark", slug: "arya", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "Fear cuts deeper than swords.",
      character: { name: "Arya Stark", slug: "arya", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "Chaos isn't a pit. Chaos is a ladder.",
      character: { name: "Petyr Baelish", slug: "baelish", house: { name: "House Baelish of Harrenhal", slug: "baelish" } }
    },
    {
      sentence: "Tell Cersei. I want her to know it was me.",
      character: { name: "Olenna Tyrell", slug: "olenna", house: { name: "House Tyrell of Highgarden", slug: "tyrell" } }
    },
    {
      sentence: "The world is overflowing with horrible things, but it’s a big world, and you can’t protect everybody from everything.",
      character: { name: "Olenna Tyrell", slug: "olenna", house: { name: "House Tyrell of Highgarden", slug: "tyrell" } }
    },
    {
      sentence: "There is only one war that matters. The Great War. And it is here.",
      character: { name: "Jon Snow", slug: "jon", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "The things I do for love.",
      character: { name: "Jaime Lannister", slug: "jaime", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "A lion doesn't concern himself with the opinions of sheep.",
      character: { name: "Tywin Lannister", slug: "tywin", house: { name: "House Lannister of Casterly Rock", slug: "lannister" } }
    },
    {
      sentence: "Power resides where men believe it resides. It's a trick, a shadow on the wall.",
      character: { name: "Lord Varys", slug: "varys", house: null }
    },
    {
      sentence: "Can a man still be brave if he's afraid? That is the only time a man can be brave.",
      character: { name: "Bran Stark", slug: "bran", house: { name: "House Stark of Winterfell", slug: "stark" } }
    },
    {
      sentence: "All men must die, Jon Snow. But first we'll live.",
      character: { name: "Ygritte", slug: "ygritte", house: null }
    },
    {
      sentence: "The night is dark and full of terrors.",
      character: { name: "Melisandre", slug: "melisandre", house: null }
    },
    {
      sentence: "If you think this has a happy ending, you haven't been paying attention.",
      character: { name: "Ramsay Bolton", slug: "ramsay", house: { name: "House Bolton of the Dreadfort", slug: "bolton" } }
    },
    {
      sentence: "We are only human, and the gods have fashioned us for love. That is our great glory, and our great tragedy.",
      character: { name: "Aemon Targaryen", slug: "aemon", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "Burn them all!",
      character: { name: "Aerys II Targaryen", slug: "aerys", house: { name: "House Targaryen of King's Landing", slug: "targaryen" } }
    },
    {
      sentence: "I will shield your back and keep your counsel, and give my life for yours if need be.",
      character: { name: "Brienne of Tarth", slug: "brienne", house: { name: "House Tarth of Evenfall Hall", slug: "tarth" } }
    },
    {
      sentence: "We know no king, but the King in the North whose name is STARK.",
      character: { name: "Lyanna Mormont", slug: "lyanna", house: { name: "House Mormont of Bear Island", slug: "mormont" } }
    },
    {
      sentence: "Hodor.",
      character: { name: "Hodor", slug: "hodor", house: null }
    }
  ]
};
