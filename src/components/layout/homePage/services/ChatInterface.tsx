const ChatInterface = () => {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: '500px',
				backgroundColor: '#000',
				borderRadius: '16px',
				boxShadow: '0 15.4px 34.1px #0003',
				transform: 'none',
				willChange: 'transform',
				zIndex: 3,
			}}
			className='lg:transform lg:rotate-5 lg:-translate-y-5 p-4'
		>
			<div className='flex items-center gap-2 mb-4'>
				<div className='w-8 h-8 bg-[#effc76] rounded-lg flex items-center justify-center'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
					</svg>
				</div>
				<div className='text-white/80 font-manrope text-base lg:text-lg font-semibold'>
					Your AI Assistant
				</div>
				<button className='ml-auto text-white/60 hover:text-white'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<line x1='12' y1='4' x2='4' y2='12'></line>
						<line x1='4' y1='4' x2='12' y2='12'></line>
					</svg>
				</button>
			</div>
			<div className='text-xs text-white/70 mb-3 font-manrope'>
				September 21st at 11:15 AM
			</div>
			<div className='flex gap-2 mb-3'>
				<div className='w-8 h-8 bg-[#202020] rounded-lg flex items-center justify-center flex-shrink-0'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
					</svg>
				</div>
				<div className='bg-[#202020] rounded-lg p-3'>
					<p className='text-white text-sm lg:text-base'>
						Welcome to our website! What brought you to us today?
					</p>
				</div>
			</div>
			<div className='flex gap-2'>
				<div className='bg-white rounded-lg p-3 ml-auto'>
					<p className='text-[#202020] text-sm lg:text-base'>
						I&apos;d like to get some information about your products
					</p>
				</div>
			</div>
			<div className='flex gap-2 mt-3'>
				<div className='w-8 h-8 bg-[#202020] rounded-lg flex items-center justify-center flex-shrink-0'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
					</svg>
				</div>
				<div className='bg-[#202020] rounded-lg p-3'>
					<p className='text-white text-sm lg:text-base'>
						Certainly! Here are some of our most popular products:
					</p>
					<div className='mt-2'>
						<button className='text-[#effc76] hover:underline flex items-center font-manrope text-sm lg:text-base'>
							Product List
							<svg
								className='ml-1 w-4 h-4'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatInterface
