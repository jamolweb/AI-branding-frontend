const ConnectedIcons = () => {
	return (
		<div className='relative w-[300px] h-[200px] mx-auto'>
			{/* Main Node */}
			<div className='absolute top-[10%] left-[50%] translate-x-[-50%] bg-black w-12 h-12 flex items-center justify-center rounded-full'>
				⭐
			</div>

			{/* Child Nodes */}
			<div className='absolute bottom-0 left-0 bg-gray-900 w-10 h-10 flex items-center justify-center rounded-full'>
				🖼️
			</div>
			<div className='absolute bottom-0 left-[50%] translate-x-[-50%] bg-gray-900 w-10 h-10 flex items-center justify-center rounded-full'>
				📄
			</div>
			<div className='absolute bottom-0 right-0 bg-gray-900 w-10 h-10 flex items-center justify-center rounded-full'>
				💻
			</div>

			{/* SVG for 90-degree connections */}
			<svg
				className='absolute w-full h-full top-0 left-0'
				viewBox='0 0 300 200'
			>
				{/* Left connection */}
				<path
					d='M150,50 V120 H40 V170'
					stroke='gray'
					strokeWidth='2'
					fill='none'
				/>
				{/* Middle connection */}
				<path d='M150,50 V170' stroke='gray' strokeWidth='2' fill='none' />
				{/* Right connection */}
				<path
					d='M150,50 V120 H260 V170'
					stroke='gray'
					strokeWidth='2'
					fill='none'
				/>
			</svg>
		</div>
	)
}

export default ConnectedIcons
