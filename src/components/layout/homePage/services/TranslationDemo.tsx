const TranslationDemo = () => {
	return (
		<div
			style={{
				width: '390px',
				height: '150px',
				boxShadow:
					'0 2px 4px #0000004a, 0 8px 8px #00000042, 0 17px 10px #00000026, 0 31px 12px #0000000a, 0 48px 13px #00000003',
				backgroundColor: '#101010',
				borderRadius: '16px',
				opacity: 1,
				transform: 'rotate(-5deg) translateY(-40px) translateX(40px)',
				willChange: 'transform',
				zIndex: 2,
			}}
		>
			<div className='p-4 w-full'>
				<div className='space-y-4'>
					<h4 className='font-manrope text-xl tracking-tight text-center text-white'>
						Como estás?
					</h4>
					<p className='font-mono text-white/70 tracking-tight leading-tight text-center'>
						p#d+G$xs;?00L.K#yt{'}'}1101;k{'{'}
					</p>
					<p className='font-manrope text-xl text-center text-[#effc76] tracking-tight'>
						How are you?
					</p>
				</div>
			</div>
		</div>
	)
}

export default TranslationDemo
