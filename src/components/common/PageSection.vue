<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20">
    <p
      v-if="eyebrow"
      class="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300"
    >
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-2xl font-semibold text-white">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-3 max-w-2xl text-sm leading-7 text-slate-400"
    >
      {{ description }}
    </p>

    <div class="mt-6">
      <slot />
    </div>
  </section>
</template>
