"use client";

import {
  Coins,
  Crown,
  Gem,
  Gift,
  Leaf,
  Minus,
  PawPrint,
  Plus,
  RotateCw,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const sectors = [
  { label: "×1", multiplier: 1, icon: Leaf },
  { label: "×5", multiplier: 5, icon: Gem },
  { label: "×2", multiplier: 2, icon: Coins },
  { label: "×0", multiplier: 0, icon: PawPrint },
  { label: "×3", multiplier: 3, icon: Gift },
  { label: "×10", multiplier: 10, icon: Crown },
  { label: "×2", multiplier: 2, icon: Trophy },
  { label: "×0", multiplier: 0, icon: PawPrint },
] as const;

const bets = [50, 100, 250, 500];
const guestOutcomes = [0, 3, 7, 0, 2, 3, 6, 0, 4, 7, 2, 0, 1, 3];

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
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [betIndex, setBetIndex] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [message, setMessage] = useState("Обери ставку у віртуальних монетах і крути колесо.");
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
      setMessage("Недостатньо монет. Зменш ставку або забери щоденну нагороду.");
      return;
    }

    setSpinning(true);
    setLastWin(null);
    setMessage("Колесо шукає твій сектор…");

    let result: SpinPayload;
    const supabase = getSupabaseBrowserClient();

    if (user && supabase) {
      const { data, error } = await supabase.rpc("spin_jungle_wheel", { p_bet: bet });
      if (error || !isSpinPayload(data)) {
        setSpinning(false);
        setMessage(error?.message ?? "Не вдалося виконати обертання. Спробуй ще раз.");
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
          ? `Чудово! Сектор ×${result.multiplier} приніс ${result.win.toLocaleString("uk-UA")} монет.`
          : "Цього разу без нагороди. Наступне обертання може бути твоїм.",
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
        <strong>Храм удачі</strong>
      </div>

      <div className="wheel-balance-row">
        <div className="wheel-metric">
          <span>Баланс</span>
          <strong>{profile.balance.toLocaleString("uk-UA")} 🪙</strong>
        </div>
        <div className="wheel-metric" style={{ textAlign: "right" }}>
          <span>Останній виграш</span>
          <strong>{lastWin === null ? "—" : `+${lastWin.toLocaleString("uk-UA")}`}</strong>
        </div>
      </div>

      <div className="play-wheel-wrap">
        <span className="play-wheel-aura" aria-hidden="true" />
        <span className="play-wheel-pointer" aria-hidden="true"><Gem size={23} /></span>
        <div className="play-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {sectors.map((sector, index) => {
            const angle = ((index * 45 + 22.5) * Math.PI) / 180;
            const Icon = sector.icon;
            return (
              <span
                key={`${sector.label}-${index}`}
                className="wheel-label"
                style={{
                  left: `${50 + Math.sin(angle) * 34}%`,
                  top: `${50 - Math.cos(angle) * 34}%`,
                }}
              >
                <Icon size={21} strokeWidth={2.1} />
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
            <span>+{lastWin.toLocaleString("uk-UA")}</span>
          </div>
        ) : null}
      </div>

      <div className="wheel-controls">
        <div className="bet-control">
          <button
            type="button"
            aria-label="Зменшити ставку"
            disabled={spinning}
            onClick={() => setBetIndex((value) => Math.max(0, value - 1))}
          >
            <Minus size={17} />
          </button>
          <span>Ставка<strong>{bet.toLocaleString("uk-UA")} 🪙</strong></span>
          <button
            type="button"
            aria-label="Збільшити ставку"
            disabled={spinning}
            onClick={() => setBetIndex((value) => Math.min(bets.length - 1, value + 1))}
          >
            <Plus size={17} />
          </button>
        </div>
        <button type="button" className="button button-primary jungle-spin-button" disabled={spinning} onClick={spin}>
          {spinning ? <RotateCw className="spin-icon" size={18} /> : <Coins size={18} />}
          {spinning ? "Крутиться…" : "Крутити колесо"}
        </button>
      </div>
      <p className="win-message" aria-live="polite">{message}</p>
    </div>
  );
}
