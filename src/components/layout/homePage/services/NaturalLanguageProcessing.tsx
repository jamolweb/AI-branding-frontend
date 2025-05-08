import ChatInterface from './ChatInterface'
import ServiceList from './ServiceList'
import TranslationDemo from './TranslationDemo'

const NaturalLanguageProcessing = () => {
	return (
		<div
			className='bg-gradient-to-tr from-[#101010] to-[#202020] rounded-lg shadow-lg flex flex-col gap-3 overflow-visible h-full'
			style={{
				boxShadow:
					'0 15.4px 34.1px rgba(0,0,0,0.2), 0 61.6px 61.6px rgba(0,0,0,0.17), 0 137.5px 82.5px rgba(0,0,0,0.1), 0 244.2px 97.9px rgba(0,0,0,0.03), 0 381.7px 106.7px rgba(0,0,0,0)',
				willChange: 'transform',
			}}
		>
			<div className='p-4 lg:p-6'>
				<h3 className='text-2xl lg:text-3xl font-semibold text-white tracking-tight'>
					Natural Language Processing
				</h3>

				<ServiceList
					items={[
						'chatbot development',
						'text summarization',
						'machine translation',
					]}
				/>
			</div>

			<div className='relative w-full overflow-hidden px-4 lg:px-16 py-4 lg:py-8'>
				<div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
					{/* <TranslationDemo /> */}
					<ChatInterface />
				</div>
			</div>
		</div>
	)
}

export default NaturalLanguageProcessing
