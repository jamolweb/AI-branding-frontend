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

export default function LogoMaker() {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleMakePromptBetter = async () => {
		if (!input.trim()) return

		setIsLoading(true)
		try {
			const accessToken = authService.getAccessToken()
			const response = await axios.post(
				`${API_URL}/logo/deepseek/make-prompt-better`,
				{
					text: input,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setInput(response.data.enhancedPrompt)
		} catch (error) {
			console.error('Error optimizing prompt:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleGenerate = async () => {
		if (!input.trim()) return

		const userMessage: Message = {
			type: 'user',
			content: input,
		}

		setMessages(prev => [...prev, userMessage])
		setInput('')
		setIsLoading(true)
		const accessToken = authService.getAccessToken()

		try {
			const response = await axios.post(
				`${API_URL}/logo/generate`,
				{
					prompt: input,
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

			// Remove the deleted logo from the UI
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

	return (
		<div
			className='flex flex-col h-[calc(100vh-4rem)]'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div className='flex-1 overflow-y-auto p-6 space-y-6'>
				{messages.map((message, index) => (
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
														const logoId = image.split('/').pop()?.split('?')[0]
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
				<div className='flex items-center space-x-3 max-w-4xl mx-auto'>
					<button
						onClick={handleMakePromptBetter}
						disabled={isLoading || !input.trim()}
						className='p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-50 transition-colors'
						title='Make prompt better'
					>
						<Wand2 size={20} className='text-[rgb(239,252,118)]' />
					</button>
					<input
						type='text'
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder='Describe your logo...'
						className='flex-1 p-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-[rgba(255,255,255,0.8)] placeholder-[rgba(255,255,255,0.4)] disabled:opacity-50'
						disabled={isLoading}
					/>
					<button
						onClick={handleGenerate}
						disabled={isLoading || !input.trim()}
						className='px-4 py-2 bg-[rgb(239,252,118)] text-black rounded-lg hover:bg-[rgba(239,252,118,0.8)] disabled:opacity-50 transition-colors'
					>
						Generate
					</button>
				</div>
			</div>
		</div>
	)
}
