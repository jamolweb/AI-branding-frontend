'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import axios from 'axios'
import { MessageCircle, Send } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Message {
	id: string
	content: string
	role: 'user' | 'assistant'
	timestamp: string
}

interface ChatSession {
	id: string
	title: string
	lastMessage: string
	timestamp: string
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
			content: inputMessage,
			role: 'user',
			timestamp: new Date().toISOString(),
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
				content: response.data.message,
				role: 'assistant',
				timestamp: new Date().toISOString(),
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

	return (
		<div className='flex h-full'>
			{/* Sessions sidebar */}
			<div className='w-64 border-r border-gray-200 p-4'>
				<h2 className='text-lg font-semibold mb-4'>Chat Sessions</h2>
				<div className='space-y-2'>
					{sessions.map(session => (
						<button
							key={session.id}
							onClick={() => setCurrentSessionId(session.id)}
							className={`w-full text-left p-2 rounded-lg ${
								currentSessionId === session.id
									? 'bg-[rgb(239,252,118)]'
									: 'hover:bg-gray-100'
							}`}
						>
							<div className='font-medium'>{session.title}</div>
							<div className='text-sm text-gray-500 truncate'>
								{session.lastMessage}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Chat area */}
			<div className='flex-1 flex flex-col'>
				<div className='flex-1 p-4 overflow-y-auto'>
					{messages.length === 0 ? (
						<div className='h-full flex items-center justify-center text-gray-500'>
							<div className='text-center'>
								<MessageCircle className='w-12 h-12 mx-auto mb-4' />
								<p>Start a conversation with our AI assistant</p>
							</div>
						</div>
					) : (
						<div className='space-y-4'>
							{messages.map(message => (
								<div
									key={message.id}
									className={`flex ${
										message.role === 'user' ? 'justify-end' : 'justify-start'
									}`}
								>
									<div
										className={`max-w-[70%] rounded-lg p-3 ${
											message.role === 'user'
												? 'bg-[rgb(239,252,118)]'
												: 'bg-gray-100'
										}`}
									>
										{message.content}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Input area */}
				<div className='border-t border-gray-200 p-4'>
					<div className='flex gap-2'>
						<input
							type='text'
							value={inputMessage}
							onChange={e => setInputMessage(e.target.value)}
							onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
							placeholder='Type your message...'
							className='flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(239,252,118)]'
							disabled={isLoading}
						/>
						<button
							onClick={handleSendMessage}
							disabled={isLoading}
							className='p-2 bg-[rgb(239,252,118)] rounded-lg hover:bg-opacity-90 disabled:opacity-50'
						>
							<Send className='w-5 h-5' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
