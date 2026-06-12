<script setup>
import { storeToRefs } from 'pinia'

import { useCounterStore } from './stores/counter'

const counterStore = useCounterStore()
const { count, doubledCount } = storeToRefs(counterStore)
</script>

<template>
  <main class="min-h-screen bg-slate-950 px-6 py-16 text-slate-50">
    <div class="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
        Vue 3 + Pinia + Tailwind CSS 4
      </p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-white">
        Online Stock Order System
      </h1>
      <p class="mt-4 text-lg leading-8 text-slate-300">
        Frontend starter 已經準備好了，你現在可以在這個基礎上開始開發下單系統。
      </p>

      <section class="mt-10 rounded-2xl border border-emerald-400/20 bg-slate-900/80 p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-slate-400">
              Pinia state
            </p>
            <p class="mt-2 text-3xl font-semibold text-emerald-300">
              {{ count }}
            </p>
            <p class="mt-1 text-sm text-slate-400">
              Doubled: {{ doubledCount }}
            </p>
          </div>

          <button
            class="rounded-full bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            type="button"
            @click="counterStore.increment"
          >
            Increment
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
