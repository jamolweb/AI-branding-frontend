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

const faqs = [
	{
		question: 'What industries do you serve?',
		answer:
			'We work with clients across various sectors, including healthcare, finance, retail, manufacturing, and technology. Our AI solutions can be adapted to meet the unique challenges of any industry.',
	},
	{
		question: 'How long does it take to implement an AI solution?',
		answer:
			'Implementation timelines vary based on project complexity and scope. We typically provide detailed timelines during initial consultations and work closely with you to ensure efficient deployment.',
	},
	{
		question: 'Do I need a large amount of data to benefit from AI?',
		answer:
			'While more data can lead to better results, we can work with various data volumes. Our solutions can start with smaller datasets and scale as you collect more data over time.',
	},
	{
		question: 'How do you ensure the security and privacy of our data?',
		answer:
			'We implement industry-leading security measures, including encryption, secure access controls, and compliance with data protection regulations. Your data security is our top priority.',
	},
	{
		question: 'Can your AI solutions integrate with our existing systems?',
		answer:
			'Yes, our solutions are designed to seamlessly integrate with your existing infrastructure. We provide comprehensive API documentation and technical support throughout the integration process.',
	},
	{
		question: 'What kind of support do you offer after implementation?',
		answer:
			'We offer various levels of post-implementation support, from basic email support to 24/7 dedicated assistance, depending on your plan. This includes technical support, updates, and optimization services.',
	},
	{
		question: 'How do you stay current with the latest AI advancements?',
		answer:
			'Our team continuously researches and implements the latest AI technologies. We regularly update our solutions to incorporate new advancements and ensure you benefit from cutting-edge AI capabilities.',
	},
	{
		question: 'Can you help us develop an AI strategy for our business?',
		answer:
			'Absolutely! We offer strategic consulting services to help you identify opportunities for AI implementation, develop a roadmap, and maximize the value of AI for your business.',
	},
]

export { faqs, homePageNavbar }
export type { NavItem }
