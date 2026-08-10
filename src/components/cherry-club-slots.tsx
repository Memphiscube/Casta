"use client";

import {
  Cherry,
  Coins,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import {
  createGuestSlotSpin,
  createRandomSlotGrid,
  initialSlotGrid,
  isSlotSpinPayload,
  slotPayouts,
  type SlotSpinPayload,
  type SlotSymbolKey,
  type WinningLine,
} from "@/lib/cherry-slots";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const bets = [50, 100, 250, 500];

const symbolMeta = {
  cherry: { label: "Вишні", src: "/games/cherry-symbols/cherry.png" },
  clover: { label: "Конюшина", src: "/games/cherry-symbols/clover.png" },
  bell: { label: "Дзвін", src: "/games/cherry-symbols/bell.png" },
  crown: { label: "Корона", src: "/games/cherry-symbols/crown.png" },
  diamond: { label: "Діамант", src: "/games/cherry-symbols/diamond.png" },
  seven: { label: "Сімка", src: "/games/cherry-symbols/seven.png" },
} satisfies Record<SlotSymbolKey, { label: string; src: string }>;

const paytableSymbols: SlotSymbolKey[] = ["cherry", "bell", "crown", "diamond", "seven"];

function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function CherryClubSlots() {
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [grid, setGrid] = useState<SlotSymbolKey[]>(initialSlotGrid);
  const [betIndex, setBetIndex] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);
  const [message, setMessage] = useState("Збери 3 або більше однакових символів зліва направо.");
  const shuffleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const bet = bets[betIndex];
  const winningCells = useMemo(
    () => new Set(winningLines.flatMap((line) => line.cells)),
    [winningLines],
  );

  useEffect(() => () => {
    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
  }, []);

  async function spin() {
    if (spinning) return;
    if (profile.balance < bet) {
      setMessage("Недостатньо монет. Зменш ставку або забери щоденну нагороду.");
      return;
    }

    setSpinning(true);
    setLastWin(null);
    setWinningLines([]);
    setMessage("Барабани Cherry Club обертаються…");

    const startedAt = Date.now();
    shuffleTimer.current = setInterval(() => setGrid(createRandomSlotGrid()), 90);

    let result: SlotSpinPayload;
    const supabase = getSupabaseBrowserClient();

    if (user && supabase) {
      const { data, error } = await supabase.rpc("spin_cherry_club", { p_bet: bet });
      if (error || !isSlotSpinPayload(data)) {
        if (shuffleTimer.current) clearInterval(shuffleTimer.current);
        shuffleTimer.current = null;
        setSpinning(false);
        setGrid(initialSlotGrid);
        setMessage(error?.message ?? "Не вдалося запустити слоти. Спробуй ще раз.");
        return;
      }
      result = data;
    } else {
      result = createGuestSlotSpin(bet, profile.balance);
    }

    await delay(Math.max(0, 1650 - (Date.now() - startedAt)));
    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
    shuffleTimer.current = null;

    setGrid(result.grid);
    setWinningLines(result.winning_lines);
    setLastWin(result.win);

    if (user) await refreshProfile();
    else setGuestBalance(result.balance);

    if (result.win > 0) {
      const lineWord = result.winning_lines.length === 1 ? "лінія" : "ліній";
      setMessage(
        `Виграш ${result.win.toLocaleString("uk-UA")} монет — ${result.winning_lines.length} ${lineWord}, загальний множник ×${result.multiplier}.`,
      );
    } else {
      setMessage("Цього разу лінії не склалися. Наступний оберт може бути виграшним.");
    }

    setSpinning(false);
  }

  return (
    <section
      className={`cherry-slot-stage${spinning ? " is-spinning" : ""}${winningLines.length ? " has-win" : ""}`}
      aria-busy={spinning}
    >
      <Image
        className="cherry-stage-art"
        src="/games/cherry-club.png"
        alt=""
        fill
        sizes="(max-width: 860px) 100vw, 820px"
        priority
        aria-hidden="true"
      />

      <div className="cherry-neon-orbs" aria-hidden="true"><i /><i /><i /><i /></div>

      <header className="cherry-stage-title">
        <span>CASTA presents</span>
        <strong>Cherry Club</strong>
        <div className="slot-feature-pills">
          <small>5 × 5</small>
          <small>10 ліній</small>
          <small>до ×25</small>
        </div>
      </header>

      <div className="slot-metrics">
        <div className="slot-metric">
          <span>Баланс</span>
          <strong>{profile.balance.toLocaleString("uk-UA")} 🪙</strong>
        </div>
        <div className="slot-metric">
          <span>Останній виграш</span>
          <strong>{lastWin === null ? "—" : `+${lastWin.toLocaleString("uk-UA")}`}</strong>
        </div>
      </div>

      <div className="slot-machine-frame">
        <div className="slot-machine-crown" aria-hidden="true">
          <span><Cherry size={17} /> Cherry jackpot <Sparkles size={15} /></span>
        </div>

        <div className="slot-grid" role="grid" aria-label="Ігрове поле Cherry Club, 5 рядків на 5 стовпців">
          {grid.map((symbol, index) => {
            const { src, label } = symbolMeta[symbol];
            const row = Math.floor(index / 5) + 1;
            const column = (index % 5) + 1;
            return (
              <div
                key={`${index}-${symbol}`}
                role="gridcell"
                aria-label={`${label}, рядок ${row}, стовпець ${column}`}
                className={`slot-cell symbol-${symbol}${winningCells.has(index) ? " is-winning" : ""}`}
                style={{ animationDelay: `${-(index % 5) * 45}ms` }}
              >
                <Image
                  className="slot-symbol-image"
                  src={src}
                  alt=""
                  width={512}
                  height={512}
                  sizes="(max-width: 620px) 48px, 72px"
                  aria-hidden="true"
                />
                {winningCells.has(index) ? <i className="slot-win-spark" aria-hidden="true" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="slot-paytable" aria-label="Таблиця максимальних множників">
        {paytableSymbols.map((symbol) => {
          const { src, label } = symbolMeta[symbol];
          return (
            <span key={symbol} className={`symbol-${symbol}`}>
              <Image
                className="slot-paytable-icon"
                src={src}
                alt=""
                width={512}
                height={512}
                sizes="18px"
                aria-hidden="true"
              />
              <small>{label}</small>
              <strong>×{slotPayouts[symbol][5]}</strong>
            </span>
          );
        })}
      </div>

      <div className="slot-controls">
        <div className="bet-control cherry-bet-control">
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
        <button type="button" className="button cherry-spin-button" disabled={spinning} onClick={spin}>
          {spinning ? <Sparkles className="spin-icon" size={18} /> : <Coins size={18} />}
          {spinning ? "Обертання…" : "Крутити слоти"}
        </button>
      </div>

      <p className="slot-message" aria-live="polite">{message}</p>
    </section>
  );
}
