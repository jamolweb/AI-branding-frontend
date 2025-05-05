'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import { FavoriteLogo } from '@/types/logo'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LogoCard from '../components/LogoCard'
import ImageModal from '../components/ImageModal'

export default function FavoritesPage() {
	const [favoriteLogos, setFavoriteLogos] = useState<FavoriteLogo[]>([])
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
						<LogoCard
							key={logo.id}
							image={logo.imageUrl}
							logoId={logo.id}
							prompt={logo.prompt}
							createdAt={logo.createdAt}
							favoritesCount={logo._count.favoritedBy}
							isFavorite={true}
							onView={setSelectedImage}
							onDownload={handleDownload}
							onDelete={handleDelete}
							onToggleFavorite={removeFavorite}
						/>
					))}
				</div>
				{selectedImage && (
					<ImageModal
						imageUrl={selectedImage}
						onClose={() => setSelectedImage(null)}
					/>
				)}
			</div>
		</div>
	)
}
