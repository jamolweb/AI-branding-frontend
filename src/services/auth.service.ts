import axios, { AxiosError } from 'axios'

// Extend AxiosRequestConfig to include _retry
declare module 'axios' {
	export interface InternalAxiosRequestConfig {
		_retry?: boolean
	}
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials extends LoginCredentials {
	name: string
}

export interface AuthTokens {
	accessToken: string
	refreshToken: string
}

export interface UserProfile {
	id: string
	email: string
	name: string
	role: string
}

class AuthService {
	private storage = typeof window !== 'undefined' ? window.localStorage : null
	private readonly ACCESS_TOKEN_KEY = 'access_token'
	private readonly REFRESH_TOKEN_KEY = 'refresh_token'
	private refreshPromise: Promise<AuthTokens> | null = null

	private api = axios.create({
		baseURL: API_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	constructor() {
		// Add request interceptor to add auth header
		this.api.interceptors.request.use(
			config => {
				const token = this.getAccessToken()
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			error => {
				return Promise.reject(error)
			}
		)

		// Add response interceptor to handle token refresh
		this.api.interceptors.response.use(
			response => response,
			async (error: AxiosError) => {
				const originalRequest = error.config
				const status = error.response?.status

				// Only attempt refresh on 401 errors
				if (status === 401 && originalRequest && !originalRequest._retry) {
					originalRequest._retry = true

					try {
						// Wait for token refresh
						await this.refreshToken()

						// Update Authorization header with new token
						const newToken = this.getAccessToken()
						if (newToken) {
							originalRequest.headers.Authorization = `Bearer ${newToken}`
							return axios(originalRequest)
						}

						this.logout()
						throw new Error('No access token after refresh')
					} catch (refreshError) {
						// If refresh fails with 401 or 500, logout and redirect
						if (refreshError instanceof AxiosError) {
							const refreshStatus = refreshError.response?.status
							if (refreshStatus === 401 || refreshStatus === 500) {
								this.logout()
							}
						}
						return Promise.reject(refreshError)
					}
				}

				// For 500 errors in regular requests, don't logout but propagate the error
				if (status === 500) {
					return Promise.reject(
						new Error('Server error occurred. Please try again later.')
					)
				}

				return Promise.reject(error)
			}
		)
	}

	async login(credentials: LoginCredentials): Promise<AuthTokens> {
		try {
			const response = await this.api.post<AuthTokens>(
				'/auth/login',
				credentials
			)
			this.setTokens(response.data)
			return response.data
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 500) {
					throw new Error('Server error occurred. Please try again later.')
				}
			}
			throw error
		}
	}

	async register(credentials: RegisterCredentials): Promise<AuthTokens> {
		try {
			const response = await this.api.post<AuthTokens>(
				'/auth/register',
				credentials
			)
			this.setTokens(response.data)
			return response.data
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 500) {
					throw new Error('Server error occurred. Please try again later.')
				}
			}
			throw error
		}
	}

	async refreshToken(): Promise<AuthTokens> {
		// If there's already a refresh in progress, return that promise
		if (this.refreshPromise) {
			return this.refreshPromise
		}

		const refreshToken = this.getRefreshToken()
		if (!refreshToken) {
			throw new Error('No refresh token available')
		}

		// Create new refresh promise
		this.refreshPromise = (async () => {
			try {
				const response = await axios.post<AuthTokens>(
					`${API_URL}/auth/refresh`,
					{}, // empty body as per API spec
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
					}
				)

				this.setTokens(response.data)
				return response.data
			} catch (error) {
				// For refresh endpoint, both 401 and 500 should clear tokens
				if (error instanceof AxiosError) {
					const status = error.response?.status
					if (status === 401 || status === 500) {
						this.clearTokens() // Don't redirect here, let the caller handle it
					}
				}
				throw error
			} finally {
				// Clear the promise reference
				this.refreshPromise = null
			}
		})()

		return this.refreshPromise
	}

	async getProfile(): Promise<UserProfile> {
		try {
			const response = await this.api.get<UserProfile>('/auth/profile')
			return response.data
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 500) {
				throw new Error('Server error occurred. Please try again later.')
			}
			throw error
		}
	}

	initiateGoogleLogin(): void {
		window.location.href = `${API_URL}/auth/google`
	}

	setTokens(tokens: AuthTokens): void {
		if (this.storage) {
			this.storage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken)
			this.storage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken)
		}
	}

	getAccessToken(): string | null {
		return this.storage ? this.storage.getItem(this.ACCESS_TOKEN_KEY) : null
	}

	getRefreshToken(): string | null {
		return this.storage ? this.storage.getItem(this.REFRESH_TOKEN_KEY) : null
	}

	private clearTokens(): void {
		if (this.storage) {
			this.storage.removeItem(this.ACCESS_TOKEN_KEY)
			this.storage.removeItem(this.REFRESH_TOKEN_KEY)
		}
	}

	isAuthenticated(): boolean {
		return !!this.getAccessToken()
	}

	logout(): void {
		this.clearTokens()
		window.location.href = '/auth/signin'
	}
}

export const authService = new AuthService()
