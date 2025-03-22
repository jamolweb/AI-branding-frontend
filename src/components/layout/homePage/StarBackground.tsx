'use client'

import { useEffect, useState } from 'react'

interface Star {
	id: number
	left: string
	top: string
	size: number
	delay: string
	opacity: number
	duration: string
	pattern: number
}

const StarBackground = () => {
	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		const generateStars = () => {
			const newStars = []
			const count =
				typeof window !== 'undefined' ? Math.floor(window.innerWidth / 12) : 50

			for (let i = 0; i < count; i++) {
				newStars.push({
					id: i,
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
					size: Math.random() * 1.5 + 1,
					delay: `-${Math.random() * 5}s`,
					duration: `${Math.random() * 5 + 15}s`,
					opacity: Math.random() * 0.5 + 0.2,
					pattern: Math.floor(Math.random() * 8),
				})
			}

			setStars(newStars)
		}

		generateStars()

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', generateStars)
			return () => window.removeEventListener('resize', generateStars)
		}
	}, [])

	return (
		<div className='absolute inset-0'>
			{stars.map(star => (
				<div
					key={star.id}
					className='absolute rounded-full'
					style={{
						left: star.left,
						top: star.top,
						width: `${star.size}px`,
						height: `${star.size}px`,
						opacity: star.opacity,
						backgroundColor: 'rgb(239, 252, 118)',
						boxShadow: `0 0 ${star.size * 2}px rgba(239, 252, 118, 0.3)`,
						animation: `floatStar${star.pattern} ${star.duration} linear infinite`,
						animationDelay: star.delay,
					}}
				/>
			))}
		</div>
	)
}

export default StarBackground
