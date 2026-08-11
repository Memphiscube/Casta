"use client";

import { Gamepad2, Info } from "lucide-react";

import { GameCard } from "@/components/game-card";
import { useI18n } from "@/components/i18n-provider";
import { games } from "@/lib/data";

const copy = {
  en: { room: "Game room", title: "Find your game", intro: "Quick sessions, club missions and cosmetic collections. Every game is free and uses virtual coins only.", categories: "Game categories", all: "All games", wheel: "Wheel", slots: "Slots", cards: "Cards", notice: "Virtual winnings cannot be exchanged for money, goods or services." },
  cs: { room: "Herní místnost", title: "Najdi svou hru", intro: "Rychlé herní seance, klubové mise a kosmetické sbírky. Všechny hry jsou zdarma a používají pouze virtuální mince.", categories: "Kategorie her", all: "Všechny hry", wheel: "Kolo", slots: "Automaty", cards: "Karty", notice: "Virtuální výhry nelze směnit za peníze, zboží ani služby." },
} as const;

export default function GamesPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow"><Gamepad2 size={15} /> {t.room}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>

        <div className="catalog-toolbar">
          <div className="filter-pills" aria-label={t.categories}>
            <span className="filter-pill active">{t.all}</span>
            <span className="filter-pill">{t.wheel}</span>
            <span className="filter-pill">{t.slots}</span>
            <span className="filter-pill">{t.cards}</span>
          </div>
          <div className="notice-card">
            <Info size={18} />
            <span>{t.notice}</span>
          </div>
        </div>

        <div className="games-grid catalog-grid">
          {games.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </div>
    </div>
  );
}
