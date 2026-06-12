import { httpClient } from '../../api/http'

export const orderService = {
  list(params) {
    return httpClient.get('/orders', { params })
  },
  submit(payload) {
    return httpClient.post('/orders', payload)
  },
}
