import Link from 'next/link'

const Navbar = () => {
	return (
		<nav
			className='flex items-center justify-between py-4 px-6 mt-4 mb-2 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg'
			style={{
				borderRadius: '16px',
				boxShadow:
					'rgba(0, 0, 0, 0.192) 0px 0.6px 0.84px -1.33px, rgba(0, 0, 0, 0.165) 0px 2.29px 3.2px -2.67px, rgba(0, 0, 0, 0.05) 0px 10px 14px -4px',
				backdropFilter: 'blur(15px)',
				WebkitBackdropFilter: 'blur(15px)',
				borderTop: '1px solid rgba(255, 255, 255, 0.15)',
			}}
		>
			<Link href='/' className='text-xl font-medium text-white'>
				Fluctus
			</Link>

			<div className='flex gap-8'>
				<Link
					href='/#services'
					className='text-gray-200 hover:text-white transition-colors'
				>
					Services
				</Link>
				<Link
					href='/#process'
					className='text-gray-200 hover:text-white transition-colors'
				>
					Process
				</Link>
				<Link
					href='/#pricing'
					className='text-gray-200 hover:text-white transition-colors'
				>
					Pricing
				</Link>
				<Link
					href='/#faq'
					className='text-gray-200 hover:text-white transition-colors'
				>
					FAQ
				</Link>
				<Link
					href='/#contact'
					className='text-gray-200 hover:text-white transition-colors'
				>
					Contact
				</Link>
			</div>

			<Link
				href='/template'
				className='bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-medium transition-colors'
				style={{
					borderRadius: '10px',
				}}
			>
				Get Template
			</Link>
		</nav>
	)
}

export default Navbar
