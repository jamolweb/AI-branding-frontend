'use client'

import { API_URL } from '@/env'
import { authService } from '@/services/auth.service'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

// Import components
import StyleSelector from './components/StyleSelector'
import DescriptionInput from './components/DescriptionInput'
import CompanyInput from './components/CompanyInput'
import LogoResults from './components/LogoResults'
import NavigationButtons from './components/NavigationButtons'
import ImageModal from './components/ImageModal'

// Import types
import { Message } from './types'
import { api } from '@/services/api'

export default function LogoMaker() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([])
	const [currentStep, setCurrentStep] = useState(1)
	const [selectedStyle, setSelectedStyle] = useState('')
	const [companyName, setCompanyName] = useState('')
	const [description, setDescription] = useState('')
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
			const response = await api.post(
				`${API_URL}/deepseek/make-prompt-better`,
				{
					text: description,
				},
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

		try {
			const response = await api.post(
				`${API_URL}/logo/generate`,
				{
					prompt: fullPrompt,
					count: 6,
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
		try {
			const response = await api.post(
				`${API_URL}/logo/generate`,
				{
					prompt,
					count: 3,
					jobId,
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
			setMessages(prev => [
				...prev,
				{
					type: 'assistant',
					content:
						'Sorry, there was an error regenerating your logos. Please try again.',
				},
			])
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
			await api.delete(`${API_URL}/logo/${logoId}`)

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

	const handleCreateNew = () => {
		// Reset all state to initial values
		setSelectedImage(null)
		setMessages([])
		setCurrentStep(1)
		setSelectedStyle('')
		setCompanyName('')
		setDescription('')
		setSlogan('')
	}

	const hasGeneratedLogos = messages.some(
		m => m.type === 'assistant' && m.images && m.images.length > 0
	)

	return (
		<div
			className="flex flex-col h-[calc(100vh-4rem)]"
		// style={{ backgroundColor: 'rgb(12, 12, 18)' }}
		>
			<div className="flex flex-col h-full">
				<div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
					{currentStep === 1 && (
						<StyleSelector
							selectedStyle={selectedStyle}
							onStyleSelect={setSelectedStyle}
						/>
					)}

					{currentStep === 2 && (
						<DescriptionInput
							description={description}
							onDescriptionChange={setDescription}
							onEnhancePrompt={handleMakePromptBetter}
							isLoading={isLoading}
						/>
					)}

					{currentStep === 3 && (
						<CompanyInput
							companyName={companyName}
							onCompanyNameChange={setCompanyName}
							slogan={slogan}
							onSloganChange={setSlogan}
						/>
					)}

					{currentStep === 4 && (
						<LogoResults
							messages={messages}
							isLoading={isLoading}
							onViewImage={setSelectedImage}
							onDownloadImage={handleDownload}
							onRegenerateImage={handleRegenerate}
							onDeleteImage={handleDelete}
						/>
					)}

					{selectedImage && (
						<ImageModal
							imageUrl={selectedImage}
							onClose={() => setSelectedImage(null)}
						/>
					)}
					<div ref={messagesEndRef} />
				</div>

				<div className="border-t border-[rgba(255,255,255,0.15)] p-4 sm:p-6 shadow-[0_-5px_15px_rgba(0,0,0,0.2)] mt-auto sticky bottom-0">
					<NavigationButtons
						currentStep={currentStep}
						isLoading={isLoading}
						selectedStyle={selectedStyle}
						description={description}
						companyName={companyName}
						hasGeneratedLogos={hasGeneratedLogos}
						onBack={handleBack}
						onNext={handleNext}
						onCreateNew={handleCreateNew}
					/>
				</div>
			</div>
		</div>
	)
}
