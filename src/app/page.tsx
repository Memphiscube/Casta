import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Flame,
  Gift,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

import { GameCard } from "@/components/game-card";
import { games } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> Сезон 01 · Wild Club</span>
            <h1>
              Грай заради <em>моменту.</em>
              <br />Залишайся заради своїх.
            </h1>
            <p className="hero-lead">
              CASTA — це social casino, де цінність має не ставка, а колекція,
              прогрес і вечір із друзями.
            </p>
            <div className="hero-actions">
              <Link href="/games/jungle-wheel" className="button button-primary">
                <Play size={18} fill="currentColor" /> Грати безкоштовно
              </Link>
              <Link href="/games" className="button button-secondary">
                Переглянути ігри <ArrowRight size={18} />
              </Link>
            </div>
            <div className="trust-row">
              <span><CheckCircle2 size={16} /> Без депозитів</span>
              <span><ShieldCheck size={16} /> Лише 18+</span>
              <span><Coins size={16} /> Тільки virtual coins</span>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Jungle Wheel — гра сезону">
            <div className="showcase-topline">
              <span>Гра сезону</span>
              <span className="live-dot">Live</span>
            </div>
            <div className="showcase-wheel">
              <div className="mini-wheel">
                <span className="mini-wheel-center"><Sparkles size={30} /></span>
              </div>
              <div className="floating-chip chip-one"><Trophy size={18} /> ×10</div>
              <div className="floating-chip chip-two"><Coins size={18} /> +500</div>
            </div>
            <div className="showcase-copy">
              <span>Jungle Wheel</span>
              <strong>Крути. Збирай. Повертайся.</strong>
              <div>
                <span><Users size={15} /> 1 284 онлайн</span>
                <span><Flame size={15} /> 7-денна серія</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="perks-strip" aria-label="Переваги CASTA">
        <div className="site-container perks-grid">
          <article className="perk-banner perk-banner-gold">
            <div className="perk-icon" aria-hidden="true"><Coins size={27} /></div>
            <div className="perk-copy">
              <span className="perk-kicker">Welcome pack</span>
              <strong>5 000</strong>
              <p>стартових монет</p>
            </div>
            <span className="perk-badge">У подарунок</span>
          </article>

          <article className="perk-banner perk-banner-coral">
            <div className="perk-icon" aria-hidden="true"><Flame size={27} /></div>
            <div className="perk-copy">
              <span className="perk-kicker">Daily streak</span>
              <strong>7 днів</strong>
              <p>серія нагород</p>
            </div>
            <span className="perk-badge">Щодня більше</span>
          </article>

          <article className="perk-banner perk-banner-lime">
            <div className="perk-icon" aria-hidden="true"><Sparkles size={27} /></div>
            <div className="perk-copy">
              <span className="perk-kicker">Play for fun</span>
              <strong>100%</strong>
              <p>гра заради розваги</p>
            </div>
            <span className="perk-badge">Social casino</span>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="site-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><Flame size={15} /> Зараз у клубі</span>
              <h2>Твій наступний фаворит</h2>
            </div>
            <Link href="/games" className="text-link">Усі ігри <ArrowRight size={17} /></Link>
          </div>
          <div className="games-grid home-games">
            {games.slice(0, 3).map((game, index) => (
              <GameCard key={game.slug} game={game} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block club-section">
        <div className="site-container club-grid">
          <div>
            <span className="eyebrow"><Gift size={15} /> Клубна система</span>
            <h2>Щодня — нова причина повернутися</h2>
            <p>
              Збирай серію входів, підвищуй рівень і витрачай монети лише на
              косметичні предмети. Прогрес твій — тиску немає.
            </p>
            <Link href="/rewards" className="button button-primary">
              Відкрити нагороди <ArrowRight size={18} />
            </Link>
          </div>
          <div className="reward-preview">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className={day <= 3 ? "reward-day claimed" : day === 4 ? "reward-day current" : "reward-day"}>
                <span>День {day}</span>
                <Coins size={20} />
                <strong>{day === 7 ? "2 500" : 150 + day * 100}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
