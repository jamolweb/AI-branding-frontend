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
const plans = [
	{
		name: 'Starter',
		description: 'Perfect for small business exploration',
		priceMonthly: 499,
		priceYearly: 399,
		features: [
			'Access to 3 pre-trained ML models',
			'10,000 API calls per month',
			'Basic analytics dashboard',
			'Email support (48h response time)',
		],
	},
	{
		name: 'Professional',
		description: 'Growing companies ready to scale',
		priceMonthly: 1999,
		priceYearly: 1599,
		features: [
			'2 custom ML models',
			'50,000 API calls per month',
			'Advanced analytics & reporting suite',
			'Priority support (24h response time)',
		],
		highlighted: true,
	},
	{
		name: 'Enterprise',
		description: 'Full AI transformation for enterprises',
		price: 'Custom',
		features: [
			'Unlimited custom model development',
			'Unlimited API calls',
			'Full data governance & compliance',
			'24/7 dedicated support',
		],
	},
]

export { homePageNavbar, plans, steps }
export type { NavItem }
