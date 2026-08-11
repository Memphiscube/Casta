"use client";

import { Coins, Minus, Plus, Sparkles, Waves } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { useAuth } from "@/components/auth-provider";
import { useI18n, type LocalizedText } from "@/components/i18n-provider";
import {
  createGuestReefSpin,
  createRandomReefGrid,
  initialReefGrid,
  isReefSpinPayload,
  reefPayouts,
  type ReefSpinPayload,
  type ReefSymbolKey,
  type ReefWinningLine,
} from "@/lib/golden-reef-slots";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const bets = [50, 100, 250, 500];

const symbolMeta = {
  pearl: { label: { en: "Golden pearl", cs: "Zlatá perla" }, x: 0, y: 0 },
  starfish: { label: { en: "Starfish", cs: "Mořská hvězdice" }, x: 1, y: 0 },
  seahorse: { label: { en: "Seahorse", cs: "Mořský koník" }, x: 2, y: 0 },
  chest: { label: { en: "Reef treasure", cs: "Poklad útesu" }, x: 0, y: 1 },
  aquamarine: { label: { en: "Aquamarine", cs: "Akvamarín" }, x: 1, y: 1 },
  trident: { label: { en: "Royal trident", cs: "Královský trojzubec" }, x: 2, y: 1 },
} satisfies Record<ReefSymbolKey, { label: LocalizedText; x: number; y: number }>;

const paytableSymbols: ReefSymbolKey[] = ["pearl", "seahorse", "chest", "aquamarine", "trident"];

const copy = {
  en: {
    initial: "Match 3 or more sea treasures from left to right.", insufficient: "Not enough coins. Lower your bet or collect the daily reward.",
    spinningMessage: "The reef currents are turning the reels…", error: "Golden Reef could not start. Please try again.",
    win: (amount: string, lines: number, multiplier: number) => `The reef awarded ${amount} coins — ${lines} winning ${lines === 1 ? "line" : "lines"}, total multiplier ×${multiplier}.`,
    lose: "The tide brought no treasure this time. Dive again!", lines: "8 lines", upTo: "up to ×25", balance: "Balance", lastWin: "Last win",
    grid: "Golden Reef game grid, 3 rows by 5 columns", cell: (label: string, row: number, column: number) => `${label}, row ${row}, column ${column}`,
    paytable: "Golden Reef maximum multiplier table", decrease: "Decrease bet", increase: "Increase bet", bet: "Bet", spinning: "Diving…", spin: "Dive & spin", presents: "CASTA beneath the waves", jackpot: "Treasures of the deep",
  },
  cs: {
    initial: "Spoj 3 nebo více mořských pokladů zleva doprava.", insufficient: "Nemáš dost mincí. Sniž sázku nebo si vyzvedni denní odměnu.",
    spinningMessage: "Proudy útesu roztáčejí válce…", error: "Golden Reef se nepodařilo spustit. Zkus to znovu.",
    win: (amount: string, lines: number, multiplier: number) => `Útes přinesl ${amount} mincí — ${lines} výherní ${lines === 1 ? "linie" : "linie"}, celkový násobitel ×${multiplier}.`,
    lose: "Tentokrát příliv žádný poklad nepřinesl. Ponoř se znovu!", lines: "8 linií", upTo: "až ×25", balance: "Zůstatek", lastWin: "Poslední výhra",
    grid: "Herní pole Golden Reef, 3 řádky a 5 sloupců", cell: (label: string, row: number, column: number) => `${label}, řádek ${row}, sloupec ${column}`,
    paytable: "Tabulka maximálních násobitelů Golden Reef", decrease: "Snížit sázku", increase: "Zvýšit sázku", bet: "Sázka", spinning: "Potápíme se…", spin: "Ponořit a roztočit", presents: "CASTA pod hladinou", jackpot: "Poklady hlubin",
  },
} as const;

function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function symbolStyle(symbol: ReefSymbolKey): CSSProperties {
  const { x, y } = symbolMeta[symbol];
  return { "--reef-x": `${x * 50}%`, "--reef-y": `${y * 100}%` } as CSSProperties;
}

export function GoldenReefSlots() {
  const { locale, numberLocale } = useI18n();
  const t = copy[locale];
  const { user, profile, setGuestBalance, refreshProfile } = useAuth();
  const [grid, setGrid] = useState<ReefSymbolKey[]>(initialReefGrid);
  const [betIndex, setBetIndex] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [winningLines, setWinningLines] = useState<ReefWinningLine[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const shuffleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bet = bets[betIndex];
  const winningCells = useMemo(() => new Set(winningLines.flatMap((line) => line.cells)), [winningLines]);

  useEffect(() => () => {
    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
  }, []);

  async function spin() {
    if (spinning) return;
    if (profile.balance < bet) { setMessage(t.insufficient); return; }

    setSpinning(true);
    setLastWin(null);
    setWinningLines([]);
    setMessage(t.spinningMessage);
    const startedAt = Date.now();
    shuffleTimer.current = setInterval(() => setGrid(createRandomReefGrid()), 90);

    let result: ReefSpinPayload;
    const supabase = getSupabaseBrowserClient();
    if (user && supabase) {
      const { data, error } = await supabase.rpc("spin_golden_reef", { p_bet: bet });
      if (error || !isReefSpinPayload(data)) {
        if (shuffleTimer.current) clearInterval(shuffleTimer.current);
        shuffleTimer.current = null;
        setSpinning(false);
        setGrid(initialReefGrid);
        setMessage(error?.message ?? t.error);
        return;
      }
      result = data;
    } else {
      result = createGuestReefSpin(bet, profile.balance);
    }

    await delay(Math.max(0, 1650 - (Date.now() - startedAt)));
    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
    shuffleTimer.current = null;
    setGrid(result.grid);
    setWinningLines(result.winning_lines);
    setLastWin(result.win);
    if (user) await refreshProfile(); else setGuestBalance(result.balance);
    setMessage(result.win > 0
      ? t.win(result.win.toLocaleString(numberLocale), result.winning_lines.length, result.multiplier)
      : t.lose);
    setSpinning(false);
  }

  return (
    <section className={`golden-reef-stage${spinning ? " is-spinning" : ""}${winningLines.length ? " has-win" : ""}`} aria-busy={spinning}>
      <Image className="reef-stage-art" src="/games/golden-reef.png" alt="" fill sizes="(max-width: 860px) 100vw, 820px" priority aria-hidden="true" />
      <div className="reef-bubbles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>

      <header className="cherry-stage-title reef-stage-title">
        <span>{t.presents}</span>
        <strong>Golden Reef</strong>
        <div className="slot-feature-pills"><small>5 × 3</small><small>{t.lines}</small><small>{t.upTo}</small></div>
      </header>

      <div className="slot-metrics reef-metrics">
        <div className="slot-metric"><span>{t.balance}</span><strong>{profile.balance.toLocaleString(numberLocale)} 🪙</strong></div>
        <div className="slot-metric"><span>{t.lastWin}</span><strong>{lastWin === null ? "—" : `+${lastWin.toLocaleString(numberLocale)}`}</strong></div>
      </div>

      <div className="slot-machine-frame reef-machine-frame">
        <div className="slot-machine-crown reef-machine-crown" aria-hidden="true"><span><Waves size={17} /> {t.jackpot} <Sparkles size={15} /></span></div>
        <div className="slot-grid reef-slot-grid" role="grid" aria-label={t.grid}>
          {grid.map((symbol, index) => {
            const label = symbolMeta[symbol].label[locale];
            const row = Math.floor(index / 5) + 1;
            const column = (index % 5) + 1;
            return (
              <div key={`${index}-${symbol}`} role="gridcell" aria-label={t.cell(label, row, column)} className={`slot-cell reef-slot-cell reef-${symbol}${winningCells.has(index) ? " is-winning" : ""}`} style={{ animationDelay: `${-(index % 5) * 45}ms` }}>
                <span className="reef-symbol" style={symbolStyle(symbol)} aria-hidden="true" />
                {winningCells.has(index) ? <i className="slot-win-spark" aria-hidden="true" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="slot-paytable reef-paytable" aria-label={t.paytable}>
        {paytableSymbols.map((symbol) => (
          <span key={symbol}>
            <i className="reef-paytable-symbol reef-symbol" style={symbolStyle(symbol)} aria-hidden="true" />
            <small>{symbolMeta[symbol].label[locale]}</small>
            <strong>×{reefPayouts[symbol][5]}</strong>
          </span>
        ))}
      </div>

      <div className="slot-controls">
        <div className="bet-control cherry-bet-control reef-bet-control">
          <button type="button" aria-label={t.decrease} disabled={spinning} onClick={() => setBetIndex((value) => Math.max(0, value - 1))}><Minus size={17} /></button>
          <span>{t.bet}<strong>{bet.toLocaleString(numberLocale)} 🪙</strong></span>
          <button type="button" aria-label={t.increase} disabled={spinning} onClick={() => setBetIndex((value) => Math.min(bets.length - 1, value + 1))}><Plus size={17} /></button>
        </div>
        <button type="button" className="button cherry-spin-button reef-spin-button" disabled={spinning} onClick={spin}>
          {spinning ? <Sparkles className="spin-icon" size={18} /> : <Coins size={18} />}{spinning ? t.spinning : t.spin}
        </button>
      </div>
      <p className="slot-message reef-message" aria-live="polite">{message ?? t.initial}</p>
    </section>
  );
}
