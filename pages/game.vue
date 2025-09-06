<template>
  <div class="min-h-screen p-4 sm:p-6">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <NuxtLink to="/" class="text-slate-300 hover:text-white">← Nova igra</NuxtLink>
        <h1 class="text-2xl font-bold">Boggle</h1>
        <div class="w-24"></div>
      </div>

      <div class="bg-slate-800/70 rounded-xl p-4 sm:p-6 border border-slate-700">
        <div class="flex items-center justify-between gap-2 mb-4">
          <div class="flex items-center gap-3">
            <span class="text-slate-300">Preostalo vreme:</span>
            <span :class="['text-2xl font-extrabold tabular-nums', danger ? 'text-red-400' : 'text-white']">
              {{ mm }}:{{ ss }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50" :disabled="preparing || waiting || finished" @click="togglePause">
              {{ paused ? 'Nastavi' : 'Pauziraj' }}
            </button>
            <button class="px-3 py-2 rounded-lg bg-brand hover:bg-brand-dark" @click="newGame">Nova tabla</button>
            <button class="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500" @click="showRules = true">Pravila</button>
          </div>
        </div>

        <div class="grid place-items-center py-2 relative">
          <BoggleBoard :board="board" :disabled="paused || finished" :blurred="paused || preparing || waiting" />

          <!-- Countdown overlay -->
          <div v-if="preparing" class="absolute inset-0 grid place-items-center">
            <div class="text-6xl sm:text-7xl font-black text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {{ countdown }}
            </div>
          </div>

          <!-- Waiting to start overlay with Kreni button -->
          <div v-else-if="waiting" class="absolute inset-0 grid place-items-center">
            <button class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xl shadow-lg" @click="startCountdown">
              Kreni
            </button>
          </div>

          <!-- Paused overlay -->
          <div v-else-if="paused && !finished" class="absolute inset-0 grid place-items-center">
            <div class="px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-700 text-white font-semibold">
              Pauzirano
            </div>
          </div>
        </div>

        <div v-if="finished" class="mt-4 text-center">
          <p class="text-xl font-semibold mb-3">Vreme je isteklo!</p>
          <button class="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark" @click="newGame">Igraj ponovo</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Pravila modal -->
  <div v-if="showRules" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/60" @click="showRules = false"></div>
    <div class="absolute inset-0 grid place-items-center p-4">
      <div class="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <h2 class="text-xl font-bold">Pravila</h2>
          <button class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600" @click="showRules = false">Zatvori</button>
        </div>
        <div class="p-5 space-y-4 max-h-[70vh] overflow-auto text-slate-200">
          <div>
            <h3 class="font-semibold mb-2">Pravilnik za bodovanje riječi u hrvatskom Boggleu</h3>
            <h4 class="font-semibold">1. Osnovna pravila</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li>Riječ mora biti sastavljena od najmanje 3 slova.</li>
              <li>Riječi se tvore povezivanjem susjednih slova na ploči (okomito, vodoravno, dijagonalno).</li>
              <li>Svako polje može se koristiti samo jednom u istoj riječi.</li>
              <li>Dopuštena su i dvoslovna slova (LJ, NJ, DŽ) – računaju se kao jedno slovo/polje.</li>
              <li>Imena, kratice i strane riječi se ne priznaju, osim ako su uvrštene u standardne hrvatske rječnike.</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold">2. Bodovanje prema duljini riječi</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li>3 slova – 1 bod</li>
              <li>4 slova – 2 boda</li>
              <li>5 slova – 3 boda</li>
              <li>6 slova – 4 boda</li>
              <li>7 slova – 5 bodova</li>
              <li>8+ slova – 11 bodova</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BoggleBoard from '@/components/BoggleBoard.vue'
import { generateBoard } from '@/utils/letters'

const board = ref<string[]>([])
const totalSeconds = ref(180) // 3 minutes
const remaining = ref(totalSeconds.value)
const paused = ref(false)
const finished = ref(false)
const preparing = ref(false)
const waiting = ref(true)
const countdown = ref(3)
const showRules = ref(false)
const danger = computed(() => remaining.value <= 20 && !finished.value)

let tickHandle: number | null = null
let dangerInterval: number | null = null
let countdownHandle: number | null = null

onMounted(() => {
  newGame()
})

onBeforeUnmount(() => stopAllTimers())

function newGame() {
  stopAllTimers()
  board.value = generateBoard()
  remaining.value = totalSeconds.value
  finished.value = false
  paused.value = false
  // Wait for user to press Kreni, then show 3..2..1 and start timer
  waiting.value = true
  preparing.value = false
  countdown.value = 3
}

function togglePause() {
  if (finished.value) return
  paused.value = !paused.value
  if (paused.value) {
    stopTick()
    stopDangerSound()
  } else {
    startTick()
  }
}

function startTick() {
  stopTick()
  tickHandle = window.setInterval(() => {
    if (paused.value) return
    if (remaining.value > 0) {
      remaining.value -= 1
      if (remaining.value === 20) startDangerSound()
      if (remaining.value === 0) {
        finished.value = true
        stopDangerSound()
        stopTick()
      }
    }
  }, 1000)
}

function stopTick() {
  if (tickHandle) {
    clearInterval(tickHandle)
    tickHandle = null
  }
}

function stopAllTimers() {
  stopTick()
  stopDangerSound()
  if (countdownHandle) {
    clearInterval(countdownHandle)
    countdownHandle = null
  }
}

function startCountdown() {
  if (preparing.value || !waiting.value) return
  preparing.value = true
  waiting.value = false
  countdown.value = 3
  countdownHandle = window.setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1
    } else {
      clearInterval(countdownHandle!)
      countdownHandle = null
      preparing.value = false
      startTick()
    }
  }, 1000)
}

// WebAudio danger beep (every ~1s in last 20s)
let audioCtx: AudioContext | null = null

function startDangerSound() {
  stopDangerSound()
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)() } catch {}
  }
  if (!audioCtx) return
  // schedule repeating beeps while in danger window
  dangerInterval = window.setInterval(() => {
    if (!danger.value || paused.value || finished.value) return
    beep(480, 0.12)
  }, 1000)
}

function stopDangerSound() {
  if (dangerInterval) {
    clearInterval(dangerInterval)
    dangerInterval = null
  }
}

function beep(freq: number, duration: number) {
  if (!audioCtx) return
  const t0 = audioCtx.currentTime
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'square'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.001, t0)
  gain.gain.exponentialRampToValueAtTime(0.2, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

const mm = computed(() => String(Math.floor(remaining.value / 60)).padStart(2, '0'))
const ss = computed(() => String(remaining.value % 60).padStart(2, '0'))
</script>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>
