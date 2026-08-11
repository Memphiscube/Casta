import {
  Banana,
  Candy,
  Cherry,
  Clover,
  Crown,
  Dices,
  Fish,
  Gem,
  Ghost,
  Orbit,
  Spade,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { LocalizedText } from "@/components/i18n-provider";

export type GameCategory = "wheel" | "slots" | "cards";

const localized = (en: string, cs: string): LocalizedText => ({ en, cs });

export type Game = {
  slug: string;
  title: string;
  description: LocalizedText;
  category: GameCategory;
  badge: LocalizedText;
  players: LocalizedText;
  accent: string;
  icon: LucideIcon;
  image?: string;
  available: boolean;
};

export const games: Game[] = [
  {
    slug: "jungle-wheel",
    title: "Jungle Wheel",
    description: localized("Spin the jungle wheel, collect combos and unlock seasonal trophies.", "Roztoč kolo džungle, sbírej kombinace a odemykej sezónní trofeje."),
    category: "wheel",
    badge: localized("Play now", "Hrát nyní"),
    players: localized("1,284 online", "1 284 online"),
    accent: "lime",
    icon: Banana,
    image: "/games/jungle-wheel.png",
    available: true,
  },
  {
    slug: "cherry-club",
    title: "Cherry Club",
    description: localized("Neon 5×5 slots with ten paylines and your shared profile balance.", "Neonové automaty 5×5 s deseti výherními liniemi a společným zůstatkem profilu."),
    category: "slots",
    badge: localized("Play now", "Hrát nyní"),
    players: localized("New game", "Nová hra"),
    accent: "coral",
    icon: Cherry,
    image: "/games/cherry-club.png",
    available: true,
  },
  {
    slug: "moon-mansion",
    title: "Moon Mansion",
    description: localized("Collect magical keys and explore the rooms of an old mansion.", "Sbírej kouzelné klíče a procházej pokoji starého sídla."),
    category: "slots",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "violet",
    icon: Ghost,
    image: "/games/moon-mansion.png",
    available: false,
  },
  {
    slug: "gem-society",
    title: "Gem Society",
    description: localized("Card collections, club duels and cosmetic rewards.", "Karetní sbírky, klubové souboje a kosmetické odměny."),
    category: "cards",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "gold",
    icon: Gem,
    image: "/games/gem-society.png",
    available: false,
  },
  {
    slug: "neon-seven",
    title: "Neon Seven",
    description: localized("Bright neon reels, chains of sevens and night-time club missions.", "Jasné neonové válce, série sedmiček a noční klubové mise."),
    category: "slots",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "coral",
    icon: Dices,
    image: "/games/neon-seven.png",
    available: false,
  },
  {
    slug: "golden-reef",
    title: "Golden Reef",
    description: localized("Dive for golden treasure and collect ocean talismans.", "Ponoř se za zlatými poklady a sbírej mořské talismany."),
    category: "slots",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "gold",
    icon: Fish,
    image: "/games/golden-reef.png",
    available: false,
  },
  {
    slug: "royal-cards",
    title: "Royal Cards",
    description: localized("Fast card rounds, royal combinations and club tournaments.", "Rychlé karetní partie, královské kombinace a klubové turnaje."),
    category: "cards",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "violet",
    icon: Crown,
    image: "/games/royal-cards.png",
    available: false,
  },
  {
    slug: "cosmic-spin",
    title: "Cosmic Spin",
    description: localized("A cosmic wheel with orbital bonuses and seasonal artifacts.", "Vesmírné kolo s orbitálními bonusy a sezónními artefakty."),
    category: "wheel",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "violet",
    icon: Orbit,
    image: "/games/cosmic-spin.png",
    available: false,
  },
  {
    slug: "lucky-garden",
    title: "Lucky Garden",
    description: localized("Grow a lucky clover collection and unlock green jackpots.", "Pěstuj šťastnou sbírku čtyřlístků a odemykej zelené jackpoty."),
    category: "slots",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "lime",
    icon: Clover,
    image: "/games/lucky-garden.png",
    available: false,
  },
  {
    slug: "midnight-poker",
    title: "Midnight Poker",
    description: localized("Stylish night hands, friendly duels and win-streak rewards.", "Stylové noční partie, přátelské souboje a odměny za série výher."),
    category: "cards",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "coral",
    icon: Spade,
    image: "/games/midnight-poker.png",
    available: false,
  },
  {
    slug: "desert-fortune",
    title: "Desert Fortune",
    description: localized("Spin the desert wheel and discover sun relics of ancient clubs.", "Roztoč pouštní kolo a objevuj sluneční relikvie dávných klubů."),
    category: "wheel",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "gold",
    icon: Sun,
    image: "/games/desert-fortune.png",
    available: false,
  },
  {
    slug: "candy-vault",
    title: "Candy Vault",
    description: localized("Collect sweet combinations and unlock colorful cosmetic prizes.", "Sbírej sladké kombinace a odemykej barevné kosmetické odměny."),
    category: "slots",
    badge: localized("Coming soon", "Již brzy"),
    players: localized("In development", "Ve vývoji"),
    accent: "lime",
    icon: Candy,
    image: "/games/candy-vault.png",
    available: false,
  },
];

export const dailyRewards = [
  { day: 1, coins: 250, image: "/games/jungle-wheel-coins.png", alt: localized("Golden club coins", "Zlaté klubové mince") },
  { day: 2, coins: 350, image: "/games/jungle-wheel-amethyst.png", alt: localized("Purple gemstone", "Fialový drahokam") },
  { day: 3, coins: 500, image: "/games/jungle-wheel-treasure-chest.png", alt: localized("Reward chest", "Truhla s odměnou") },
  { day: 4, coins: 650, image: "/games/jungle-wheel-temple-crown.png", alt: localized("Golden club crown", "Zlatá klubová koruna") },
  { day: 5, coins: 900, image: "/games/jungle-wheel-explorer-trophy.png", alt: localized("Club trophy", "Klubová trofej") },
  { day: 6, coins: 1_250, image: "/games/jungle-wheel-jaguar-mask.png", alt: localized("Golden jaguar mask", "Zlatá maska jaguára") },
  { day: 7, coins: 2_500, image: "/games/cherry-symbols/diamond.png", alt: localized("Royal diamond", "Královský diamant") },
];

export const shopItems = [
  {
    slug: "midnight-avatar",
    name: "Midnight Crown",
    type: localized("Avatar frame", "Rámeček avatara"),
    price: 2_400,
    accent: "violet",
  },
  {
    slug: "jungle-trail",
    name: "Jungle Trail",
    type: localized("Victory effect", "Efekt vítězství"),
    price: 3_200,
    accent: "lime",
  },
  {
    slug: "coral-card",
    name: "Coral Club",
    type: localized("Profile theme", "Motiv profilu"),
    price: 1_800,
    accent: "coral",
  },
  {
    slug: "founder-pin",
    name: "Founder Pin",
    type: localized("Collectible badge", "Sběratelský odznak"),
    price: 5_000,
    accent: "gold",
  },
];
