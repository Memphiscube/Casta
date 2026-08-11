"use client";

import {
  Building2,
  CircleDollarSign,
  Gamepad2,
  Mail,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/components/i18n-provider";

const copy = {
  en: {
    eyebrow: "Legal · fair play",
    title: "Terms & Conditions",
    updated: "Last updated and effective: August 11, 2026",
    intro: "These Terms govern access to and use of CASTA, a free social casino operated by ABC Digital Studio s.r.o. By using CASTA or creating an account, you agree to these Terms and our Privacy Policy.",
    notice: "CASTA uses virtual coins only. There are no deposits, purchases, real-money bets, cash prizes or items with monetary value.",
    overview: [
      ["18+ only", "You must be at least 18 and legally permitted to use CASTA."],
      ["Virtual play", "Coins are part of the game and cannot be bought, sold or redeemed."],
      ["Fair use", "One account per person. Bots, exploits and manipulation are prohibited."],
    ],
    privacyBefore: "Our ", privacyLink: "Privacy Policy", privacyAfter: " forms part of these Terms and explains how we process personal data.",
    sections: [
      {
        title: "1. Acceptance of the Terms",
        paragraphs: [
          "These Terms form a legally binding agreement between you and ABC Digital Studio s.r.o. (“CASTA”, “we”, “us” or “our”). If you do not agree, do not access or use the service.",
          "We may update these Terms to reflect changes to CASTA, legal requirements or security needs. The current version and effective date will always be published on this page. If a material change affects your rights, we will provide reasonable additional notice.",
        ],
        privacy: true,
      },
      {
        title: "2. Eligibility",
        paragraphs: ["To use CASTA, you represent and confirm that:"],
        bullets: [
          "You are at least 18 years old.",
          "You are legally capable of entering into these Terms.",
          "Using a free social casino is lawful in the place where you access CASTA.",
          "You are not using CASTA for an unlawful purpose and have not been permanently banned from the service.",
        ],
        after: "We may request reasonable information needed to verify eligibility and may restrict or close an account that does not meet these conditions.",
      },
      {
        title: "3. Accounts and security",
        paragraphs: [
          "Some features require an account. You must provide accurate information, keep your login credentials confidential and promptly notify us if you suspect unauthorized access. You are responsible for activity performed through your account unless applicable law provides otherwise.",
          "Each person may maintain only one CASTA account. You may not sell, transfer, share or lend an account. Creating multiple accounts to collect repeated starting coins, rewards or other benefits is prohibited.",
        ],
      },
      {
        title: "4. Virtual coins and rewards",
        paragraphs: ["CASTA provides virtual coins, rewards, levels and other digital gameplay elements solely for entertainment."],
        bullets: [
          "Virtual coins have no monetary value and are not money, electronic money, cryptocurrency or a financial instrument.",
          "Coins cannot be purchased, sold, transferred, exchanged or redeemed for cash, prizes, goods or services.",
          "New profiles may receive 5,000 starting coins at no charge. Daily rewards and promotional grants are also free and may change.",
          "Virtual balances and rewards are a limited, personal licence to use gameplay features; they are not your property.",
          "We may correct a balance affected by an error, exploit, duplicate reward or unauthorized manipulation.",
          "We may adjust gameplay, reward values, availability or progression to maintain and improve CASTA, subject to applicable law.",
        ],
      },
      {
        title: "5. Acceptable use",
        paragraphs: ["You must use CASTA fairly and lawfully. You may not:"],
        bullets: [
          "Use bots, scripts, automation, macros or unauthorized software to interact with CASTA.",
          "Exploit bugs, manipulate results or balances, bypass limits, or attempt to obtain unauthorized rewards.",
          "Hack, probe, reverse-engineer or circumvent authentication, access controls or security measures except where applicable law expressly permits it.",
          "Interfere with CASTA, its servers or another user’s access, or introduce malware or harmful code.",
          "Impersonate another person, provide misleading account information or use another person’s account.",
          "Use CASTA for fraud, money laundering, real-money wagering, commercial resale or any other unlawful activity.",
          "Scrape, copy or systematically extract content or data without our written permission or a legal right to do so.",
        ],
      },
      {
        title: "6. Intellectual property",
        paragraphs: [
          "CASTA and its software, branding, interfaces, text, graphics, artwork, game assets, animations and other content are owned by or licensed to ABC Digital Studio s.r.o. and protected by intellectual-property law.",
          "We grant you a limited, personal, revocable, non-exclusive and non-transferable right to use CASTA for private, non-commercial entertainment in accordance with these Terms. No ownership rights are transferred to you. You may not reproduce, distribute, modify, publish, sell or create derivative works from CASTA content without permission, except where the law allows it.",
        ],
      },
      {
        title: "7. Availability and changes",
        paragraphs: [
          "CASTA is provided on an “as available” basis. We may maintain, update, suspend or discontinue features, games or rewards. We do not guarantee uninterrupted or error-free operation, permanent availability of any game, or preservation of guest-mode data stored only in your browser.",
          "We may use technical providers such as Supabase for account and database services and Vercel for hosting and delivery. Third-party services and external links are governed by their own terms, and we are not responsible for content or services outside our control.",
        ],
      },
      {
        title: "8. No gambling or financial value",
        paragraphs: [
          "CASTA is designed solely as free entertainment. It does not offer gambling for money, deposits, withdrawals, purchases, sweepstakes prizes or anything redeemable for monetary value. Gameplay does not indicate or improve a user’s likelihood of success in real-money gambling.",
          "You must not use CASTA or arrangements with other people to conduct real-money bets, trade accounts or virtual balances, or create any unofficial market around game items.",
        ],
      },
      {
        title: "9. Disclaimers and liability",
        paragraphs: [
          "To the maximum extent permitted by applicable law, CASTA is provided without warranties beyond those that cannot legally be excluded. We do not guarantee that the service will always be available, meet every expectation or be free from all defects.",
          "We are not liable for indirect or consequential loss resulting from use of or inability to use CASTA, loss of purely virtual balances, unsupported browser modifications, user misconduct, or events outside our reasonable control. Nothing in these Terms excludes liability that cannot be excluded under law, including mandatory consumer rights or liability for intentional misconduct, gross negligence, death or personal injury where applicable.",
        ],
      },
      {
        title: "10. Suspension and termination",
        paragraphs: [
          "You may stop using CASTA at any time. We may restrict, suspend or terminate access where you breach these Terms, create security or legal risk, abuse rewards, manipulate balances or harm other users or the service. Where appropriate, we may first warn you or allow you to explain the situation.",
          "On account closure, access to virtual balances, rewards and progress may end. Personal data is handled in accordance with our Privacy Policy and applicable retention requirements.",
        ],
      },
      {
        title: "11. Governing law and disputes",
        paragraphs: [
          "These Terms are governed by the laws of the Slovak Republic. Courts of the Slovak Republic have jurisdiction over disputes, subject to any mandatory consumer-protection rules that give you the right to bring a claim in your country of habitual residence or apply more protective local law.",
          "Before starting formal proceedings, please contact us so we can try to resolve the issue. This does not limit your right to contact a consumer-protection authority, supervisory authority or competent court.",
        ],
      },
      {
        title: "12. General provisions",
        paragraphs: [
          "If part of these Terms is found invalid or unenforceable, the remaining provisions continue to apply. A delay in enforcing a right is not a waiver of that right. You may not assign your rights or obligations under these Terms without our consent; we may transfer them as part of a lawful reorganization or transfer of CASTA, subject to applicable law.",
          "These Terms and the Privacy Policy constitute the agreement governing your use of CASTA unless a separate written agreement applies.",
        ],
      },
      {
        title: "13. Contact",
        paragraphs: ["For questions, complaints or notices concerning these Terms, contact the CASTA operator:"],
        operator: true,
      },
    ],
    operator: {
      name: "ABC Digital Studio s.r.o.", registered: "Registered office", address: "Laurinská 9, 811 01 Bratislava – Staré Mesto, Slovak Republic",
      company: "Company ID", companyValue: "50 865 374", tax: "Tax ID", taxValue: "2120503803", email: "Email", emailValue: "support@...",
    },
  },
  cs: {
    eyebrow: "Právní informace · férová hra",
    title: "Obchodní podmínky",
    updated: "Poslední aktualizace a účinnost: 11. srpna 2026",
    intro: "Tyto podmínky upravují přístup ke CASTA a její používání. CASTA je bezplatné social casino provozované společností ABC Digital Studio s.r.o. Používáním CASTA nebo vytvořením účtu souhlasíte s těmito podmínkami a našimi zásadami ochrany osobních údajů.",
    notice: "CASTA používá pouze virtuální mince. Nejsou zde vklady, nákupy, sázky za skutečné peníze, peněžní výhry ani předměty s peněžní hodnotou.",
    overview: [
      ["Pouze 18+", "Musíte být starší 18 let a oprávněni CASTA používat."],
      ["Virtuální hra", "Mince jsou součástí hry a nelze je koupit, prodat ani vyplatit."],
      ["Férové používání", "Jeden účet na osobu. Boti, zneužívání chyb a manipulace jsou zakázány."],
    ],
    privacyBefore: "Naše ", privacyLink: "zásady ochrany osobních údajů", privacyAfter: " jsou součástí těchto podmínek a vysvětlují zpracování osobních údajů.",
    sections: [
      {
        title: "1. Přijetí podmínek",
        paragraphs: [
          "Tyto podmínky představují právně závaznou dohodu mezi vámi a ABC Digital Studio s.r.o. („CASTA“, „my“, „nás“ nebo „naše“). Pokud s nimi nesouhlasíte, službu nepoužívejte.",
          "Podmínky můžeme aktualizovat kvůli změnám CASTA, právním požadavkům nebo bezpečnosti. Aktuální znění a datum účinnosti budou vždy zveřejněny na této stránce. Pokud podstatná změna ovlivní vaše práva, poskytneme přiměřené dodatečné oznámení.",
        ],
        privacy: true,
      },
      {
        title: "2. Způsobilost",
        paragraphs: ["Používáním CASTA potvrzujete, že:"],
        bullets: [
          "Je vám alespoň 18 let.",
          "Jste právně způsobilí uzavřít tuto dohodu.",
          "Používání bezplatného social casina je v místě vašeho přístupu zákonné.",
          "CASTA nepoužíváte k nezákonnému účelu a nebyli jste ze služby trvale vyloučeni.",
        ],
        after: "Můžeme požadovat přiměřené informace k ověření způsobilosti a omezit nebo uzavřít účet, který tyto podmínky nesplňuje.",
      },
      {
        title: "3. Účty a zabezpečení",
        paragraphs: [
          "Některé funkce vyžadují účet. Musíte uvádět přesné údaje, chránit přihlašovací údaje a neprodleně nás upozornit na podezření na neoprávněný přístup. Za aktivitu prostřednictvím účtu odpovídáte, pokud zákon nestanoví jinak.",
          "Každá osoba může mít pouze jeden účet CASTA. Účet nesmíte prodat, převést, sdílet ani půjčit. Vytváření více účtů za účelem opakovaného získání startovních mincí, odměn nebo jiných výhod je zakázáno.",
        ],
      },
      {
        title: "4. Virtuální mince a odměny",
        paragraphs: ["CASTA poskytuje virtuální mince, odměny, úrovně a další digitální herní prvky výhradně pro zábavu."],
        bullets: [
          "Virtuální mince nemají peněžní hodnotu a nejsou penězi, elektronickými penězi, kryptoměnou ani finančním nástrojem.",
          "Mince nelze koupit, prodat, převést, směnit ani vyplatit za hotovost, ceny, zboží či služby.",
          "Nové profily mohou bezplatně získat 5 000 startovních mincí. Denní a propagační odměny jsou rovněž zdarma a mohou se měnit.",
          "Virtuální zůstatky a odměny představují omezené osobní oprávnění používat herní funkce; nejsou vaším majetkem.",
          "Můžeme opravit zůstatek ovlivněný chybou, zneužitím, duplicitní odměnou nebo neoprávněnou manipulací.",
          "Můžeme upravovat hry, hodnoty odměn, dostupnost a postup za účelem údržby a zlepšování CASTA v souladu se zákonem.",
        ],
      },
      {
        title: "5. Přijatelné používání",
        paragraphs: ["CASTA musíte používat férově a zákonně. Nesmíte:"],
        bullets: [
          "Používat boty, skripty, automatizaci, makra nebo neoprávněný software.",
          "Zneužívat chyby, manipulovat výsledky či zůstatky, obcházet omezení nebo neoprávněně získávat odměny.",
          "Narušovat, analyzovat či zpětně rozebírat bezpečnost nebo obcházet autentizaci a řízení přístupu, s výjimkou případů výslovně povolených zákonem.",
          "Narušovat CASTA, její servery nebo přístup jiných uživatelů či šířit škodlivý kód.",
          "Vydávat se za jinou osobu, uvádět zavádějící údaje nebo používat cizí účet.",
          "Používat CASTA k podvodu, praní peněz, sázení o skutečné peníze, obchodnímu přeprodeji nebo jiné nezákonné činnosti.",
          "Systematicky kopírovat nebo získávat obsah či data bez písemného svolení nebo zákonného oprávnění.",
        ],
      },
      {
        title: "6. Duševní vlastnictví",
        paragraphs: [
          "CASTA a její software, značka, rozhraní, texty, grafika, ilustrace, herní prvky a animace jsou vlastněny nebo licencovány společností ABC Digital Studio s.r.o. a chráněny právem duševního vlastnictví.",
          "Udělujeme vám omezené, osobní, odvolatelné, nevýhradní a nepřenosné právo používat CASTA k soukromé nekomerční zábavě v souladu s těmito podmínkami. Vlastnická práva na vás nepřecházejí. Bez povolení nesmíte obsah rozmnožovat, distribuovat, upravovat, zveřejňovat, prodávat ani z něj vytvářet odvozená díla, pokud zákon nestanoví jinak.",
        ],
      },
      {
        title: "7. Dostupnost a změny",
        paragraphs: [
          "CASTA je poskytována podle aktuální dostupnosti. Můžeme provádět údržbu, aktualizovat, pozastavit nebo ukončit funkce, hry či odměny. Nezaručujeme nepřetržitý provoz bez chyb, trvalou dostupnost konkrétní hry ani uchování dat režimu hosta uložených pouze v prohlížeči.",
          "Můžeme využívat Supabase pro účty a databázi a Vercel pro hosting a doručování. Služby a externí odkazy třetích stran se řídí vlastními podmínkami a neodpovídáme za obsah mimo naši kontrolu.",
        ],
      },
      {
        title: "8. Žádný hazard ani finanční hodnota",
        paragraphs: [
          "CASTA slouží výhradně jako bezplatná zábava. Nenabízí hazardní hry o peníze, vklady, výběry, nákupy, výhry v loteriích ani cokoli směnitelného za peněžní hodnotu. Hraní nezvyšuje ani nepředpovídá pravděpodobnost úspěchu v hazardních hrách o skutečné peníze.",
          "CASTA ani dohody s jinými osobami nesmíte používat k sázkám o skutečné peníze, obchodování s účty nebo virtuálními zůstatky ani k vytváření neoficiálního trhu s herními prvky.",
        ],
      },
      {
        title: "9. Vyloučení záruk a odpovědnost",
        paragraphs: [
          "V maximálním rozsahu povoleném zákonem je CASTA poskytována bez záruk nad rámec těch, které nelze zákonně vyloučit. Nezaručujeme stálou dostupnost, splnění všech očekávání ani úplnou absenci vad.",
          "Neodpovídáme za nepřímou či následnou újmu způsobenou používáním nebo nemožností použít CASTA, ztrátu čistě virtuálních zůstatků, nepodporované úpravy prohlížeče, jednání uživatele nebo události mimo naši přiměřenou kontrolu. Nic nevylučuje odpovědnost, kterou zákon vyloučit nedovoluje, včetně povinných práv spotřebitele nebo odpovědnosti za úmyslné jednání či hrubou nedbalost.",
        ],
      },
      {
        title: "10. Pozastavení a ukončení",
        paragraphs: [
          "CASTA můžete kdykoli přestat používat. Přístup můžeme omezit, pozastavit nebo ukončit při porušení podmínek, bezpečnostním či právním riziku, zneužití odměn, manipulaci zůstatků nebo poškozování uživatelů či služby. Je-li to vhodné, nejprve vás upozorníme nebo vám umožníme situaci vysvětlit.",
          "Po uzavření účtu může zaniknout přístup k virtuálním zůstatkům, odměnám a postupu. S osobními údaji nakládáme podle zásad ochrany osobních údajů a platných pravidel uchovávání.",
        ],
      },
      {
        title: "11. Rozhodné právo a spory",
        paragraphs: [
          "Tyto podmínky se řídí právem Slovenské republiky. K rozhodování sporů jsou příslušné soudy Slovenské republiky, s výhradou závazných pravidel ochrany spotřebitele, která vám umožňují podat žalobu v zemi obvyklého bydliště nebo uplatnit výhodnější místní právo.",
          "Před zahájením formálního řízení nás kontaktujte, abychom se mohli pokusit problém vyřešit. Tím není omezeno vaše právo obrátit se na orgán ochrany spotřebitele, dozorový orgán nebo příslušný soud.",
        ],
      },
      {
        title: "12. Obecná ustanovení",
        paragraphs: [
          "Pokud je část podmínek neplatná nebo nevymahatelná, ostatní ustanovení zůstávají účinná. Prodlení s uplatněním práva neznamená jeho vzdání se. Svá práva ani povinnosti nemůžete bez našeho souhlasu postoupit; my je můžeme převést v rámci zákonné reorganizace nebo převodu CASTA v souladu se zákonem.",
          "Tyto podmínky a zásady ochrany osobních údajů představují dohodu upravující používání CASTA, pokud se neuplatní samostatná písemná dohoda.",
        ],
      },
      {
        title: "13. Kontakt",
        paragraphs: ["S dotazy, stížnostmi nebo oznámeními týkajícími se těchto podmínek kontaktujte provozovatele CASTA:"],
        operator: true,
      },
    ],
    operator: {
      name: "ABC Digital Studio s.r.o.", registered: "Sídlo", address: "Laurinská 9, 811 01 Bratislava – Staré Mesto, Slovenská republika",
      company: "IČO", companyValue: "50 865 374", tax: "DIČ", taxValue: "2120503803", email: "E-mail", emailValue: "support@...",
    },
  },
} as const;

const overviewIcons = [UserRoundCheck, CircleDollarSign, Gamepad2];

export function TermsPolicy() {
  const { locale } = useI18n();
  const t = copy[locale];

  return (
    <div className="privacy-page terms-page">
      <section className="privacy-hero terms-hero">
        <div className="site-container privacy-hero-inner">
          <span className="eyebrow"><Scale size={16} /> {t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p className="privacy-updated">{t.updated}</p>
          <p className="privacy-intro">{t.intro}</p>
          <div className="privacy-notice"><ShieldCheck size={19} /><span>{t.notice}</span></div>
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
              {"privacy" in section && section.privacy ? <p>{t.privacyBefore}<Link className="legal-inline-link" href="/privacy">{t.privacyLink}</Link>{t.privacyAfter}</p> : null}
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
