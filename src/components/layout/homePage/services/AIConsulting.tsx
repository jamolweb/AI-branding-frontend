import ServiceList from './ServiceList'

const AIConsulting = () => {
	return (
		<div className='col-span-1 row-span-1 flex flex-col flex-nowrap items-start content-start justify-start gap-4 bg-[#effc76] rounded-2xl p-9 h-full w-full relative overflow-hidden self-start justify-self-start will-change-transform'>
			<div className='relative z-10'>
				{/* Header */}
				<h3
					style={{
						fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
						fontSize: '30px',
						fontStyle: 'normal',
						fontWeight: 600,
						letterSpacing: '-0.03em',
						lineHeight: '1.2em',
						textAlign: 'start',
						color: 'black',
						textDecoration: 'none',
					}}
				>
					AI Consulting
				</h3>

				{/* List of services */}
				<ServiceList
					items={['AI strategy', 'AI readiness', 'ROI analysis']}
					textColor='text-black'
					bulletColor='black'
					fontSize='text-lg mt-4'
				/>
			</div>

			{/* 3D Cube Illustration */}
			<div className='absolute right-3 bottom-5 w-3/5 h-3/5'>
				<svg
					className='w-full h-full'
					viewBox='0 0 120 120'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					style={{
						transform: 'translate(20%, 20%) scale(0.7)',
						opacity: 0.8,
					}}
				>
					{/* Front face */}
					<path
						d='M30,60 L90,60 L90,120 L30,120 Z'
						fill='black'
						fillOpacity='0.1'
						stroke='black'
						strokeWidth='2'
					/>
					{/* Right face */}
					<path
						d='M90,60 L120,30 L120,90 L90,120 Z'
						fill='black'
						fillOpacity='0.05'
						stroke='black'
						strokeWidth='2'
					/>
					{/* Top face */}
					<path
						d='M30,60 L90,60 L120,30 L60,30 Z'
						fill='black'
						fillOpacity='0.15'
						stroke='black'
						strokeWidth='2'
					/>
				</svg>
			</div>
		</div>
	)
}

export default AIConsulting
