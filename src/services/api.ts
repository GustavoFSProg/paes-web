import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:3001',

  baseURL: 'https://happy-nlw3-app.herokuapp.com/',
})

export default api
