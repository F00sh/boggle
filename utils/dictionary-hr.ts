// Minimal offline hrvatski rječnik (primjeri). Proširi po potrebi.
// Sva slova u UPPERCASE, uključujući digrafe: LJ, NJ, DŽ

const WORDS = [
  'DOM','KUCA','KUĆA','KUĆA','RIBA','MORE','PLAN','STAN','GRAD','VODA','ZORA','ZUB','ZBUN','TRAVA','STOL','STOLAC','KRUG',
  'SUNCE','MJESEC','ZVIJEZDA','ZVEZDA','LJUBAV','NJIVA','DŽEM','DŽEPNI','DŽEP','NJEGOV','LJETO','LJESTVE','LJILJAN',
  'JABUKA','KRUH','KRUŠKA','KRUŽNO','ŠUMA','ŠUPA','ŠEĆER','SECER','ŽIRAFA','ŽELJA','ŽELJA','ČOVJEK','COVJEK','ĆUP','DJETE','DIJETE',
  'IGRA','IGRATI','PISMO','PISATI','KNJIGA','KNJIGE','BRDO','POLJE','PUT','PUTOVANJE','RJEKA','RIJEKA','PTICA','PTICE',
  'HLJEB','ZUBAR','DAN','DANI','NOĆ','NOC','SNIJEG','SNEG','LED','HLADNO','TOPLO','VATRA','DIM','TLO','ZEMLJA','NEBO'
] as const

// Normalizacija: trim + uppercase
function norm(word: string): string {
  return (word || '').trim().toUpperCase()
}

export const HR_DICTIONARY = new Set<string>(WORDS.map(norm))

export function validateWordOffline(word: string): boolean {
  const w = norm(word)
  if (!w || w.length < 3) return false
  return HR_DICTIONARY.has(w)
}

