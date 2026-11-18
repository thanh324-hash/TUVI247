import { HEXAGRAMS, TRIGRAMS } from "./data/classic";
import type { Hexagram, Line, Trigram } from "./types";

export { HEXAGRAMS, TRIGRAMS };

const hexagramById = new Map<number, Hexagram>(HEXAGRAMS.map((h) => [h.id, h]));
const hexagramByBinary = new Map<string, Hexagram>(HEXAGRAMS.map((h) => [h.binary, h]));
const trigramByLinesKey = new Map<string, Trigram>(TRIGRAMS.map((t) => [t.lines.join(""), t]));
const trigramByXiantian = new Map<number, Trigram>(TRIGRAMS.map((t) => [t.xiantian, t]));

function checkLines(lines: readonly Line[], expected: number, what: string): string {
  if (!Array.isArray(lines) || lines.length !== expected) {
    throw new RangeError(`${what} must be an array of ${expected} lines`);
  }
  for (const [i, line] of lines.entries()) {
    if (line !== 0 && line !== 1) {
      throw new RangeError(`${what}[${i}] must be 0 or 1 (received ${String(line)})`);
    }
  }
  return lines.join("");
}

/** Look up a hexagram by King Wen number (1–64). */
export function getHexagram(id: number): Hexagram {
  const hexagram = hexagramById.get(id);
  if (!hexagram) throw new RangeError(`unknown hexagram id: ${id} (expected 1–64)`);
  return hexagram;
}

/** Look up a hexagram from six lines, bottom-up. */
export function getHexagramByLines(lines: readonly Line[]): Hexagram {
  const key = checkLines(lines, 6, "lines");
  const hexagram = hexagramByBinary.get(key);
  if (!hexagram) throw new RangeError(`no hexagram for lines ${key}`);
  return hexagram;
}

/** Look up a trigram from three lines, bottom-up. */
export function getTrigramByLines(lines: readonly Line[]): Trigram {
  const key = checkLines(lines, 3, "lines");
  const trigram = trigramByLinesKey.get(key);
  if (!trigram) throw new RangeError(`no trigram for lines ${key}`);
  return trigram;
}

/** Look up a trigram by 先天 number (1–8). */
export function getTrigram(xiantian: number): Trigram {
  const trigram = trigramByXiantian.get(xiantian);
  if (!trigram) throw new RangeError(`unknown trigram number: ${xiantian} (expected 1–8)`);
  return trigram;
}
