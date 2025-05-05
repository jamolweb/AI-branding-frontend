'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import axios from 'axios'
import { Download, RefreshCw, Trash2, Maximize2, X, Wand2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Message {
	type: 'user' | 'assistant'
	content: string
	images?: string[]
	jobId?: string
}

const logoStyles = [
	{
		id: 'minimalist',
		name: 'Minimalist',
		description: 'Clean, simple, and modern designs',
	},
	{
		id: 'vintage',
		name: 'Vintage',
		description: 'Classic, retro, and timeless aesthetics',
	},
	{
		id: 'geometric',
		name: 'Geometric',
		description: 'Shapes, patterns, and mathematical precision',
	},
	{
		id: 'abstract',
		name: 'Abstract',
		description: 'Creative, unique, and artistic expressions',
	},
	{
		id: 'mascot',
		name: 'Mascot',
		description: 'Character-based and personality-driven designs',
	},
	{
		id: 'typography',
		name: 'Typography',
		description: 'Font-focused and text-based logos',
	},
]

export default function LogoMaker() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([])
	const [currentStep, setCurrentStep] = useState(1)
	const [selectedStyle, setSelectedStyle] = useState('')
	const [companyName, setCompanyName] = useState('')
	const [description, setDescription] = useState('')
	const [prompt, setPrompt] = useState('')
	const [slogan, setSlogan] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleMakePromptBetter = async () => {
		if (!description.trim()) return

		setIsLoading(true)
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.post(
				`${API_URL}/logo/deepseek/make-prompt-better`,
				{
					text: description,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setDescription(response.data)
		} catch (error) {
			console.error('Error optimizing prompt:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleGenerate = async () => {
		let fullPrompt = `Create a ${selectedStyle} style logo for a company named "${companyName}". The company description: ${description}`
		if (slogan.trim()) {
			fullPrompt += `. Company slogan: "${slogan}"`
		}

		const userMessage: Message = {
			type: 'user',
			content: fullPrompt,
		}

		setMessages(prev => [...prev, userMessage])
		setIsLoading(true)
		const accessToken = authService.getAccessToken()

		try {
			const response = await axios.post(
				`${API_URL}/logo/generate`,
				{
					prompt: fullPrompt,
					count: 3,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const assistantMessage: Message = {
				type: 'assistant',
				content: 'Here are your generated logos:',
				images: response.data.images,
				jobId: response.data.jobId,
			}

			setMessages(prev => [...prev, assistantMessage])
		} catch (error) {
			console.error('Error generating logos:', error)
			setMessages(prev => [
				...prev,
				{
					type: 'assistant',
					content:
						'Sorry, there was an error generating your logos. Please try again.',
				},
			])
		} finally {
			setIsLoading(false)
		}
	}

	const handleRegenerate = async (prompt: string, jobId?: string) => {
		setIsLoading(true)
		const accessToken = authService.getAccessToken()
		try {
			const response = await axios.post(
				`${API_URL}/logo/generate`,
				{
					prompt,
					count: 3,
					jobId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const newMessages = messages.map(msg => {
				if (
					msg.type === 'assistant' &&
					msg.content === 'Here are your generated logos:'
				) {
					return {
						...msg,
						images: response.data.images,
						jobId: response.data.jobId,
					}
				}
				return msg
			})

			setMessages(newMessages)
		} catch (error) {
			console.error('Error regenerating logos:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDownload = async (imageUrl: string) => {
		try {
			const response = await fetch(imageUrl)
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'logo.png'
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch (error) {
			console.error('Error downloading image:', error)
		}
	}

	const handleDelete = async (logoId: string) => {
		try {
			const accessToken = authService.getAccessToken()
			await axios.delete(`${API_URL}/logo/${logoId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			setMessages(prevMessages => {
				return prevMessages.map(msg => {
					if (msg.type === 'assistant' && msg.images) {
						return {
							...msg,
							images: msg.images.filter(image => !image.includes(logoId)),
						}
					}
					return msg
				})
			})
		} catch (error) {
			console.error('Error deleting logo:', error)
		}
	}

	const handleNext = () => {
		if (currentStep === 1 && !selectedStyle) return
		if (currentStep === 2 && !description.trim()) return
		if (currentStep === 3 && !companyName.trim()) return

		if (currentStep === 3) {
			handleGenerate()
		}
		setCurrentStep(prev => Math.min(prev + 1, 4))
	}

	const handleBack = () => {
		setCurrentStep(prev => Math.max(prev - 1, 1))
	}

	return (
		<div
			className='flex flex-col h-[calc(100vh-4rem)]'
			style={{ backgroundColor: 'rgb(12, 12, 18)' }}
		>
			<div className='flex flex-col h-full'>
				<div className='flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8'>
					{currentStep === 1 && (
						<div className='max-w-4xl mx-auto'>
							<h2 className='text-2xl font-semibold text-white mb-6'>
								Choose Logo Style
							</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
								{logoStyles.map(style => (
									<button
										key={style.id}
										onClick={() => setSelectedStyle(style.id)}
										className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${selectedStyle === style.id
											? 'border-[rgb(239,252,118)] bg-[rgba(239,252,118,0.15)] shadow-[0_0_15px_rgba(239,252,118,0.2)]'
											: 'border-[rgba(255,255,255,0.15)] hover:border-[rgba(239,252,118,0.6)] hover:bg-[rgba(255,255,255,0.05)]'
											}`}
									>
										<h3 className='text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3'>{style.name}</h3>
										<p className='text-[rgba(255,255,255,0.6)] text-sm'>
											{style.description}
										</p>
									</button>
								))}
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className='max-w-4xl mx-auto'>
							<h2 className='text-2xl font-semibold text-white mb-6'>
								Describe Your Logo
							</h2>
							<div className='flex flex-col space-y-3'>
								<textarea
									value={description}
									onChange={e => setDescription(e.target.value)}
									placeholder='Describe additional details for your logo... (e.g., design elements, colors, style preferences, brand personality)'
									className='w-full p-4 sm:p-5 bg-[rgba(255,255,255,0.08)] border-2 border-[rgba(255,255,255,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white placeholder-[rgba(255,255,255,0.5)] min-h-[150px] sm:min-h-[180px] text-base sm:text-lg resize-y shadow-inner'
								/>
								<div className='flex justify-end'>
									<button
										onClick={handleMakePromptBetter}
										disabled={isLoading || !description.trim()}
										className='flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[rgba(255,255,255,0.12)] rounded-xl hover:bg-[rgba(255,255,255,0.18)] disabled:opacity-50 transition-all duration-300 text-[rgb(239,252,118)] font-medium shadow-md hover:shadow-lg text-sm sm:text-base'
										title='Make prompt better'
									>
										<Wand2 size={16} />
										<span>Enhance Prompt</span>
									</button>
								</div>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className='max-w-4xl mx-auto'>
							<h2 className='text-2xl font-semibold text-white mb-6'>
								Enter Company Name
							</h2>
							<input
								type='text'
								value={companyName}
								onChange={e => setCompanyName(e.target.value)}
								placeholder='Enter your company name...'
								className='w-full p-4 sm:p-5 bg-[rgba(255,255,255,0.08)] border-2 border-[rgba(255,255,255,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white placeholder-[rgba(255,255,255,0.5)] text-base sm:text-lg shadow-inner'
							/>
						</div>
					)}

					{currentStep === 4 && (
						<div className='max-w-4xl mx-auto'>
							<h2 className='text-2xl font-semibold text-white mb-6'>
								Your Generated Logos
							</h2>
							{isLoading ? (
								<div className='flex flex-col items-center justify-center p-8 sm:p-12 bg-[rgba(0,0,0,0.2)] rounded-2xl border border-[rgba(255,255,255,0.1)]'>
									<div className='w-16 h-16 border-4 border-[rgb(239,252,118)] border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(239,252,118,0.3)]'></div>
									<p className='text-[rgba(255,255,255,0.9)] text-lg font-medium'>Generating your logos...</p>
								</div>
							) : (
								<div>
									{messages.map((message, index) => (
										message.type === 'assistant' && message.images && (
											<div key={index} className='space-y-6 sm:space-y-8 bg-[rgba(0,0,0,0.2)] p-4 sm:p-6 rounded-2xl border border-[rgba(255,255,255,0.08)]'>

												<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-6'>
													{message.images.map((image, imgIndex) => (
														<div key={imgIndex} className='relative group transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden'>
															<Image
																src={image}
																alt={`Generated logo ${imgIndex + 1}`}
																width={250}
																height={250}
																className='rounded-xl shadow-xl w-full h-auto object-cover'
															/>
															<div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center space-x-4 p-4'>
																<button
																	onClick={() => setSelectedImage(image)}
																	className='p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110'
																	title='View Larger'
																>
																	<Maximize2 size={20} className='text-black' />
																</button>
																<button
																	onClick={() => handleDownload(image)}
																	className='p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110'
																	title='Download'
																>
																	<Download size={20} className='text-black' />
																</button>
																<button
																	onClick={() =>
																		handleRegenerate(message.content, message.jobId)
																	}
																	className='p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110'
																	title='Regenerate'
																>
																	<RefreshCw size={20} className='text-black' />
																</button>
																<button
																	onClick={() => {
																		const logoId = image
																			.split('/')
																			.pop()
																			?.split('?')[0]
																		if (logoId) handleDelete(logoId)
																	}}
																	className='p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110'
																	title='Delete'
																>
																	<Trash2 size={20} className='text-black' />
																</button>
															</div>
														</div>
													))}

													{/* Image Modal */}
													{selectedImage && (
														<div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-8'>
															<div className='relative max-w-3xl w-full bg-gradient-to-b from-[rgb(30,30,35)] to-[rgb(15,15,20)] rounded-2xl p-4 border-2 border-[rgba(239,252,118,0.3)] shadow-[0_0_30px_rgba(239,252,118,0.2)]'>
																<button
																	onClick={() => setSelectedImage(null)}
																	className='absolute -top-3 -right-3 p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] z-10'
																>
																	<X size={18} className='text-black' />
																</button>
																<div className='w-full max-w-xl mx-auto max-h-[80vh] p-2 bg-[rgba(255,255,255,0.03)] rounded-xl'>
																	<Image
																		src={selectedImage}
																		alt='Selected logo'
																		width={500}
																		height={500}
																		className='object-contain rounded-xl shadow-2xl mx-auto'
																	/>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
										)
									))}
								</div>
							)}
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				<div className='border-t border-[rgba(255,255,255,0.15)] p-4 sm:p-6 shadow-[0_-5px_15px_rgba(0,0,0,0.2)] mt-auto sticky bottom-0 bg-[rgb(12,12,18)]'>
					<div className='flex items-center justify-between max-w-4xl mx-auto w-full'>
						{currentStep > 1 && (
							<button
								onClick={handleBack}
								className='px-4 sm:px-6 py-2.5 sm:py-3 text-[rgba(255,255,255,0.8)] hover:text-white transition-all duration-300 bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] rounded-xl font-medium text-sm sm:text-base w-[100px] sm:w-auto'
							>
								Back
							</button>
						)}
						{currentStep < 4 && (
							<button
								onClick={handleNext}
								disabled={
									(currentStep === 1 && !selectedStyle) ||
									(currentStep === 2 && !description.trim()) ||
									(currentStep === 3 && !companyName.trim()) ||
									isLoading
								}
								className='px-4 sm:px-8 py-2.5 sm:py-3 bg-[rgb(239,252,118)] text-black rounded-xl hover:bg-[rgba(239,252,118,0.9)] disabled:opacity-50 transition-all duration-300 ml-auto font-semibold text-base sm:text-lg shadow-lg hover:shadow-[0_0_20px_rgba(239,252,118,0.3)] transform hover:-translate-y-1 w-[100px] sm:w-auto'
							>
								{currentStep === 4 ? 'Generate' : 'Next'}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
