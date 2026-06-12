<script setup>
import { computed } from 'vue'

import { formatCurrency, formatPercent } from '../../utils/formatters'

const props = defineProps({
  accountSummary: {
    type: Object,
    required: true,
  },
  activeOrdersCount: {
    type: Number,
    required: true,
  },
  estimatedFees: {
    type: Number,
    required: true,
  },
  estimatedNotional: {
    type: Number,
    required: true,
  },
  estimatedTotal: {
    type: Number,
    required: true,
  },
  lastSubmissionMessage: {
    type: String,
    default: '',
  },
  selectedSymbol: {
    type: Object,
    required: true,
  },
})

const quoteTone = computed(() => {
  return props.selectedSymbol.change >= 0
    ? 'text-emerald-300'
    : 'text-rose-300'
})
</script>

<template>
  <section class="space-y-4">
    <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
            即時報價
          </p>
          <h3 class="mt-3 text-3xl font-semibold text-white">
            {{ selectedSymbol.symbol }}
          </h3>
          <p class="mt-2 text-sm text-slate-400">
            {{ selectedSymbol.name }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-3xl font-semibold text-white">
            {{ formatCurrency(selectedSymbol.price) }}
          </p>
          <p
            class="mt-2 text-sm font-medium"
            :class="quoteTone"
          >
            {{ selectedSymbol.change >= 0 ? '+' : '' }}{{ selectedSymbol.change.toFixed(2) }}
            ({{ formatPercent(selectedSymbol.changePercent / 100) }})
          </p>
        </div>
      </div>

      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
            買進價
          </p>
          <p class="mt-2 font-semibold text-white">
            {{ formatCurrency(selectedSymbol.bid) }}
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
            賣出價
          </p>
          <p class="mt-2 font-semibold text-white">
            {{ formatCurrency(selectedSymbol.ask) }}
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
            當日區間
          </p>
          <p class="mt-2 font-semibold text-white">
            {{ selectedSymbol.dayRange }}
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(16,185,129,0.10),rgba(15,23,42,0.92))] p-6 shadow-xl shadow-slate-950/20">
      <p class="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300">
        委託預覽
      </p>

      <div class="mt-5 space-y-4 text-sm">
        <div class="flex items-center justify-between text-slate-300">
          <span>預估成交金額</span>
          <strong class="text-white">{{ formatCurrency(estimatedNotional) }}</strong>
        </div>
        <div class="flex items-center justify-between text-slate-300">
          <span>預估手續費</span>
          <strong class="text-white">{{ formatCurrency(estimatedFees) }}</strong>
        </div>
        <div class="flex items-center justify-between text-slate-300">
          <span>資金影響</span>
          <strong class="text-white">{{ formatCurrency(estimatedTotal) }}</strong>
        </div>
        <div class="flex items-center justify-between text-slate-300">
          <span>進行中委託</span>
          <strong class="text-white">{{ activeOrdersCount }}</strong>
        </div>
        <div class="flex items-center justify-between text-slate-300">
          <span>當日損益</span>
          <strong class="text-emerald-300">{{ formatCurrency(accountSummary.intradayPnl) }}</strong>
        </div>
      </div>

      <p
        v-if="lastSubmissionMessage"
        class="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
      >
        {{ lastSubmissionMessage }}
      </p>
    </div>
  </section>
</template>
