import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'

const OurServices = () => {
	return (
		<div className='py-20'>
			<SectionName name='services' title='Our Services' />
			<SectionTitle
				title='How we help you shape your future'
				description={`Fluctus is a flexible and user-friendly template for AI startups to showcase their solutions and drive business growth.`}
			/>
			<div className='grid grid-cols-3 gap-4 mt-12'>
				<div className='col-span-3 row-span-2 bg-[#141414] rounded-xl p-8'>
					{/* First div: 3 width x 2 height */}
				</div>
				<div className='col-span-2 bg-[#141414] rounded-xl p-8'>
					{/* Second div: 2 width x 1 height */}
				</div>
				<div className='col-span-1 bg-[#141414] rounded-xl p-8'>
					{/* Third div: 1 width x 1 height */}
				</div>
				<div className='col-span-2 row-span-2 bg-[#141414] rounded-xl p-8'>
					{/* Fourth div: 2 width x 2 height */}
				</div>
			</div>
		</div>
	)
}

export default OurServices
