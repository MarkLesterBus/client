import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

export default {
  fetchtUsers() {
    return api.get('/users')
  },
  fetchUser(payload) {
    return api.get('/users/' + payload)
  },
  storeUser(payload) {
    return api.post('/users', payload)
  },
  updateUser(payload) {
    return api.put('/users/' + payload.id, payload.data)
  },
  removeUser(payload) {
    return api.delete('/users/' + payload)
  },

  uploadImage(payload) {
    let data = new FormData()
    data.append('image', payload.image)
    return api.post('/users/' + payload.id, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
