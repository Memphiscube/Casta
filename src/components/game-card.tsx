"use client";

import { ArrowRight, LockKeyhole, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Game } from "@/lib/data";
import { localize, useI18n } from "@/components/i18n-provider";

const categoryLabels = {
  en: { wheel: "Wheel", slots: "Slots", cards: "Cards" },
  cs: { wheel: "Kolo", slots: "Automaty", cards: "Karty" },
} as const;

export function GameCard({ game, featured = false }: { game: Game; featured?: boolean }) {
  const { locale } = useI18n();
  const Icon = game.icon;
  const openGame = locale === "cs" ? "Otevřít hru" : "Open game";
  const followRelease = locale === "cs" ? "Sledovat vydání" : "Follow release";
  const content = (
    <article className={`game-card accent-${game.accent} ${featured ? "featured" : ""}`}>
      <div className={`game-art ${game.image ? "game-art-with-image" : ""}`}>
        {game.image ? (
          <Image
            src={game.image}
            alt={`${game.title} — ${locale === "cs" ? "banner hry" : "game banner"}`}
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 380px"
            className="game-art-image"
          />
        ) : (
          <span className="game-orb"><Icon size={featured ? 44 : 34} /></span>
        )}
        <span className="game-badge">{localize(game.badge, locale)}</span>
      </div>
      <div className="game-card-body">
        <div className="game-meta">
          <span>{categoryLabels[locale][game.category]}</span>
          <span><Users size={14} /> {localize(game.players, locale)}</span>
        </div>
        <h3>{game.title}</h3>
        <p>{localize(game.description, locale)}</p>
        <span className="card-action">
          {game.available ? (
            <>{openGame} <ArrowRight size={17} /></>
          ) : (
            <><LockKeyhole size={15} /> {followRelease}</>
          )}
        </span>
      </div>
    </article>
  );

  if (!game.available) return <div className="game-card-link disabled">{content}</div>;

  return (
    <Link href={`/games/${game.slug}`} className="game-card-link">
      {content}
    </Link>
  );
}
