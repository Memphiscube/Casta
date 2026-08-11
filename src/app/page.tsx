import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Flame,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GameCard } from "@/components/game-card";
import { dailyRewards, games } from "@/lib/data";

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

          <div className="hero-showcase welcome-offer" aria-label="5 000 стартових монет у CASTA">
            <Image
              className="welcome-scene"
              src="/casta-welcome-scene.webp"
              alt="Crownkeeper на горі віртуальних монет перед клубом CASTA"
              fill
              sizes="(max-width: 860px) 560px, 43vw"
              priority
            />
            <div className="welcome-offer-copy">
              <span className="welcome-kicker">Welcome bonus</span>
              <h2>
                <Image
                  className="welcome-5000"
                  src="/casta-5000.png"
                  alt="5 000"
                  width={1536}
                  height={1024}
                />
                <small>стартових монет</small>
              </h2>
              <p>Твій клубний запас уже готовий. Грай безкоштовно та збирай свою колекцію.</p>
              <a href="#home-games" className="welcome-play-button">
                <Play size={19} fill="currentColor" /> Play game <ArrowRight size={20} />
              </a>
              <span className="welcome-virtual-note"><ShieldCheck size={16} /> Лише віртуальна валюта</span>
            </div>
          </div>
        </div>
      </section>

      <section className="perks-strip" aria-label="Переваги CASTA">
        <div className="site-container perks-grid">
          <article className="perk-banner perk-banner-gold">
            <Image
              className="perk-art"
              src="/banners/welcome-pack.png"
              alt=""
              fill
              sizes="(max-width: 1050px) 100vw, 33vw"
              aria-hidden="true"
            />
            <div className="perk-copy">
              <span className="perk-kicker">Welcome pack</span>
              <strong>5 000</strong>
              <p>стартових монет</p>
              <span className="perk-badge">У подарунок</span>
            </div>
          </article>

          <article className="perk-banner perk-banner-coral">
            <Image
              className="perk-art"
              src="/banners/daily-streak.png"
              alt=""
              fill
              sizes="(max-width: 1050px) 100vw, 33vw"
              aria-hidden="true"
            />
            <div className="perk-copy">
              <span className="perk-kicker">Daily streak</span>
              <strong>7 днів</strong>
              <p>серія нагород</p>
              <span className="perk-badge">Щодня більше</span>
            </div>
          </article>

          <article className="perk-banner perk-banner-lime">
            <Image
              className="perk-art"
              src="/banners/play-for-fun.png"
              alt=""
              fill
              sizes="(max-width: 1050px) 100vw, 33vw"
              aria-hidden="true"
            />
            <div className="perk-copy">
              <span className="perk-kicker">Play for fun</span>
              <strong>100%</strong>
              <p>гра заради розваги</p>
              <span className="perk-badge">Social casino</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block home-games-section" id="home-games">
        <div className="site-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><Flame size={15} /> Зараз у клубі</span>
              <h2>Твій наступний фаворит</h2>
            </div>
            <Link href="/games" className="text-link">Усі ігри <ArrowRight size={17} /></Link>
          </div>
          <div className="games-grid home-games">
            {games.slice(0, 12).map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block club-section">
        <div className="site-container club-grid">
          <div>
            <span className="eyebrow">
              <Image className="eyebrow-3d-symbol" src="/games/jungle-wheel-treasure-chest.png" alt="" width={28} height={28} />
              Клубна система
            </span>
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
            {dailyRewards.map(({ day, coins, image, alt }) => (
              <div key={day} className={day <= 3 ? "reward-day claimed" : day === 4 ? "reward-day current" : "reward-day"}>
                <span>День {day}</span>
                <Image className="reward-day-symbol" src={image} alt={alt} width={66} height={66} />
                <strong>{coins.toLocaleString("uk-UA")}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
