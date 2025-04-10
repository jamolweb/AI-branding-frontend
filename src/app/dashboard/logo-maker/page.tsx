'use client'

import { authService } from '@/services/auth.service'
import axios from 'axios'
import { Download, RefreshCw, Trash2, Wand2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

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
	const [messages, setMessages] = useState<Message[]>([])
	const [currentStep, setCurrentStep] = useState(1)
	const [selectedStyle, setSelectedStyle] = useState('')
	const [prompt, setPrompt] = useState('')
	const [companyName, setCompanyName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleMakePromptBetter = async () => {
		if (!prompt.trim()) return

		setIsLoading(true)
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.post(
				`${API_URL}/logo/deepseek/make-prompt-better`,
				{
					text: prompt,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setPrompt(response.data)
		} catch (error) {
			console.error('Error optimizing prompt:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleGenerate = async () => {
		const fullPrompt = `Create a ${selectedStyle} style logo for a company named "${companyName}". ${prompt}`

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
		if (currentStep === 2 && !prompt.trim()) return
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
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div className='flex-1 overflow-y-auto p-6 space-y-6'>
				{currentStep === 1 && (
					<div className='max-w-4xl mx-auto'>
						<h2 className='text-2xl font-semibold text-white mb-6'>
							Choose Logo Style
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{logoStyles.map(style => (
								<button
									key={style.id}
									onClick={() => setSelectedStyle(style.id)}
									className={`p-4 rounded-lg border ${
										selectedStyle === style.id
											? 'border-[rgb(239,252,118)] bg-[rgba(239,252,118,0.1)]'
											: 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(239,252,118,0.5)]'
									}`}
								>
									<h3 className='text-white font-medium mb-2'>{style.name}</h3>
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
								value={prompt}
								onChange={e => setPrompt(e.target.value)}
								placeholder='Describe additional details for your logo... (e.g., design elements, colors, style preferences, brand personality)'
								className='w-full p-4 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-[rgba(255,255,255,0.8)] placeholder-[rgba(255,255,255,0.4)] min-h-[150px] resize-y'
							/>
							<div className='flex justify-end'>
								<button
									onClick={handleMakePromptBetter}
									disabled={isLoading || !prompt.trim()}
									className='flex items-center space-x-2 px-4 py-2 bg-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.15)] disabled:opacity-50 transition-colors text-[rgb(239,252,118)]'
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
							className='w-full p-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-[rgba(255,255,255,0.8)] placeholder-[rgba(255,255,255,0.4)]'
						/>
					</div>
				)}

				{currentStep === 4 &&
					messages.map((message, index) => (
						<div
							key={index}
							className={`flex ${
								message.type === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							<div
								className={`max-w-[80%] rounded-xl p-4 ${
									message.type === 'user'
										? 'bg-[rgb(239,252,118)] text-black'
										: 'bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)]'
								}`}
							>
								<p className='text-sm'>{message.content}</p>
								{message.images && (
									<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
										{message.images.map((image, imgIndex) => (
											<div key={imgIndex} className='relative group'>
												<Image
													src={image}
													alt={`Generated logo ${imgIndex + 1}`}
													width={200}
													height={200}
													className='rounded-lg shadow-lg'
												/>
												<div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-3'>
													<button
														onClick={() => handleDownload(image)}
														className='p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-colors'
														title='Download'
													>
														<Download size={20} className='text-black' />
													</button>
													<button
														onClick={() =>
															handleRegenerate(message.content, message.jobId)
														}
														className='p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-colors'
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
														className='p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-colors'
														title='Delete'
													>
														<Trash2 size={20} className='text-black' />
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
				<div ref={messagesEndRef} />
			</div>

			<div className='border-t border-[rgba(255,255,255,0.1)] p-4 bg-[rgb(16,16,16)]'>
				<div className='flex items-center justify-between max-w-4xl mx-auto'>
					{currentStep > 1 && (
						<button
							onClick={handleBack}
							className='px-4 py-2 text-[rgba(255,255,255,0.8)] hover:text-white transition-colors'
						>
							Back
						</button>
					)}
					{currentStep < 4 && (
						<button
							onClick={handleNext}
							disabled={
								(currentStep === 1 && !selectedStyle) ||
								(currentStep === 2 && !prompt.trim()) ||
								(currentStep === 3 && !companyName.trim()) ||
								isLoading
							}
							className='px-4 py-2 bg-[rgb(239,252,118)] text-black rounded-lg hover:bg-[rgba(239,252,118,0.8)] disabled:opacity-50 transition-colors ml-auto'
						>
							{currentStep === 3 ? 'Generate' : 'Next'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
