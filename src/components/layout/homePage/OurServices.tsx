'use client'

import SectionTitle from '@/components/ui/homePage/sectionTitle'
import SectionName from '../../ui/homePage/SectionName'
import AIConsulting from './services/AIConsulting'
import GenerativeAI from './services/GenerativeAI'
import NaturalLanguageProcessing from './services/NaturalLanguageProcessing'
import PredictiveAnalytics from './services/PredictiveAnalytics'

const OurServices = () => {
	return (
		<div className='px-4 lg:px-0' id='services'>
			<SectionName name='service' title='Our Services' />
			<SectionTitle
				title='How we help you shape your future'
				description={`Brandlly is a flexible and user-friendly template for AI startups to showcase their solutions and drive business growth.`}
			/>
			<div className='grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4 w-full max-w-[1500px] mx-auto lg:h-[850px] auto-rows-auto'>
				<div className='lg:col-span-1 lg:row-span-2'>
					<GenerativeAI />
				</div>
				<div className='lg:col-span-2'>
					<PredictiveAnalytics />
				</div>
				<div className='lg:col-span-2 lg:row-span-2'>
					<NaturalLanguageProcessing />
				</div>
				<div className='lg:col-span-1'>
					<AIConsulting />
				</div>
			</div>
		</div>
	)
}

export default OurServices
