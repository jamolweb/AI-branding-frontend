export default function Loading() {
	return (
		<div
			className='flex items-center justify-center h-[calc(100vh-4rem)]'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(239,252,118)]'></div>
		</div>
	)
}
