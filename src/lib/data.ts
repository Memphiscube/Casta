import {
  Banana,
  Cherry,
  Gem,
  Ghost,
  type LucideIcon,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export type Game = {
  slug: string;
  title: string;
  description: string;
  category: "Колесо" | "Слоти" | "Карткова";
  badge: string;
  players: string;
  accent: string;
  icon: LucideIcon;
  image?: string;
  available: boolean;
};

export const games: Game[] = [
  {
    slug: "jungle-wheel",
    title: "Jungle Wheel",
    description: "Крути колесо джунглів, збирай комбо та відкривай сезонні трофеї.",
    category: "Колесо",
    badge: "Грай зараз",
    players: "1 284 онлайн",
    accent: "lime",
    icon: Banana,
    image: "/games/jungle-wheel.png",
    available: true,
  },
  {
    slug: "cherry-club",
    title: "Cherry Club",
    description: "Неонові слоти 5×5 із десятьма лініями та спільним балансом профілю.",
    category: "Слоти",
    badge: "Грай зараз",
    players: "Нова гра",
    accent: "coral",
    icon: Cherry,
    image: "/games/cherry-club.png",
    available: true,
  },
  {
    slug: "moon-mansion",
    title: "Moon Mansion",
    description: "Збирай магічні ключі та проходь кімнати старого маєтку.",
    category: "Слоти",
    badge: "Незабаром",
    players: "У розробці",
    accent: "violet",
    icon: Ghost,
    image: "/games/moon-mansion.png",
    available: false,
  },
  {
    slug: "gem-society",
    title: "Gem Society",
    description: "Карткова колекція, клубні дуелі та косметичні нагороди.",
    category: "Карткова",
    badge: "Незабаром",
    players: "У розробці",
    accent: "gold",
    icon: Gem,
    image: "/games/gem-society.png",
    available: false,
  },
];

export const dailyRewards = [
  { day: 1, coins: 250, icon: Sparkles },
  { day: 2, coins: 350, icon: Sparkles },
  { day: 3, coins: 500, icon: WandSparkles },
  { day: 4, coins: 650, icon: Sparkles },
  { day: 5, coins: 900, icon: WandSparkles },
  { day: 6, coins: 1_250, icon: Sparkles },
  { day: 7, coins: 2_500, icon: Gem },
];

export const shopItems = [
  {
    slug: "midnight-avatar",
    name: "Midnight Crown",
    type: "Рамка аватара",
    price: 2_400,
    accent: "violet",
  },
  {
    slug: "jungle-trail",
    name: "Jungle Trail",
    type: "Ефект перемоги",
    price: 3_200,
    accent: "lime",
  },
  {
    slug: "coral-card",
    name: "Coral Club",
    type: "Тема профілю",
    price: 1_800,
    accent: "coral",
  },
  {
    slug: "founder-pin",
    name: "Founder Pin",
    type: "Колекційний значок",
    price: 5_000,
    accent: "gold",
  },
];
