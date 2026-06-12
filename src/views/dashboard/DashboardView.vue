<script setup>
import PageSection from '../../components/common/PageSection.vue'
</script>

<template>
  <PageSection
    eyebrow="總覽"
    title="交易指揮中心"
    description="這個頁面可用來放帳戶摘要、自選清單、待處理提醒，以及成交快照。"
  >
    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
        帳戶摘要預留區
      </div>
      <div class="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
        自選股清單預留區
      </div>
      <div class="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
        提醒中心預留區
      </div>
    </div>
  </PageSection>
</template>
