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
import { useI18n, type LocalizedText } from "@/components/i18n-provider";
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
  cherry: { label: { en: "Cherries", cs: "Třešně" }, src: "/games/cherry-symbols/cherry.png" },
  clover: { label: { en: "Clover", cs: "Čtyřlístek" }, src: "/games/cherry-symbols/clover.png" },
  bell: { label: { en: "Bell", cs: "Zvon" }, src: "/games/cherry-symbols/bell.png" },
  crown: { label: { en: "Crown", cs: "Koruna" }, src: "/games/cherry-symbols/crown.png" },
  diamond: { label: { en: "Diamond", cs: "Diamant" }, src: "/games/cherry-symbols/diamond.png" },
  seven: { label: { en: "Seven", cs: "Sedmička" }, src: "/games/cherry-symbols/seven.png" },
} satisfies Record<SlotSymbolKey, { label: LocalizedText; src: string }>;

const copy = {
  en: { initial: "Match 3 or more identical symbols from left to right.", insufficient: "Not enough coins. Lower your bet or collect the daily reward.", spinningMessage: "The Cherry Club reels are spinning…", error: "The slots could not start. Please try again.", win: (amount: string, lines: number, multiplier: number) => `You won ${amount} coins — ${lines} winning ${lines === 1 ? "line" : "lines"}, total multiplier ×${multiplier}.`, lose: "No lines matched this time. The next spin could be a winner.", lines: "10 lines", upTo: "up to ×25", balance: "Balance", lastWin: "Last win", grid: "Cherry Club game grid, 5 rows by 5 columns", cell: (label: string, row: number, column: number) => `${label}, row ${row}, column ${column}`, paytable: "Maximum multiplier table", decrease: "Decrease bet", increase: "Increase bet", bet: "Bet", spinning: "Spinning…", spin: "Spin slots" },
  cs: { initial: "Spoj 3 nebo více stejných symbolů zleva doprava.", insufficient: "Nemáš dost mincí. Sniž sázku nebo si vyzvedni denní odměnu.", spinningMessage: "Válce Cherry Club se roztáčejí…", error: "Automaty se nepodařilo spustit. Zkus to znovu.", win: (amount: string, lines: number, multiplier: number) => `Výhra ${amount} mincí — ${lines} výherní ${lines === 1 ? "linie" : "linie"}, celkový násobitel ×${multiplier}.`, lose: "Tentokrát se linie nespojily. Příští roztočení může vyhrát.", lines: "10 linií", upTo: "až ×25", balance: "Zůstatek", lastWin: "Poslední výhra", grid: "Herní pole Cherry Club, 5 řádků a 5 sloupců", cell: (label: string, row: number, column: number) => `${label}, řádek ${row}, sloupec ${column}`, paytable: "Tabulka maximálních násobitelů", decrease: "Snížit sázku", increase: "Zvýšit sázku", bet: "Sázka", spinning: "Roztáčí se…", spin: "Roztočit automaty" },
} as const;

const paytableSymbols: SlotSymbolKey[] = ["cherry", "bell", "crown", "diamond", "seven"];

function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function CherryClubSlots() {
  const { locale, numberLocale } = useI18n();
  const t = copy[locale];
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [grid, setGrid] = useState<SlotSymbolKey[]>(initialSlotGrid);
  const [betIndex, setBetIndex] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);
  const [message, setMessage] = useState<string | null>(null);
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
      setMessage(t.insufficient);
      return;
    }

    setSpinning(true);
    setLastWin(null);
    setWinningLines([]);
    setMessage(t.spinningMessage);

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
        setMessage(error?.message ?? t.error);
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
      setMessage(t.win(result.win.toLocaleString(numberLocale), result.winning_lines.length, result.multiplier));
    } else {
      setMessage(t.lose);
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
          <small>{t.lines}</small>
          <small>{t.upTo}</small>
        </div>
      </header>

      <div className="slot-metrics">
        <div className="slot-metric">
          <span>{t.balance}</span>
          <strong>{profile.balance.toLocaleString(numberLocale)} 🪙</strong>
        </div>
        <div className="slot-metric">
          <span>{t.lastWin}</span>
          <strong>{lastWin === null ? "—" : `+${lastWin.toLocaleString(numberLocale)}`}</strong>
        </div>
      </div>

      <div className="slot-machine-frame">
        <div className="slot-machine-crown" aria-hidden="true">
          <span><Cherry size={17} /> Cherry jackpot <Sparkles size={15} /></span>
        </div>

        <div className="slot-grid" role="grid" aria-label={t.grid}>
          {grid.map((symbol, index) => {
            const { src, label: labels } = symbolMeta[symbol];
            const label = labels[locale];
            const row = Math.floor(index / 5) + 1;
            const column = (index % 5) + 1;
            return (
              <div
                key={`${index}-${symbol}`}
                role="gridcell"
                aria-label={t.cell(label, row, column)}
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

      <div className="slot-paytable" aria-label={t.paytable}>
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
              <small>{label[locale]}</small>
              <strong>×{slotPayouts[symbol][5]}</strong>
            </span>
          );
        })}
      </div>

      <div className="slot-controls">
        <div className="bet-control cherry-bet-control">
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
        <button type="button" className="button cherry-spin-button" disabled={spinning} onClick={spin}>
          {spinning ? <Sparkles className="spin-icon" size={18} /> : <Coins size={18} />}
          {spinning ? t.spinning : t.spin}
        </button>
      </div>

      <p className="slot-message" aria-live="polite">{message ?? t.initial}</p>
    </section>
  );
}
