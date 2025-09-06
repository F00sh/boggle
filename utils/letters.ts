export const LETTERS = [
  'A','B','C','Č','Ć','D','DŽ','Đ','E','F','G','H','I','J','K','L','LJ','M','N','NJ','O','P','R','S','Š','T','U','V','Z','Ž'
] as const

export type Letter = typeof LETTERS[number]

// Distribucija slova (učestalost) za hrvatsku verziju Boggle igre
export const LETTER_WEIGHTS: Record<Letter, number> = {
  A: 9,
  B: 2,
  C: 3,
  Č: 1,
  Ć: 1,
  D: 4,
  DŽ: 1,
  Đ: 1,
  E: 9,
  F: 1,
  G: 2,
  H: 2,
  I: 8,
  J: 4,
  K: 4,
  L: 4,
  LJ: 1,
  M: 3,
  N: 5,
  NJ: 1,
  O: 8,
  P: 3,
  R: 5,
  S: 5,
  Š: 1,
  T: 5,
  U: 4,
  V: 3,
  Z: 2,
  Ž: 1
}

// 1. Ukupni broj znakova (zbroj težina)
export const TOTAL_WEIGHT = Object.values(LETTER_WEIGHTS).reduce((a, b) => a + b, 0)

// 2. Vjerojatnosti pojave svakog znaka
export const PROBABILITIES: Record<Letter, number> = Object.fromEntries(
  Object.entries(LETTER_WEIGHTS).map(([letter, freq]) => [letter, (freq as number) / TOTAL_WEIGHT])
) as Record<Letter, number>

// Eksplicitni nazivi kako je traženo u primjeru
export const totalLetters = TOTAL_WEIGHT
export const probabilities: Record<Letter, number> = PROBABILITIES

// Generiraj 4x4 ploču uz ponderiranu distribuciju i max 3 pojave po slovu
export function generateBoard(seed?: number): Letter[] {
  const rng = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31))
  const counts = new Map<Letter, number>()
  const board: Letter[] = []
  while (board.length < 16) {
    const pick = pickWeightedFromRecord(LETTER_WEIGHTS, rng)
    const used = counts.get(pick) ?? 0
    if (used < 3) {
      counts.set(pick, used + 1)
      board.push(pick)
    }
  }
  return shuffle(board, rng)
}

function pickWeightedFromRecord(weights: Record<Letter, number>, rng: () => number): Letter {
  let r = rng() * TOTAL_WEIGHT
  for (const letter of LETTERS) {
    const w = weights[letter]
    if ((r -= w) <= 0) return letter
  }
  return LETTERS[LETTERS.length - 1]
}

// 3. Funkcija za odabir slučajnog slova prema distribuciji
export function getRandomLetter(): Letter {
  return pickWeightedFromRecord(LETTER_WEIGHTS, Math.random)
}

// Alternativno: izbor prema već izračunatim vjerojatnostima (kumulativno)
export function getRandomLetterByProbabilities(): Letter {
  const rand = Math.random()
  let cumulative = 0
  for (const [letter, prob] of Object.entries(PROBABILITIES) as [Letter, number][]) {
    cumulative += prob
    if (rand < cumulative) return letter
  }
  return LETTERS[LETTERS.length - 1]
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Small deterministic PRNG
function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
