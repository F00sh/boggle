<template>
  <div class="min-h-screen grid place-items-center p-6">
    <div class="w-full max-w-xl text-center">
      <h1 class="text-4xl font-bold mb-4">Boggle</h1>
      <p class="text-slate-300 mb-8">4×4 rešetka sa slovima i odbrojavanjem (3 min). Poslednjih 20s – opasno upozorenje.</p>

      <div class="bg-slate-800/70 rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold mb-2">Nova igra</h2>
        <p class="text-slate-300 mb-6">Koristi slova: A B C Č Ć D Đ DŽ E F G H I J K L LJ M N NJ O P R S Š T U V Z Ž</p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink class="px-5 py-3 rounded-lg bg-brand hover:bg-brand-dark transition-colors font-semibold" to="/game">
            Single Player
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing page only
</script>
