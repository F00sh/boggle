// Proširi listu hrvatskih riječi množinskim oblicima i spremi u JSON
// - Definiraj početni niz UPPERCASE riječi u konstantu WORDS
// - Heuristički generiraj kandidate za množinu (fem. -A→-E, neut. -O/-E→-A, 
//   masc. suglasnik→-I/-OVI/-EVI, posebna pravila: -AC→-CI, -IK→-ICI)
// - Ako postoji public/croatian_words.json, filtriraj kandidate kroz taj rječnik
// - Spremi izlaz u public/croatian_words_extended.json

import fs from 'node:fs/promises'
import path from 'node:path'

// 1) Početni niz riječi (uredi po potrebi)
const WORDS = [
  'DOM','KUCA','KUĆA','RIBA','MORE','PLAN','STAN','GRAD','VODA','ZORA','ZUB'
]

function isConsonantEnd(word) {
  return /[^AEIOU]$/.test(word.normalize('NFC'))
}

function pluralCandidates(word) {
  const W = word.normalize('NFC')
  const out = new Set()

  // Feminine -A → -E
  if (/A$/.test(W)) out.add(W.replace(/A$/, 'E'))

  // Neuter -O/-E → -A
  if (/O$/.test(W)) out.add(W.replace(/O$/, 'A'))
  if (/E$/.test(W)) out.add(W.replace(/E$/, 'A'))

  // Special patterns
  if (/AC$/.test(W)) out.add(W.replace(/AC$/, 'CI')) // MUŠKARAC → MUŠKARCI
  if (/IK$/.test(W)) out.add(W.replace(/IK$/, 'ICI')) // JEZIK → JEZICI

  // Masculine (consonant ending): add common options
  if (isConsonantEnd(W)) {
    out.add(W + 'I')
    out.add(W + 'OVI')
    out.add(W + 'EVI')
  }

  return Array.from(out)
}

async function loadBigDict() {
  const dictPath = path.join(process.cwd(), 'public', 'croatian_words.json')
  try {
    const data = await fs.readFile(dictPath, 'utf8')
    const arr = JSON.parse(data)
    return new Set(arr)
  } catch {
    return null
  }
}

async function main() {
  const bigDict = await loadBigDict()
  const keep = new Set(WORDS.map(w => w.trim().toUpperCase()).filter(Boolean))

  for (const w of keep) {
    for (const p of pluralCandidates(w)) {
      if (!p || p.length < 3) continue
      if (bigDict) {
        if (bigDict.has(p)) keep.add(p)
      } else {
        keep.add(p)
      }
    }
  }

  const outDir = path.join(process.cwd(), 'public')
  await fs.mkdir(outDir, { recursive: true })
  const outPath = path.join(outDir, 'croatian_words_extended.json')
  const sorted = Array.from(keep).sort((a, b) => a.localeCompare(b))
  await fs.writeFile(outPath, JSON.stringify(sorted))
  console.log(`Zapisano ${sorted.length} riječi u ${path.relative(process.cwd(), outPath)}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
