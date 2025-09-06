import { generateBoard, totalLetters, probabilities, getRandomLetter, getRandomLetterByProbabilities } from '@/utils/letters'

// Expose helpers for quick debugging in the browser console
// Usage in DevTools:
//   console.log('\nGenerirana ploča:')
//   console.table(window.generateBoard(4))
if (process.client) {
  // @ts-ignore
  window.generateBoard = generateBoard
  // @ts-ignore
  window.totalLetters = totalLetters
  // @ts-ignore
  window.probabilities = probabilities
  // @ts-ignore
  window.getRandomLetter = getRandomLetter
  // @ts-ignore
  window.getRandomLetterByProbabilities = getRandomLetterByProbabilities
}
