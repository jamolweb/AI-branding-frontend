import HeroSection from '../layout/HeroSection'
import Navbar from '../layout/Navbar'
import TrustedBySection from '../layout/TrustedBySection'

const HomePage = () => {
	return (
		<div
			className='min-h-screen text-white overflow-hidden'
			style={{
				background:
					'linear-gradient(180deg, rgba(24, 24, 27, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
				backgroundImage: `
					radial-gradient(circle at 20% 35%, rgba(76, 29, 149, 0.25) 0%, transparent 50%),
					radial-gradient(circle at 75% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
					linear-gradient(180deg, rgba(24, 24, 27, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)
				`,
				position: 'relative',
			}}
		>
			{/* Noise texture overlay */}
			<div
				className='absolute inset-0 z-0 opacity-20 pointer-events-none'
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
					backgroundRepeat: 'repeat',
					mixBlendMode: 'multiply',
				}}
			/>

			<div className='container mx-auto px-4 max-w-6xl relative z-10'>
				<Navbar />
				<HeroSection />
				<TrustedBySection />
			</div>
		</div>
	)
}

export default HomePage
