'use client'

import SectionName from '@/components/ui/homePage/SectionName'
import SectionTitle from '@/components/ui/homePage/sectionTitle'
import { useState } from 'react'

const ContactSection = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		companyName: '',
		industry: '',
		serviceOfInterest: '',
		message: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted:', formData)
	}

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<section className='py-20' id='contact'>
			<div className='flex flex-col lg:flex-row gap-12 lg:gap-20'>
				<div className='lg:w-1/3'>
					<SectionName name='contact' title='Contact us' />
					<SectionTitle
						title='Get in touch with our team'
						description="Have questions or ready to get started? Contact our team of AI experts. Fill out the form and we'll be in touch shortly."
					/>
				</div>

				{/* Right side - Form */}
				<div className='lg:w-2/3'>
					<form
						onSubmit={handleSubmit}
						className='space-y-5 rounded-2xl p-8'
						style={{
							backgroundColor: 'rgb(16, 16, 16)',
							borderRadius: '16px',
							boxShadow:
								'rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px, rgba(255, 255, 255, 0.15) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px -3px 7px 0px inset, rgba(0, 0, 0, 0.17) 1px -14px 14px 0px inset, rgba(0, 0, 0, 0.1) 3px -30px 18px 0px inset, rgba(0, 0, 0, 0.03) 5px -54px 22px 0px inset, rgba(0, 0, 0, 0) 7px -84px 24px 0px inset',
							opacity: 1,
						}}
					>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div>
								<label
									htmlFor='firstName'
									className='block mb-2 text-sm'
									style={{ color: 'var(--framer-text-color)' }}
								>
									First name
								</label>
								<input
									type='text'
									id='firstName'
									name='firstName'
									value={formData.firstName}
									onChange={handleChange}
									className='w-full px-4 py-3 rounded-lg max-h-[40px]'
									style={{
										background:
											'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
										borderRadius: '10px',
										border: '1px solid rgba(136, 136, 136, 0.1)',
										boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
										color: 'rgb(213, 213, 213)',
									}}
									placeholder='John'
								/>
							</div>
							<div>
								<label htmlFor='lastName' className='block mb-2 text-sm'>
									Last name
								</label>
								<input
									type='text'
									id='lastName'
									name='lastName'
									value={formData.lastName}
									onChange={handleChange}
									className='w-full px-4 py-3 rounded-lg max-h-[40px]'
									style={{
										background:
											'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
										borderRadius: '10px',
										border: '1px solid rgba(136, 136, 136, 0.1)',
										boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
										color: 'rgb(213, 213, 213)',
									}}
									placeholder='Smith'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block mb-2 text-sm'>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full px-4 py-3 rounded-lg max-h-[40px]'
								style={{
									background:
										'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
									borderRadius: '10px',
									border: '1px solid rgba(136, 136, 136, 0.1)',
									boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
									color: 'rgb(213, 213, 213)',
								}}
								placeholder='john@johnsmith.com'
							/>
						</div>

						<div>
							<label htmlFor='companyName' className='block mb-2 text-sm'>
								Company name
							</label>
							<input
								type='text'
								id='companyName'
								name='companyName'
								value={formData.companyName}
								onChange={handleChange}
								className='w-full px-4 py-3 rounded-lg max-h-[40px]'
								style={{
									background:
										'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
									borderRadius: '10px',
									border: '1px solid rgba(136, 136, 136, 0.1)',
									boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
									color: 'rgb(213, 213, 213)',
								}}
								placeholder="John's company"
							/>
						</div>

						<div>
							<label htmlFor='industry' className='block mb-2 text-sm'>
								Industry
							</label>
							<input
								type='text'
								id='industry'
								name='industry'
								value={formData.industry}
								onChange={handleChange}
								className='w-full px-4 py-3 rounded-lg max-h-[40px]'
								style={{
									background:
										'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
									borderRadius: '10px',
									border: '1px solid rgba(136, 136, 136, 0.1)',
									boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
									color: 'rgb(213, 213, 213)',
								}}
								placeholder='IT SaaS'
							/>
						</div>

						<div>
							<label
								htmlFor='serviceOfInterest'
								className='block mb-2 text-sm max-h-[50px]'
							>
								Service of Interest
							</label>
							<select
								id='serviceOfInterest'
								name='serviceOfInterest'
								value={formData.serviceOfInterest}
								onChange={handleChange}
								className='w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] focus:border-[#E2FF7D] focus:outline-none text-gray-300 appearance-none max-h-[50px]'
							>
								<option className='max-h-[50px]' value=''>
									Select...
								</option>
								<option className='max-h-[50px]' value='branding'>
									AI Branding
								</option>
								<option className='max-h-[50px]' value='marketing'>
									AI Marketing
								</option>
								<option className='max-h-[50px]' value='consulting'>
									AI Consulting
								</option>
							</select>
						</div>

						<div>
							<label htmlFor='message' className='block mb-2 text-sm'>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								rows={4}
								className='w-full px-4 py-3 rounded-lg'
								style={{
									background:
										'radial-gradient(81% 75% at 50% 18.4%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
									borderRadius: '10px',
									border: '1px solid rgba(136, 136, 136, 0.1)',
									boxShadow: 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
									color: 'rgb(213, 213, 213)',
								}}
								placeholder='Hi, I would like to know if...'
							/>
						</div>
						<button
							type='submit'
							className='w-full py-3 px-6 max-h-[40px] text-center text-black font-medium rounded-[10px] hover:bg-[#d4f066] transition-colors flex items-center justify-center cursor-pointer'
							style={{
								backgroundColor: 'rgb(239, 252, 118)',
								boxShadow:
									'inset 0px -2px 3px 0px rgba(0, 0, 0, 0.29), inset 0px -6px 6px 0px rgba(0, 0, 0, 0.26), inset 0px -14px 8px 0px rgba(0, 0, 0, 0.15), inset 0px -25px 10px 0px rgba(0, 0, 0, 0.04), inset 0px -39px 11px 0px rgba(0, 0, 0, 0.01)',
								height: '100%',
								width: '100%',
								opacity: 1,
								fontFamily: '"Manrope", "Manrope Placeholder", sans-serif',
								fontWeight: 600,
								letterSpacing: '-0.01em',
								lineHeight: '1.5em',
								color: 'rgb(16, 16, 16)',
							}}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default ContactSection
