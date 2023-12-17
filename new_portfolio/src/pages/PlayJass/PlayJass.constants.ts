export const MAX_POINTS = 152;
export const LAST_HIT_POINTS = 10;
export const NO_GAMES = 16;

export const JASS_LOCAL_STORAGE_KEYS = {
  CURRENT: "jass:current",
  HISTORY: "jass:history",
};

export const RootRoem = {
  THREE_IN_ROW: {
    trans: "Drie op eenvolgend",
    value: 20,
    happensOnce: false,
  },
  FOUR_IN_ROW: {
    trans: "Vier op eenvolgend",
    value: 50,
    happensOnce: false,
  },
  FOUR_THE_SAME: {
    trans: "Vier dezelfde kaarten",
    value: 100,
    happensOnce: false,
  },
  KING_QUEEN: {
    trans: "De koning + koningin",
    value: 20,
    happensOnce: true,
  },
  ALL_HITS: {
    trans: "Alle slagen behaald",
    value: 100,
    happensOnce: true,
  },
} as const;

export const AUDIO_SOURCES = [
  "https://dl.sndup.net/tpnd/output.mp3",
  "https://dl.sndup.net/hwg7/flip-shorter.mp3",
  "https://dl.sndup.net/ktqm/tweemotten.mp3",
];
