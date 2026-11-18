import { getHexagramByLines } from "./data";
import type { Hexagram, Line, Relations } from "./types";

/**
 * The three structural relatives of a hexagram.
 *
 * - 互卦 (nuclear): lines 2-3-4 form the lower trigram, lines 3-4-5 the upper.
 * - 错卦 (opposite): every line inverted.
 * - 综卦 (inverse): the whole hexagram turned upside down.
 */
export function relations(hexagram: Hexagram): Relations {
  const lines = hexagram.lines;
  const nuclearLines: Line[] = [lines[1], lines[2], lines[3], lines[2], lines[3], lines[4]];
  const oppositeLines: Line[] = lines.map((line) => (line === 1 ? 0 : 1));
  const inverseLines: Line[] = [...lines].reverse();

  return {
    nuclear: getHexagramByLines(nuclearLines),
    opposite: getHexagramByLines(oppositeLines),
    inverse: getHexagramByLines(inverseLines),
  };
}
