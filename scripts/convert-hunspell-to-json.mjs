// Konverzija Hunspell hrvatskog rječnika u JSON
// 1) npm install dictionary-hr
// 2) Uvezi modul i učitaj .dic
// 3) Parsiraj sadržaj: linije, preskoči prvu (broj unosa), uzmi osnovnu riječ prije '/', UPPERCASE
// 4) Stavi u Set radi jedinstvenosti
// 5) Spremi u public/croatian_words.json s uvlakom 2
// 6) Ispiši broj zapisanih riječi

import hr from 'dictionary-hr'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

async function loadDicBuffer() {
  // dictionary-hr tipično izlaže callback funkciju: cb(err, {aff, dic})
  // Omotaj u Promise za await sintaksu
  try {
    const result = await new Promise((resolve, reject) => {
      try {
        // @ts-ignore - paket je CommonJS
        hr((err, out) => (err ? reject(err) : resolve(out)))
      } catch (e) {
        reject(e)
      }
    })
    if (result && result.dic) return result.dic
  } catch (e) {
    // Nastavi na fallback čitanje s puta u node_modules
  }

  // Fallback: čitaj direktno datoteku iz node_modules
  const dicPath = path.join(process.cwd(), 'node_modules', 'dictionary-hr', 'index.dic')
  return await fsp.readFile(dicPath)
}

async function main() {
  const buf = await loadDicBuffer()
  const text = Buffer.isBuffer(buf) ? buf.toString('utf8') : String(buf ?? '')

  const lines = text.split(/\r?\n/)
  const set = new Set()

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (!line) continue
    line = line.trim()
    if (!line) continue
    if (i === 0 && /^\d+$/.test(line)) continue // prva linija je broj unosa
    if (line.startsWith('#')) continue

    // Uzmimo baznu riječ prije '/' (npr. KUĆA/AB -> KUĆA)
    const base = line.split('/')[0].trim()
    if (!base) continue
    const upper = base.toUpperCase()
    if (upper.length >= 1) set.add(upper)
  }

  const outArr = Array.from(set)
  const outDir = path.join(process.cwd(), 'public')
  const outPath = path.join(outDir, 'croatian_words.json')
  await fsp.mkdir(outDir, { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(outArr, null, 2), 'utf8')
  console.log(`Zapisano ${outArr.length} riječi u ${path.relative(process.cwd(), outPath)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

