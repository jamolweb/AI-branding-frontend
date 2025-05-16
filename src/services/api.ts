import axios from 'axios'
import { API_URL } from '@/env'

// Create axios instance with base configuration
export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true, // This enables sending cookies with requests
})

// Track if we're currently refreshing the token
let isRefreshing = false
let failedQueue: { resolve: Function; reject: Function }[] = []

// Process the failed requests queue
const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(promise => {
		if (error) {
			promise.reject(error)
		} else {
			promise.resolve()
		}
	})
	
	failedQueue = []
}

// Add response interceptor to handle errors and token refresh
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		
		// If error is 401 and we haven't tried to refresh the token yet
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If we're already refreshing, add this request to the queue
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(() => {
						return api(originalRequest)
					})
					.catch(err => {
						return Promise.reject(err)
					})
			}
			
			originalRequest._retry = true
			isRefreshing = true
			
			// Try to refresh the token
			try {
				await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true })
				
				// Process any requests that were waiting
				processQueue(null)
				isRefreshing = false
				
				// Retry the original request
				return api(originalRequest)
			} catch (refreshError) {
				// If refresh fails, process the queue with error
				processQueue(refreshError)
				isRefreshing = false
				
				// Redirect to login page
				window.location.href = '/auth/signin'
				return Promise.reject(refreshError)
			}
		}
		
		return Promise.reject(error)
	}
)
