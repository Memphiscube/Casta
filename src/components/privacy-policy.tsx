"use client";

import {
  Building2,
  Database,
  Globe2,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";

const copy = {
  en: {
    eyebrow: "Legal · your data",
    title: "Privacy Policy",
    updated: "Last updated and effective: August 11, 2026",
    intro: "CASTA is a free social casino operated by ABC Digital Studio s.r.o. This policy explains what personal data we process when you use the website, create an account or play with virtual coins, why we process it and what rights you have.",
    notice: "CASTA does not offer real-money gambling, purchases, cash prizes or items with monetary value.",
    overview: [
      ["Account data", "Email address, username and authentication information."],
      ["Game data", "Virtual-coin balance, progress, rewards and game-session history."],
      ["Technical data", "Device, browser, IP address, security and diagnostic information."],
    ],
    sections: [
      {
        title: "1. Data controller",
        paragraphs: ["The controller responsible for processing personal data on CASTA is:"],
        operator: true,
      },
      {
        title: "2. Information we collect",
        paragraphs: [
          "When you create an account, we process your email address, username or profile name, authentication identifiers and a securely hashed password handled through Supabase Auth. We do not receive or store your password in readable form.",
          "When you play, we process your virtual-coin balance, wagers made with virtual coins, game results, experience, level, rewards, streaks and related account activity so that your progress can be saved and protected against abuse.",
          "We may also receive technical information such as IP address, browser and device type, operating system, visited pages, timestamps, referral information, diagnostic logs and security events. You may provide additional information when contacting support.",
        ],
      },
      {
        title: "3. How and why we use data",
        paragraphs: ["We process personal data only when we have a valid legal basis under applicable data-protection law."],
        bullets: [
          "To create, authenticate and maintain your account and provide the CASTA service — performance of our agreement with you.",
          "To save balances, progress and rewards and operate the games — performance of our agreement with you.",
          "To secure the platform, prevent fraud and abuse, diagnose errors and improve performance — our legitimate interests in operating a safe service.",
          "To answer support and privacy requests — performance of our agreement, legitimate interests or compliance with legal obligations.",
          "To send optional marketing communications or use non-essential cookies — your consent, which you may withdraw at any time.",
          "To comply with tax, accounting, regulatory or legal requirements where they apply — compliance with legal obligations.",
        ],
      },
      {
        title: "4. Service providers and sharing",
        paragraphs: [
          "We do not sell or rent personal data. We share only the data necessary for trusted providers to deliver CASTA, including Supabase for database, authentication and account services, and Vercel for website hosting, delivery and technical operation.",
          "Providers act under their own terms and data-processing commitments. We may also disclose information when required by law, to protect users or our rights, or as part of a merger, restructuring or transfer of the service. We do not use payment processors because CASTA does not accept payments.",
        ],
      },
      {
        title: "5. International data transfers",
        paragraphs: [
          "Some service providers may process data outside Slovakia or the European Economic Area. Where required, transfers are protected by an adequacy decision, Standard Contractual Clauses or another lawful safeguard under the GDPR.",
        ],
      },
      {
        title: "6. Cookies and local storage",
        paragraphs: [
          "CASTA uses essential browser storage and cookies to keep you signed in, remember your selected language, preserve guest progress and protect the service. These technologies are necessary for requested features. If analytics or marketing technologies are introduced, they will be used only where permitted and, when required, after your consent.",
          "You can remove or block cookies in your browser settings. Blocking essential storage may prevent sign-in, saved progress or other parts of CASTA from working correctly.",
        ],
      },
      {
        title: "7. Data retention",
        paragraphs: [
          "We keep account and gameplay data while your account is active and for as long as necessary to provide CASTA, secure the service, resolve disputes and meet legal obligations. Following a valid deletion request or account closure, data is deleted or anonymized within 90 days unless a longer period is required by law or needed to establish, exercise or defend legal claims.",
        ],
      },
      {
        title: "8. Data security",
        paragraphs: [
          "We use proportionate technical and organizational safeguards, including encrypted HTTPS connections, secure authentication, access controls and server-side validation of registered-player balances and game results. No online system is completely secure, so absolute security cannot be guaranteed.",
        ],
      },
      {
        title: "9. Your privacy rights",
        paragraphs: ["Subject to the GDPR and applicable law, you may request:"],
        bullets: [
          "Access to your personal data and information about how it is processed.",
          "Correction of inaccurate or incomplete data.",
          "Deletion of data or restriction of processing where legal conditions are met.",
          "A portable copy of data you provided where the right to portability applies.",
          "Objection to processing based on legitimate interests or to direct marketing.",
          "Withdrawal of consent at any time without affecting earlier lawful processing.",
        ],
        after: "You may also lodge a complaint with the Office for Personal Data Protection of the Slovak Republic or the data-protection authority in your country of residence. We normally respond to verified requests within one month.",
      },
      {
        title: "10. Children and age requirement",
        paragraphs: [
          "CASTA is intended only for people aged 18 and over. We do not knowingly collect personal data from children. If you believe a person under 18 has provided personal data, contact us and we will investigate and delete it where required.",
        ],
      },
      {
        title: "11. Changes to this policy",
        paragraphs: [
          "We may update this policy when CASTA, our providers or legal requirements change. We will post the revised version here, update the effective date and provide additional notice when a change materially affects your rights.",
        ],
      },
      {
        title: "12. Contact",
        paragraphs: ["For privacy questions, requests or complaints, contact the operator using the details below."],
        operator: true,
      },
    ],
    operator: {
      name: "ABC Digital Studio s.r.o.", registered: "Registered office", address: "Laurinská 9, 811 01 Bratislava – Staré Mesto, Slovak Republic",
      company: "Company ID", companyValue: "50 865 374", tax: "Tax ID", taxValue: "2120503803", email: "Email", emailValue: "support@...",
    },
  },
  cs: {
    eyebrow: "Právní informace · vaše údaje",
    title: "Zásady ochrany osobních údajů",
    updated: "Poslední aktualizace a účinnost: 11. srpna 2026",
    intro: "CASTA je bezplatné social casino provozované společností ABC Digital Studio s.r.o. Tyto zásady vysvětlují, jaké osobní údaje zpracováváme při používání webu, vytvoření účtu nebo hraní s virtuálními mincemi, proč je zpracováváme a jaká máte práva.",
    notice: "CASTA nenabízí hazardní hry o skutečné peníze, nákupy, peněžní výhry ani předměty s peněžní hodnotou.",
    overview: [
      ["Údaje účtu", "E-mailová adresa, uživatelské jméno a autentizační údaje."],
      ["Herní údaje", "Zůstatek virtuálních mincí, postup, odměny a historie herních relací."],
      ["Technické údaje", "Zařízení, prohlížeč, IP adresa, bezpečnostní a diagnostické informace."],
    ],
    sections: [
      { title: "1. Správce údajů", paragraphs: ["Správcem osobních údajů zpracovávaných v rámci CASTA je:"], operator: true },
      {
        title: "2. Jaké informace shromažďujeme",
        paragraphs: [
          "Při vytvoření účtu zpracováváme e-mailovou adresu, uživatelské nebo profilové jméno, autentizační identifikátory a bezpečně zahashované heslo zpracované prostřednictvím Supabase Auth. Heslo v čitelné podobě nepřijímáme ani neukládáme.",
          "Při hraní zpracováváme zůstatek virtuálních mincí, sázky ve virtuálních mincích, výsledky her, zkušenosti, úroveň, odměny, série a související aktivitu účtu, abychom mohli ukládat postup a chránit službu před zneužitím.",
          "Můžeme také obdržet technické informace, jako je IP adresa, typ prohlížeče a zařízení, operační systém, navštívené stránky, časové údaje, zdroj návštěvy, diagnostické záznamy a bezpečnostní události. Další údaje nám můžete poskytnout při kontaktování podpory.",
        ],
      },
      {
        title: "3. Jak a proč údaje používáme",
        paragraphs: ["Osobní údaje zpracováváme pouze na základě platného právního důvodu podle příslušných předpisů."],
        bullets: [
          "Vytvoření, ověření a správa účtu a poskytování služby CASTA — plnění smlouvy s vámi.",
          "Ukládání zůstatku, postupu a odměn a provozování her — plnění smlouvy s vámi.",
          "Zabezpečení platformy, prevence podvodů a zneužití, diagnostika chyb a zlepšování výkonu — náš oprávněný zájem na bezpečném provozu služby.",
          "Vyřizování požadavků podpory a ochrany soukromí — plnění smlouvy, oprávněný zájem nebo právní povinnost.",
          "Zasílání volitelných marketingových sdělení nebo používání nepovinných cookies — váš souhlas, který můžete kdykoli odvolat.",
          "Plnění daňových, účetních, regulačních nebo jiných právních povinností, pokud se uplatní.",
        ],
      },
      {
        title: "4. Poskytovatelé služeb a sdílení",
        paragraphs: [
          "Osobní údaje neprodáváme ani nepronajímáme. Sdílíme pouze údaje nutné pro důvěryhodné poskytovatele zajišťující CASTA, zejména Supabase pro databázi, autentizaci a služby účtu a Vercel pro hosting, doručování webu a technický provoz.",
          "Poskytovatelé postupují podle vlastních podmínek a závazků ke zpracování údajů. Údaje můžeme zpřístupnit také na základě zákona, kvůli ochraně uživatelů či našich práv nebo v rámci fúze, reorganizace či převodu služby. Platební procesory nepoužíváme, protože CASTA nepřijímá platby.",
        ],
      },
      { title: "5. Mezinárodní přenosy údajů", paragraphs: ["Někteří poskytovatelé mohou údaje zpracovávat mimo Slovensko nebo Evropský hospodářský prostor. Je-li to nutné, přenos je chráněn rozhodnutím o odpovídající ochraně, standardními smluvními doložkami nebo jinou zákonnou zárukou podle GDPR."] },
      {
        title: "6. Cookies a místní úložiště",
        paragraphs: [
          "CASTA používá nezbytné úložiště prohlížeče a cookies pro přihlášení, zapamatování jazyka, zachování postupu hosta a ochranu služby. Tyto technologie jsou nutné pro požadované funkce. Pokud zavedeme analytické nebo marketingové technologie, použijeme je pouze tam, kde je to povoleno, a v případě potřeby až po získání souhlasu.",
          "Cookies můžete odstranit nebo blokovat v nastavení prohlížeče. Blokování nezbytného úložiště může znemožnit přihlášení, ukládání postupu nebo správné fungování některých částí CASTA.",
        ],
      },
      { title: "7. Doba uchovávání", paragraphs: ["Údaje účtu a hry uchováváme po dobu aktivního účtu a dále po dobu nezbytnou k poskytování CASTA, zabezpečení služby, řešení sporů a plnění právních povinností. Po platné žádosti o výmaz nebo uzavření účtu údaje vymažeme či anonymizujeme do 90 dnů, pokud zákon nevyžaduje delší dobu nebo nejsou potřebné pro určení, výkon či obhajobu právních nároků."] },
      { title: "8. Zabezpečení údajů", paragraphs: ["Používáme přiměřená technická a organizační opatření včetně šifrovaného připojení HTTPS, bezpečné autentizace, řízení přístupů a serverového ověřování zůstatků a výsledků registrovaných hráčů. Žádný online systém není zcela bezpečný, proto nelze zaručit absolutní bezpečnost."] },
      {
        title: "9. Vaše práva",
        paragraphs: ["Podle GDPR a příslušných právních předpisů můžete požádat o:"],
        bullets: [
          "Přístup k osobním údajům a informacím o jejich zpracování.",
          "Opravu nepřesných nebo neúplných údajů.",
          "Výmaz údajů nebo omezení zpracování při splnění zákonných podmínek.",
          "Přenositelnou kopii vámi poskytnutých údajů, pokud se právo na přenositelnost uplatní.",
          "Námitku proti zpracování na základě oprávněného zájmu nebo proti přímému marketingu.",
          "Odvolání souhlasu kdykoli, aniž je dotčena zákonnost předchozího zpracování.",
        ],
        after: "Můžete také podat stížnost Úřadu na ochranu osobních údajů Slovenské republiky nebo dozorovému úřadu v zemi svého bydliště. Na ověřené žádosti obvykle odpovídáme do jednoho měsíce.",
      },
      { title: "10. Děti a věková hranice", paragraphs: ["CASTA je určena pouze osobám starším 18 let. Vědomě neshromažďujeme osobní údaje dětí. Pokud se domníváte, že osoba mladší 18 let poskytla osobní údaje, kontaktujte nás; situaci prověříme a údaje v případě potřeby vymažeme."] },
      { title: "11. Změny těchto zásad", paragraphs: ["Tyto zásady můžeme aktualizovat při změně CASTA, našich poskytovatelů nebo právních požadavků. Aktualizované znění zveřejníme zde, změníme datum účinnosti a v případě podstatného dopadu na vaše práva poskytneme další oznámení."] },
      { title: "12. Kontakt", paragraphs: ["S dotazy, žádostmi nebo stížnostmi týkajícími se soukromí kontaktujte provozovatele prostřednictvím níže uvedených údajů."], operator: true },
    ],
    operator: {
      name: "ABC Digital Studio s.r.o.", registered: "Sídlo", address: "Laurinská 9, 811 01 Bratislava – Staré Mesto, Slovenská republika",
      company: "IČO", companyValue: "50 865 374", tax: "DIČ", taxValue: "2120503803", email: "E-mail", emailValue: "support@...",
    },
  },
} as const;

const overviewIcons = [UserRoundCheck, Database, Globe2];

export function PrivacyPolicy() {
  const { locale } = useI18n();
  const t = copy[locale];

  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <div className="site-container privacy-hero-inner">
          <span className="eyebrow"><ShieldCheck size={16} /> {t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p className="privacy-updated">{t.updated}</p>
          <p className="privacy-intro">{t.intro}</p>
          <div className="privacy-notice"><KeyRound size={19} /><span>{t.notice}</span></div>
        </div>
      </section>

      <section className="site-container privacy-content-wrap">
        <div className="privacy-overview" aria-label={t.title}>
          {t.overview.map(([title, body], index) => {
            const Icon = overviewIcons[index];
            return <article key={title}><span><Icon size={21} /></span><div><strong>{title}</strong><p>{body}</p></div></article>;
          })}
        </div>

        <article className="privacy-document">
          {t.sections.map((section) => (
            <section key={section.title} className="privacy-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {"bullets" in section && section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {"after" in section && section.after ? <p>{section.after}</p> : null}
              {"operator" in section && section.operator ? <OperatorCard operator={t.operator} /> : null}
            </section>
          ))}
        </article>
      </section>
    </div>
  );
}

function OperatorCard({ operator }: { operator: typeof copy.en.operator | typeof copy.cs.operator }) {
  return (
    <div className="privacy-operator-card">
      <div className="privacy-operator-title"><Building2 size={21} /><strong>{operator.name}</strong></div>
      <dl>
        <div><dt>{operator.registered}</dt><dd>{operator.address}</dd></div>
        <div><dt>{operator.company}</dt><dd>{operator.companyValue}</dd></div>
        <div><dt>{operator.tax}</dt><dd>{operator.taxValue}</dd></div>
        <div><dt><Mail size={14} /> {operator.email}</dt><dd>{operator.emailValue}</dd></div>
      </dl>
    </div>
  );
}
