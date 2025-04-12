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

		const accessToken = authService.getAccessToken()

		try {
			const response = await axios.post(
				`${API_URL}/chat/send`,
				{
					sessionId: currentSessionId,
					message: inputMessage,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const assistantMessage: Message = {
				id: Date.now().toString(),
				sessionId: currentSessionId || '',
				role: 'ASSISTANT',
				content: response.data.response || response.data.message,
				tokensUsed: null,
				createdAt: new Date().toISOString(),
			}

			setMessages(prev => [...prev, assistantMessage])
			if (!currentSessionId) {
				setCurrentSessionId(response.data.sessionId)
				fetchSessions()
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
		<div className='flex h-full' style={{ backgroundColor: 'rgb(16, 16, 16)' }}>
			{/* Sessions sidebar */}
			<div
				className='w-72 border-r border-gray-800 p-4 shadow-sm'
				style={{ backgroundColor: 'rgb(16, 16, 16)' }}
			>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-lg font-semibold text-gray-100'>Chat Sessions</h2>
					<button
						onClick={() => {
							setCurrentSessionId(null)
							setMessages([])
						}}
						className='p-2 rounded-lg hover:bg-gray-800 transition-colors'
					>
						<Plus className='w-5 h-5 text-gray-400' />
					</button>
				</div>
				<div className='space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto'>
					{sessions.map(session => (
						<button
							key={session.id}
							onClick={() => {
								setCurrentSessionId(session.id)
							}}
							className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
								currentSessionId === session.id
									? 'bg-[rgb(239,252,118)] text-gray-900 shadow-md'
									: 'hover:bg-gray-800 text-gray-100'
							}`}
						>
							<div className='font-medium truncate'>
								{getLastMessage(session)}
							</div>
							<div className='flex items-center text-xs text-gray-500 mt-2'>
								<Clock className='w-3 h-3 mr-1' />
								{formatDate(session.createdAt)}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Chat area */}
			<div
				className='flex-1 flex flex-col relative'
				style={{ backgroundColor: 'rgb(16, 16, 16)' }}
			>
				{/* Chat header */}
				<div
					className='border-b border-gray-800 p-4 shadow-sm'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					<div className='flex items-center justify-between'>
						<h2 className='text-lg font-semibold text-gray-100'>
							{currentSessionId ? 'Chat Session' : 'New Chat'}
						</h2>
						{currentSessionId && (
							<button
								onClick={() => {
									setCurrentSessionId(null)
									setMessages([])
								}}
								className='text-sm text-gray-400 hover:text-gray-200 flex items-center'
							>
								New Chat
								<ChevronRight className='w-4 h-4 ml-1' />
							</button>
						)}
					</div>
				</div>

				{/* Messages area */}
				<div
					className='flex-1 p-4 overflow-y-auto pb-24'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					{messages.length === 0 ? (
						<div className='h-full flex items-center justify-center text-gray-500'>
							<div className='text-center max-w-md'>
								<MessageCircle className='w-16 h-16 mx-auto mb-4 text-gray-700' />
								<h3 className='text-xl font-medium text-gray-200 mb-2'>
									Start a conversation
								</h3>
								<p className='text-gray-400'>
									Ask our AI assistant anything about branding, marketing, or
									business strategy.
								</p>
							</div>
						</div>
					) : (
						<div className='space-y-4 max-w-3xl mx-auto'>
							{messages.map(message => (
								<div
									key={message.id}
									className={`flex ${
										message.role === 'USER' ? 'justify-end' : 'justify-start'
									}`}
								>
									<div
										className={`max-w-[70%] rounded-2xl p-4 transition-all duration-200 ${
											message.role === 'USER'
												? 'bg-[rgb(239,252,118)] text-gray-900'
												: 'bg-gray-800 text-gray-100 shadow-sm'
										}`}
									>
										<div className='prose prose-invert max-w-none'>
											<ReactMarkdown
												components={{
													h1: props => (
														<h1 className='text-xl font-bold mb-2' {...props} />
													),
													h2: props => (
														<h2
															className='text-lg font-semibold mb-2'
															{...props}
														/>
													),
													h3: props => (
														<h3
															className='text-base font-medium mb-2'
															{...props}
														/>
													),
													p: props => <p className='mb-2' {...props} />,
													ul: props => (
														<ul className='list-disc pl-4 mb-2' {...props} />
													),
													ol: props => (
														<ol className='list-decimal pl-4 mb-2' {...props} />
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
										<div className='text-xs text-gray-500 mt-2'>
											{formatDate(message.createdAt)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Input area - Fixed at bottom */}
				<div
					className='fixed bottom-0 right-0 left-[288px] border-t border-gray-800 p-4 shadow-sm'
					style={{ backgroundColor: 'rgb(16, 16, 16)' }}
				>
					<div className='max-w-3xl mx-auto'>
						<div className='flex gap-2'>
							<input
								type='text'
								value={inputMessage}
								onChange={e => setInputMessage(e.target.value)}
								onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
								placeholder='Type your message...'
								className='flex-1 p-3 border border-gray-700 rounded-lg focus:outline-none focus:border-[rgb(239,252,118)] focus:ring-1 focus:ring-[rgb(239,252,118)] transition-all duration-200 bg-gray-800 text-gray-100 placeholder-gray-500'
								disabled={isLoading}
							/>
							<button
								onClick={handleSendMessage}
								disabled={isLoading}
								className='p-3 bg-[rgb(239,252,118)] rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200'
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
