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
	constructor() { }

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			const response = await axios.post<AuthResponse>(
				`${API_URL}/auth/login`,
				credentials,
				{ withCredentials: true }
			)

			setTimeout(() => this.checkCookiesAfterLogin(), 500);

			if (typeof window !== 'undefined') {
				localStorage.setItem('isAuthenticated', 'true');
				console.log('Set authentication state in localStorage');
			}

			this.setAuthenticated(true);
			return response.data;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	}

	private checkCookiesAfterLogin(): void {
		const accessToken = this.getCookie('access_token');
		const refreshToken = this.getCookie('refresh_token');

		console.log('===== COOKIE CHECK AFTER LOGIN =====');
		console.log('access_token present:', !!accessToken);
		console.log('refresh_token present:', !!refreshToken);
		console.log('All cookies:', document.cookie);
		console.log('===================================');

		if (!accessToken || !refreshToken) {
			console.warn('WARNING: Authentication cookies not properly set after login!');
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
				try {
					await this.refreshToken()
					return await this.getProfile()
				} catch (refreshError) {
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

			if (typeof window !== 'undefined') {
				localStorage.removeItem('isAuthenticated');
				console.log('Cleared authentication state from localStorage');
			}

			this.setAuthenticated(false)
			window.location.href = '/auth/signin'
		} catch (error) {
			console.error('Logout error:', error)

			if (typeof window !== 'undefined') {
				localStorage.removeItem('isAuthenticated');
			}

			this.setAuthenticated(false)
			window.location.href = '/auth/signin'
		}
	}

	private authenticated: boolean | null = null

	isAuthenticated(): boolean {
		if (this.authenticated !== null) {
			console.log('Using cached authentication state:', this.authenticated);
			return this.authenticated;
		}

		const accessToken = this.getCookie('access_token');
		const refreshToken = this.getCookie('refresh_token');

		console.log('Cookie check - access_token:', !!accessToken, 'refresh_token:', !!refreshToken);

		let isAuth = !!(accessToken && refreshToken);

		if (!isAuth && typeof window !== 'undefined') {
			const localStorageAuth = localStorage.getItem('isAuthenticated');
			if (localStorageAuth === 'true') {
				console.log('Using localStorage authentication as fallback');
				isAuth = true;
			}
		}

		this.authenticated = isAuth;

		return isAuth;
	}

	private getCookie(name: string): string | null {
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			console.log('Not in browser environment, cannot access cookies');
			return null;
		}

		console.log('All cookies:', document.cookie);

		try {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);

			if (parts.length === 2) {
				const cookieValue = parts.pop()?.split(';').shift() || null;
				console.log(`Cookie '${name}' found with value:`, cookieValue ? 'exists' : 'null');
				return cookieValue;
			}

			const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
			if (match) {
				const cookieValue = match[2];
				console.log(`Cookie '${name}' found with alternative method:`, cookieValue ? 'exists' : 'null');
				return cookieValue;
			}

			console.log(`Cookie '${name}' not found`);
			return null;
		} catch (error) {
			console.error('Error parsing cookie:', error);
			return null;
		}
	}

	setAuthenticated(value: boolean | null): void {
		this.authenticated = value
		console.log('Authentication state set to:', value)
	}

	initiateGoogleLogin(): void {
		localStorage.setItem('googleLoginAttempt', 'true');
		window.location.href = `${API_URL}/auth/google`
	}

	handleGoogleCallback(): void {
		console.log('Handling Google callback');

		if (localStorage.getItem('googleLoginAttempt') === 'true') {
			localStorage.removeItem('googleLoginAttempt');

			localStorage.setItem('isAuthenticated', 'true');
			this.setAuthenticated(true);
			console.log('Google authentication successful, set in localStorage');
		}
	}
}

export const authService = new AuthService()
