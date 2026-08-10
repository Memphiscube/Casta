export const slotSymbolKeys = [
  "cherry",
  "clover",
  "bell",
  "crown",
  "diamond",
  "seven",
] as const;

export type SlotSymbolKey = (typeof slotSymbolKeys)[number];

export type WinningLine = {
  line_index: number;
  symbol: SlotSymbolKey;
  count: number;
  multiplier: number;
  cells: number[];
};

export type SlotSpinPayload = {
  grid: SlotSymbolKey[];
  multiplier: number;
  win: number;
  balance: number;
  winning_lines: WinningLine[];
};

export const slotPaylines = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 6, 12, 18, 24],
  [20, 16, 12, 8, 4],
  [0, 6, 12, 8, 4],
  [20, 16, 12, 18, 24],
  [5, 11, 17, 13, 9],
] as const;

export const slotPayouts: Record<SlotSymbolKey, Record<number, number>> = {
  cherry: { 3: 1, 4: 2, 5: 4 },
  clover: { 3: 1, 4: 3, 5: 5 },
  bell: { 3: 2, 4: 4, 5: 8 },
  crown: { 3: 2, 4: 5, 5: 10 },
  diamond: { 3: 3, 4: 8, 5: 15 },
  seven: { 3: 5, 4: 12, 5: 25 },
};

export const initialSlotGrid: SlotSymbolKey[] = [
  "cherry", "bell", "diamond", "clover", "seven",
  "crown", "cherry", "clover", "diamond", "bell",
  "seven", "clover", "cherry", "bell", "crown",
  "diamond", "bell", "crown", "cherry", "clover",
  "clover", "seven", "bell", "crown", "cherry",
];

const symbolThresholds: Array<{ symbol: SlotSymbolKey; threshold: number }> = [
  { symbol: "cherry", threshold: 30 },
  { symbol: "clover", threshold: 54 },
  { symbol: "bell", threshold: 72 },
  { symbol: "crown", threshold: 85 },
  { symbol: "diamond", threshold: 95 },
  { symbol: "seven", threshold: 100 },
];

function randomSymbol(): SlotSymbolKey {
  const roll = Math.random() * 100;
  return symbolThresholds.find(({ threshold }) => roll < threshold)?.symbol ?? "seven";
}

export function createRandomSlotGrid(): SlotSymbolKey[] {
  return Array.from({ length: 25 }, randomSymbol);
}

export function evaluateSlotGrid(grid: SlotSymbolKey[]): {
  multiplier: number;
  winning_lines: WinningLine[];
} {
  const winningLines: WinningLine[] = [];

  slotPaylines.forEach((line, lineIndex) => {
    const symbol = grid[line[0]];
    let count = 1;

    while (count < line.length && grid[line[count]] === symbol) count += 1;

    const multiplier = slotPayouts[symbol][count] ?? 0;
    if (multiplier > 0) {
      winningLines.push({
        line_index: lineIndex,
        symbol,
        count,
        multiplier,
        cells: line.slice(0, count),
      });
    }
  });

  return {
    multiplier: winningLines.reduce((total, line) => total + line.multiplier, 0),
    winning_lines: winningLines,
  };
}

export function createGuestSlotSpin(bet: number, balance: number): SlotSpinPayload {
  const grid = createRandomSlotGrid();
  const result = evaluateSlotGrid(grid);
  const win = bet * result.multiplier;

  return {
    grid,
    multiplier: result.multiplier,
    win,
    balance: balance - bet + win,
    winning_lines: result.winning_lines,
  };
}

function isSlotSymbol(value: unknown): value is SlotSymbolKey {
  return typeof value === "string" && slotSymbolKeys.includes(value as SlotSymbolKey);
}

function isWinningLine(value: unknown): value is WinningLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;

  return (
    typeof line.line_index === "number" &&
    isSlotSymbol(line.symbol) &&
    typeof line.count === "number" &&
    typeof line.multiplier === "number" &&
    Array.isArray(line.cells) &&
    line.cells.every((cell) => typeof cell === "number" && cell >= 0 && cell < 25)
  );
}

export function isSlotSpinPayload(value: unknown): value is SlotSpinPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;

  return (
    Array.isArray(payload.grid) &&
    payload.grid.length === 25 &&
    payload.grid.every(isSlotSymbol) &&
    typeof payload.multiplier === "number" &&
    typeof payload.win === "number" &&
    typeof payload.balance === "number" &&
    payload.balance >= 0 &&
    Array.isArray(payload.winning_lines) &&
    payload.winning_lines.every(isWinningLine)
  );
}
