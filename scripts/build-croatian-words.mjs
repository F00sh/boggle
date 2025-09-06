// Složena skripta: konverzija Hunspell rječnika + množine + padeži
// Izlazi (u public/):
//  - croatian_words.json (osnovni skup iz Hunspell .dic)
//  - croatian_words_extended.json (množinski oblici za zadane riječi)
//  - croatian_words_inflections.json (heurističke deklinacije + fonološke promjene, filtrirane kroz osnovni skup)

import hr from 'dictionary-hr'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.join(process.cwd(), 'public')

async function loadDicBuffer() {
  try {
    const result = await new Promise((resolve, reject) => {
      try { hr((err, out) => (err ? reject(err) : resolve(out))) } catch (e) { reject(e) }
    })
    if (result && result.dic) return result.dic
  } catch {}
  const dicPath = path.join(process.cwd(), 'node_modules', 'dictionary-hr', 'index.dic')
  return await fsp.readFile(dicPath)
}

function toUpper(s) { return (s || '').normalize('NFC').toUpperCase() }
function isConsonantEnd(w) { return /[^AEIOU]$/.test(w) }

function parseHunspellToSet(text) {
  const lines = text.split(/\r?\n/)
  const set = new Set()
  for (let i = 0; i < lines.length; i++) {
    let line = (lines[i] || '').trim()
    if (!line) continue
    if (i === 0 && /^\d+$/.test(line)) continue
    if (line.startsWith('#')) continue
    const base = line.split('/')[0].trim()
    if (!base) continue
    const upper = toUpper(base)
    if (upper) set.add(upper)
  }
  return set
}

// Množine — heuristike (filtrirane kroz osnovni rječnik ako je dostupan)
const PLURALS_SEED = [
  'DOM','KUCA','KUĆA','RIBA','MORE','PLAN','STAN','GRAD','VODA','ZORA','ZUB'
]

function pluralCandidates(word) {
  const W = toUpper(word)
  const out = new Set()
  // Fem. -A → -E
  if (/A$/.test(W)) out.add(W.replace(/A$/, 'E'))
  // Neut. -O/-E → -A
  if (/O$/.test(W)) out.add(W.replace(/O$/, 'A'))
  if (/E$/.test(W)) out.add(W.replace(/E$/, 'A'))
  // Posebni obrasci
  if (/AC$/.test(W)) out.add(W.replace(/AC$/, 'CI')) // npr. MUŠKARAC → MUŠKARCI
  if (/IK$/.test(W)) out.add(W.replace(/IK$/, 'ICI')) // JEZIK → JEZICI
  // Masc. (suglasnik)
  if (isConsonantEnd(W)) {
    out.add(W + 'I')
    out.add(W + 'OVI')
    out.add(W + 'EVI')
  }
  return Array.from(out)
}

// Deklinacija + fonološke promjene (palatalizacija, sibilarizacija, jotacija)
const PAL_MAP = new Map([
  ['K','Č'], ['G','Ž'], ['H','Š'],
  ['D','Đ'], ['T','Ć'], ['S','Š'], ['Z','Ž']
])
function lastDigraph(stem) {
  if (stem.endsWith('LJ') || stem.endsWith('NJ') || stem.endsWith('DŽ')) return stem.slice(-2)
  return stem.slice(-1)
}
function dropLast(stem) {
  if (stem.endsWith('LJ') || stem.endsWith('NJ') || stem.endsWith('DŽ')) return stem.slice(0, -2)
  return stem.slice(0, -1)
}
function applyJotation(stem) {
  if (/LJ$/.test(stem) || /NJ$/.test(stem)) return stem
  if (/L$/.test(stem)) return stem.replace(/L$/, 'LJ')
  if (/N$/.test(stem)) return stem.replace(/N$/, 'NJ')
  return stem
}
function palatalizeIfNeeded(stem, suffix) {
  if (!/^(E|I|J|JE|JI|IMA|IN|IJO|IJU)/.test(suffix)) return stem
  const last = lastDigraph(stem)
  const base = dropLast(stem)
  if (last === 'L' || last === 'N') return applyJotation(stem)
  const mapped = PAL_MAP.get(last)
  return mapped ? base + mapped : stem
}
function inflectCandidates(word) {
  const W = toUpper(word)
  const out = new Set([W])
  // Fem A
  if (/A$/.test(W)) {
    const s = W.slice(0, -1)
    out.add(s + 'E'); out.add(s + 'I'); out.add(s + 'U'); out.add(s + 'OM'); out.add(s + 'E')
    out.add(s + 'E'); out.add(s + 'A'); out.add(s + 'AMA')
  }
  // Neut O/E
  if (/[OE]$/.test(W)) {
    const s = W.slice(0, -1)
    out.add(s + 'A'); out.add(s + 'A'); out.add(s + 'U'); out.add(s + 'OM'); out.add(s + 'IMA')
  }
  // Masc cons
  if (isConsonantEnd(W)) {
    const sE = palatalizeIfNeeded(W, 'E'); out.add(sE + 'E')
    const sU = palatalizeIfNeeded(W, 'U'); out.add(sU + 'U')
    out.add(W + 'A'); out.add(W + 'OM')
    const sI = palatalizeIfNeeded(W, 'I'); out.add(sI + 'I')
    out.add(W + 'OVA'); out.add(W + 'EVA'); out.add(W + 'A'); out.add(W + 'IMA')
  }
  const sJEM = palatalizeIfNeeded(W, 'JEM'); out.add(applyJotation(sJEM) + 'EM')
  const sJIMA = palatalizeIfNeeded(W, 'JIMA'); out.add(applyJotation(sJIMA) + 'MA')
  return Array.from(out)
}

async function main() {
  // 1) Hunspell → croatian_words.json
  const dicBuf = await loadDicBuffer()
  const dicText = Buffer.isBuffer(dicBuf) ? dicBuf.toString('utf8') : String(dicBuf ?? '')
  const baseSet = parseHunspellToSet(dicText)
  await fsp.mkdir(OUT_DIR, { recursive: true })
  const baseArr = Array.from(baseSet)
  fs.writeFileSync(path.join(OUT_DIR, 'croatian_words.json'), JSON.stringify(baseArr, null, 2), 'utf8')
  console.log(`Base zapisano: ${baseArr.length}`)

  // 2) Množine → croatian_words_extended.json (filtrirane kroz baseSet)
  const extended = new Set(PLURALS_SEED.map(toUpper))
  for (const w of [...extended]) {
    for (const p of pluralCandidates(w)) {
      if (baseSet.has(p)) extended.add(p)
    }
  }
  const extArr = Array.from(extended).sort((a,b)=>a.localeCompare(b))
  fs.writeFileSync(path.join(OUT_DIR, 'croatian_words_extended.json'), JSON.stringify(extArr, null, 2), 'utf8')
  console.log(`Extended zapisano: ${extArr.length}`)

  // 3) Padeži+promjene → croatian_words_inflections.json (filtrirano)
  const infl = new Set()
  for (const w of baseArr) {
    for (const f of inflectCandidates(w)) {
      if (baseSet.has(f)) infl.add(f)
    }
  }
  const inflArr = Array.from(infl).sort((a,b)=>a.localeCompare(b))
  fs.writeFileSync(path.join(OUT_DIR, 'croatian_words_inflections.json'), JSON.stringify(inflArr, null, 2), 'utf8')
  console.log(`Inflections zapisano: ${inflArr.length}`)
}

main().catch((e) => { console.error(e); process.exit(1) })

