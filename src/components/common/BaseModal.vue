<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  eyebrow: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  closeText: {
    type: String,
    default: '關閉',
  },
})

const emit = defineEmits(['close'])

const hasMessage = computed(() => Boolean(props.message?.trim()))

function handleKeydown(event) {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
  { immediate: true },
)

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }

  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-6 scale-95 opacity-0"
          enter-to-class="translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 scale-100 opacity-100"
          leave-to-class="translate-y-4 scale-95 opacity-0"
        >
          <section
            v-if="open"
            class="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.16),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-7 shadow-[0_30px_80px_rgba(2,6,23,0.75)]"
          >
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(148,163,184,0.05),transparent_40%,rgba(52,211,153,0.08))]" />

            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p
                    v-if="eyebrow"
                    class="text-xs font-medium uppercase tracking-[0.35em] text-emerald-300"
                  >
                    {{ eyebrow }}
                  </p>
                  <h3 class="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {{ title }}
                  </h3>
                </div>

                <button
                  class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                  type="button"
                  @click="emit('close')"
                >
                  {{ closeText }}
                </button>
              </div>

              <div class="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                <p
                  v-if="hasMessage"
                  class="whitespace-pre-line text-base leading-8 text-slate-200"
                >
                  {{ message }}
                </p>

                <div
                  v-else
                  class="text-sm text-slate-400"
                >
                  <slot />
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p class="text-sm text-slate-500">
                  可用於提示訊息、風險提醒、操作確認或成交回報。
                </p>

                <button
                  class="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                  type="button"
                  @click="emit('close')"
                >
                  我知道了
                </button>
              </div>
            </div>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
