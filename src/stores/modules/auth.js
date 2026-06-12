import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref('')

  const isAuthenticated = computed(() => Boolean(accessToken.value))

  function setSession(session) {
    user.value = session?.user ?? null
    accessToken.value = session?.accessToken ?? ''
  }

  function clearSession() {
    user.value = null
    accessToken.value = ''
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    setSession,
    clearSession,
  }
})
