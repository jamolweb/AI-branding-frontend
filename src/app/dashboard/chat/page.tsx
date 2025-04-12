'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import axios from 'axios'
import { ChevronRight, Clock, MessageCircle, Plus, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
	id: string
	sessionId: string
	role: 'USER' | 'ASSISTANT'
	content: string
	tokensUsed: number | null
	createdAt: string
}

interface ChatSession {
	id: string
	userId: string
	createdAt: string
	updatedAt: string
	messages: Message[]
}

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([])
	const [inputMessage, setInputMessage] = useState('')
	const [sessions, setSessions] = useState<ChatSession[]>([])
	const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [streamingContent, setStreamingContent] = useState('')

	useEffect(() => {
		fetchSessions()
	}, [])

	useEffect(() => {
		if (currentSessionId) {
			fetchChatHistory(currentSessionId)
		}
	}, [currentSessionId])

	const fetchSessions = async () => {
		const accessToken = authService.getAccessToken()

		try {
			const response = await axios.get(`${API_URL}/chat/sessions`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setSessions(response.data)
		} catch (error) {
			console.error('Error fetching sessions:', error)
		}
	}

	const fetchChatHistory = async (sessionId: string) => {
		const accessToken = authService.getAccessToken()
		try {
			const response = await axios.get(`${API_URL}/chat/history/${sessionId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setMessages(response.data)
		} catch (error) {
			console.error('Error fetching chat history:', error)
		}
	}

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return

		setIsLoading(true)
		const newMessage: Message = {
			id: Date.now().toString(),
			sessionId: currentSessionId || '',
			role: 'USER',
			content: inputMessage,
			tokensUsed: null,
			createdAt: new Date().toISOString(),
		}

		setMessages(prev => [...prev, newMessage])
		setInputMessage('')
		setStreamingContent('')

		const accessToken = authService.getAccessToken()

		try {
			const response = await fetch(`${API_URL}/chat/send`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					sessionId: currentSessionId,
					message: inputMessage,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to send message')
			}

			const reader = response.body?.getReader()
			if (!reader) throw new Error('No reader available')

			const decoder = new TextDecoder()

			while (true) {
				const { done, value } = await reader.read()
				if (done) break

				const chunk = decoder.decode(value)
				const lines = chunk.split('\n')

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						const data = JSON.parse(line.slice(6))
						setStreamingContent(prev => prev + data.content)
					}
				}
			}

			// After streaming is complete, add the full message
			const assistantMessage: Message = {
				id: Date.now().toString(),
				sessionId: currentSessionId || '',
				role: 'ASSISTANT',
				content: streamingContent,
				tokensUsed: null,
				createdAt: new Date().toISOString(),
			}

			setMessages(prev => [...prev, assistantMessage])
			setStreamingContent('')

			if (!currentSessionId) {
				// Get the session ID from the response if it's a new session
				const sessionResponse = await axios.get(`${API_URL}/chat/sessions`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				const newSession = sessionResponse.data[0] // Assuming the new session is the first one
				setCurrentSessionId(newSession.id)
			}
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const getLastMessage = (session: ChatSession) => {
		return session.messages.length > 0
			? session.messages[session.messages.length - 1].content
			: 'No messages yet'
	}

	return (
		<div
			className='flex h-full min-h-screen overflow-hidden'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			{/* Sessions sidebar */}
			<div
				className='w-80 border-r border-gray-800 p-6 shadow-sm flex flex-col'
				style={{ backgroundColor: 'rgb(16, 16, 16)' }}
			>
				<div className='flex items-center justify-between mb-8'>
					<h2 className='text-xl font-semibold text-gray-100'>Chat Sessions</h2>
					<button
						onClick={() => {
							setCurrentSessionId(null)
							setMessages([])
						}}
						className='p-2.5 rounded-lg hover:bg-gray-800 transition-colors'
					>
						<Plus className='w-5 h-5 text-gray-400' />
					</button>
				</div>
				<div className='flex-1 space-y-3 pr-2'>
					{sessions.map(session => (
						<button
							key={session.id}
							onClick={() => {
								setCurrentSessionId(session.id)
							}}
							className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
								currentSessionId === session.id
									? 'bg-[rgb(239,252,118)] text-gray-900 shadow-md'
									: 'hover:bg-gray-800 text-gray-100'
							}`}
						>
							<div className='font-medium truncate mb-1.5'>
								{getLastMessage(session)}
							</div>
							<div className='flex items-center text-xs text-gray-500'>
								<Clock className='w-3.5 h-3.5 mr-1.5' />
								{formatDate(session.createdAt)}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Chat area */}
			<div
				className='flex-1 flex flex-col relative overflow-hidden'
				style={{ backgroundColor: 'rgb(16, 16, 16)' }}
			>
				{/* Chat header */}
				<div
					className='border-b border-gray-800 p-6 shadow-sm'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-semibold text-gray-100'>
							{currentSessionId ? 'Chat Session' : 'New Chat'}
						</h2>
						{currentSessionId && (
							<button
								onClick={() => {
									setCurrentSessionId(null)
									setMessages([])
								}}
								className='text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1.5'
							>
								New Chat
								<ChevronRight className='w-4 h-4' />
							</button>
						)}
					</div>
				</div>

				{/* Messages area */}
				<div
					className='flex-1 p-8 overflow-y-auto pb-32'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					{messages.length === 0 ? (
						<div className='h-full flex items-center justify-center text-gray-500'>
							<div className='text-center max-w-md'>
								<MessageCircle className='w-20 h-20 mx-auto mb-6 text-gray-700' />
								<h3 className='text-2xl font-medium text-gray-200 mb-3'>
									Start a conversation
								</h3>
								<p className='text-gray-400 text-lg'>
									Ask our AI assistant anything about branding, marketing, or
									business strategy.
								</p>
							</div>
						</div>
					) : (
						<div className='space-y-6 max-w-4xl mx-auto'>
							{messages.map(message => (
								<div
									key={message.id}
									className={`flex ${
										message.role === 'USER' ? 'justify-end' : 'justify-start'
									}`}
								>
									<div
										className={`max-w-[75%] rounded-2xl p-5 transition-all duration-200 ${
											message.role === 'USER'
												? 'bg-[rgb(239,252,118)] text-gray-900'
												: 'bg-gray-800 text-gray-100 shadow-sm'
										}`}
									>
										<div className='prose prose-invert max-w-none'>
											<ReactMarkdown
												components={{
													h1: props => (
														<h1
															className='text-2xl font-bold mb-3'
															{...props}
														/>
													),
													h2: props => (
														<h2
															className='text-xl font-semibold mb-3'
															{...props}
														/>
													),
													h3: props => (
														<h3
															className='text-lg font-medium mb-2'
															{...props}
														/>
													),
													p: props => (
														<p
															className='mb-3 text-base leading-relaxed'
															{...props}
														/>
													),
													ul: props => (
														<ul
															className='list-disc pl-5 mb-3 space-y-1'
															{...props}
														/>
													),
													ol: props => (
														<ol
															className='list-decimal pl-5 mb-3 space-y-1'
															{...props}
														/>
													),
													li: props => <li className='mb-1' {...props} />,
													strong: props => (
														<strong className='font-bold' {...props} />
													),
													em: props => <em className='italic' {...props} />,
												}}
											>
												{message.content}
											</ReactMarkdown>
										</div>
										<div className='text-xs text-gray-500 mt-3'>
											{formatDate(message.createdAt)}
										</div>
									</div>
								</div>
							))}
							{streamingContent && (
								<div className='flex justify-start'>
									<div className='max-w-[75%] rounded-2xl p-5 bg-gray-800 text-gray-100 shadow-sm'>
										<div className='prose prose-invert max-w-none'>
											<ReactMarkdown
												components={{
													h1: props => (
														<h1
															className='text-2xl font-bold mb-3'
															{...props}
														/>
													),
													h2: props => (
														<h2
															className='text-xl font-semibold mb-3'
															{...props}
														/>
													),
													h3: props => (
														<h3
															className='text-lg font-medium mb-2'
															{...props}
														/>
													),
													p: props => (
														<p
															className='mb-3 text-base leading-relaxed'
															{...props}
														/>
													),
													ul: props => (
														<ul
															className='list-disc pl-5 mb-3 space-y-1'
															{...props}
														/>
													),
													ol: props => (
														<ol
															className='list-decimal pl-5 mb-3 space-y-1'
															{...props}
														/>
													),
													li: props => <li className='mb-1' {...props} />,
													strong: props => (
														<strong className='font-bold' {...props} />
													),
													em: props => <em className='italic' {...props} />,
												}}
											>
												{streamingContent}
											</ReactMarkdown>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Input area - Fixed at bottom */}
				<div
					className='fixed bottom-0 right-0 left-[320px] border-t border-gray-800 p-6 shadow-sm'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					<div className='max-w-4xl mx-auto'>
						<div className='flex gap-3'>
							<input
								type='text'
								value={inputMessage}
								onChange={e => setInputMessage(e.target.value)}
								onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
								placeholder='Type your message...'
								className='flex-1 p-4 border border-gray-700 rounded-xl focus:outline-none focus:border-[rgb(239,252,118)] focus:ring-1 focus:ring-[rgb(239,252,118)] transition-all duration-200 bg-gray-800 text-gray-100 placeholder-gray-500 text-base'
								disabled={isLoading}
							/>
							<button
								onClick={handleSendMessage}
								disabled={isLoading}
								className='p-4 bg-[rgb(239,252,118)] rounded-xl hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200'
							>
								<Send className='w-5 h-5' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
