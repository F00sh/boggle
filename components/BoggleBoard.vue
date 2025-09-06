<template>
  <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
    <div class="p-3 border-[12px] border-orange-500 rounded-2xl bg-transparent">
      <div class="grid grid-cols-4 gap-2 select-none transition filter"
           :class="{ 'blur-md': blurred }">
        <button
          v-for="(cell, idx) in board"
          :key="idx"
          type="button"
          class="aspect-square rounded-lg bg-white border border-slate-300 grid place-items-center text-2xl sm:text-3xl font-extrabold tracking-wide text-black focus:outline-none"
          :class="[
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow',
            selectedSet.has(idx) ? 'ring-4 ring-emerald-500 bg-emerald-100' : ''
          ]"
          :style="{ transform: `rotate(${rotations[idx] ?? 0}deg)` }"
          @click="onClick(idx)"
        >
          {{ cell }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ board: string[]; disabled?: boolean; blurred?: boolean; selected?: number[] }>()
const emit = defineEmits<{ (e: 'cell-click', index: number): void }>()

const rotations = ref<number[]>([])
const selectedSet = computed(() => new Set(props.selected ?? []))

function regenRotations() {
  const choices = [0, 90, 180, 270]
  rotations.value = props.board.map(() => choices[Math.floor(Math.random() * choices.length)])
}

watch(
  () => props.board,
  () => regenRotations(),
  { immediate: true }
)

function onClick(idx: number) {
  if (props.disabled) return
  emit('cell-click', idx)
}
</script>
