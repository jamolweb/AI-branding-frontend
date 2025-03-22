import { useEffect, useState } from 'react'
import ServiceList from './ServiceList'

const AIConsulting = () => {
	const [scale, setScale] = useState('0.7')

	useEffect(() => {
		const updateScale = () => {
			if (typeof window !== 'undefined') {
				setScale(window.innerWidth < 768 ? '1.2' : '0.7')
			}
		}

		updateScale()

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateScale)
			return () => window.removeEventListener('resize', updateScale)
		}
	}, [])

	return (
		<div className='flex flex-col flex-nowrap items-start content-start justify-start gap-4 bg-[#effc76] rounded-2xl p-6 lg:p-9 h-full w-full relative overflow-hidden will-change-transform'>
			<div className='relative z-10'>
				{/* Header */}
				<h3 className='text-2xl lg:text-3xl font-manrope font-semibold tracking-tight text-black'>
					AI Consulting
				</h3>

				{/* List of services */}
				<ServiceList
					items={['AI strategy', 'AI readiness', 'ROI analysis']}
					textColor='text-black'
					bulletColor='black'
					fontSize='text-base lg:text-lg mt-4'
				/>
			</div>

			{/* 3D Cube Illustration */}
			<div
				className='absolute -bottom-8 -right-8 w-32 h-32 md:w-40 md:h-40'
				style={{ transform: `scale(${scale})` }}
			>
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 200 200'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g transform='translate(100, 100)'>
						{/* Cube faces */}
						<path
							d='M0,-50 L43.3,-25 L43.3,25 L0,50 L-43.3,25 L-43.3,-25 Z'
							fill='none'
							stroke='rgba(0,0,0,0.5)'
							strokeWidth='2'
						/>
						<path
							d='M0,-50 L43.3,-25 L0,0 L-43.3,-25 Z'
							fill='rgba(0,0,0,0.1)'
							stroke='rgba(0,0,0,0.5)'
							strokeWidth='2'
						/>
						<path
							d='M43.3,-25 L43.3,25 L0,50 L0,0 Z'
							fill='rgba(0,0,0,0.2)'
							stroke='rgba(0,0,0,0.5)'
							strokeWidth='2'
						/>
						<path
							d='M0,0 L0,50 L-43.3,25 L-43.3,-25 Z'
							fill='rgba(0,0,0,0.3)'
							stroke='rgba(0,0,0,0.5)'
							strokeWidth='2'
						/>
					</g>
				</svg>
			</div>
		</div>
	)
}

export default AIConsulting
