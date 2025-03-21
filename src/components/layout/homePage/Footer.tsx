import { Instagram, Linkedin, Twitter } from 'lucide-react'
import { useTheme } from 'next-themes'

const Footer = () => {
	const { theme } = useTheme()

	return (
		<footer
			className='bg-transparent pt-12 px-6'
			style={{ color: theme === 'dark' ? 'white' : 'rgb(16, 16, 16)' }}
		>
			<div className='max-w-6xl mx-auto'>
				{/* CTA Section */}
				<div className='mb-24'>
					<div
						className='w-full p-16 rounded-3xl relative overflow-hidden'
						style={{
							backgroundColor:
								theme === 'dark' ? 'rgb(32, 32, 32)' : 'rgb(239, 252, 118)',
						}}
					>
						<div className='flex flex-col max-w-2xl gap-6'>
							<h2
								className='text-5xl font-medium leading-tight'
								style={{
									color:
										theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
								}}
							>
								Ready to unlock the <br /> power of AI?
							</h2>
							<p
								className='text-xl'
								style={{
									color:
										theme === 'dark'
											? 'rgba(255, 255, 255, 0.6)'
											: 'rgba(0, 0, 0, 0.6)',
								}}
							>
								Transform your business with cutting-edge solutions <br />{' '}
								tailored to your unique challenges.
							</p>
							<div className='mt-4'>
								<a
									href='#contact'
									className='inline-flex px-6 py-3 rounded-xl font-medium text-lg transition-transform hover:scale-105'
									style={{
										backgroundColor:
											theme === 'dark'
												? 'rgb(239, 252, 118)'
												: 'rgb(45, 45, 45)',
										color:
											theme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
										boxShadow:
											theme === 'dark'
												? `
												rgba(255, 255, 255, 0.1) 0px 2px 4px 0px,
												rgba(255, 255, 255, 0.1) 0px 8px 8px 0px,
												rgba(255, 255, 255, 0.1) 0px 17px 10px 0px,
												rgba(255, 255, 255, 0.04) 0px 31px 12px 0px,
												rgba(255, 255, 255, 0.01) 0px 48px 13px 0px,
												rgba(255, 255, 255, 0.1) 0px -3px 7px 0px inset,
												rgba(255, 255, 255, 0.1) 1px -14px 14px 0px inset,
												rgba(255, 255, 255, 0.05) 3px -30px 18px 0px inset,
												rgba(255, 255, 255, 0.02) 5px -54px 22px 0px inset,
												rgba(255, 255, 255, 0) 7px -84px 24px 0px inset
											`
												: `
												rgba(0, 0, 0, 0.29) 0px 2px 4px 0px,
												rgba(0, 0, 0, 0.26) 0px 8px 8px 0px,
												rgba(0, 0, 0, 0.15) 0px 17px 10px 0px,
												rgba(0, 0, 0, 0.04) 0px 31px 12px 0px,
												rgba(0, 0, 0, 0.01) 0px 48px 13px 0px,
												rgba(0, 0, 0, 0.2) 0px -3px 7px 0px inset,
												rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset,
												rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset,
												rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset,
												rgba(0, 0, 0, 0) 7px -84px 24px 0px inset
											`,
									}}
								>
									Start Today
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col md:flex-row justify-between items-start mb-8'>
					<div className='mb-6 md:mb-0'>
						<div className='flex items-center mb-4'>
							<div className='mr-2 text-lime-300'>
								<svg
									width='28'
									height='28'
									viewBox='0 0 28 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14 4L17.5 10.5L25 11.5L19.5 16.5L21 24L14 20.5L7 24L8.5 16.5L3 11.5L10.5 10.5L14 4Z'
										fill='currentColor'
									/>
								</svg>
							</div>
							<span className='text-3xl font-bold'>Fluctus</span>
						</div>
						<p
							style={{
								color:
									theme === 'dark'
										? 'rgb(156, 163, 175)'
										: 'rgb(107, 114, 128)',
							}}
						>
							Empowering organizations to harness the full potential of
							artificial intelligence for sustainable growth.
						</p>
					</div>

					{/* Menu and Legal links */}
					<div className='grid grid-cols-2 gap-x-16 gap-y-6'>
						<div>
							<h3 className='text-xl mb-4'>Menu</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='#services'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Services
									</a>
								</li>
								<li>
									<a
										href='#process'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Process
									</a>
								</li>
								<li>
									<a
										href='#pricing'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href='#faq'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href='#contact'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-xl mb-4'>Legal</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='#terms'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href='#privacy'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href='#cookies'
										style={{
											color:
												theme === 'dark'
													? 'rgb(156, 163, 175)'
													: 'rgb(107, 114, 128)',
										}}
										className='hover:text-white dark:hover:text-white'
									>
										Cookie Policy
									</a>
								</li>
							</ul>

							{/* Social icons */}
							<div className='flex justify-start mt-7 space-x-4 relative z-10'>
								<a
									href='https://twitter.com'
									className='text-lime-300 hover:text-lime-400'
								>
									<Twitter size={24} />
								</a>
								<a
									href='https://linkedin.com'
									className='text-lime-300 hover:text-lime-400'
								>
									<Linkedin size={24} />
								</a>
								<a
									href='https://instagram.com'
									className='text-lime-300 hover:text-lime-400'
								>
									<Instagram size={24} />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className='border-t border-gray-800 my-8'></div>

				{/* Bottom section with large transparent Fluctus text */}
				<div className='relative'>
					<div
						className='framer-jrdvfs'
						data-framer-name='Footer Title Wrapper'
						style={{
							mask: 'linear-gradient(rgb(0, 0, 0) 7%, rgba(0, 0, 0, 0) 79%)',
							willChange: 'transform',
							opacity: 1,
							marginBottom: '-50px',
						}}
					>
						<svg
							className='framer-1h6n26z'
							viewBox='0 0 1203 340'
							style={{
								outline: 'none',
								display: 'flex',
								flexDirection: 'column',
								flexShrink: 0,
								color: 'rgb(0, 153, 255)',
								textShadow:
									theme === 'dark'
										? 'rgba(255, 255, 255, 0.15) -1px -1px 0px, rgba(255, 255, 255, 0.15) 0px -1px 0px, rgba(255, 255, 255, 0.15) 1px -1px 0px, rgba(255, 255, 255, 0.15) 1px 0px 0px, rgba(255, 255, 255, 0.15) 1px 1px 0px, rgba(255, 255, 255, 0.15) 0px 1px 0px, rgba(255, 255, 255, 0.15) -1px 1px 0px, rgba(255, 255, 255, 0.15) -1px 0px 0px'
										: 'rgba(214, 214, 214, 0.15) -1px -1px 0px, rgba(213, 213, 213, 0.15) 0px -1px 0px, rgba(213, 213, 213, 0.15) 1px -1px 0px, rgba(213, 213, 213, 0.15) 1px 0px 0px, rgba(213, 213, 213, 0.15) 1px 1px 0px, rgba(213, 213, 213, 0.15) 0px 1px 0px, rgba(213, 213, 213, 0.15) -1px 1px 0px, rgba(213, 213, 213, 0.15) -1px 0px 0px',
							}}
						>
							<foreignObject
								width='100%'
								height='100%'
								className='framer-fit-text'
								transform='scale(1)'
								style={{
									overflow: 'visible',
									transformOrigin: 'center center',
								}}
							>
								<p
									className='framer-text'
									style={{
										fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
										fontSize: '330px',
										fontWeight: 600,
										lineHeight: '0.3em',
										color:
											theme === 'dark'
												? 'rgb(38, 38, 38)'
												: 'rgb(229, 229, 229)',
										transform: 'translateY(100px)',
									}}
								>
									Fluctus
								</p>
							</foreignObject>
						</svg>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
