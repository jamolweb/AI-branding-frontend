'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import { FavoriteLogo } from '@/types/logo'
import axios from 'axios'
import { Download, Heart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function FavoritesPage() {
	const [favoriteLogos, setFavoriteLogos] = useState<FavoriteLogo[]>([])

	useEffect(() => {
		fetchFavoriteLogos()
	}, [])

	const fetchFavoriteLogos = async () => {
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.get(`${API_URL}/logo/favorites`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setFavoriteLogos(response.data)
		} catch (error) {
			console.error('Error fetching favorite logos:', error)
		}
	}

	const removeFavorite = async (logoId: string) => {
		try {
			const accessToken = authService.getAccessToken()
			await axios.delete(`${API_URL}/logo/favorites/${logoId}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			})
			// Remove from state
			setFavoriteLogos(prev => prev.filter(item => item.logo.id !== logoId))
		} catch (error) {
			console.error('Error removing favorite:', error)
		}
	}

	const handleDelete = async (logoId: string) => {
		try {
			const accessToken = authService.getAccessToken()
			await axios.delete(`${API_URL}/logo/${logoId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			// Remove from state
			setFavoriteLogos(prev => prev.filter(item => item.logo.id !== logoId))
		} catch (error) {
			console.error('Error deleting logo:', error)
		}
	}

	const handleDownload = async (imageUrl: string) => {
		try {
			const response = await fetch(imageUrl)
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'logo.png'
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch (error) {
			console.error('Error downloading image:', error)
		}
	}

	const cardStyle = {
		background:
			'radial-gradient(79.58% 79.58% at 50% 20.42%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
		borderRadius: '12px',
		boxShadow:
			'rgba(255, 255, 255, 0.15) 0px 1px 0px 1px inset, rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px',
	}

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-semibold text-white'>Favorite Logos</h1>

			<div style={cardStyle} className='p-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{favoriteLogos.map(({ logo }) => (
						<div key={logo.id} className='relative group'>
							<div className='relative w-full h-48'>
								<Image
									src={logo.imageUrl}
									alt={logo.prompt}
									fill
									className='object-cover rounded-lg'
								/>
							</div>
							<div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-3'>
								<button
									onClick={() => handleDownload(logo.imageUrl)}
									className='p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-colors'
									title='Download'
								>
									<Download className='w-5 h-5 text-black' />
								</button>
								<button
									onClick={() => removeFavorite(logo.id)}
									className='p-2 rounded-full bg-[rgb(239,252,118)] text-black transition-colors'
									title='Remove from favorites'
								>
									<Heart className='w-5 h-5' fill='currentColor' />
								</button>
								<button
									onClick={() => handleDelete(logo.id)}
									className='p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-colors'
									title='Delete'
								>
									<Trash2 className='w-5 h-5 text-black' />
								</button>
							</div>
							<div className='mt-2'>
								<p className='text-white text-sm truncate'>{logo.prompt}</p>
								<p className='text-[rgba(255,255,255,0.4)] text-xs'>
									{new Date(logo.createdAt).toLocaleDateString()}
								</p>
								<p className='text-[rgba(255,255,255,0.4)] text-xs'>
									{logo._count.favoritedBy}{' '}
									{logo._count.favoritedBy === 1 ? 'favorite' : 'favorites'}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
