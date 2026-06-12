import { httpClient } from '../../api/http'

export const portfolioService = {
  summary() {
    return httpClient.get('/portfolio/summary')
  },
  positions(params) {
    return httpClient.get('/portfolio/positions', { params })
  },
}
