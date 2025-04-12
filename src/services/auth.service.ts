import { API_URL } from '@/env'
import axios, { AxiosError } from 'axios'

declare module 'axios' {
	export interface InternalAxiosRequestConfig {
		_retry?: boolean
	}
}

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

		this.api.interceptors.response.use(
			response => response,
			async (error: AxiosError) => {
				const originalRequest = error.config
				const status = error.response?.status

				if (status === 401 && originalRequest && !originalRequest._retry) {
					originalRequest._retry = true

					try {
						await this.refreshToken()

						const newToken = this.getAccessToken()
						if (newToken) {
							originalRequest.headers.Authorization = `Bearer ${newToken}`
							return axios(originalRequest)
						}

						this.logout()
						throw new Error('No access token after refresh')
					} catch (refreshError) {
						if (refreshError instanceof AxiosError) {
							const refreshStatus = refreshError.response?.status
							if (refreshStatus === 401 || refreshStatus === 500) {
								this.logout()
							}
						}
						return Promise.reject(refreshError)
					}
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
		if (this.refreshPromise) {
			return this.refreshPromise
		}

		const refreshToken = this.getRefreshToken()
		if (!refreshToken) {
			throw new Error('No refresh token available')
		}

		this.refreshPromise = (async () => {
			try {
				const response = await axios.post<AuthTokens>(
					`${API_URL}/auth/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
							'Content-Type': 'application/json',
						},
					}
				)

				if (response.data.accessToken && response.data.refreshToken) {
					this.setTokens(response.data)
					return response.data
				}
				throw new Error('Invalid token response')
			} catch (error) {
				if (error instanceof AxiosError) {
					const status = error.response?.status
					if (status === 401 || status === 500) {
						this.clearTokens()
					}
				}
				throw error
			} finally {
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
		if (this.storage && tokens.accessToken && tokens.refreshToken) {
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
