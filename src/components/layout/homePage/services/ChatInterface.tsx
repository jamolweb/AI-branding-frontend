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
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				minHeight: '500px'
			}}
			className='lg:transform lg:rotate-5 lg:-translate-y-5'
		>
			<div className='flex items-center justify-between p-4 border-b border-gray-700'>
				<div className='flex items-center gap-2'>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='#effc76'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
					</svg>
					<div className='text-white font-semibold text-lg'>Chat Session</div>
				</div>
				<button className='bg-[#effc76] text-[#1e2330] font-medium px-4 py-2 rounded-full text-sm flex items-center gap-1'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<line x1='12' y1='5' x2='12' y2='19'></line>
						<line x1='5' y1='12' x2='19' y2='12'></line>
					</svg>
					New Chat
				</button>
			</div>

			<div className='flex-1 p-4 overflow-y-auto space-y-4'>
				<div className='flex flex-col'>
					<div className='bg-[#2d3748] text-white p-3 rounded-lg self-start max-w-[80%]'>
						<p className='text-sm'>Tell me more about what you&apos;re working on.</p>
					</div>
					<span className='text-xs text-gray-500 mt-1'>May 8, 03:45 PM</span>
				</div>

				<div className='flex flex-col items-end'>
					<div className='bg-[#effc76] text-[#1e2330] p-3 rounded-lg self-end max-w-[80%]'>
						<p className='text-sm'>I&apos;d like to get recommendation for my fashion brand</p>
					</div>
					<span className='text-xs text-gray-500 mt-1'>May 8, 03:46 PM</span>
				</div>

				<div className='flex flex-col'>
					<div className='bg-[#2d3748] text-white p-3 rounded-lg self-start max-w-[80%]'>
						<p className='text-sm mb-2'>That&apos;s great! To give you tailored recommendations, I&apos;d love to learn more about your fashion brand. Here are a few key questions to help guide the conversation:</p>
						<ol className='list-decimal pl-5 space-y-2'>
							<li className='text-sm'>
								<span className='font-bold text-[#effc76]'>Brand Identity</span>:
								<ul className='list-disc pl-5 mt-1 space-y-1'>
									<li className='text-sm'>What&apos;s your brand&apos;s name, and what does it stand for?</li>
									<li className='text-sm'>Who is your target audience (age, gender, lifestyle, values)?</li>
									<li className='text-sm'>How would you describe your brand&apos;s aesthetic (e.g., minimalist, luxury, streetwear...)?</li>
								</ul>
							</li>
						</ol>
					</div>
				</div>
			</div>

			<div className='p-4 border-t border-gray-700'>
				<div className='relative'>
					<input
						type='text'
						placeholder='Type your message...'
						className='w-full bg-[#2d3748] text-white rounded-full py-3 px-4 pr-10 focus:outline-none text-sm'
					/>
					<button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#effc76] text-[#1e2330] rounded-full p-2'>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='22' y1='2' x2='11' y2='13'></line>
							<polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChatInterface
