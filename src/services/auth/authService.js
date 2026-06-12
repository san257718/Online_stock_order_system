import { httpClient } from '../../api/http'

export const authService = {
  login(payload) {
    return httpClient.post('/auth/login', payload)
  },
  logout() {
    return httpClient.post('/auth/logout')
  },
}
