import ContactSection from '@/components/layout/homePage/ContactSection'
import FaqSection from '@/components/layout/homePage/FaqSection'
import FeaturesSection from '@/components/layout/homePage/FeaturesSection'
import Footer from '@/components/layout/homePage/Footer'
import HeroSection from '@/components/layout/homePage/HeroSection'
import Navbar from '@/components/layout/homePage/Navbar'
import PlansSection from '@/components/layout/homePage/PlansSection'
import ProcessSection from '@/components/layout/homePage/ProcessSection'
import TestimonialWithStars from '@/components/layout/homePage/Testimonials'
import TrustedBySection from '@/components/layout/homePage/TrustedBySection'

const HomePage = () => {
	return (
		<div
			className='min-h-screen text-white'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div
				className='fixed inset-0 z-0 opacity-20 pointer-events-none'
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
					backgroundRepeat: 'repeat',
					mixBlendMode: 'multiply',
				}}
			/>

			<div className='relative z-10'>
				<div className='container mx-auto px-4 max-w-6xl'>
					<Navbar />
					<HeroSection />
					<TrustedBySection />
					<FeaturesSection />
					<ProcessSection />
					<TestimonialWithStars />
					<PlansSection />
					<FaqSection />
					<ContactSection />
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default HomePage
