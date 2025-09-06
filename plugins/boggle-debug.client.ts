import { generateBoard, totalLetters, probabilities, getRandomLetter, getRandomLetterByProbabilities } from '@/utils/letters'

export default defineNuxtPlugin(() => {
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
})
