<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '../../stores'

const appStore = useAppStore()
const { pageTitle } = storeToRefs(appStore)
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
    <div class="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">
          交易工作台
        </p>
        <h1 class="mt-2 text-2xl font-semibold text-white">
          {{ pageTitle }}
        </h1>
      </div>

      <button
        class="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20"
        type="button"
      >
        連接券商
      </button>
    </div>
  </header>
</template>
