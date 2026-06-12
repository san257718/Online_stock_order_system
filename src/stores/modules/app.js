import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const pageTitle = ref('總覽儀表板')
  const sidebarOpen = ref(false)

  const shellTitle = computed(() => `線上股票下單系統 / ${pageTitle.value}`)

  function setPageTitle(title) {
    pageTitle.value = title
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function closeSidebar() {
    sidebarOpen.value = false
  }

  return {
    pageTitle,
    shellTitle,
    sidebarOpen,
    setPageTitle,
    toggleSidebar,
    closeSidebar,
  }
})
