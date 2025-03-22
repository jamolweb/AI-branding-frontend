import { Code, File, Image, Star } from 'lucide-react'
import ServiceList from './ServiceList'

const GenerativeAI = () => {
	return (
		<div className='flex flex-col bg-gradient-to-br from-[#101010] via-[#101010] to-[#202020] rounded-2xl shadow-[0_2px_4px_#0000004a,0_8px_8px_#00000042,0_17px_10px_#00000026,0_31px_12px_#0000000a,0_48px_13px_#00000003,inset_0_-3px_7px_#0003,inset_1px_-14px_14px_#0000002b,inset_3px_-30px_18px_#0000001a,inset_5px_-54px_22px_#00000008,inset_7px_-84px_24px_#0000] p-6 lg:p-9 gap-4 w-full h-full overflow-hidden'>
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
					className='text-2xl lg:text-3xl font-manrope font-semibold tracking-tight text-white'
					style={{
						letterSpacing: '-0.03em',
						lineHeight: '1.2em',
					}}
				>
					Generative AI
				</h3>
			</div>

			{/* List */}
			<div className='relative z-[1]'>
				<ServiceList
					items={[
						'images and videos',
						'code generation',
						'text content creation',
					]}
				/>
			</div>

			{/* Illustration/Connection Section */}
			<div
				className='relative mt-8 hidden lg:block'
				style={{ height: '600px' }}
			>
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

			{/* Mobile Icons */}
			<div className='flex justify-center gap-6 mt-4 lg:hidden'>
				<div className='w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
					<Image className='w-5 h-5' />
				</div>
				<div className='w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
					<File className='w-5 h-5' />
				</div>
				<div className='w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-md'>
					<Code className='w-5 h-5' />
				</div>
			</div>
		</div>
	)
}

export default GenerativeAI
