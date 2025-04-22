'use client'

import { Button } from '@/components/ui/button'
import { authService } from '@/services/auth.service'
import { brandbookService } from '@/services/brandbook'
import type { Brandbook } from '@/types/brandbook'
import { ArrowLeft, Download, FileText, Loader2, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ViewBrandbookPage() {
	const router = useRouter()
	const params = useParams()
	const id = params.id as string

	const [brandbook, setBrandbook] = useState<Brandbook | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [regenerating, setRegenerating] = useState(false)
	const [downloading, setDownloading] = useState(false)
	const [downloadingLogo, setDownloadingLogo] = useState(false)

	useEffect(() => {
		loadBrandbook()
	}, [id])

	async function loadBrandbook() {
		try {
			const data = await brandbookService.get(id)
			setBrandbook(data)
			setError(null)
		} catch (err) {
			setError('Failed to load brandbook')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	async function handleRegenerate() {
		setRegenerating(true)
		try {
			const updated = await brandbookService.regenerate(id)
			setBrandbook(updated)
		} catch (err) {
			console.error('Failed to regenerate brandbook:', err)
		} finally {
			setRegenerating(false)
		}
	}

	async function handleDownloadPDF() {
		if (!brandbook?.pdfUrl) return

		try {
			setDownloading(true)
			const token = authService.getAccessToken()
			const pdfId = brandbook.pdfUrl.split('/').pop()?.replace('.pdf', '')
			const response = await fetch(
				`http://localhost:3003/api/brandbook/pdf/${pdfId}.pdf`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to download PDF')
			}

			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `${brandbook.companyName}-guidelines.pdf`
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch (err) {
			console.error('Failed to download PDF:', err)
		} finally {
			setDownloading(false)
		}
	}

	async function handleDownloadLogo() {
		if (!brandbook?.logoUrl) return

		try {
			setDownloadingLogo(true)
			const token = authService.getAccessToken()
			const logoFilename = brandbook.logoUrl.split('/').pop()
			const response = await fetch(
				`http://localhost:3003/api/brandbook/logo/${logoFilename}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to download logo')
			}

			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `${brandbook.companyName}-logo.png`
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch (err) {
			console.error('Failed to download logo:', err)
		} finally {
			setDownloadingLogo(false)
		}
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
			</div>
		)
	}

	if (error || !brandbook) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen gap-4 text-white'>
				<p className='text-destructive'>{error || 'Brandbook not found'}</p>
				<Button onClick={() => router.push('/dashboard/brandbook')}>
					Return to Dashboard
				</Button>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-black w-full'>
			<div className='max-w-[1400px] mx-auto'>
				<Button
					variant='ghost'
					className='text-muted-foreground hover:text-foreground ml-4 mt-4'
					onClick={() => router.push('/dashboard/brandbook')}
				>
					<ArrowLeft className='w-4 h-4 mr-2' />
					Back to Dashboard
				</Button>

				<div className='mt-6 px-4'>
					<div className='flex items-center justify-between mb-6'>
						<div>
							<h1 className='text-2xl font-semibold text-foreground'>
								{brandbook.companyName}
							</h1>
							{brandbook.tagline && (
								<p className='text-lg text-muted-foreground mt-1'>
									{brandbook.tagline}
								</p>
							)}
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								className='bg-background hover:bg-accent'
								onClick={handleRegenerate}
								disabled={regenerating}
							>
								{regenerating ? (
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
								) : (
									<RefreshCw className='w-4 h-4 mr-2' />
								)}
								Regenerate
							</Button>
							<Button
								variant='outline'
								className='bg-background hover:bg-accent'
								onClick={handleDownloadPDF}
								disabled={downloading}
							>
								{downloading ? (
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
								) : (
									<Download className='w-4 h-4 mr-2' />
								)}
								Download PDF
							</Button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
						<div className='relative aspect-square w-full max-w-[300px] bg-background rounded-lg p-6'>
							<Image
								src={brandbook.logoUrl}
								alt={`${brandbook.companyName} logo`}
								fill
								className='object-contain p-4'
							/>
							<Button
								variant='outline'
								size='sm'
								className='absolute bottom-4 right-4 bg-background hover:bg-accent'
								onClick={handleDownloadLogo}
								disabled={downloadingLogo}
							>
								{downloadingLogo ? (
									<Loader2 className='w-4 h-4 animate-spin' />
								) : (
									<Download className='w-4 h-4' />
								)}
							</Button>
						</div>
						<div className='md:col-span-2 space-y-6'>
							<div>
								<h3 className='text-lg font-semibold text-foreground mb-2'>
									Industry
								</h3>
								<p className='text-muted-foreground'>{brandbook.industry}</p>
							</div>
							<div>
								<h3 className='text-lg font-semibold text-foreground mb-2'>
									Description
								</h3>
								<p className='text-muted-foreground'>{brandbook.description}</p>
							</div>
						</div>
					</div>

					{brandbook.generatedHtml && (
						<div className='bg-background rounded-lg p-6 mb-6'>
							<h3 className='text-xl font-semibold text-foreground mb-6'>
								Brand Guidelines
							</h3>
							<div
								className='prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground'
								dangerouslySetInnerHTML={{ __html: brandbook.generatedHtml }}
							/>
						</div>
					)}

					<div className='flex justify-end pb-6'>
						<Button
							variant='outline'
							className='bg-background hover:bg-accent'
							onClick={handleDownloadPDF}
							disabled={downloading}
						>
							{downloading ? (
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
							) : (
								<FileText className='w-4 h-4 mr-2' />
							)}
							View Full Guidelines
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
