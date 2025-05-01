'use client'

import { BrandbookCard } from '@/components/BrandbookCard'
import { Button } from '@/components/ui/button'
import { brandbookService } from '@/services/brandbook'
import type { Brandbook } from '@/types/brandbook'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BrandbookPage() {
	const [brandbooks, setBrandbooks] = useState<Brandbook[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadBrandbooks()
	}, [])

	async function loadBrandbooks() {
		try {
			const data = await brandbookService.list()
			setBrandbooks(data)
			setError(null)
		} catch (err) {
			setError('Failed to load brandbooks')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	async function handleDelete(id: string) {
		try {
			await brandbookService.delete(id)
			setBrandbooks(brandbooks.filter(b => b.id !== id))
		} catch (err) {
			console.error('Failed to delete brandbook:', err)
			// You might want to show a toast notification here
		}
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen' style={{backgroundColor: '#0a0a0a'}}>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen gap-4' style={{backgroundColor: '#0a0a0a'}}>
				<p className='text-destructive text-red-400'>{error}</p>
				<Button onClick={loadBrandbooks} className='bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black rounded-lg px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(239,252,118)]/25'>Try Again</Button>
			</div>
		)
	}

	return (
		<div className='min-h-screen' style={{backgroundColor: '#0a0a0a'}}>
		<div className='container mx-auto px-4 py-8'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-foreground text-white'>Your Brandbooks</h1>
				<Button asChild className='bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black rounded-lg px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(239,252,118)]/25'>
					<Link href='/dashboard/brandbook/create' className='flex items-center'>
						<Plus className='mr-2 h-4 w-4' />
						Create New
					</Link>
				</Button>
			</div>

			{brandbooks.length === 0 ? (
				<div className='text-center py-12'>
					<h2 className='text-xl font-semibold mb-4 text-foreground text-white'>No brandbooks yet</h2>
					<p className='text-foreground text-gray-200 mb-8'>
						Create your first brandbook to get started with AI-powered brand
						guidelines.
					</p>
					<Button asChild className='bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black rounded-lg px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(239,252,118)]/25'>
						<Link href='/dashboard/brandbook/create' className='flex items-center'>
							<Plus className='mr-2 h-4 w-4' />
							Create Your First Brandbook
						</Link>
					</Button>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8'>
					{brandbooks.map(brandbook => (
						<BrandbookCard
							key={brandbook.id}
							brandbook={brandbook}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
		</div>
	)
}
