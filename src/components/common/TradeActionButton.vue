<script setup>
import { computed } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  tone: {
    type: String,
    default: 'buy',
    validator: (value) => ['buy', 'sell', 'neutral'].includes(value),
  },
})

const toneClass = computed(() => {
  if (props.disabled) {
    return 'cursor-not-allowed border border-white/10 bg-white/5 text-slate-500 opacity-60'
  }

  if (props.active && props.tone === 'buy') {
    return 'bg-emerald-400 text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.28)] hover:bg-emerald-300'
  }

  if (props.active && props.tone === 'sell') {
    return 'bg-rose-400 text-slate-950 shadow-[0_0_30px_rgba(251,113,133,0.24)] hover:bg-rose-300'
  }

  if (props.active) {
    return 'bg-sky-400 text-slate-950 hover:bg-sky-300'
  }

  if (props.tone === 'buy') {
    return 'border border-emerald-400/20 bg-emerald-400/8 text-emerald-100 hover:border-emerald-400/35 hover:bg-emerald-400/12'
  }

  if (props.tone === 'sell') {
    return 'border border-rose-400/20 bg-rose-400/8 text-rose-100 hover:border-rose-400/35 hover:bg-rose-400/12'
  }

  return 'border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/8'
})
</script>

<template>
  <button
    class="rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200"
    :class="[toneClass, block ? 'w-full' : '']"
    :disabled="disabled"
    type="button"
  >
    <slot>
      {{ pending ? '處理中...' : '操作' }}
    </slot>
  </button>
</template>
