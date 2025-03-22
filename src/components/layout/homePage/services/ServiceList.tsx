interface ServiceListProps {
	items: string[]
	textColor?: string
	bulletColor?: string
	fontSize?: string
}

const ServiceList = ({
	items,
	textColor = '#d5d5d5',
	bulletColor = 'white',
	fontSize = 'text-lg',
}: ServiceListProps) => {
	return (
		<ul className={`${textColor} space-y-1 ${fontSize}`}>
			{items.map((item, index) => (
				<li key={index} className='flex items-center gap-2'>
					<div
						className={`w-1.5 h-1.5 rounded-full`}
						style={{ backgroundColor: bulletColor }}
					></div>
					<p>{item}</p>
				</li>
			))}
		</ul>
	)
}

export default ServiceList
