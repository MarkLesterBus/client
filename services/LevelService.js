import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

export default {
  fetchLevels() {
    return api.get('/levels')
  },
  fetchLevel(payload) {
    return api.get('/levels/' + payload)
  },
  storeLevel(payload) {
    return api.post('/levels', payload)
  },
  updateLevel(payload) {
    return api.put('/levels/' + payload.id, payload.data)
  },
  removeLevel(payload) {
    return api.delete('/levels/' + payload)
  },
}
