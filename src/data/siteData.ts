interface NavItem {
	href: string
	label: string
	icon?: React.ReactNode
}

const homePageNavbar: NavItem[] = [
	{ href: 'services', label: 'Services' },
	{ href: 'process', label: 'Process' },
	{ href: 'pricing', label: 'Pricing' },
	{ href: 'faq', label: 'FAQ' },
	{ href: 'contact', label: 'Contact' },
]

const steps = [
	{
		number: 1,
		title: 'Discover & Prepare',
		description:
			'We analyze your challenges and organize your data to create the perfect foundation for AI transformation.',
	},
	{
		number: 2,
		title: 'Develop & Test',
		description:
			'Our team builds and validates custom AI solutions precisely matched to your business goals.',
	},
	{
		number: 3,
		title: 'Deploy & Optimize',
		description:
			'We seamlessly integrate your AI solutions and continuously optimize them to deliver lasting value.',
	},
]

export { homePageNavbar, steps }
export type { NavItem }
