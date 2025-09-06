// Croatian Wiktionary validation via MediaWiki API
// Uses CORS-friendly endpoint with origin=*

const API = 'https://hr.wiktionary.org/w/api.php'

const cache = new Map<string, boolean>()

import { validateWordOffline } from './dictionary-hr'

export async function validateWordHrWiktionary(raw: string): Promise<boolean> {
  const word = (raw || '').trim()
  if (!word) return false
  const key = word.toLowerCase()
  if (cache.has(key)) return cache.get(key) as boolean

  const candidates = unique([
    word.toLowerCase(),
    capitalize(word.toLowerCase()),
    word.toUpperCase()
  ])

  for (const term of candidates) {
    try {
      const url = `${API}?action=query&format=json&origin=*&titles=${encodeURIComponent(term)}`
      const res = await fetch(url)
      if (!res.ok) continue
      const data = await res.json()
      const pages = data?.query?.pages
      if (pages && typeof pages === 'object') {
        const list = Object.values(pages) as any[]
        if (list.some(p => p && !('missing' in p))) {
          cache.set(key, true)
          return true
        }
      }
    } catch (e) {
      // ignore and try next candidate
    }
  }
  cache.set(key, false)
  return false
}

// Primary: large offline JSON lists (if present), Fallback: minimal set, Optional: online
let bigDictSet: Set<string> | null = null
let bigDictLoading: Promise<Set<string> | null> | null = null

async function loadJson(path: string): Promise<string[] | null> {
  try {
    const res = await fetch(path)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function loadBigDict(): Promise<Set<string> | null> {
  if (bigDictSet) return bigDictSet
  if (bigDictLoading) return bigDictLoading
  bigDictLoading = (async () => {
    const paths = [
      '/croatian_words.json',
      '/croatian_words_extended.json',
      '/croatian_words_inflections.json'
    ]
    const lists = await Promise.all(paths.map(loadJson))
    const set = new Set<string>()
    for (const arr of lists) {
      if (Array.isArray(arr)) {
        for (const w of arr) if (typeof w === 'string') set.add(w)
      }
    }
    if (set.size === 0) return null
    bigDictSet = set
    return bigDictSet
  })()
  return bigDictLoading
}

function normUpper(s: string): string { return (s || '').trim().toUpperCase() }

export async function validateWord(raw: string): Promise<boolean> {
  const candidate = normUpper(raw)
  const big = await loadBigDict()
  if (big && big.has(candidate)) return true
  if (validateWordOffline(candidate)) return true
  // Optional last resort: online
  try { return await validateWordHrWiktionary(candidate) } catch { return false }
}

function capitalize(s: string) {
  if (!s) return s
  return s[0].toUpperCase() + s.slice(1)
}

function unique(arr: string[]) {
  return Array.from(new Set(arr))
}
