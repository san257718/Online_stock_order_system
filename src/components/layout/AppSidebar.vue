<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navigationItems = [
  { label: '總覽儀表板', description: '檢視帳戶總覽與提醒', to: '/dashboard' },
  { label: '市場報價', description: '追蹤自選股與行情', to: '/quotes' },
  { label: '委託下單', description: '建立並追蹤委託單', to: '/orders' },
  { label: '投資組合', description: '查看持倉與資產餘額', to: '/portfolio' },
  { label: '系統設定', description: '管理帳戶與偏好設定', to: '/settings' },
]
</script>

<template>
  <aside class="hidden w-80 shrink-0 border-r border-white/10 bg-slate-900/70 px-6 py-8 lg:block">
    <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p class="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
        OSS
      </p>
      <h2 class="mt-4 text-2xl font-semibold text-white">
        線上股票下單系統
      </h2>
      <p class="mt-3 text-sm leading-7 text-slate-400">
        目前已建立交易、持倉、委託與市場資料相關的前端基礎架構。
      </p>
    </div>

    <nav class="mt-8 space-y-3">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.to"
        :to="item.to"
        class="block rounded-2xl border px-4 py-4 transition"
        :class="route.path === item.to
          ? 'border-emerald-400/40 bg-emerald-400/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'"
      >
        <p class="font-medium text-white">
          {{ item.label }}
        </p>
        <p class="mt-1 text-sm text-slate-400">
          {{ item.description }}
        </p>
      </RouterLink>
    </nav>
  </aside>
</template>
