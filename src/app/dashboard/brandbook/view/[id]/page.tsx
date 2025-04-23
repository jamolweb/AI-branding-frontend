'use client'

import { Button } from '@/components/ui/button'
import { authService } from '@/services/auth.service'
import { brandbookService } from '@/services/brandbook'
import type { Brandbook } from '@/types/brandbook'
import { ArrowLeft, Download, FileText, Loader2, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

	const colorMap = {
		primary: '#2563eb',    // blue-600
		secondary: '#4b5563',  // gray-600
		accent: '#8b5cf6',     // violet-500
		neutral: '#6b7280',    // gray-500
	};

	const ensureHexColor = (color: string | undefined): string => {
		if (!color) return '#000000';
		// If it's already a hex color, return it
		if (color.startsWith('#')) return color;
		// If it's an oklch color, map it to a safe color
		if (color.toLowerCase().includes('primary')) return colorMap.primary;
		if (color.toLowerCase().includes('secondary')) return colorMap.secondary;
		if (color.toLowerCase().includes('accent')) return colorMap.accent;
		if (color.toLowerCase().includes('neutral')) return colorMap.neutral;
		// For any other format, return black as fallback
		return '#000000';
	};

	const generatePDF = async () => {
		const element = document.getElementById('brandbook-content');
		if (!element) return;

		// Create a deep clone of the element
		const clone = element.cloneNode(true) as HTMLElement;
		clone.style.position = 'absolute';
		clone.style.left = '-9999px';
		clone.style.top = '-9999px';
		document.body.appendChild(clone);

		// Convert all colors in the clone to hex
		const processElement = (el: HTMLElement) => {
			const style = window.getComputedStyle(el);
			const colorProps = ['color', 'backgroundColor', 'borderColor'];

			colorProps.forEach(prop => {
				const value = style[prop as any];
				if (value && value.includes('oklch')) {
					el.style[prop as any] = ensureHexColor(value);
				}
			});

			// Process children
			Array.from(el.children).forEach(child => {
				processElement(child as HTMLElement);
			});
		};

		processElement(clone);

		try {
			const canvas = await html2canvas(clone, {
				scale: 2,
				useCORS: true,
				allowTaint: true,
				logging: false,
				backgroundColor: '#ffffff'
			});
		
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 20;
			
			pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
			pdf.save(`${brandbook.companyName}-brand-book.pdf`);
		} finally {
			// Clean up the cloned element
			if (clone.parentNode) {
				clone.parentNode.removeChild(clone);
			}
		}
	  };

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
					{brandbook.generatedHtml && (
						 <div id="brandbook-content" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
						 <div className="max-w-4xl mx-auto">
						   <div className="flex justify-between items-center mb-8">
							 <h1 className="text-3xl font-bold text-gray-900">Brand Book</h1>
							 <button
							   onClick={generatePDF}
							   className="px-4 py-2 text-white font-medium rounded-md transition-colors"
							   style={{
								 backgroundColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary),
								 opacity: 1,
							   }}
							   onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
							   onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
							 >
							   Download PDF
							 </button>
						   </div>
				   
						   <div className="bg-white p-8 rounded-lg shadow-lg">
							 {/* Brand Identity Section */}
							 <section className="mb-10">
							   <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary) }}>
								 Brand Identity
							   </h2>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-2">Mission</h3>
								 <p className="text-gray-700">{brandbook.generatedJson?.brandIdentity.mission}</p>
							   </div>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-2">Vision</h3>
								 <p className="text-gray-700">{brandbook.generatedJson?.brandIdentity.vision}</p>
							   </div>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-2">Values</h3>
								 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
								   {brandbook.generatedJson?.brandIdentity.values.map((value, index) => (
									 <div key={index} className="bg-gray-50 rounded-md p-3 text-center">
									   <p className="font-medium">{value}</p>
									 </div>
								   ))}
								 </div>
							   </div>
							   
							   <div>
								 <h3 className="text-lg font-semibold mb-2">Personality</h3>
								 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
								   {brandbook.generatedJson?.brandIdentity.personality.map((trait, index) => (
									 <div key={index} className="bg-gray-50 rounded-md p-3 text-center">
									   <p className="font-medium">{trait}</p>
									 </div>
								   ))}
								 </div>
							   </div>
							 </section>
							 
							 {/* Color Palette Section */}
							 <section className="mb-10">
							   <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary) }}>
								 Color Palette
							   </h2>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
								 <div className="flex space-x-4 mb-6">
								   <ColorBox color={brandbook.generatedJson?.colorPalette.primary ?? '#000000'} label="Primary" />
								   <ColorBox color={brandbook.generatedJson?.colorPalette.secondary ?? '#666666'} label="Secondary" />
								   <ColorBox color={brandbook.generatedJson?.colorPalette.accent ?? '#999999'} label="Accent" />
								 </div>
							   </div>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-4">Neutral Colors</h3>
								 <div className="flex space-x-4">
								   <ColorBox color={brandbook.generatedJson?.colorPalette.neutral[0] ?? '#000000'} label="Neutral" />
								 </div>
							   </div>
							   
							   <div>
								 <h3 className="text-lg font-semibold mb-2">Color Usage Guidelines</h3>
								 <ul className="list-disc pl-5 space-y-1 text-gray-700">
								   <li>{brandbook.generatedJson?.colorPalette.colorUsageGuidelines}</li>
								 </ul>
							   </div>
							 </section>
							 
							 {/* Typography Section */}
							 <section className="mb-10">
							   <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary) }}>
								 Typography
							   </h2>
							   
							   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								 <div className="bg-gray-50 p-4 rounded-md">
								   <h3 className="text-lg font-semibold mb-2">Primary Font</h3>
								   <p className="text-3xl" style={{ fontFamily: brandbook.generatedJson?.typography.primaryFont }}>
									 {brandbook.generatedJson?.typography.primaryFont}
								   </p>
								   <p className="text-sm text-gray-500 mt-2">Used for headlines and important text</p>
								 </div>
								 
								 <div className="bg-gray-50 p-4 rounded-md">
								   <h3 className="text-lg font-semibold mb-2">Secondary Font</h3>
								   <p className="text-3xl" style={{ fontFamily: brandbook.generatedJson?.typography.secondaryFont }}>
									 {brandbook.generatedJson?.typography.secondaryFont}
								   </p>
								   <p className="text-sm text-gray-500 mt-2">Used for body text and longer content</p>
								 </div>
							   </div>
							   
							   <div>
								 <h3 className="text-lg font-semibold mb-2">Font Usage Guidelines</h3>
								 <ul className="list-disc pl-5 space-y-1 text-gray-700">
								   {brandbook.generatedJson?.typography.fontUsageGuidelines.map((guideline, index) => (
									 <li key={index}>{guideline}</li>
								   ))}
								 </ul>
							   </div>
							 </section>
							 
							 {/* Voice Tone Section */}
							 <section className="mb-10">
							   <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary) }}>
								 Voice & Tone
							   </h2>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-2">Characteristics</h3>
								 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
								   {brandbook.generatedJson && brandbook.generatedJson?.voiceTone?.characteristics?.map((characteristic, index) => (
									 <div key={index} className="bg-gray-50 rounded-md p-3 text-center">
									   <p className="font-medium">{characteristic}</p>
									 </div>
								   ))}
								 </div>
							   </div>
							   
							   <div className="mb-6">
								 <h3 className="text-lg font-semibold mb-2">Guidelines</h3>
								 <ul className="list-disc pl-5 space-y-1 text-gray-700">
								   {brandbook.generatedJson && brandbook.generatedJson.voiceTone?.guidelines?.map((guideline, index) => (
									 <li key={index}>{guideline}</li>
								   ))}
								 </ul>
							   </div>
							   
							   <div>
								 <h3 className="text-lg font-semibold mb-2">Examples</h3>
								 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
								   <div className="bg-gray-50 p-4 rounded-md">
									 <h4 className="font-medium mb-2">Casual</h4>
									 <p className="text-gray-700 italic">"{brandbook.generatedJson?.voiceTone?.examples?.casual || ''}"</p>
								   </div>
								   <div className="bg-gray-50 p-4 rounded-md">
									 <h4 className="font-medium mb-2">Formal</h4>
									 <p className="text-gray-700 italic">"{brandbook.generatedJson?.voiceTone?.examples?.formal || ''}"</p>
								   </div>
								 </div>
							   </div>
							 </section>
							 
							 {/* Logo Guidelines Section */}
							 <section>
							   <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: ensureHexColor(brandbook.generatedJson?.colorPalette.primary) }}>
								 Logo Guidelines
							   </h2>
							   
							   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								 <div>
								   <h3 className="text-lg font-semibold mb-2">Do's</h3>
								   <ul className="list-disc pl-5 space-y-1 text-gray-700">
									 {brandbook.generatedJson && brandbook.generatedJson.logoGuidelines?.dosDonts?.dos?.map((item, index) => (
									   <li key={index}>{item}</li>
									 ))}
								   </ul>
								 </div>
								 
								 <div>
								   <h3 className="text-lg font-semibold mb-2">Don'ts</h3>
								   <ul className="list-disc pl-5 space-y-1 text-gray-700">
									 {brandbook.generatedJson && brandbook.generatedJson.logoGuidelines?.dosDonts?.donts?.map((item, index) => (
									   <li key={index}>{item}</li>
									 ))}
								   </ul>
								 </div>
							   </div>
							   
							   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								 <div>
								   <h3 className="text-lg font-semibold mb-2">Clear Space</h3>
								   <p className="text-gray-700">{brandbook.generatedJson?.logoGuidelines?.clearSpace || ''}</p>
								 </div>
								 
								 <div>
								   <h3 className="text-lg font-semibold mb-2">Minimum Size</h3>
								   <p className="text-gray-700">{brandbook.generatedJson?.logoGuidelines?.minimumSize || ''}</p>
								 </div>
							   </div>
							 </section>
						   </div>
						 </div>
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

const ColorBox = ({ color, label }: { color: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div 
        className="w-16 h-16 rounded-md mb-2 border border-gray-200" 
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-xs">{label}</span>
      <span className="text-xs text-gray-500">{color}</span>
    </div>
  );