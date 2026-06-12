<script setup>
import PageSection from '../../components/common/PageSection.vue'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
    <div class="w-full max-w-xl">
      <PageSection
        eyebrow="身份驗證"
        title="券商登入"
        description="這個頁面之後可用來放登入、多因子驗證，以及券商串接啟用流程。"
      >
        <div class="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400">
          登入表單預留區
        </div>
      </PageSection>
    </div>
  </main>
</template>
