import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Як це працює",
  description:
    "Дізнайся, як працює CASTA: безкоштовний акаунт, віртуальні монети, social casino і щоденні нагороди.",
};

const steps = [
  {
    icon: CircleUserRound,
    title: "Створи безкоштовний акаунт",
    description:
      "Зареєструйся за допомогою email і пароля. Банківська картка, депозит або платіжні дані не потрібні.",
    tag: "Менше хвилини",
  },
  {
    icon: Coins,
    title: "Отримай стартові монети",
    description:
      "Новий профіль автоматично отримує 5 000 віртуальних монет — цього достатньо, щоб одразу почати гру.",
    tag: "5 000 монет одразу",
  },
  {
    icon: Gamepad2,
    title: "Обери гру і починай",
    description:
      "Відкрий каталог, запускай Jungle Wheel і стеж за новими іграми. Для гостьового режиму реєстрація не обов’язкова.",
    tag: "Гра вже доступна",
  },
  {
    icon: Gift,
    title: "Повертайся за нагородами",
    description:
      "Забирай щоденний бонус, підтримуй 7-денну серію та використовуй монети в іграх і магазині косметики.",
    tag: "До 2 500 монет",
  },
];

const questions = [
  {
    question: "Чи є в CASTA ставки або виграші в реальних грошах?",
    answer:
      "Ні. CASTA — це social casino виключно для розваги. Тут немає депозитів, грошових ставок, виведення коштів або призів із реальною вартістю.",
  },
  {
    question: "Що таке віртуальні монети?",
    answer:
      "Це внутрішні ігрові бали для обертань, прогресу та косметичних предметів. Вони не мають грошової вартості й не обмінюються на гроші, товари чи послуги.",
  },
  {
    question: "Чи потрібно додавати банківську картку?",
    answer:
      "Ні. Для реєстрації потрібні лише email і пароль. CASTA не просить платіжні реквізити й не продає віртуальні монети за реальні гроші.",
  },
  {
    question: "Як отримати більше монет?",
    answer:
      "Почни з 5 000 стартових монет і забирай щоденні нагороди. У семиденній серії сума поступово зростає від 250 до 2 500 монет.",
  },
  {
    question: "Чи обов’язково створювати акаунт?",
    answer:
      "Jungle Wheel доступна і в гостьовому режимі. Акаунт потрібен, щоб синхронізувати баланс, серію нагород, профіль і колекцію через Supabase.",
  },
];

export default function HowItWorksPage() {
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
            <span className="eyebrow"><Sparkles size={15} /> Просто та безкоштовно</span>
            <h1>Як працює <em>CASTA</em></h1>
            <p>
              Чотири прості кроки від першого входу до щоденної серії.
              Тільки віртуальні монети, клубний прогрес і гра заради розваги.
            </p>
            <div className="how-welcome-pill">
              <Coins size={23} />
              <strong>5 000 стартових монет</strong>
              <span>без депозиту</span>
            </div>
          </div>

          <ol className="how-steps" aria-label="Як почати грати в CASTA">
            {steps.map(({ icon: Icon, title, description, tag }, index) => (
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
              <span className="how-coin-core"><Coins size={58} /></span>
            </div>
            <div className="how-currency-copy">
              <span className="eyebrow"><ShieldCheck size={15} /> 100% віртуальна валюта</span>
              <h2>Монети — для гри, прогресу й колекції</h2>
              <p>
                Віртуальні монети не є грошима. Їх не можна купити, вивести або
                обміняти на готівку чи призи — це лише частина досвіду CASTA.
              </p>
              <ul className="how-check-list">
                <li><CheckCircle2 size={18} /> Жодних платежів або депозитів</li>
                <li><CheckCircle2 size={18} /> 5 000 монет для нового профілю</li>
                <li><CheckCircle2 size={18} /> Щоденні бонуси від 250 до 2 500</li>
                <li><CheckCircle2 size={18} /> Ігри та косметичні колекції</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="how-faq-section">
        <div className="site-container how-faq-wrap">
          <div className="section-heading how-faq-heading">
            <span className="eyebrow"><Sparkles size={15} /> Коротко про головне</span>
            <h2>Часті запитання</h2>
          </div>

          <div className="how-faq-list">
            {questions.map(({ question, answer }, index) => (
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
              <span className="eyebrow"><Gamepad2 size={15} /> Твій перший раунд</span>
              <h2>Готовий зробити перший оберт?</h2>
              <p>Гостьовий режим доступний одразу. Акаунт збереже твій прогрес і нагороди.</p>
            </div>
            <div className="how-cta-actions">
              <Link href="/games/jungle-wheel" className="button button-primary">
                Грати безкоштовно <ArrowRight size={18} />
              </Link>
              <Link href="/rewards" className="button button-secondary">
                Переглянути нагороди
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
