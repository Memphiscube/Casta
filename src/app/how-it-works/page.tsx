"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Coins,
  Gamepad2,
  Gift,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

const content = {
  en: {
    simple: "Simple and free", title: "How CASTA works", intro: "Four simple steps from your first visit to a daily streak. Virtual coins only, club progress and play for fun.", starting: "5,000 starting coins", noDeposit: "no deposit", stepsLabel: "How to start playing CASTA",
    steps: [
      { icon: CircleUserRound, title: "Create a free account", description: "Register with an email and password. No bank card, deposit or payment details are required.", tag: "Less than a minute" },
      { icon: Coins, title: "Get your starting coins", description: "Every new profile automatically receives 5,000 virtual coins — enough to start playing right away.", tag: "5,000 coins instantly" },
      { icon: Gamepad2, title: "Choose a game and play", description: "Open the catalog, launch Jungle Wheel and watch for new games. Registration is optional in guest mode.", tag: "Play now" },
      { icon: Gift, title: "Return for rewards", description: "Collect a daily bonus, maintain a 7-day streak and use coins in games and the cosmetic shop.", tag: "Up to 2,500 coins" },
    ],
    currency: "100% virtual currency", coinTitle: "Coins are for play, progress and collecting", coinText: "Virtual coins are not money. They cannot be bought, withdrawn or exchanged for cash or prizes — they are simply part of the CASTA experience.", checks: ["No payments or deposits", "5,000 coins for every new profile", "Daily bonuses from 250 to 2,500", "Games and cosmetic collections"],
    essential: "The essentials", faq: "Frequently asked questions",
    questions: [
      { question: "Does CASTA offer real-money bets or winnings?", answer: "No. CASTA is a social casino intended solely for entertainment. There are no deposits, real-money bets, withdrawals or prizes with monetary value." },
      { question: "What are virtual coins?", answer: "They are in-game points for spins, progress and cosmetic items. They have no monetary value and cannot be exchanged for money, goods or services." },
      { question: "Do I need to add a bank card?", answer: "No. Registration only requires an email and password. CASTA does not request payment details or sell virtual coins for real money." },
      { question: "How can I get more coins?", answer: "Start with 5,000 coins and collect daily rewards. The seven-day streak gradually grows from 250 to 2,500 coins." },
      { question: "Do I have to create an account?", answer: "Jungle Wheel is also available in guest mode. An account syncs your balance, reward streak, profile and collection through Supabase." },
    ],
    first: "Your first round", ready: "Ready for your first spin?", guest: "Guest mode is available instantly. An account saves your progress and rewards.", play: "Play for free", rewards: "View rewards",
  },
  cs: {
    simple: "Jednoduše a zdarma", title: "Jak CASTA funguje", intro: "Čtyři jednoduché kroky od první návštěvy k denní sérii. Pouze virtuální mince, klubový pokrok a hra pro zábavu.", starting: "5 000 startovních mincí", noDeposit: "bez vkladu", stepsLabel: "Jak začít hrát CASTA",
    steps: [
      { icon: CircleUserRound, title: "Vytvoř si bezplatný účet", description: "Zaregistruj se pomocí e-mailu a hesla. Platební karta, vklad ani platební údaje nejsou potřeba.", tag: "Méně než minuta" },
      { icon: Coins, title: "Získej startovní mince", description: "Každý nový profil automaticky získá 5 000 virtuálních mincí — dost na okamžité zahájení hry.", tag: "5 000 mincí ihned" },
      { icon: Gamepad2, title: "Vyber hru a začni", description: "Otevři katalog, spusť Jungle Wheel a sleduj nové hry. V režimu hosta není registrace povinná.", tag: "Hraj hned" },
      { icon: Gift, title: "Vracej se pro odměny", description: "Vyzvedávej denní bonus, udržuj sedmidenní sérii a používej mince ve hrách i kosmetickém obchodě.", tag: "Až 2 500 mincí" },
    ],
    currency: "100% virtuální měna", coinTitle: "Mince jsou pro hru, pokrok a sbírku", coinText: "Virtuální mince nejsou peníze. Nelze je koupit, vybrat ani směnit za hotovost či ceny — jsou pouze součástí zážitku CASTA.", checks: ["Žádné platby ani vklady", "5 000 mincí pro každý nový profil", "Denní bonusy od 250 do 2 500", "Hry a kosmetické sbírky"],
    essential: "To nejdůležitější", faq: "Časté otázky",
    questions: [
      { question: "Nabízí CASTA sázky nebo výhry za skutečné peníze?", answer: "Ne. CASTA je social casino určené výhradně pro zábavu. Nejsou zde vklady, peněžní sázky, výběry ani ceny s peněžní hodnotou." },
      { question: "Co jsou virtuální mince?", answer: "Jsou to herní body pro roztočení, pokrok a kosmetické předměty. Nemají peněžní hodnotu a nelze je směnit za peníze, zboží ani služby." },
      { question: "Musím přidat platební kartu?", answer: "Ne. K registraci stačí e-mail a heslo. CASTA nevyžaduje platební údaje a neprodává virtuální mince za skutečné peníze." },
      { question: "Jak získám více mincí?", answer: "Začni s 5 000 mincemi a vyzvedávej denní odměny. Sedmidenní série postupně roste od 250 do 2 500 mincí." },
      { question: "Musím si vytvořit účet?", answer: "Jungle Wheel je dostupné i v režimu hosta. Účet synchronizuje zůstatek, sérii odměn, profil a sbírku přes Supabase." },
    ],
    first: "Tvoje první kolo", ready: "Připraven na první roztočení?", guest: "Režim hosta je dostupný ihned. Účet uloží tvůj pokrok a odměny.", play: "Hrát zdarma", rewards: "Zobrazit odměny",
  },
} as const;

export default function HowItWorksPage() {
  const { locale } = useI18n();
  const t = content[locale];
  return (
    <div className="how-page">
      <section className="how-hero">
        <div className="how-backdrop" aria-hidden="true">
          <Image
            src="/games/jungle-wheel.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="how-backdrop-image"
          />
        </div>

        <div className="site-container how-hero-inner">
          <div className="how-intro">
            <span className="eyebrow"><Sparkles size={15} /> {t.simple}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <div className="how-welcome-pill">
              <Coins size={23} />
              <strong>{t.starting}</strong>
              <span>{t.noDeposit}</span>
            </div>
          </div>

          <ol className="how-steps" aria-label={t.stepsLabel}>
            {t.steps.map(({ icon: Icon, title, description, tag }, index) => (
              <li className="how-step-card" key={title}>
                <span className="how-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="how-step-copy">
                  <div className="how-step-title">
                    <span className="how-step-icon"><Icon size={20} /></span>
                    <h2>{title}</h2>
                  </div>
                  <p>{description}</p>
                  <span className="how-step-tag">{tag}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="how-currency-section">
        <div className="site-container">
          <article className="how-currency-card">
            <div className="how-coin-visual" aria-hidden="true">
              <span className="how-coin-orbit how-coin-orbit-one" />
              <span className="how-coin-orbit how-coin-orbit-two" />
              <Image
                className="how-coin-art"
                src="/games/jungle-wheel-coins.png"
                alt=""
                width={192}
                height={192}
              />
            </div>
            <div className="how-currency-copy">
              <span className="eyebrow"><ShieldCheck size={15} /> {t.currency}</span>
              <h2>{t.coinTitle}</h2>
              <p>{t.coinText}</p>
              <ul className="how-check-list">
                {t.checks.map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="how-faq-section">
        <div className="site-container how-faq-wrap">
          <div className="section-heading how-faq-heading">
            <span className="eyebrow"><Sparkles size={15} /> {t.essential}</span>
            <h2>{t.faq}</h2>
          </div>

          <div className="how-faq-list">
            {t.questions.map(({ question, answer }, index) => (
              <details className="how-faq-item" key={question} open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <ChevronDown size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>

          <div className="how-cta">
            <div>
              <span className="eyebrow"><Gamepad2 size={15} /> {t.first}</span>
              <h2>{t.ready}</h2>
              <p>{t.guest}</p>
            </div>
            <div className="how-cta-actions">
              <Link href="/games/jungle-wheel" className="button button-primary">
                {t.play} <ArrowRight size={18} />
              </Link>
              <Link href="/rewards" className="button button-secondary">
                {t.rewards}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
