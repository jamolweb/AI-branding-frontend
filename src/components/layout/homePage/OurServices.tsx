'use client'

import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { Code, File, Image, Star } from 'lucide-react'
import SectionName from '../../ui/homePage/SectionName'

const OurServices = () => {
	return (
		<div className='py-20' id='services'>
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
					{/* Header */}
					<h3
						style={{
							fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
							fontSize: '30px',
							fontStyle: 'normal',
							fontWeight: 600,
							letterSpacing: '-0.03em',
							lineHeight: '1.2em',
							textAlign: 'start',
							color: '#ffffff',
							textDecoration: 'none',
						}}
					>
						Predictive Analytics
					</h3>

					{/* List of services */}
					<ul className='text-[#d5d5d5] space-y-1 text-lg'>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>demand forecasting</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>risk assessment</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>time series forecasting</p>
						</li>
					</ul>

					{/* Graph Visualization */}
					<div className='relative flex-1 mt-4' style={{ minHeight: '120px' }}>
						<div
							className='absolute inset-0 flex items-end'
							style={{ height: '100px' }}
						>
							<svg
								className='w-full h-full'
								viewBox='0 0 400 200'
								preserveAspectRatio='none'
								style={{ maxHeight: '100px' }}
							>
								{/* Green line (Fluctus) */}
								<path
									d='M 0,160 Q 100,140 200,100 T 400,20'
									fill='none'
									stroke='#90EE90'
									strokeWidth='2'
								/>
								{/* Dots on the green line */}
								<circle cx='200' cy='100' r='3' fill='#90EE90' />
								<circle cx='300' cy='50' r='3' fill='#90EE90' />
								<circle cx='400' cy='20' r='3' fill='#90EE90' />

								{/* Gray line (competitors) */}
								<path
									d='M 0,180 Q 100,170 200,160 T 400,140'
									fill='none'
									stroke='#4A4A4A'
									strokeWidth='2'
								/>
							</svg>

							{/* Legend */}
							<div className='absolute top-0 right-0 flex items-center gap-4'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 rounded-full bg-[#90EE90]'></div>
									<span className='text-white text-sm'>Fluctus</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 rounded-full bg-[#4A4A4A]'></div>
									<span className='text-white text-sm'>competitors</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Third div - Spans 2 columns & 2 rows */}
				<div className='col-span-2 row-span-2 bg-gradient-to-tr from-[#101010] to-[#202020] rounded-lg p-6 shadow-lg flex flex-col gap-3 overflow-visible'>
					{/* Header */}
					<h3 className='text-3xl font-semibold text-white tracking-tight'>
						Natural Language Processing
					</h3>

					{/* Features list */}
					<ul className='text-[#d5d5d5] space-y-1 text-lg'>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>chatbot development</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>text summarization</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-1.5 h-1.5 rounded-full bg-white'></div>
							<p>machine translation</p>
						</li>
					</ul>

					{/* Chat Interface Demo */}
					<div className='flex gap-8 mt-6'>
						{/* Translation Example */}
						<div className='transform -rotate-5' style={{ opacity: 1 }}>
							<div className='bg-[#151515] rounded-xl p-4 w-[300px]'>
								<div className='space-y-4'>
									<div className='text-white'>
										<h4 className='font-manrope text-xl tracking-tight'>
											Como estás?
										</h4>
									</div>

									<div className='font-mono text-white/70 tracking-tight leading-tight'>
										<p>
											p#d+G$xs;?00L.K#yt{'}'}1101;k{'{'}
										</p>
									</div>

									<div>
										<p className='font-manrope text-xl text-center text-[#effc76] tracking-tight'>
											How are you?
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Chat Assistant Example */}
						<div
							className='bg-[#151515] rounded-xl p-4 w-[300px]'
							style={{ transform: 'rotate(5deg)' }}
						>
							<div className='flex items-center gap-2 mb-4'>
								<div className='w-8 h-8 bg-[#effc76] rounded-lg flex items-center justify-center'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
									</svg>
								</div>
								<div className='text-white/80 font-manrope text-lg font-semibold'>
									Your AI Assistant
								</div>
								<button className='ml-auto text-white/60 hover:text-white'>
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<line x1='12' y1='4' x2='4' y2='12'></line>
										<line x1='4' y1='4' x2='12' y2='12'></line>
									</svg>
								</button>
							</div>
							<div className='text-xs text-white/70 mb-3 font-manrope'>
								September 21st at 11:15 AM
							</div>
							<div className='flex gap-2 mb-3'>
								<div className='w-8 h-8 bg-[#202020] rounded-lg flex items-center justify-center flex-shrink-0'>
									<svg
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
									</svg>
								</div>
								<div className='bg-[#202020] rounded-lg p-3'>
									<p className='text-white'>
										Welcome to our website! What brought you to us today?
									</p>
								</div>
							</div>
							<div className='flex gap-2'>
								<div className='bg-white rounded-lg p-3 ml-auto'>
									<p className='text-[#202020]'>
										I'd like to get some information about your products
									</p>
								</div>
							</div>
							<div className='flex gap-2 mt-3'>
								<div className='w-8 h-8 bg-[#202020] rounded-lg flex items-center justify-center flex-shrink-0'>
									<svg
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
									</svg>
								</div>
								<div className='bg-[#202020] rounded-lg p-3'>
									<p className='text-white'>
										Certainly! Here are some of our most popular products:
									</p>
									<div className='mt-2'>
										<button className='text-[#effc76] hover:underline flex items-center font-manrope'>
											Product List
											<svg
												className='ml-1 w-4 h-4'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<line x1='5' y1='12' x2='19' y2='12'></line>
												<polyline points='12 5 19 12 12 19'></polyline>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Fourth div - Spans 1 row & 1 column */}
				<div className='col-span-1 row-span-1 flex flex-col flex-nowrap items-start content-start justify-start gap-4 bg-[#effc76] rounded-2xl p-9 h-full w-full relative overflow-hidden self-start justify-self-start will-change-transform'>
					<div className='relative z-10'>
						{/* Header */}
						<h3
							style={{
								fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								fontSize: '30px',
								fontStyle: 'normal',
								fontWeight: 600,
								letterSpacing: '-0.03em',
								lineHeight: '1.2em',
								textAlign: 'start',
								color: 'black',
								textDecoration: 'none',
							}}
						>
							AI Consulting
						</h3>

						{/* List of services */}
						<ul className='text-black space-y-1 text-lg mt-4'>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-black'></div>
								<p>AI strategy</p>
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-black'></div>
								<p>AI readiness</p>
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-black'></div>
								<p>ROI analysis</p>
							</li>
						</ul>
					</div>

					{/* 3D Cube Illustration */}
					<div className='absolute right-3 bottom-5 w-3/5 h-3/5'>
						<svg
							className='w-full h-full'
							viewBox='0 0 120 120'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							style={{
								transform: 'translate(20%, 20%) scale(0.7)',
								opacity: 0.8,
							}}
						>
							{/* Front face */}
							<path
								d='M30,60 L90,60 L90,120 L30,120 Z'
								fill='black'
								fillOpacity='0.1'
								stroke='black'
								strokeWidth='2'
							/>
							{/* Right face */}
							<path
								d='M90,60 L120,30 L120,90 L90,120 Z'
								fill='black'
								fillOpacity='0.05'
								stroke='black'
								strokeWidth='2'
							/>
							{/* Top face */}
							<path
								d='M30,60 L90,60 L120,30 L60,30 Z'
								fill='black'
								fillOpacity='0.15'
								stroke='black'
								strokeWidth='2'
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OurServices
