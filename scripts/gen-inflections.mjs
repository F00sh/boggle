// Heuristička deklinacija i fonološke promjene (palatalizacija, sibilarizacija, jotacija)
// Generira oblike iz base rječnika i filtrira ih kroz veliki JSON kako bi zadržao realne riječi
// Izlaz: public/croatian_words_inflections.json

import fs from 'node:fs/promises'
import path from 'node:path'

function toUpper(s) { return (s || '').normalize('NFC').toUpperCase() }

async function loadSet(relPath) {
  try {
    const p = path.join(process.cwd(), relPath)
    const txt = await fs.readFile(p, 'utf8')
    const arr = JSON.parse(txt)
    return new Set(arr.map(toUpper))
  } catch { return null }
}

function endsWithVowel(w) { return /[AEIOU]$/.test(w) }
function isConsonantEnd(w) { return !endsWithVowel(w) }

// Palatalizacija za završne suglasnike pred prednjim vokalima/j
const PAL_MAP = new Map([
  ['K','Č'], ['G','Ž'], ['H','Š'],
  ['D','Đ'], ['T','Ć'], ['S','Š'], ['Z','Ž'],
  ['LJ','LJ'], ['NJ','NJ'] // stabilno
])

// Jotacija: L+J→LJ, N+J→NJ (ostalo kroz PAL_MAP)
function applyJotation(stem) {
  // ako završava na LJ/NJ, ostavi
  if (/[L]J$/.test(stem) || /[N]J$/.test(stem)) return stem
  if (/L$/.test(stem)) return stem.replace(/L$/, 'LJ')
  if (/N$/.test(stem)) return stem.replace(/N$/, 'NJ')
  return stem
}

function lastDigraph(stem) {
  if (stem.endsWith('LJ') || stem.endsWith('NJ') || stem.endsWith('DŽ')) return stem.slice(-2)
  return stem.slice(-1)
}

function dropLast(stem) {
  if (stem.endsWith('LJ') || stem.endsWith('NJ') || stem.endsWith('DŽ')) return stem.slice(0, -2)
  return stem.slice(0, -1)
}

function palatalizeIfNeeded(stem, suffix) {
  // trigger za prednje vokale ili j: E, I, J, JE, JI
  if (!/^(E|I|J|JE|JI|IMA|IN|IJO|IJU)/.test(suffix)) return stem
  const last = lastDigraph(stem)
  const base = dropLast(stem)
  if (last === 'L' || last === 'N') {
    return applyJotation(stem)
  }
  const mapped = PAL_MAP.get(last)
  if (mapped) return base + mapped
  return stem
}

// Generiraj kandidate padeža (jako pojednostavljeno)
function inflectCandidates(word) {
  const W = toUpper(word)
  const out = new Set([W])

  // Feminine -A
  if (/A$/.test(W)) {
    const stem = W.slice(0, -1)
    out.add(stem + 'E') // G sg
    out.add(stem + 'I') // D/L sg
    out.add(stem + 'U') // A sg
    out.add(stem + 'OM') // I sg
    out.add(stem + 'E') // V sg (često -O, ali ostavimo E kao kandidat)
    // plural
    out.add(stem + 'E') // N pl
    out.add(stem + 'A') // G pl
    out.add(stem + 'AMA') // D/L/I pl
  }

  // Neuter -O/-E
  if (/[OE]$/.test(W)) {
    const stem = W.slice(0, -1)
    out.add(stem + 'A') // N pl
    out.add(stem + 'A') // G pl
    out.add(stem + 'U') // D/L sg
    out.add(stem + 'OM') // I sg
    out.add(stem + 'IMA') // D/L/I pl
  }

  // Masculine ending with consonant
  if (isConsonantEnd(W)) {
    // sg
    const sE = palatalizeIfNeeded(W, 'E'); out.add(sE + 'E') // V/D/L sg candidates
    const sU = palatalizeIfNeeded(W, 'U'); out.add(sU + 'U') // D/L sg
    out.add(W + 'A') // G sg
    out.add(W + 'OM') // I sg
    // pl
    const sI = palatalizeIfNeeded(W, 'I'); out.add(sI + 'I') // N pl
    out.add(W + 'OVA') // G pl (varijanta)
    out.add(W + 'EVA') // G pl (varijanta)
    out.add(W + 'A') // G pl (česta)
    out.add(W + 'IMA') // D/L/I pl
  }

  // Oblici s -J- (instrumental sg/pl): probaj jotaciju + palatalizaciju
  const sJEM = palatalizeIfNeeded(W, 'JEM')
  out.add(applyJotation(sJEM) + 'EM')
  const sJIMA = palatalizeIfNeeded(W, 'JIMA')
  out.add(applyJotation(sJIMA) + 'MA')

  return Array.from(out)
}

async function main() {
  const bigPath = 'public/croatian_words.json'
  const big = await loadSet(bigPath)
  const unfiltered = process.env.UNFILTERED === '1'
  if (!big) {
    console.warn(`Upozorenje: nije pronađen ${bigPath}. Generirat ću bez filtriranja.`)
  }
  const baseArr = Array.from(big ?? [])
  const keep = new Set()

  for (const w of baseArr) {
    for (const cand of inflectCandidates(w)) {
      if (!cand || cand.length < 2) continue
      if (!unfiltered && big && !big.has(cand)) continue // filtriraj prema rječniku
      keep.add(cand)
    }
  }

  const outDir = path.join(process.cwd(), 'public')
  await fs.mkdir(outDir, { recursive: true })
  const outPath = path.join(outDir, 'croatian_words_inflections.json')
  const sorted = Array.from(keep).sort((a, b) => a.localeCompare(b))
  await fs.writeFile(outPath, JSON.stringify(sorted, null, 2))
  console.log(`Zapisano ${sorted.length} riječi u ${path.relative(process.cwd(), outPath)}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
