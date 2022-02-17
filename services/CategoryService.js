import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

export default {
  fetchCategories() {
    return api.get('/categories')
  },
  fetchCategory(payload) {
    return api.get('/categories/' + payload)
  },
  storeCategory(payload) {
    return api.post('/categories', payload)
  },
  updateCategory(payload) {
    return api.put('/categories/' + payload.id, payload.data)
  },
  removeCategory(payload) {
    return api.delete('/categories/' + payload)
  },
}
