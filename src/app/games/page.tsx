import type { Metadata } from "next";
import { Gamepad2, Info } from "lucide-react";

import { GameCard } from "@/components/game-card";
import { games } from "@/lib/data";

export const metadata: Metadata = {
  title: "Каталог ігор",
  description: "Безкоштовні social casino ігри CASTA з віртуальними монетами.",
};

export default function GamesPage() {
  return (
    <div className="page-shell">
      <div className="site-container">
        <header className="section-heading">
          <span className="eyebrow"><Gamepad2 size={15} /> Ігрова кімната</span>
          <h1>Знайди свою гру</h1>
          <p>
            Швидкі сесії, клубні місії та косметичні колекції. Усі ігри
            безкоштовні й використовують лише віртуальні монети.
          </p>
        </header>

        <div className="catalog-toolbar">
          <div className="filter-pills" aria-label="Категорії ігор">
            <span className="filter-pill active">Усі ігри</span>
            <span className="filter-pill">Колесо</span>
            <span className="filter-pill">Слоти</span>
            <span className="filter-pill">Карткові</span>
          </div>
          <div className="notice-card">
            <Info size={18} />
            <span>Віртуальні виграші не можна обміняти на гроші, товари чи послуги.</span>
          </div>
        </div>

        <div className="games-grid catalog-grid">
          {games.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </div>
    </div>
  );
}
