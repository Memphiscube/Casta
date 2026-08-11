"use client";

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
import { localize, useI18n } from "@/components/i18n-provider";
import { dailyRewards, games } from "@/lib/data";

const homeCopy = {
  en: {
    season: "Season 01 · Wild Club", heroStart: "Play for the ", moment: "moment.", heroEnd: "Stay for your people.",
    lead: "CASTA is a social casino where the collection, your progress and an evening with friends matter more than any stake.",
    playFree: "Play for free", browse: "Browse games", noDeposits: "No deposits", adults: "18+ only", virtualOnly: "Virtual coins only",
    offerAria: "5,000 starting coins at CASTA", sceneAlt: "Crownkeeper on a mountain of virtual coins in front of the CASTA club",
    startingCoins: "starting coins", offerText: "Your club balance is ready. Play for free and build your collection.", playGame: "Play game", virtualCurrency: "Virtual currency only",
    perksAria: "CASTA benefits", gift: "Free gift", days: "7 days", streak: "reward streak", moreDaily: "More every day", forFun: "play for fun",
    inClub: "Now in the club", nextFavorite: "Your next favorite", allGames: "All games", clubSystem: "Club system",
    dailyReason: "A new reason to return every day", clubText: "Build your login streak, level up and spend coins only on cosmetic items. Your progress, with no pressure.", openRewards: "Open rewards", day: "Day", welcomeBonus: "Welcome bonus", welcomePack: "Welcome pack", dailyStreak: "Daily streak", playForFun: "Play for fun", socialCasino: "Social casino",
  },
  cs: {
    season: "Sezóna 01 · Wild Club", heroStart: "Hraj pro ", moment: "okamžik.", heroEnd: "Zůstaň pro své lidi.",
    lead: "CASTA je social casino, kde jsou sbírka, pokrok a večer s přáteli důležitější než jakákoli sázka.",
    playFree: "Hrát zdarma", browse: "Prohlédnout hry", noDeposits: "Bez vkladů", adults: "Pouze 18+", virtualOnly: "Pouze virtuální mince",
    offerAria: "5 000 startovních mincí v CASTA", sceneAlt: "Crownkeeper na hoře virtuálních mincí před klubem CASTA",
    startingCoins: "startovních mincí", offerText: "Tvůj klubový zůstatek je připraven. Hraj zdarma a buduj svou sbírku.", playGame: "Hrát", virtualCurrency: "Pouze virtuální měna",
    perksAria: "Výhody CASTA", gift: "Dárek zdarma", days: "7 dní", streak: "série odměn", moreDaily: "Každý den více", forFun: "hra pro zábavu",
    inClub: "Právě v klubu", nextFavorite: "Tvůj další favorit", allGames: "Všechny hry", clubSystem: "Klubový systém",
    dailyReason: "Každý den nový důvod vrátit se", clubText: "Buduj sérii přihlášení, zvyšuj úroveň a utrácej mince jen za kosmetické předměty. Tvůj pokrok bez tlaku.", openRewards: "Otevřít odměny", day: "Den", welcomeBonus: "Uvítací bonus", welcomePack: "Uvítací balíček", dailyStreak: "Denní série", playForFun: "Hra pro zábavu", socialCasino: "Social casino",
  },
} as const;

export default function HomePage() {
  const { locale, numberLocale } = useI18n();
  const copy = homeCopy[locale];

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> {copy.season}</span>
            <h1>
              {copy.heroStart}<em>{copy.moment}</em>
              <br />{copy.heroEnd}
            </h1>
            <p className="hero-lead">{copy.lead}</p>
            <div className="hero-actions">
              <Link href="/games/jungle-wheel" className="button button-primary">
                <Play size={18} fill="currentColor" /> {copy.playFree}
              </Link>
              <Link href="/games" className="button button-secondary">
                {copy.browse} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="trust-row">
              <span><CheckCircle2 size={16} /> {copy.noDeposits}</span>
              <span><ShieldCheck size={16} /> {copy.adults}</span>
              <span><Coins size={16} /> {copy.virtualOnly}</span>
            </div>
          </div>

          <div className="hero-showcase welcome-offer" aria-label={copy.offerAria}>
            <Image
              className="welcome-scene"
              src="/casta-welcome-scene.webp"
              alt={copy.sceneAlt}
              fill
              sizes="(max-width: 860px) 560px, 43vw"
              priority
            />
            <div className="welcome-offer-copy">
              <span className="welcome-kicker">{copy.welcomeBonus}</span>
              <h2>
                <Image
                  className="welcome-5000"
                  src="/casta-5000.png"
                  alt="5 000"
                  width={1536}
                  height={1024}
                />
                <small>{copy.startingCoins}</small>
              </h2>
              <p>{copy.offerText}</p>
              <a href="#home-games" className="welcome-play-button">
                <Play size={19} fill="currentColor" /> {copy.playGame} <ArrowRight size={20} />
              </a>
              <span className="welcome-virtual-note"><ShieldCheck size={16} /> {copy.virtualCurrency}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="perks-strip" aria-label={copy.perksAria}>
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
              <span className="perk-kicker">{copy.welcomePack}</span>
              <strong>5 000</strong>
              <p>{copy.startingCoins}</p>
              <span className="perk-badge">{copy.gift}</span>
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
              <span className="perk-kicker">{copy.dailyStreak}</span>
              <strong>{copy.days}</strong>
              <p>{copy.streak}</p>
              <span className="perk-badge">{copy.moreDaily}</span>
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
              <span className="perk-kicker">{copy.playForFun}</span>
              <strong>100%</strong>
              <p>{copy.forFun}</p>
              <span className="perk-badge">{copy.socialCasino}</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block home-games-section" id="home-games">
        <div className="site-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow"><Flame size={15} /> {copy.inClub}</span>
              <h2>{copy.nextFavorite}</h2>
            </div>
            <Link href="/games" className="text-link">{copy.allGames} <ArrowRight size={17} /></Link>
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
              {copy.clubSystem}
            </span>
            <h2>{copy.dailyReason}</h2>
            <p>{copy.clubText}</p>
            <Link href="/rewards" className="button button-primary">
              {copy.openRewards} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="reward-preview">
            {dailyRewards.map(({ day, coins, image, alt }) => (
              <div key={day} className={day <= 3 ? "reward-day claimed" : day === 4 ? "reward-day current" : "reward-day"}>
                <span>{copy.day} {day}</span>
                <Image className="reward-day-symbol" src={image} alt={localize(alt, locale)} width={66} height={66} />
                <strong>{coins.toLocaleString(numberLocale)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
