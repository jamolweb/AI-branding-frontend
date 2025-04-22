'use client'

import { BrandbookForm } from '@/components/BrandbookForm'

export default function CreateBrandbookPage() {
	return (
		<div className='min-h-screen' style={{backgroundColor: '#0a0a0a'}}>
		<div className='container mx-auto px-4 py-8'>
			<BrandbookForm />
		</div>
		</div>
	)
}
