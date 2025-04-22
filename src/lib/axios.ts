import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add a request interceptor to add the auth token
axiosInstance.interceptors.request.use(
	config => {
		// Get the token from localStorage or your auth state management
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default axiosInstance
