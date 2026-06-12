export const httpClient = {
  get(url, options = {}) {
    return Promise.resolve({ method: 'GET', url, options })
  },
  post(url, body = {}, options = {}) {
    return Promise.resolve({ method: 'POST', url, body, options })
  },
  put(url, body = {}, options = {}) {
    return Promise.resolve({ method: 'PUT', url, body, options })
  },
  delete(url, options = {}) {
    return Promise.resolve({ method: 'DELETE', url, options })
  },
}
