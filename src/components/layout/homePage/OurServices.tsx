'use client'

import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { Code, File, Image, Star } from 'lucide-react'
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
				<div className='col-span-1 row-span-2 flex flex-col bg-gradient-to-br from-[#101010] via-[#101010] to-[#202020] rounded-2xl shadow-[0_2px_4px_#0000004a,0_8px_8px_#00000042,0_17px_10px_#00000026,0_31px_12px_#0000000a,0_48px_13px_#00000003,inset_0_-3px_7px_#0003,inset_1px_-14px_14px_#0000002b,inset_3px_-30px_18px_#0000001a,inset_5px_-54px_22px_#00000008,inset_7px_-84px_24px_#0000] p-9 gap-4 w-full h-full overflow-hidden'>
					{/* Header */}
					<div
						style={{
							outline: 'none',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							flexShrink: 0,
							transform: 'none',
						}}
					>
						<h3
							style={{
								fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								fontSize: '32px',
								fontStyle: 'normal',
								fontWeight: 600,
								letterSpacing: '-0.03em',
								lineHeight: '1.2em',
								textAlign: 'start',
								color: '#ffffff',
								textDecoration: 'none',
							}}
						>
							Generative AI
						</h3>
					</div>

					{/* List */}
					<div
						style={{
							outline: 'none',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							flexShrink: 0,
							transform: 'none',
							flex: 'none',
							height: 'auto',
							position: 'relative',
							whiteSpace: 'pre-wrap',
							width: '100%',
							wordBreak: 'break-word',
							wordWrap: 'break-word',
							zIndex: 1,
						}}
					>
						<ul
							className='text-white space-y-1'
							style={{
								fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								fontSize: '18px',
								fontStyle: 'normal',
								fontWeight: 500,
								letterSpacing: '-0.01em',
								lineHeight: '1.5em',
								textAlign: 'start',
								color: '#d5d5d5',
								textDecoration: 'none',
							}}
						>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
								<p>images and videos</p>
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
								<p>code generation</p>
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
								<p>text content creation</p>
							</li>
						</ul>
					</div>

					{/* Illustration/Connection Section */}
					<div className='relative mt-8' style={{ height: '600px' }}>
						<div className='relative mt-8 py-8'>
							{/* Star/Plus icon */}
							<div className='flex justify-center relative z-10'>
								<Star className='w-12 h-12 text-yellow-500' />
							</div>

							{/* Connection lines using absolute SVG */}
							<svg
								className='absolute left-1/2 transform -translate-x-1/2 top-16'
								width='220'
								height='160'
								viewBox='0 0 300 160'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								{/* Vertical line from star */}
								<line
									x1='150'
									y1='0'
									x2='150'
									y2='70'
									stroke='#4A4A4A'
									strokeWidth='2.5'
								/>
								{/* Horizontal line */}
								<line
									x1='30'
									y1='70'
									x2='270'
									y2='70'
									stroke='#4A4A4A'
									strokeWidth='2.5'
								/>
								{/* Small vertical lines connecting to icons */}
								<line
									x1='30'
									y1='70'
									x2='30'
									y2='140'
									stroke='#4A4A4A'
									strokeWidth='2.5'
								/>
								<line
									x1='150'
									y1='70'
									x2='150'
									y2='140'
									stroke='#4A4A4A'
									strokeWidth='2.5'
								/>
								<line
									x1='270'
									y1='70'
									x2='270'
									y2='140'
									stroke='#4A4A4A'
									strokeWidth='2.5'
								/>
							</svg>

							{/* Icon boxes */}
							<div className='flex justify-between pt-2 w-56 mx-auto relative z-10 mt-18'>
								{/* Image icon */}
								<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
									<Image className='w-6 h-6' />
								</div>

								{/* Document icon */}
								<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
									<File className='w-6 h-6' />
								</div>

								{/* Code icon */}
								<div className='w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
									<Code className='w-6 h-6' />
								</div>
							</div>
						</div>
						<div className='ssr-variant'>
							<div
								className='absolute inset-0 w-full'
								data-framer-name='Dotted BG'
								style={{
									opacity: 1,
									transform: 'scale(1.5)',
									zIndex: 0,
									aspectRatio: 0.9171974522292994 / 1,
									right: '-137px',
									position: 'absolute',
									width: '180%',
									left: '-106px',
									height: 'calc(100% - 10px)',
								}}
							>
								<div
									style={{
										position: 'absolute',
										borderRadius: 'inherit',
										top: 0,
										right: 0,
										bottom: 0,
										left: 0,
									}}
									data-framer-background-image-wrapper='true'
								>
									<img
										decoding='async'
										loading='lazy'
										sizes={`calc(max((min(100vw - 48px, 1200px) - 48px) / 3, 50px) * 1.5)`}
										srcSet='https://framerusercontent.com/images/5jAROqt29dIkbEdKTqD350HLB9w.svg?scale-down-to=512 512w,https://framerusercontent.com/images/5jAROqt29dIkbEdKTqD350HLB9w.svg 609w'
										src='https://framerusercontent.com/images/5jAROqt29dIkbEdKTqD350HLB9w.svg'
										alt='Dotted background pattern'
										style={{
											display: 'block',
											width: '100%',
											height: '100%',
											borderRadius: 'inherit',
											objectPosition: 'center',
											objectFit: 'contain',
										}}
									/>
								</div>
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
