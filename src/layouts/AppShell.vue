<script setup>
import { computed, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import AppHeader from '../components/layout/AppHeader.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
import { useAppStore } from '../stores'

const route = useRoute()
const appStore = useAppStore()

const currentTitle = computed(() => route.meta?.title ?? '總覽儀表板')

watch(
  currentTitle,
  (title) => {
    appStore.setPageTitle(title)
  },
  {
    immediate: true,
  },
)

const quickLinks = [
  { label: '總覽', to: '/dashboard' },
  { label: '報價', to: '/quotes' },
  { label: '委託', to: '/orders' },
  { label: '持倉', to: '/portfolio' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="mx-auto flex min-h-screen max-w-[1600px]">
      <AppSidebar />

      <div class="flex min-h-screen min-w-0 flex-1 flex-col">
        <AppHeader />

        <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div class="mb-6 flex flex-wrap gap-3">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
            >
              {{ link.label }}
            </RouterLink>
          </div>

          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
