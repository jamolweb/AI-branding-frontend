import { API_URL } from '@/env'
import axiosInstance from '@/lib/axios'
import {
	Brandbook,
	CreateBrandbookRequest,
	GenerateLogoRequest,
	UpdateBrandbookRequest,
} from '@/types/brandbook'
import axios from 'axios'
import { authService } from './auth.service'

export const brandbookService = {
	async list(): Promise<Brandbook[]> {
		const accessToken = authService.getAccessToken()
		const { data } = await axiosInstance.get(`${API_URL}/brandbook`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		return data
	},

	async get(id: string): Promise<Brandbook> {
		const accessToken = authService.getAccessToken()
		const { data } = await axiosInstance.get(`${API_URL}/brandbook/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		return data
	},

	async generateLogo(data: GenerateLogoRequest): Promise<{ logoUrl: string }> {
		const accessToken = authService.getAccessToken()
		const { data: responseData } = await axiosInstance.post(
			`${API_URL}/generate-logo`,
			data,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		return responseData
	},

	async create(data: CreateBrandbookRequest): Promise<Brandbook> {
		const accessToken = authService.getAccessToken()
		const formData = new FormData()

		// Add all text fields
		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'logo' && value !== undefined) {
				formData.append(key, value.toString())
			}
		})

		// Add logo file if present
		if (data.logo) {
			formData.append('logo', data.logo)
		}

		const response = await axiosInstance.post<Brandbook>(
			'/brandbook',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)

		return response.data
	},

	async update(id: string, data: UpdateBrandbookRequest): Promise<Brandbook> {
		const accessToken = authService.getAccessToken()
		const formData = new FormData()

		// Handle logo generation or upload
		if (data.generateLogo && data.companyName) {
			try {
				const { logoUrl } = await this.generateLogo({
					companyName: data.companyName,
					industry: data.industry,
					description: data.description,
					preferredColor: data.preferredColor,
				})

				const logoResponse = await axios.get(logoUrl, {
					responseType: 'blob',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				const logoFile = new File([logoResponse.data], 'generated-logo.png', {
					type: 'image/png',
				})
				formData.append('logo', logoFile)
			} catch (error: any) {
				throw new Error(
					'Failed to generate logo: ' + (error.message || 'Unknown error')
				)
			}
		} else if (data.logo) {
			formData.append('logo', data.logo)
		}

		// Append other form data
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && key !== 'logo' && key !== 'generateLogo') {
				formData.append(key, value.toString())
			}
		})

		const { data: responseData } = await axiosInstance.patch(
			`${API_URL}/brandbook/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)

		return responseData
	},

	async delete(id: string): Promise<void> {
		const accessToken = authService.getAccessToken()
		await axiosInstance.delete(`${API_URL}/brandbook/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
	},

	async regenerate(id: string): Promise<Brandbook> {
		const accessToken = authService.getAccessToken()
		const response = await axiosInstance.post<Brandbook>(
			`/brandbook/${id}/regenerate`
		)
		return response.data
	},

	async getPdf(id: string): Promise<{ pdfUrl: string }> {
		const accessToken = authService.getAccessToken()
		const { data } = await axiosInstance.get(`${API_URL}/brandbook/${id}/pdf`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		return data
	},
}
