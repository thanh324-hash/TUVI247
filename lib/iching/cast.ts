import { getHexagramByLines } from "./data";
import type { Cast, Line, LineValue } from "./types";

const VALID_VALUES = new Set<number>([6, 7, 8, 9]);

/**
 * Cast a hexagram from six line values, bottom-up.
 *
 * Each value is what three coins produce for one line: `6` old yin, `7` young
 * yang, `8` young yin, `9` old yang. Validity is checked, so a typo in a
 * scraped dataset fails loudly instead of silently producing a wrong hexagram.
 */
export function cast(values: readonly number[]): Cast {
  if (!Array.isArray(values) || values.length !== 6) {
    throw new RangeError("values must be an array of 6 line values");
  }

  const resolved: LineValue[] = values.map((value, index) => {
    if (!Number.isInteger(value) || !VALID_VALUES.has(value)) {
      throw new RangeError(`values[${index}] must be 6, 7, 8 or 9 (received ${String(value)})`);
    }
    return value as LineValue;
  });

  // Even values (6, 8) are yin; odd values (7, 9) are yang.
  const primaryLines = resolved.map((value) => (value % 2 === 0 ? 0 : 1) as Line);
  const moving = resolved.reduce<number[]>((indices, value, index) => {
    if (value === 6 || value === 9) indices.push(index);
    return indices;
  }, []);
  const changedLines = primaryLines.map((line, index) =>
    moving.includes(index) ? ((line === 1 ? 0 : 1) as Line) : line,
  );

  return {
    values: resolved,
    primaryLines,
    changedLines,
    moving,
    primary: getHexagramByLines(primaryLines),
    changed: getHexagramByLines(changedLines),
  };
}

/**
 * Cast by tossing three coins six times.
 *
 * Each coin is worth 2 (a "back") or 3 (a "face"), so one line is the sum of
 * three coins: 6, 7, 8 or 9 with probabilities 1/8, 3/8, 3/8, 1/8.
 *
 * Pass your own `random` for a reproducible cast (it must return [0, 1)).
 */
export function castCoins(random: () => number = Math.random): Cast {
  const coin = () => (random() < 0.5 ? 2 : 3);
  const values = Array.from({ length: 6 }, () => coin() + coin() + coin());
  return cast(values);
}
