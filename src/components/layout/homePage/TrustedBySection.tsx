import { useTheme } from 'next-themes'

const TrustedBySection = () => {
	const { resolvedTheme } = useTheme()

	const logos = [
		'Logoipsum',
		'Logoipsum',
		'Logoipsum',
		'Logoipsum',
		'Logoipsum',
		'Logoipsum',
		'Logoipsum',
	]

	return (
		<div className='pt-24 pb-16 bg-transparent'>
			<p
				className={`text-center mb-12 text-xl font-medium opacity-90 ${
					resolvedTheme === 'dark' ? 'text-white' : 'text-black'
				}`}
			>
				Trusted by specialists at
			</p>
			<div className='flex items-center justify-between flex-wrap gap-8'>
				{logos.map((logo, index) => (
					<div
						key={index}
						className='opacity-60 hover:opacity-90 transition-opacity duration-300'
					>
						<div
							className={`flex items-center ${
								resolvedTheme === 'dark' ? 'text-white/70' : 'text-black/70'
							}`}
						>
							<span className='text-lg font-medium'>{logo}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TrustedBySection
