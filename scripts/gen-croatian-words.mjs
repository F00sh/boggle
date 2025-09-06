// Generate a flat JSON list of Croatian words from Hunspell dictionary
// Output: public/croatian_words.json (UPPERCASE words, length >= 3)

import fs from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const dicPath = path.join(process.cwd(), 'node_modules', 'dictionary-hr', 'index.dic')
  const outDir = path.join(process.cwd(), 'public')
  const outPath = path.join(outDir, 'croatian_words.json')

  const raw = await fs.readFile(dicPath, 'utf8')
  const lines = raw.split(/\r?\n/)
  const words = new Set()

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()
    if (!line) continue
    if (i === 0 && /^\d+$/.test(line)) continue // first line count
    if (line.startsWith('#')) continue
    // strip flags after '/'
    const base = line.split('/')[0]
    const upper = base.trim().toUpperCase()
    if (upper.length >= 3) words.add(upper)
  }

  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(outPath, JSON.stringify(Array.from(words), null, 0))
  console.log(`Wrote ${words.size} words to ${path.relative(process.cwd(), outPath)}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

