import { httpClient } from '../../api/http'

export const quoteService = {
  latest(symbol) {
    return httpClient.get(`/quotes/${symbol}`)
  },
  watchlist(params) {
    return httpClient.get('/quotes/watchlist', { params })
  },
}
