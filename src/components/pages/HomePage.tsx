import HeroSection from '../layout/HeroSection'
import Navbar from '../layout/Navbar'
import TrustedBySection from '../layout/TrustedBySection'

const HomePage = () => {
	return (
		<div
			className='min-h-screen text-white overflow-hidden'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div
				className='absolute inset-0 z-0 opacity-20 pointer-events-none'
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
					backgroundRepeat: 'repeat',
					mixBlendMode: 'multiply',
				}}
			/>

			<div className='container mx-auto px-4 max-w-6xl relative z-10 bg-transparent'>
				<Navbar />
				<HeroSection />
				<TrustedBySection />
			</div>
		</div>
	)
}

export default HomePage
