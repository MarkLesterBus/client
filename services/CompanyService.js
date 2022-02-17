import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

export default {
  companies() {
    return api.get('/companies')
  },
  company(payload) {
    return api.get('/companies/' + payload)
  },
  save(payload) {
    return api.post('/companies', payload)
  },
  update(payload) {
    return api.put('/companies/' + payload.id, payload.data)
  },
  remove(payload) {
    return api.delete('/companies/' + payload)
  },

  upload(payload) {
    let data = new FormData()
    data.append('logo', payload.logo)
    return api.post('/companies/' + payload.id, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
