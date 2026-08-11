"use client";

import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Coins,
  Gamepad2,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useI18n } from "@/components/i18n-provider";

type Category = "general" | "coins" | "account" | "games";

type FaqItem = {
  category: Category;
  question: string;
  answer: string;
};

const content = {
  en: {
    eyebrow: "Help center",
    title: "Frequently asked questions",
    intro: "Everything you need to know about CASTA — free games, virtual coins, rewards and your club profile.",
    search: "Search questions",
    searchPlaceholder: "For example: starting coins, guest mode…",
    categories: {
      all: "All topics",
      general: "General",
      coins: "Coins & rewards",
      account: "Account",
      games: "Games",
    },
    noResults: "No answers matched your search. Try another phrase or view all topics.",
    clear: "View all questions",
    results: (count: number) => `${count} ${count === 1 ? "answer" : "answers"}`,
    ctaEyebrow: "Ready to play?",
    ctaTitle: "Start with 5,000 virtual coins",
    ctaText: "Explore CASTA instantly in guest mode or create a free account to keep your balance and progress across devices.",
    gamesCta: "Browse games",
    howCta: "How CASTA works",
    items: [
      { category: "general", question: "What is CASTA?", answer: "CASTA is a free social casino for entertainment. You play original games with virtual coins, build a club profile, collect daily rewards and unlock cosmetic items. No real money is used at any point." },
      { category: "general", question: "Is CASTA a real-money casino?", answer: "No. CASTA does not accept deposits, sell virtual coins or offer cash-outs, cash prizes or items with monetary value. Game results are part of a purely virtual entertainment experience." },
      { category: "general", question: "Who can use CASTA?", answer: "CASTA is intended only for adults aged 18 or older. You should also use the service only where free social casino games are permitted by the laws that apply to you." },
      { category: "general", question: "Is CASTA completely free?", answer: "Yes. No payment card or purchase is required. A new profile starts with 5,000 free virtual coins, and more coins can be collected through the seven-day daily reward cycle." },
      { category: "coins", question: "What are CASTA coins?", answer: "CASTA coins are virtual gameplay units. You use them to play, track progress and obtain cosmetic collection items. They are not money, cannot be purchased or transferred, and cannot be redeemed for cash, goods or prizes." },
      { category: "coins", question: "How do I get more coins?", answer: "Every new profile starts with 5,000 coins. You can collect one free reward each day: the seven-day streak grows from 250 coins on day one to 2,500 coins on day seven, then the cycle begins again." },
      { category: "coins", question: "Can I buy or withdraw coins?", answer: "No. CASTA has no deposits, coin purchases or withdrawals. Virtual coins are available only through free gameplay and rewards and never have real-world monetary value." },
      { category: "coins", question: "Is my balance shared between games?", answer: "Yes. Jungle Wheel, Cherry Club, Golden Reef, the profile and the cosmetic shop use the same CASTA balance. For a signed-in player it is synchronized through the account; guest progress is stored in the current browser." },
      { category: "account", question: "Do I need an account to play?", answer: "No. Guest mode lets you start immediately. Creating a free account is recommended because it saves and synchronizes your balance, reward streak, profile and collection instead of keeping them only in one browser." },
      { category: "account", question: "How do I create an account?", answer: "Open Sign in, choose Register, enter your club name, email and a password of at least six characters, then confirm that you are 18 or older. CASTA never asks for payment information." },
      { category: "account", question: "Can I have more than one account?", answer: "No. Each person may maintain only one CASTA account. Multiple accounts used to repeat starting coins or rewards may be restricted under the CASTA Terms." },
      { category: "account", question: "What happens to guest progress?", answer: "Guest balance and rewards are saved only in the browser on that device. Clearing site data, changing browsers or devices, or using private browsing can remove that progress. An account is the safer way to keep it." },
      { category: "games", question: "Which CASTA games can I play now?", answer: "Golden Reef is a 5×3 reef-themed slot, Cherry Club is a 5×5 slot with 10 fixed lines, and Jungle Wheel is a prize wheel with selectable virtual-coin bets. The catalog also previews games that are still in development." },
      { category: "games", question: "How do games affect my balance?", answer: "A virtual-coin bet is deducted when a round starts, and any virtual winnings are added after the result. Signed-in rounds are processed with the account wallet on the server; guest rounds update the local guest balance." },
      { category: "games", question: "Can I win real money or prizes?", answer: "No. You cannot win, withdraw or exchange anything of monetary value. Wins only add virtual coins to your CASTA balance for continued entertainment." },
      { category: "games", question: "What should I do if a game does not start?", answer: "Check that your balance covers the selected virtual bet, then refresh the page and try again. If you are signed in, make sure the session is still active. You can also lower the bet or collect the available daily reward." },
    ] satisfies FaqItem[],
  },
  cs: {
    eyebrow: "Centrum nápovědy",
    title: "Často kladené otázky",
    intro: "Vše, co potřebuješ vědět o CASTA — hry zdarma, virtuální mince, odměny a klubový profil.",
    search: "Hledat v otázkách",
    searchPlaceholder: "Například: startovní mince, režim hosta…",
    categories: {
      all: "Všechna témata",
      general: "Obecné",
      coins: "Mince a odměny",
      account: "Účet",
      games: "Hry",
    },
    noResults: "Pro toto hledání jsme nenašli žádnou odpověď. Zkus jiný výraz nebo zobraz všechna témata.",
    clear: "Zobrazit všechny otázky",
    results: (count: number) => `${count} ${count === 1 ? "odpověď" : count < 5 ? "odpovědi" : "odpovědí"}`,
    ctaEyebrow: "Připraven hrát?",
    ctaTitle: "Začni s 5 000 virtuálními mincemi",
    ctaText: "Prozkoumej CASTA ihned v režimu hosta nebo si vytvoř bezplatný účet a uchovej zůstatek i pokrok na všech zařízeních.",
    gamesCta: "Prohlédnout hry",
    howCta: "Jak CASTA funguje",
    items: [
      { category: "general", question: "Co je CASTA?", answer: "CASTA je bezplatné social casino určené pro zábavu. Hraješ originální hry s virtuálními mincemi, buduješ klubový profil, sbíráš denní odměny a odemykáš kosmetické předměty. Skutečné peníze se nikdy nepoužívají." },
      { category: "general", question: "Je CASTA casino o skutečné peníze?", answer: "Ne. CASTA nepřijímá vklady, neprodává virtuální mince a nenabízí výběry, peněžní ceny ani předměty s peněžní hodnotou. Výsledky her jsou součástí čistě virtuální zábavy." },
      { category: "general", question: "Kdo může CASTA používat?", answer: "CASTA je určena pouze dospělým od 18 let. Službu používej jen tam, kde jsou bezplatné social casino hry povoleny právními předpisy, které se na tebe vztahují." },
      { category: "general", question: "Je CASTA opravdu zdarma?", answer: "Ano. Není potřeba platební karta ani žádný nákup. Nový profil začíná s 5 000 bezplatnými virtuálními mincemi a další lze získat v sedmidenním cyklu denních odměn." },
      { category: "coins", question: "Co jsou mince CASTA?", answer: "Mince CASTA jsou virtuální herní jednotky. Používají se ke hře, sledování pokroku a získávání kosmetických předmětů. Nejsou penězi, nelze je koupit ani převádět a nelze je směnit za hotovost, zboží nebo ceny." },
      { category: "coins", question: "Jak získám více mincí?", answer: "Každý nový profil začíná s 5 000 mincemi. Jednou denně si můžeš vyzvednout bezplatnou odměnu: sedmidenní série roste z 250 mincí první den na 2 500 mincí sedmý den a poté začne znovu." },
      { category: "coins", question: "Mohu mince koupit nebo vybrat?", answer: "Ne. CASTA nemá vklady, nákup mincí ani výběry. Virtuální mince lze získat pouze bezplatnou hrou a odměnami a nikdy nemají skutečnou peněžní hodnotu." },
      { category: "coins", question: "Je můj zůstatek společný pro všechny hry?", answer: "Ano. Jungle Wheel, Cherry Club, Golden Reef, profil i kosmetický obchod používají stejný zůstatek CASTA. Přihlášenému hráči se synchronizuje přes účet; pokrok hosta zůstává v aktuálním prohlížeči." },
      { category: "account", question: "Potřebuji ke hře účet?", answer: "Ne. Režim hosta umožní začít ihned. Bezplatný účet ale doporučujeme, protože ukládá a synchronizuje zůstatek, sérii odměn, profil i sbírku namísto uchování pouze v jednom prohlížeči." },
      { category: "account", question: "Jak si vytvořím účet?", answer: "Otevři Přihlášení, zvol Registrace, zadej klubové jméno, e-mail a heslo o nejméně šesti znacích a potvrď, že ti je alespoň 18 let. CASTA nikdy nepožaduje platební údaje." },
      { category: "account", question: "Mohu mít více účtů?", answer: "Ne. Každá osoba může mít pouze jeden účet CASTA. Více účtů používaných k opakovanému získávání startovních mincí nebo odměn může být omezeno podle Podmínek CASTA." },
      { category: "account", question: "Co se stane s pokrokem hosta?", answer: "Zůstatek a odměny hosta jsou uložené pouze v prohlížeči daného zařízení. Vymazání dat webu, změna prohlížeče či zařízení nebo anonymní režim mohou tento pokrok odstranit. Účet je bezpečnější způsob uchování." },
      { category: "games", question: "Které hry CASTA mohu hrát?", answer: "Golden Reef je útesový automat 5×3, Cherry Club je automat 5×5 s 10 pevnými liniemi a Jungle Wheel je kolo odměn s volitelnou virtuální sázkou. Katalog ukazuje také hry, které jsou teprve ve vývoji." },
      { category: "games", question: "Jak hry mění můj zůstatek?", answer: "Virtuální sázka se odečte při zahájení kola a případná virtuální výhra se přičte po výsledku. Přihlášená kola se zpracují s peněženkou účtu na serveru; kola hosta aktualizují místní zůstatek." },
      { category: "games", question: "Mohu vyhrát skutečné peníze nebo ceny?", answer: "Ne. Nelze vyhrát, vybrat ani směnit nic s peněžní hodnotou. Výhry pouze přidají virtuální mince do zůstatku CASTA pro další zábavu." },
      { category: "games", question: "Co mám dělat, když se hra nespustí?", answer: "Zkontroluj, zda zůstatek stačí na zvolenou virtuální sázku, obnov stránku a zkus to znovu. Pokud jsi přihlášen, ověř, že je relace stále aktivní. Můžeš také snížit sázku nebo vyzvednout dostupnou denní odměnu." },
    ] satisfies FaqItem[],
  },
} as const;

const categoryIcons = {
  all: CircleHelp,
  general: ShieldCheck,
  coins: Coins,
  account: UserRound,
  games: Gamepad2,
} as const;

export function FaqPage() {
  const { locale } = useI18n();
  const copy = content[locale];
  const [category, setCategory] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale === "cs" ? "cs" : "en");
    return copy.items.filter((item) => {
      const categoryMatches = category === "all" || item.category === category;
      const searchMatches = !normalizedQuery || `${item.question} ${item.answer}`.toLocaleLowerCase(locale === "cs" ? "cs" : "en").includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [category, copy.items, locale, query]);

  const categories = Object.keys(copy.categories) as Array<"all" | Category>;

  function resetFilters() {
    setCategory("all");
    setQuery("");
  }

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="site-container faq-hero-inner">
          <span className="eyebrow"><CircleHelp size={16} /> {copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <label className="faq-search">
            <span className="sr-only">{copy.search}</span>
            <Search size={20} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} type="search" />
          </label>
        </div>
      </section>

      <section className="site-container faq-content" aria-label={copy.title}>
        <div className="faq-category-tabs" role="group" aria-label={copy.title}>
          {categories.map((key) => {
            const Icon = categoryIcons[key];
            return (
              <button key={key} type="button" className={category === key ? "active" : ""} aria-pressed={category === key} onClick={() => setCategory(key)}>
                <Icon size={18} aria-hidden="true" /> {copy.categories[key]}
              </button>
            );
          })}
        </div>

        <div className="faq-results-meta" aria-live="polite">{copy.results(filteredItems.length)}</div>

        {filteredItems.length > 0 ? (
          <div className="faq-list">
            {filteredItems.map((item, index) => (
              <details className="faq-item" key={item.question} open={index === 0 && !query}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <div className="faq-empty">
            <Search size={32} aria-hidden="true" />
            <p>{copy.noResults}</p>
            <button type="button" onClick={resetFilters}>{copy.clear}</button>
          </div>
        )}

        <aside className="faq-cta">
          <div>
            <span className="eyebrow"><Coins size={15} /> {copy.ctaEyebrow}</span>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaText}</p>
          </div>
          <div className="faq-cta-actions">
            <Link href="/games" className="button button-primary">{copy.gamesCta}<ArrowRight size={18} /></Link>
            <Link href="/how-it-works" className="button button-secondary">{copy.howCta}</Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
