import axios from 'axios'
import { authService } from './auth.service'

// Create axios instance with base configuration
export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
})

// Add request interceptor to add authorization header
api.interceptors.request.use(config => {
	const token = authService.getAccessToken()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// Add response interceptor to handle errors
api.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			// Handle unauthorized error (e.g., redirect to login)
			authService.logout()
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)
