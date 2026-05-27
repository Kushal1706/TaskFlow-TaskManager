import axios from 'axios'

// Base URL points to our backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default API