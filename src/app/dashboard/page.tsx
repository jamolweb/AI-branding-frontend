'use client'

import { authService } from '@/services/auth.service'
import { FavoriteLogo, Logo } from '@/types/logo'
import axios from 'axios'
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import { Box, Clock, Heart, ImageIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import LogoGallery from './components/LogoGallery'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)

const modelPerformance = [
	{ name: 'Customer-Pred-01', accuracy: '94.2%', status: 'Active' },
	{ name: 'Vision-Detect-03', accuracy: '92.8%', status: 'Active' },
	{ name: 'NLP-Sentiment-02', accuracy: '88.3%', status: 'Active' },
]

const serviceHealth = [
	{ name: 'Machine Learning Pipeline', latency: '45ms', status: 'Operational' },
	{ name: 'Computer Vision API', latency: '62ms', status: 'Operational' },
	{ name: 'NLP Services', latency: '33ms', status: 'Operational' },
	{ name: 'Edge AI systems', latency: '95ms', status: 'Degraded' },
]

const trainingJobs = [
	{ name: 'Customer Churn Model', progress: 78 },
	{ name: 'Object Detection', progress: 68 },
	{ name: 'Sentiment Analysis', progress: 92 },
]

const uptimeData = {
	labels: ['6 Oct', '11 Oct', '16 Oct', '23 Oct', '28 Oct', '2 Nov', '7 Nov'],
	datasets: [
		{
			fill: true,
			label: 'Uptime %',
			data: [99.9, 100, 99.8, 99.85, 99.8, 99.9, 100],
			borderColor: 'rgb(239, 252, 118)',
			backgroundColor: 'rgba(239, 252, 118, 0.1)',
			tension: 0.4,
		},
	],
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			min: 99.7,
			max: 100,
			grid: {
				color: 'rgba(255, 255, 255, 0.1)',
			},
			ticks: {
				color: 'rgba(255, 255, 255, 0.8)',
			},
		},
		x: {
			grid: {
				color: 'rgba(255, 255, 255, 0.1)',
			},
			ticks: {
				color: 'rgba(255, 255, 255, 0.8)',
			},
		},
	},
}

const cardStyle = {
	background:
		'radial-gradient(79.58% 79.58% at 50% 20.42%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
	borderRadius: '12px',
	boxShadow:
		'rgba(255, 255, 255, 0.15) 0px 1px 0px 1px inset, rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px',
}

export default function DashboardPage() {
	const [myLogos, setMyLogos] = useState<Logo[]>([])
	const [favoriteLogos, setFavoriteLogos] = useState<FavoriteLogo[]>([])

	useEffect(() => {
		fetchLogoMetrics()
	}, [])

	const fetchLogoMetrics = async () => {
		try {
			const accessToken = authService.getAccessToken()
			const [myLogosRes, favoritesRes] = await Promise.all([
				axios.get(`${API_URL}/logo/my-logos`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				}),
				axios.get(`${API_URL}/logo/favorites`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				}),
			])
			setMyLogos(myLogosRes.data)
			setFavoriteLogos(favoritesRes.data)
		} catch (error) {
			console.error('Error fetching logo metrics:', error)
		}
	}

	return (
		<div className='space-y-6 p-5'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 flex items-center gap-2 uppercase text-sm font-medium'>
						<ImageIcon className='w-4 h-4' />
						My Logos
					</h2>
					<div className='text-3xl font-semibold text-white'>
						{myLogos.length}
					</div>
				</div>

				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 flex items-center gap-2 uppercase text-sm font-medium'>
						<Heart className='w-4 h-4' />
						Favorite Logos
					</h2>
					<div className='text-3xl font-semibold text-white'>
						{favoriteLogos.length}
					</div>
				</div>

				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 flex items-center gap-2 uppercase text-sm font-medium'>
						<Box className='w-4 h-4' />
						Active Models
					</h2>
					<div className='text-3xl font-semibold text-white'>3/3</div>
				</div>
			</div>

			<LogoGallery />

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 uppercase text-sm font-medium'>
						Model Performance
					</h2>
					<div className='space-y-4'>
						{modelPerformance.map(model => (
							<div
								key={model.name}
								className='flex items-center justify-between'
							>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 rounded-full bg-[rgb(239,252,118)]'></div>
									<span className='text-white text-sm'>{model.name}</span>
								</div>
								<div className='flex items-center gap-4'>
									<span className='text-[rgba(255,255,255,0.4)] text-sm'>
										{model.accuracy}
									</span>
									<span className='px-2 py-1 text-xs rounded bg-[rgba(239,252,118,0.1)] text-[rgb(239,252,118)]'>
										{model.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 uppercase text-sm font-medium'>
						Service Health
					</h2>
					<div className='space-y-4'>
						{serviceHealth.map(service => (
							<div
								key={service.name}
								className='flex items-center justify-between'
							>
								<span className='text-white text-sm'>{service.name}</span>
								<div className='flex items-center gap-4'>
									<span className='text-[rgba(255,255,255,0.4)] text-sm'>
										{service.latency}
									</span>
									<span
										className={`px-2 py-1 text-xs rounded ${
											service.status === 'Operational'
												? 'bg-[rgba(239,252,118,0.1)] text-[rgb(239,252,118)]'
												: 'bg-[rgba(255,189,89,0.1)] text-[rgb(255,189,89)]'
										}`}
									>
										{service.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div style={cardStyle} className='lg:col-span-2 p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 flex items-center gap-2 uppercase text-sm font-medium'>
						<Clock className='w-4 h-4' />
						Services Uptime
					</h2>
					<Line options={options} data={uptimeData} height={80} />
				</div>

				<div style={cardStyle} className='p-6'>
					<h2 className='text-[rgba(255,255,255,0.4)] mb-4 uppercase text-sm font-medium'>
						Training Jobs
					</h2>
					<div className='space-y-6'>
						{trainingJobs.map(job => (
							<div key={job.name} className='space-y-2'>
								<div className='flex justify-between text-sm'>
									<span className='text-white'>{job.name}</span>
									<span className='text-[rgba(255,255,255,0.4)]'>
										{job.progress}%
									</span>
								</div>
								<div className='h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden'>
									<div
										className='h-full bg-[rgb(239,252,118)] rounded-full'
										style={{ width: `${job.progress}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
