<template>
  <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
    <div class="p-3 border-[12px] border-orange-500 rounded-2xl bg-transparent">
      <div class="grid grid-cols-4 gap-2 select-none transition filter"
           :class="{ 'blur-md': blurred }">
        <div
          v-for="(cell, idx) in board"
          :key="idx"
          class="aspect-square rounded-lg bg-white border border-slate-300 grid place-items-center text-2xl sm:text-3xl font-extrabold tracking-wide text-black"
          :class="{ 'opacity-50': disabled }"
          :style="{ transform: `rotate(${rotations[idx] ?? 0}deg)` }"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ board: string[]; disabled?: boolean; blurred?: boolean }>()

const rotations = ref<number[]>([])

function regenRotations() {
  const choices = [0, 90, 180, 270]
  rotations.value = props.board.map(() => choices[Math.floor(Math.random() * choices.length)])
}

watch(
  () => props.board,
  () => regenRotations(),
  { immediate: true }
)
</script>
