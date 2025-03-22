import ServiceList from './ServiceList'

const PredictiveAnalytics = () => {
	return (
		<div className='bg-black rounded-lg p-4 lg:p-6 shadow-md flex flex-col gap-3 h-full'>
			{/* Header */}
			<h3 className='text-2xl lg:text-3xl font-manrope font-semibold tracking-tight text-white'>
				Predictive Analytics
			</h3>

			{/* List of services */}
			<ServiceList
				items={[
					'demand forecasting',
					'risk assessment',
					'time series forecasting',
				]}
			/>

			{/* Graph Visualization */}
			<div className='relative flex-1 mt-4' style={{ minHeight: '120px' }}>
				<div
					className='absolute inset-0 flex items-end'
					style={{ height: '100px' }}
				>
					<svg
						className='w-full h-full'
						viewBox='0 0 400 200'
						preserveAspectRatio='none'
						style={{ maxHeight: '100px' }}
					>
						{/* Green line (Fluctus) */}
						<path
							d='M 0,160 Q 100,140 200,100 T 400,20'
							fill='none'
							stroke='#90EE90'
							strokeWidth='2'
						/>
						{/* Dots on the green line */}
						<circle cx='200' cy='100' r='3' fill='#90EE90' />
						<circle cx='300' cy='50' r='3' fill='#90EE90' />
						<circle cx='400' cy='20' r='3' fill='#90EE90' />

						{/* Gray line (competitors) */}
						<path
							d='M 0,180 Q 100,170 200,160 T 400,140'
							fill='none'
							stroke='#4A4A4A'
							strokeWidth='2'
						/>
					</svg>

					{/* Legend */}
					<div className='absolute top-0 right-0 flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<div className='w-2 h-2 rounded-full bg-[#90EE90]'></div>
							<span className='text-white text-xs lg:text-sm'>Fluctus</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-2 h-2 rounded-full bg-[#4A4A4A]'></div>
							<span className='text-white text-xs lg:text-sm'>competitors</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PredictiveAnalytics
