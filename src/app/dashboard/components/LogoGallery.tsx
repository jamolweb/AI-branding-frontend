'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import { Logo } from '@/types/logo'
import axios from 'axios'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LogoGallery() {
	const [myLogos, setMyLogos] = useState<Logo[]>([])
	const [favoriteStatus, setFavoriteStatus] = useState<Record<string, boolean>>(
		{}
	)

	useEffect(() => {
		fetchMyLogos()
		fetchFavoriteStatuses()
	}, [])

	const fetchMyLogos = async () => {
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.get(`${API_URL}/logo/my-logos`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setMyLogos(response.data)
		} catch (error) {
			console.error('Error fetching my logos:', error)
		}
	}

	const fetchFavoriteStatuses = async () => {
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.get(`${API_URL}/logo/favorites`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
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
			const accessToken = authService.getAccessToken()
			if (favoriteStatus[logoId]) {
				await axios.delete(`${API_URL}/logo/favorites/${logoId}`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
			} else {
				await axios.post(
					`${API_URL}/logo/favorites`,
					{ logoId },
					{ headers: { Authorization: `Bearer ${accessToken}` } }
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

	const cardStyle = {
		background:
			'radial-gradient(79.58% 79.58% at 50% 20.42%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
		borderRadius: '12px',
		boxShadow:
			'rgba(255, 255, 255, 0.15) 0px 1px 0px 1px inset, rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px',
	}

	return (
		<div style={cardStyle} className='p-6'>
			<h2 className='text-[rgba(255,255,255,0.4)] mb-4 uppercase text-sm font-medium'>
				Recent Logos
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{myLogos.slice(0, 6).map(logo => (
					<div key={logo.id} className='relative group'>
						<div className='relative w-full h-48'>
							<Image
								src={logo.imageUrl}
								alt={logo.prompt}
								fill
								className='object-cover rounded-lg'
							/>
						</div>
						<div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
							<button
								onClick={() => toggleFavorite(logo.id)}
								className={`p-2 rounded-full transition-colors ${
									favoriteStatus[logo.id]
										? 'bg-[rgb(239,252,118)] text-black'
										: 'bg-white text-black hover:bg-[rgb(239,252,118)]'
								}`}
							>
								<Heart
									className='w-5 h-5'
									fill={favoriteStatus[logo.id] ? 'currentColor' : 'none'}
								/>
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
	)
}
