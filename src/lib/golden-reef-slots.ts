export const reefSymbolKeys = [
  "pearl",
  "starfish",
  "seahorse",
  "chest",
  "aquamarine",
  "trident",
] as const;

export type ReefSymbolKey = (typeof reefSymbolKeys)[number];

export type ReefWinningLine = {
  line_index: number;
  symbol: ReefSymbolKey;
  count: number;
  multiplier: number;
  cells: number[];
};

export type ReefSpinPayload = {
  grid: ReefSymbolKey[];
  multiplier: number;
  win: number;
  balance: number;
  winning_lines: ReefWinningLine[];
};

export const reefPaylines = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [0, 6, 12, 8, 4],
  [10, 6, 2, 8, 14],
  [0, 1, 7, 13, 14],
  [10, 11, 7, 3, 4],
  [5, 6, 2, 8, 9],
] as const;

export const reefPayouts: Record<ReefSymbolKey, Record<number, number>> = {
  pearl: { 3: 1, 4: 2, 5: 4 },
  starfish: { 3: 1, 4: 3, 5: 5 },
  seahorse: { 3: 2, 4: 4, 5: 8 },
  chest: { 3: 2, 4: 5, 5: 10 },
  aquamarine: { 3: 3, 4: 8, 5: 15 },
  trident: { 3: 5, 4: 12, 5: 25 },
};

export const initialReefGrid: ReefSymbolKey[] = [
  "pearl", "starfish", "aquamarine", "seahorse", "trident",
  "chest", "pearl", "seahorse", "aquamarine", "starfish",
  "trident", "seahorse", "pearl", "chest", "starfish",
];

const symbolThresholds: Array<{ symbol: ReefSymbolKey; threshold: number }> = [
  { symbol: "pearl", threshold: 30 },
  { symbol: "starfish", threshold: 54 },
  { symbol: "seahorse", threshold: 72 },
  { symbol: "chest", threshold: 85 },
  { symbol: "aquamarine", threshold: 95 },
  { symbol: "trident", threshold: 100 },
];

function randomReefSymbol(): ReefSymbolKey {
  const roll = Math.random() * 100;
  return symbolThresholds.find(({ threshold }) => roll < threshold)?.symbol ?? "trident";
}

export function createRandomReefGrid(): ReefSymbolKey[] {
  return Array.from({ length: 15 }, randomReefSymbol);
}

export function evaluateReefGrid(grid: ReefSymbolKey[]) {
  const winningLines: ReefWinningLine[] = [];

  reefPaylines.forEach((line, lineIndex) => {
    const symbol = grid[line[0]];
    let count = 1;
    while (count < line.length && grid[line[count]] === symbol) count += 1;

    const multiplier = reefPayouts[symbol][count] ?? 0;
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

export function createGuestReefSpin(bet: number, balance: number): ReefSpinPayload {
  const grid = createRandomReefGrid();
  const result = evaluateReefGrid(grid);
  const win = bet * result.multiplier;
  return { grid, multiplier: result.multiplier, win, balance: balance - bet + win, winning_lines: result.winning_lines };
}

function isReefSymbol(value: unknown): value is ReefSymbolKey {
  return typeof value === "string" && reefSymbolKeys.includes(value as ReefSymbolKey);
}

function isWinningLine(value: unknown): value is ReefWinningLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return typeof line.line_index === "number" && isReefSymbol(line.symbol) &&
    typeof line.count === "number" && typeof line.multiplier === "number" &&
    Array.isArray(line.cells) && line.cells.every((cell) => typeof cell === "number" && cell >= 0 && cell < 15);
}

export function isReefSpinPayload(value: unknown): value is ReefSpinPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return Array.isArray(payload.grid) && payload.grid.length === 15 && payload.grid.every(isReefSymbol) &&
    typeof payload.multiplier === "number" && typeof payload.win === "number" &&
    typeof payload.balance === "number" && payload.balance >= 0 &&
    Array.isArray(payload.winning_lines) && payload.winning_lines.every(isWinningLine);
}
