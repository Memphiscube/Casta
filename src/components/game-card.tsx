import { ArrowRight, LockKeyhole, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Game } from "@/lib/data";

export function GameCard({ game, featured = false }: { game: Game; featured?: boolean }) {
  const Icon = game.icon;
  const content = (
    <article className={`game-card accent-${game.accent} ${featured ? "featured" : ""}`}>
      <div className={`game-art ${game.image ? "game-art-with-image" : ""}`}>
        {game.image ? (
          <Image
            src={game.image}
            alt={`${game.title} — банер гри`}
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 380px"
            className="game-art-image"
          />
        ) : (
          <span className="game-orb"><Icon size={featured ? 44 : 34} /></span>
        )}
        <span className="game-badge">{game.badge}</span>
      </div>
      <div className="game-card-body">
        <div className="game-meta">
          <span>{game.category}</span>
          <span><Users size={14} /> {game.players}</span>
        </div>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <span className="card-action">
          {game.available ? (
            <>Відкрити гру <ArrowRight size={17} /></>
          ) : (
            <><LockKeyhole size={15} /> Стежити за релізом</>
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
