"use client";

import {
  Coins,
  Crown,
  Gem,
  Leaf,
  Minus,
  Plus,
  RotateCw,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n } from "@/components/i18n-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const sectors = [
  { label: "×1", multiplier: 1, iconSrc: "/games/jungle-wheel-leaf.png" },
  { label: "×5", multiplier: 5, iconSrc: "/games/jungle-wheel-amethyst.png" },
  { label: "×2", multiplier: 2, iconSrc: "/games/jungle-wheel-coins.png" },
  { label: "×0", multiplier: 0, iconSrc: "/games/jungle-wheel-paw-medallion.png" },
  { label: "×3", multiplier: 3, iconSrc: "/games/jungle-wheel-treasure-chest.png" },
  { label: "×10", multiplier: 10, iconSrc: "/games/jungle-wheel-temple-crown.png" },
  { label: "×2", multiplier: 2, iconSrc: "/games/jungle-wheel-explorer-trophy.png" },
  { label: "×0", multiplier: 0, iconSrc: "/games/jungle-wheel-jaguar-mask.png" },
] as const;

const bets = [50, 100, 250, 500];
const guestOutcomes = [0, 3, 7, 0, 2, 3, 6, 0, 4, 7, 2, 0, 1, 3];
const copy = {
  en: { initial: "Choose a bet in virtual coins and spin the wheel.", insufficient: "Not enough coins. Lower your bet or collect the daily reward.", spinningMessage: "The wheel is searching for your sector…", error: "The spin could not be completed. Please try again.", win: (multiplier: number, amount: string) => `Great! The ×${multiplier} sector awarded ${amount} coins.`, lose: "No reward this time. The next spin could be yours.", temple: "Temple of fortune", balance: "Balance", lastWin: "Last win", decrease: "Decrease bet", increase: "Increase bet", bet: "Bet", spinning: "Spinning…", spin: "Spin the wheel" },
  cs: { initial: "Vyber sázku ve virtuálních mincích a roztoč kolo.", insufficient: "Nemáš dost mincí. Sniž sázku nebo si vyzvedni denní odměnu.", spinningMessage: "Kolo hledá tvůj sektor…", error: "Roztočení se nepodařilo. Zkus to znovu.", win: (multiplier: number, amount: string) => `Skvělé! Sektor ×${multiplier} přinesl ${amount} mincí.`, lose: "Tentokrát bez odměny. Příští roztočení může být tvoje.", temple: "Chrám štěstí", balance: "Zůstatek", lastWin: "Poslední výhra", decrease: "Snížit sázku", increase: "Zvýšit sázku", bet: "Sázka", spinning: "Roztáčí se…", spin: "Roztočit kolo" },
} as const;

type SpinPayload = {
  sector_index: number;
  multiplier: number;
  win: number;
  balance: number;
};

function isSpinPayload(value: unknown): value is SpinPayload {
  if (!value || typeof value !== "object") return false;
  const result = value as Record<string, unknown>;
  return ["sector_index", "multiplier", "win", "balance"].every(
    (key) => typeof result[key] === "number",
  );
}

export function JungleWheel() {
  const { locale, numberLocale } = useI18n();
  const t = copy[locale];
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [betIndex, setBetIndex] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bet = bets[betIndex];

  function animateTo(index: number) {
    const slice = 360 / sectors.length;
    const target = 360 - (index * slice + slice / 2);
    const current = ((rotation % 360) + 360) % 360;
    const delta = (target - current + 360) % 360;
    setRotation(rotation + 360 * 7 + delta);
  }

  async function spin() {
    if (spinning) return;
    if (profile.balance < bet) {
      setMessage(t.insufficient);
      return;
    }

    setSpinning(true);
    setLastWin(null);
    setMessage(t.spinningMessage);

    let result: SpinPayload;
    const supabase = getSupabaseBrowserClient();

    if (user && supabase) {
      const { data, error } = await supabase.rpc("spin_jungle_wheel", { p_bet: bet });
      if (error || !isSpinPayload(data)) {
        setSpinning(false);
        setMessage(error?.message ?? t.error);
        return;
      }
      result = data;
    } else {
      const outcome = guestOutcomes[Math.floor(Math.random() * guestOutcomes.length)];
      const multiplier = sectors[outcome].multiplier;
      const win = bet * multiplier;
      result = {
        sector_index: outcome,
        multiplier,
        win,
        balance: profile.balance - bet + win,
      };
    }

    animateTo(result.sector_index);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!user) setGuestBalance(result.balance);
      if (user) void refreshProfile();
      setLastWin(result.win);
      setMessage(
        result.win > 0
          ? t.win(result.multiplier, result.win.toLocaleString(numberLocale))
          : t.lose,
      );
      setSpinning(false);
    }, 4300);
  }

  return (
    <div
      className={`wheel-stage jungle-wheel-stage${spinning ? " is-spinning" : ""}${lastWin && lastWin > 0 ? " has-win" : ""}`}
      aria-busy={spinning}
    >
      <Image
        className="jungle-stage-art"
        src="/games/jungle-wheel-stage.webp"
        alt=""
        fill
        sizes="(max-width: 860px) 100vw, 820px"
        priority
        aria-hidden="true"
      />
      <div className="jungle-fireflies" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="jungle-floaters" aria-hidden="true">
        <span className="jungle-floater jungle-floater-gem"><Gem size={24} /></span>
        <span className="jungle-floater jungle-floater-coin"><Coins size={24} /></span>
        <span className="jungle-floater jungle-floater-leaf"><Leaf size={25} /></span>
      </div>

      <div className="wheel-stage-title">
        <span>Jungle Wheel</span>
        <strong>{t.temple}</strong>
      </div>

      <div className="wheel-balance-row">
        <div className="wheel-metric">
          <span>{t.balance}</span>
          <strong>{profile.balance.toLocaleString(numberLocale)} 🪙</strong>
        </div>
        <div className="wheel-metric" style={{ textAlign: "right" }}>
          <span>{t.lastWin}</span>
          <strong>{lastWin === null ? "—" : `+${lastWin.toLocaleString(numberLocale)}`}</strong>
        </div>
      </div>

      <div className="play-wheel-wrap">
        <span className="play-wheel-aura" aria-hidden="true" />
        <span className="play-wheel-pointer" aria-hidden="true"><Gem size={23} /></span>
        <div className="play-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {sectors.map((sector, index) => {
            const sectorSize = 360 / sectors.length;
            const sectorCenter = index * sectorSize + sectorSize / 2;
            const angle = (sectorCenter * Math.PI) / 180;
            return (
              <span
                key={`${sector.label}-${index}`}
                className="wheel-label"
                style={{
                  left: `${50 + Math.sin(angle) * 34}%`,
                  top: `${50 - Math.cos(angle) * 34}%`,
                }}
              >
                <Image
                  className="wheel-sector-icon"
                  src={sector.iconSrc}
                  alt=""
                  width={42}
                  height={42}
                  draggable={false}
                  aria-hidden="true"
                />
                <b>{sector.label}</b>
              </span>
            );
          })}
          <span className="play-wheel-center">
            <Crown size={34} />
            <small>CASTA</small>
          </span>
        </div>
        {lastWin !== null && lastWin > 0 ? (
          <div className="wheel-win-burst" aria-hidden="true">
            <span>+{lastWin.toLocaleString(numberLocale)}</span>
          </div>
        ) : null}
      </div>

      <div className="wheel-controls">
        <div className="bet-control">
          <button
            type="button"
            aria-label={t.decrease}
            disabled={spinning}
            onClick={() => setBetIndex((value) => Math.max(0, value - 1))}
          >
            <Minus size={17} />
          </button>
          <span>{t.bet}<strong>{bet.toLocaleString(numberLocale)} 🪙</strong></span>
          <button
            type="button"
            aria-label={t.increase}
            disabled={spinning}
            onClick={() => setBetIndex((value) => Math.min(bets.length - 1, value + 1))}
          >
            <Plus size={17} />
          </button>
        </div>
        <button type="button" className="button button-primary jungle-spin-button" disabled={spinning} onClick={spin}>
          {spinning ? <RotateCw className="spin-icon" size={18} /> : <Coins size={18} />}
          {spinning ? t.spinning : t.spin}
        </button>
      </div>
      <p className="win-message" aria-live="polite">{message ?? t.initial}</p>
    </div>
  );
}
