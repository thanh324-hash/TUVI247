import type { Cast, Hexagram, Reading, ReadingSource, ReadingText } from "./types";

function judgment(hexagram: Hexagram, source: ReadingSource): ReadingText {
  return { source, type: "guaCi", text: hexagram.guaCi };
}

function lineText(hexagram: Hexagram, source: ReadingSource, line: number): ReadingText {
  const text = hexagram.yaoCi[line - 1];
  if (text === undefined) {
    throw new RangeError(`hexagram ${hexagram.id} has no line ${line}`);
  }
  return { source, type: "yaoCi", line, text };
}

function unchangedLines(moving: readonly number[]): number[] {
  return [0, 1, 2, 3, 4, 5].filter((index) => !moving.includes(index));
}

/**
 * Decide which classical texts to read, following Zhu Xi's rules.
 *
 * | moving lines | what to read                                                  |
 * | ------------ | ------------------------------------------------------------- |
 * | 0            | the primary hexagram's judgment                               |
 * | 1            | that one line of the primary hexagram                         |
 * | 2            | both lines of the primary hexagram, the upper one leading      |
 * | 3            | both judgments, weighted toward the primary                    |
 * | 4            | the two unchanged lines of the changed hexagram                |
 * | 5            | the single unchanged line of the changed hexagram              |
 * | 6            | 用九 for Qian, 用六 for Kun, otherwise the changed judgment     |
 */
export function read(cast: Cast): Reading {
  const moving = [...cast.moving].sort((a, b) => a - b);
  const count = moving.length;

  if (count === 0) {
    return {
      movingCount: 0,
      source: "primary",
      lineNumbers: [],
      guide: "Read the primary hexagram's judgment.",
      texts: [judgment(cast.primary, "primary")],
    };
  }

  if (count === 1) {
    const line = moving[0] + 1;
    return {
      movingCount: 1,
      source: "primary",
      lineNumbers: [line],
      guide: `Read the primary hexagram's line ${line} text.`,
      texts: [lineText(cast.primary, "primary", line)],
    };
  }

  if (count === 2) {
    const primary = moving[1] + 1;
    const secondary = moving[0] + 1;
    return {
      movingCount: 2,
      source: "primary",
      lineNumbers: [primary, secondary],
      guide: `Read the primary hexagram's line ${primary} (primary) and line ${secondary} (secondary) texts.`,
      texts: [
        lineText(cast.primary, "primary", primary),
        lineText(cast.primary, "primary", secondary),
      ],
    };
  }

  if (count === 3) {
    return {
      movingCount: 3,
      source: "both",
      lineNumbers: [],
      primaryWeight: 0.7,
      guide: "Read both the primary and changed hexagrams' judgments, weighted toward the primary.",
      texts: [judgment(cast.primary, "primary"), judgment(cast.changed, "changed")],
    };
  }

  if (count === 4) {
    const still = unchangedLines(moving);
    const primary = still[0] + 1;
    const secondary = still[1] + 1;
    return {
      movingCount: 4,
      source: "changed",
      lineNumbers: [primary, secondary],
      guide: `Read the changed hexagram's line ${primary} (primary) and line ${secondary} (secondary) texts.`,
      texts: [
        lineText(cast.changed, "changed", primary),
        lineText(cast.changed, "changed", secondary),
      ],
    };
  }

  if (count === 5) {
    const line = unchangedLines(moving)[0] + 1;
    return {
      movingCount: 5,
      source: "changed",
      lineNumbers: [line],
      guide: `Read the changed hexagram's line ${line} text.`,
      texts: [lineText(cast.changed, "changed", line)],
    };
  }

  // All six lines move.
  if (cast.primary.id === 1 && cast.primary.yong) {
    return {
      movingCount: 6,
      source: "primary",
      lineNumbers: [],
      special: "yong9",
      guide: "For Qian, read the 'Using Nine' text (all lines change).",
      texts: [{ source: "primary", type: "yong", text: cast.primary.yong }],
    };
  }
  if (cast.primary.id === 2 && cast.primary.yong) {
    return {
      movingCount: 6,
      source: "primary",
      lineNumbers: [],
      special: "yong6",
      guide: "For Kun, read the 'Using Six' text (all lines change).",
      texts: [{ source: "primary", type: "yong", text: cast.primary.yong }],
    };
  }
  return {
    movingCount: 6,
    source: "changed",
    lineNumbers: [],
    guide: "Read the changed hexagram's judgment.",
    texts: [judgment(cast.changed, "changed")],
  };
}
