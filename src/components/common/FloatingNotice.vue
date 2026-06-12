<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  tone: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'sell', 'info'].includes(value),
  },
})

const emit = defineEmits(['close'])

function toneClass(tone) {
  if (tone === 'sell') {
    return 'border-rose-400/25 bg-[linear-gradient(135deg,rgba(251,113,133,0.18),rgba(15,23,42,0.96))]'
  }

  if (tone === 'info') {
    return 'border-sky-400/25 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(15,23,42,0.96))]'
  }

  return 'border-emerald-400/25 bg-[linear-gradient(135deg,rgba(52,211,153,0.18),rgba(15,23,42,0.96))]'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="open"
        class="fixed right-5 top-5 z-[60] w-[min(92vw,24rem)] rounded-[1.75rem] border p-5 shadow-[0_24px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl"
        :class="toneClass(tone)"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-lg font-semibold text-white">
              {{ title }}
            </p>
            <p class="mt-2 text-sm leading-7 text-slate-200">
              {{ message }}
            </p>
          </div>

          <button
            class="rounded-2xl border border-white/10 bg-white/5 w-1/3 py-1 px-4 text-xs font-medium text-slate-200 transition hover:border-white/20"
            type="button"
            @click="emit('close')"
          >
            關閉
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
