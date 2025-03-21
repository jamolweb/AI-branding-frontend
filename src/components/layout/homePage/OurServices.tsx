'use client'

import SectionTitle from '@/components/ui/homePage/sectionTitle'
import SectionName from '../../ui/homePage/SectionName'

const OurServices = () => {
	return (
		<div className='py-20'>
			<SectionName name='service' title='Our Services' />
			<SectionTitle
				title='How we help you shape your future'
				description={`Fluctus is a flexible and user-friendly template for AI startups to showcase their solutions and drive business growth.`}
			/>
			<div className='grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-[1500px] h-[850px] mx-auto'>
				<div className='col-span-1 row-span-2 flex flex-col bg-gradient-to-br from-[#101010] to-[#202020] rounded-2xl shadow-lg p-9 gap-4 w-full h-full overflow-hidden'>
					{/* Header */}
					<div className='flex flex-col justify-center flex-shrink-0'>
						<h3 className='text-3xl font-bold text-white'>Generative AI</h3>
					</div>

					{/* List */}
					<div className='flex flex-col justify-center flex-shrink-0'>
						<ul className='text-white space-y-1'>
							<li>
								<p>images and videos</p>
							</li>
							<li>
								<p>code generation</p>
							</li>
							<li>
								<p>text content creation</p>
							</li>
						</ul>
					</div>

					{/* Illustration/Connection Section */}
					<div className='relative mt-8'>
						{/* Star/Plus icon */}
						<div className='flex justify-center'>
							<div className='w-12 h-12 bg-[#E4FF4B] rounded-full relative flex items-center justify-center'>
								<div className='absolute w-2 h-8 bg-[#E4FF4B]'></div>
								<div className='absolute w-8 h-2 bg-[#E4FF4B]'></div>
								<div className='absolute w-6 h-6 bg-black rounded-full'></div>
							</div>
						</div>

						{/* Connection line */}
						<div className='h-12 w-0.5 bg-gradient-to-b from-[#202020] to-[#323232] mx-auto my-4'></div>

						{/* Horizontal connection */}
						<div className='flex justify-center'>
							<div className='w-56 h-0.5 bg-gradient-to-r from-[#202020] to-[#323232]'></div>
						</div>

						{/* Icon boxes */}
						<div className='flex justify-between pt-4'>
							{/* Image icon */}
							<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
								<svg
									width='22'
									height='22'
									viewBox='0 0 31 31'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M25.6782 3.875H5.32178C3.48654 3.875 2 5.36154 2 7.19678V23.8032C2 25.6385 3.48654 27.125 5.32178 27.125H25.6782C27.5135 27.125 29 25.6385 29 23.8032V7.19678C29 5.36154 27.5135 3.875 25.6782 3.875Z'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M10.9688 12.9688C12.0734 12.9688 12.9688 12.0734 12.9688 10.9688C12.9688 9.86411 12.0734 8.96875 10.9688 8.96875C9.86411 8.96875 8.96875 9.86411 8.96875 10.9688C8.96875 12.0734 9.86411 12.9688 10.9688 12.9688Z'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M29.0001 19.375L22.0626 12.4375C21.5407 11.9156 20.8345 11.625 20.1001 11.625C19.3656 11.625 18.6595 11.9156 18.1376 12.4375L7.75006 22.8125'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>

							{/* Document icon */}
							<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
								<svg
									width='18'
									height='22'
									viewBox='0 0 27 34'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M15.4688 1.0625H4.21875C3.23556 1.0625 2.29217 1.45481 1.59794 2.14904C0.903705 2.84328 0.511395 3.78666 0.511395 4.76985V29.2301C0.511395 30.2133 0.903705 31.1567 1.59794 31.8509C2.29217 32.5452 3.23556 32.9375 4.21875 32.9375H22.7812C23.7644 32.9375 24.7078 32.5452 25.402 31.8509C26.0963 31.1567 26.4886 30.2133 26.4886 29.2301V12.0823L15.4688 1.0625Z'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M15.4688 1.0625V12.0823H26.4886'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M19.1762 19.1719H7.92621'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M19.1762 25.5225H7.92621'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M11.6336 12.8213H9.76184H7.92621'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>

							{/* Code icon */}
							<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
								<svg
									width='22'
									height='22'
									viewBox='0 0 34 34'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M17 32.0625C25.3198 32.0625 32.0625 25.3198 32.0625 17C32.0625 8.68019 25.3198 1.9375 17 1.9375C8.68019 1.9375 1.9375 8.68019 1.9375 17C1.9375 25.3198 8.68019 32.0625 17 32.0625Z'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M12.75 13.2812L8.5 17L12.75 20.7188'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M21.25 13.2812L25.5 17L21.25 20.7188'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M19.125 9.5625L14.875 24.4375'
										stroke='#4A4A4A'
										strokeWidth='2.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Second div - Spans 2 columns */}
				<div className='col-span-2 bg-black rounded-lg p-6 shadow-md flex flex-col gap-3'>
					{/* Content here */}
				</div>

				{/* Third div - Spans 2 columns & 2 rows */}
				<div className='col-span-2 row-span-2 bg-gradient-to-tr from-[#101010] to-[#202020] rounded-lg p-6 shadow-lg flex flex-col gap-3 overflow-visible'>
					{/* Content here */}
				</div>

				{/* Fourth div - Spans 1 row & 1 column */}
				<div className='col-span-1 row-span-1 bg-gradient-to-tr from-[#101010] to-[#202020] rounded-lg p-6 shadow-lg flex flex-col gap-3 overflow-visible'>
					{/* Content here */}
				</div>
			</div>
		</div>
	)
}

export default OurServices
