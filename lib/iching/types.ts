/** One line of a hexagram: `0` = yin (broken), `1` = yang (solid). */
export type Line = 0 | 1;

/**
 * The value of one line produced by the three-coin method.
 *
 * - `6` old yin — yin that changes into yang
 * - `7` young yang — stable
 * - `8` young yin — stable
 * - `9` old yang — yang that changes into yin
 */
export type LineValue = 6 | 7 | 8 | 9;

export interface Trigram {
  /** 先天 (Fu Xi) number, 1–8. */
  xiantian: number;
  /** Romanisation, e.g. `Qian`. */
  pinyin: string;
  /** Chinese name, e.g. `乾`. */
  name: string;
  /** The image it stands for, e.g. `天`. */
  nature: string;
  /** English word for `nature`, e.g. `Heaven`. */
  english: string;
  /** Unicode trigram symbol, e.g. `☰`. */
  symbol: string;
  /** Three lines, bottom-up. */
  lines: Line[];
}

export interface Hexagram {
  /** King Wen order, 1–64. */
  id: number;
  /** Romanisation of the hexagram name, e.g. `Qian`. */
  pinyin: string;
  /** Chinese name, e.g. `乾为天`. */
  name: string;
  /** A short, generic English keyword, e.g. `Creative`. */
  keyword: string;
  /** Upper trigram 先天 number. */
  upper: number;
  /** Lower trigram 先天 number. */
  lower: number;
  /** Six lines, bottom-up (line 1 first). */
  lines: Line[];
  /** The same six lines as a string of `0`/`1`, bottom-up. */
  binary: string;
  /** 卦辞 — the judgment. */
  guaCi: string;
  /** 爻辞 — the six line texts, bottom-up. */
  yaoCi: string[];
  /** 用九 / 用六, present only on hexagram 1 and 2. */
  yong?: string;
}

/** The result of casting six lines. */
export interface Cast {
  /** The six coin values, bottom-up. */
  values: LineValue[];
  /** The primary hexagram's lines, bottom-up. */
  primaryLines: Line[];
  /** The changed hexagram's lines, bottom-up. */
  changedLines: Line[];
  /** Indices (0-based, bottom-up) of the moving lines. Empty when nothing moves. */
  moving: number[];
  primary: Hexagram;
  changed: Hexagram;
}

export type ReadingSource = "primary" | "changed" | "both";

export interface ReadingText {
  /** Which hexagram the text comes from. */
  source: ReadingSource;
  type: "guaCi" | "yaoCi" | "yong";
  /** 1-based line number; present only for `yaoCi`. */
  line?: number;
  text: string;
}

/**
 * Which texts to read, following Zhu Xi's rules (变爻 count → what to read).
 */
export interface Reading {
  /** How many lines are moving, 0–6. */
  movingCount: number;
  source: ReadingSource;
  /** 1-based line numbers to read, highest first when there are two. */
  lineNumbers: number[];
  /** Weight to give the primary hexagram when both judgments are read. */
  primaryWeight?: number;
  /** Set only in the all-moving Qian / Kun case. */
  special?: "yong9" | "yong6";
  /** A one-sentence instruction for a human or a model. */
  guide: string;
  /** The classical texts themselves, in reading order. */
  texts: ReadingText[];
}

/** The hexagrams structurally related to a given one. */
export interface Relations {
  /** 互卦 — the nuclear hexagram, built from lines 2-3-4 and 3-4-5. */
  nuclear: Hexagram;
  /** 错卦 — every line inverted. */
  opposite: Hexagram;
  /** 综卦 — the hexagram turned upside down. */
  inverse: Hexagram;
}
