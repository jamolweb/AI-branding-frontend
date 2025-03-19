import FeaturesSection from '../layout/FeaturesSection'
import HeroSection from '../layout/HeroSection'
import Navbar from '../layout/Navbar'
import TrustedBySection from '../layout/TrustedBySection'

const HomePage = () => {
	return (
		<div
			className='min-h-screen text-white overflow-hidden'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div className='container mx-auto px-4 max-w-6xl relative z-10 bg-transparent'>
				<Navbar />
				<HeroSection />
				<FeaturesSection />
				<TrustedBySection />
			</div>
		</div>
	)
}

export default HomePage
