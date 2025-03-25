import axios from 'axios'

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
			async error => {
				const originalRequest = error.config

				// If error is 401 and we haven't tried refreshing yet
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true

					try {
						const refreshToken = this.getRefreshToken()
						if (!refreshToken) {
							// No refresh token available, redirect to login
							this.logout()
							window.location.href = '/auth/signin'
							return Promise.reject(error)
						}

						// Try to refresh the token
						const response = await axios.post(
							`${API_URL}/auth/refresh`,
							{},
							{
								headers: {
									Authorization: `Bearer ${refreshToken}`,
								},
							}
						)

						const { accessToken, refreshToken: newRefreshToken } = response.data

						// Save new tokens
						this.setTokens({
							accessToken,
							refreshToken: newRefreshToken,
						})

						// Update Authorization header
						originalRequest.headers.Authorization = `Bearer ${accessToken}`

						// Retry the original request
						return this.api(originalRequest)
					} catch (refreshError) {
						// If refresh token is invalid or expired
						this.logout()
						window.location.href = '/auth/signin'
						return Promise.reject(refreshError)
					}
				}
				return Promise.reject(error)
			}
		)
	}

	async login(credentials: LoginCredentials): Promise<AuthTokens> {
		const response = await this.api.post<AuthTokens>('/auth/login', credentials)
		this.setTokens(response.data)
		return response.data
	}

	async register(credentials: RegisterCredentials): Promise<AuthTokens> {
		const response = await this.api.post<AuthTokens>(
			'/auth/register',
			credentials
		)
		this.setTokens(response.data)
		return response.data
	}

	async getProfile(): Promise<UserProfile> {
		const response = await this.api.get<UserProfile>('/auth/profile')
		return response.data
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

	private getRefreshToken(): string | null {
		return this.storage ? this.storage.getItem(this.REFRESH_TOKEN_KEY) : null
	}

	isAuthenticated(): boolean {
		return !!this.getAccessToken()
	}

	logout(): void {
		if (this.storage) {
			this.storage.removeItem(this.ACCESS_TOKEN_KEY)
			this.storage.removeItem(this.REFRESH_TOKEN_KEY)
		}
		window.location.href = '/auth/signin'
	}
}

export const authService = new AuthService()
