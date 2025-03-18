const LoadingSpinner = () => {
	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-[#0D0D0D]'>
			<div className='flex flex-col items-center'>
				<div className='w-16 h-16 border-4 border-[#C2F970] border-t-transparent rounded-full animate-spin'></div>
				<div className='mt-4 text-center'>
					<p className='text-[#C2F970] text-lg font-medium'>Loading...</p>
					<p className='text-gray-400 text-sm mt-2'>
						Please wait while we process your request
					</p>
				</div>
			</div>
		</div>
	)
}

export default LoadingSpinner
