const TrustedBySection = () => {
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
		<div className='pt-24 pb-16'>
			<p className='text-white text-center mb-12 text-xl font-medium opacity-90'>
				Trusted by specialists at
			</p>
			<div className='flex items-center justify-between flex-wrap gap-8'>
				{logos.map((logo, index) => (
					<div
						key={index}
						className='opacity-60 hover:opacity-90 transition-opacity duration-300'
					>
						<div className='flex items-center text-white/70'>
							<span className='text-lg font-medium'>{logo}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TrustedBySection
