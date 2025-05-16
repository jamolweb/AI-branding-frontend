'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import { Logo } from '@/types/logo'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LogoCard from '../components/LogoCard'
import ImageModal from '../components/ImageModal'
import { api } from '@/services/api'

export default function MyLogosPage() {
	const [myLogos, setMyLogos] = useState<Logo[]>([])
	const [favoriteStatus, setFavoriteStatus] = useState<Record<string, boolean>>(
		{}
	)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	useEffect(() => {
		fetchMyLogos()
		fetchFavoriteStatuses()
	}, [])

	const fetchMyLogos = async () => {
		try {
			const response = await api.get(`${API_URL}/logo/my-logos`)
			setMyLogos(response.data)
		} catch (error) {
			console.error('Error fetching my logos:', error)
		}
	}

	const fetchFavoriteStatuses = async () => {
		try {
			const response = await api.get(`${API_URL}/logo/favorites`)
			const statusMap: Record<string, boolean> = {}
			response.data.forEach((item: { logo: Logo }) => {
				statusMap[item.logo.id] = true
			})
			setFavoriteStatus(statusMap)
		} catch (error) {
			console.error('Error fetching favorite statuses:', error)
		}
	}

	const toggleFavorite = async (logoId: string) => {
		try {
			if (favoriteStatus[logoId]) {
				await api.delete(`${API_URL}/logo/favorites/${logoId}`)
			} else {
				await api.post(
					`${API_URL}/logo/favorites`,
					{ logoId }
				)
			}

			// Update favorite status
			setFavoriteStatus(prev => ({
				...prev,
				[logoId]: !prev[logoId],
			}))
		} catch (error) {
			console.error('Error toggling favorite:', error)
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

	const handleDelete = async (logoId: string) => {
		try {
			await api.delete(`${API_URL}/logo/${logoId}`)
			// Remove from state
			setMyLogos(prev => prev.filter(logo => logo.id !== logoId))
		} catch (error) {
			console.error('Error deleting logo:', error)
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
			<h1 className='text-2xl font-semibold text-white'>My Logos</h1>

			<div style={cardStyle} className='p-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{myLogos.map(logo => (
						<LogoCard
							key={logo.id}
							image={logo.imageUrl}
							logoId={logo.id}
							prompt={logo.prompt}
							createdAt={logo.createdAt}
							favoritesCount={logo._count.favoritedBy}
							isFavorite={favoriteStatus[logo.id]}
							onView={setSelectedImage}
							onDownload={handleDownload}
							onDelete={handleDelete}
							onToggleFavorite={toggleFavorite}
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
