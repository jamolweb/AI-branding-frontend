import { API_URL } from '@/env'
import axios from 'axios'

interface LoginCredentials {
	email: string
	password: string
}

interface RegisterCredentials extends LoginCredentials {
	name: string
}

interface AuthResponse {
	message: string
}

interface UserProfile {
	id: string
	email: string
	name: string
	role: string
	googleId: string | null
	createdAt: string
	updatedAt: string
}

class AuthService {
	constructor() {}

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			const response = await axios.post<AuthResponse>(
				`${API_URL}/auth/login`,
				credentials,
				{ withCredentials: true }
			)
			this.setAuthenticated(true)
			return response.data
		} catch (error) {
			console.error('Login error:', error)
			throw error
		}
	}

	async register(credentials: RegisterCredentials): Promise<AuthResponse> {
		try {
			const response = await axios.post<AuthResponse>(
				`${API_URL}/auth/register`,
				credentials,
				{ withCredentials: true }
			)
			this.setAuthenticated(true)
			return response.data
		} catch (error) {
			console.error('Register error:', error)
			throw error
		}
	}

	async refreshToken(): Promise<AuthResponse> {
		try {
			const response = await axios.post<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{},
				{ withCredentials: true }
			)
			return response.data
		} catch (error) {
			console.error('Token refresh error:', error)
			this.setAuthenticated(false)
			throw error
		}
	}

	async getProfile(): Promise<UserProfile> {
		try {
			const response = await axios.get<UserProfile>(`${API_URL}/auth/profile`, {
				withCredentials: true,
			})
			this.setAuthenticated(true)
			return response.data
		} catch (error) {
			console.error('Error getting profile:', error)
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				// Try to refresh the token
				try {
					await this.refreshToken()
					// Try the original request again
					return await this.getProfile()
				} catch (refreshError) {
					// If refresh fails, redirect to login
					this.setAuthenticated(false)
					window.location.href = '/auth/signin'
					throw error
				}
			}
			throw error
		}
	}

	async logout() {
		try {
			await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
			this.setAuthenticated(false)
			// Redirect to login page
			window.location.href = '/auth/signin'
		} catch (error) {
			console.error('Logout error:', error)
			// Even if server-side logout fails, we'll redirect to login
			this.setAuthenticated(false)
			window.location.href = '/auth/signin'
		}
	}

	private authenticated: boolean | null = null

	isAuthenticated(): boolean {
		// If we have a cached value, return it
		if (this.authenticated !== null) {
			return this.authenticated
		}

		// Default to false and let the API interceptor handle redirects if needed
		return false
	}

	// Call this method to explicitly set authentication state
	setAuthenticated(value: boolean): void {
		this.authenticated = value
	}

	initiateGoogleLogin(): void {
		window.location.href = `${API_URL}/auth/google`
	}
}

export const authService = new AuthService()
