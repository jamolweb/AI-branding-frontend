import ServiceList from './ServiceList'

const PredictiveAnalytics = () => {
	return (
		<div className='bg-black rounded-lg p-4 lg:p-6 shadow-md flex flex-col gap-3 h-full overflow-hidden'>
			<h3 className='text-2xl lg:text-3xl font-manrope font-semibold tracking-tight text-white'>
				Predictive Analytics
			</h3>

			<ServiceList
				items={[
					'demand forecasting',
					'risk assessment',
					'time series forecasting',
				]}
			/>

			<div className='relative flex-1 mt-4' style={{ minHeight: '80px' }}>
				<div className='absolute inset-0 flex items-end'>
					<svg viewBox='0 0 473 247' id='svg12770655941'>
						<g>
							<defs>
								<linearGradient
									id='idss12770655941_1g-612809500'
									x1='0.2956078110083522'
									x2='0.7043921889916478'
									y1='0'
									y2='1'
								>
									<stop
										offset='0'
										stopColor='var(--token-3cbb04f2-2290-4da2-9772-d4b5c375eb24, rgba(144, 128, 255, 0.3)) /* {"name":"Primary 200 / 30%"} */'
										stopOpacity='1'
									/>
									<stop
										offset='1'
										stopColor='var(--token-868c61df-fbb8-43e9-9b91-cc8bd8642d34, rgba(144, 128, 255, 0)) /* {"name":"Primary 200 / 0%"} */'
										stopOpacity='1'
									/>
								</linearGradient>
							</defs>
							<path
								d='M 101.123 176.853 C 83.329 184.596 1.304 257.499 1.304 257.499 L 504.736 257.499 L 504.736 -71.254 C 504.736 -71.254 453.959 24.816 440.939 32.307 C 427.919 39.799 398.842 20.85 385.822 27.46 C 372.802 34.07 351.537 92.508 339.385 96.648 C 327.233 100.787 285.57 83.834 268.21 92.241 C 250.85 100.648 204.413 174.033 190.091 180.819 C 175.769 187.606 118.916 169.109 101.123 176.853 Z'
								fill='url(#idss12770655941_1g-612809500)'
								strokeWidth='0.87'
								stroke='var(--token-ca5300d3-baa8-427d-a8e7-4d0f52504e4b, rgb(144, 128, 255)) /* {"name":"Primary 200"} */'
								strokeMiterlimit='10'
							/>
						</g>
					</svg>

					<div className='absolute top-0 right-0 flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<div className='w-2 h-2 rounded-full bg-[#90EE90]'></div>
							<span className='text-white text-xs lg:text-sm'>Brandlly</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-2 h-2 rounded-full bg-[#4A4A4A]'></div>
							<span className='text-white text-xs lg:text-sm'>competitors</span>
						</div>
					</div>
				</div>
				<div
					className='framer-42c8gs'
					style={{
						aspectRatio: '4.279411764705882 / 1',
						bottom: 0,
						flex: 'none',
						height: 'var(--framer-aspect-ratio-supported, 136px)',
						overflow: 'hidden',
						position: 'absolute',
						right: 0,
						width: '97%',
						zIndex: 1,
						opacity: 1,
						transform: 'none',
					}}
				>
					<div className='ssr-variant hidden-1lv2zze hidden-15tntua hidden-72rtr7'>
						<div
							data-framer-component-type='SVG'
							data-framer-name='Vector 2'
							className='framer-1cevd1q'
							aria-hidden='true'
							style={{
								imageRendering: 'pixelated',
								flexShrink: 0,
								backgroundSize: '100% 100%',
								backgroundImage: `url(
								'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%20481%20123%22%3E%3Cg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22idss11782017219_1g-1791190287%22%20x1%3D%220.514636116149919%22%20x2%3D%220.5813117563884389%22%20y1%3D%220.59%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22rgba(94%2C%2094%2C%2094%2C%200.41)%22%20stop-opacity%3D%220.41%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22rgba(94%2C%2094%2C%2094%2C%200.2)%22%20stop-opacity%3D%220.2%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M%2096.034%2066.74%20C%2079.136%2072.037%201.24%20121.908%201.24%20121.908%20L%20479.333%20121.908%20L%20473.151%201.013%20C%20473.151%201.013%20466.144%2053.085%20453.78%2058.21%20C%20441.415%2063.335%20415.038%2041.989%20402.673%2046.511%20C%20390.309%2051.033%20350.33%2084.628%20338.79%2087.459%20C%20327.25%2090.291%20291.805%2040.76%20275.319%2046.511%20C%20258.833%2052.262%20197.835%2082.817%20184.234%2087.459%20C%20170.633%2092.101%20112.932%2061.443%2096.034%2066.74%20Z%22%20fill%3D%22url(%23idss11782017219_1g-1791190287)%22%20stroke%3D%22rgb(95%2C95%2C95)%22%20stroke-miterlimit%3D%2210%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20473.603%201.013%20C%20473.603%201.013%20466.59%2053.085%20454.214%2058.21%20C%20441.838%2063.335%20415.435%2041.989%20403.058%2046.511%20C%20390.682%2051.033%20350.665%2084.628%20339.114%2087.459%20C%20327.563%2090.291%20292.084%2040.76%20275.582%2046.511%20C%20259.08%2052.262%20198.024%2082.817%20184.41%2087.459%20C%20170.796%2092.101%20113.04%2061.443%2096.125%2066.74%20C%2079.211%2072.037%201.24%20121.908%201.24%20121.908%22%20fill%3D%22transparent%22%20stroke-width%3D%220.8%22%20stroke%3D%22rgb(95%2C95%2C95)%22%20stroke-miterlimit%3D%2210%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'
							)`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PredictiveAnalytics
