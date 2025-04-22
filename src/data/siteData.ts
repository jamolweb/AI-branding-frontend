import {
	Book,
	FileText,
	Globe,
	Heart,
	Home,
	Image,
	Images,
	MessageCircle,
	Mic,
	Palette,
	Plus,
	Tag,
} from 'lucide-react'
import React from 'react'

import { BarChart2 } from 'lucide-react'

interface NavItem {
	href: string
	label: string
	icon?: React.ElementType
	group: string
	children?: NavItem[]
}

const homePageNavbar: NavItem[] = [
	{ href: 'services', label: 'Services', group: 'navbar' },
	{ href: 'process', label: 'Process', group: 'navbar' },
	{ href: 'pricing', label: 'Pricing', group: 'navbar' },
	{ href: 'faq', label: 'FAQ', group: 'navbar' },
	{ href: 'contact', label: 'Contact', group: 'navbar' },
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

const sidebarItems: NavItem[] = [
	{ icon: Home, label: 'Dashboard', href: '/dashboard', group: 'GENERAL' },
	{
		icon: BarChart2,
		label: 'Analytics',
		href: '/dashboard/analytics',
		group: 'GENERAL',
	},
	{
		icon: MessageCircle,
		label: 'AI Chatbot',
		href: '/dashboard/chat',
		group: 'GENERAL',
		children: [
			{
				icon: Plus,
				label: 'New Chat',
				href: '/dashboard/chat',
				group: 'GENERAL',
			},
			{
				icon: MessageCircle,
				label: 'Chat History',
				href: '/dashboard/chat?view=history',
				group: 'GENERAL',
			},
		],
	},
	{
		icon: Palette,
		label: 'Logo Maker',
		href: '/dashboard/logo-maker',
		group: 'BRANDING',
		children: [
			{
				icon: Plus,
				label: 'New Logo',
				href: '/dashboard/logo-maker',
				group: 'BRANDING',
			},
			{
				icon: Heart,
				label: 'Favorites',
				href: '/dashboard/logo-maker/favorites',
				group: 'BRANDING',
			},
			{
				icon: Images,
				label: 'My Logos',
				href: '/dashboard/logo-maker/my-logos',
				group: 'BRANDING',
			},
		],
	},
	{
		icon: Book,
		label: 'Brand Book',
		href: '/dashboard/brandbook/brandbook',
		group: 'BRANDING',
		children: [
			{
				icon: Plus,
				label: 'New Brandbook',
				href: '/dashboard/brandbook/create',
				group: 'BRANDING',
			},
			{
				icon: Palette,
				label: 'My brandbooks',
				href: '/dashboard/brandbook',
				group: 'BRANDING',
			},
		],
	},
	{
		icon: MessageCircle,
		label: 'Brand Voice',
		href: '/dashboard/brand-voice',
		group: 'BRANDING',
	},
	{
		icon: FileText,
		label: 'Content Generator',
		href: '/dashboard/content',
		group: 'CONTENT',
	},
	{
		icon: Mic,
		label: 'Text to Voice',
		href: '/dashboard/text-to-voice',
		group: 'CONTENT',
	},
	{
		icon: Image,
		label: 'Image Generator',
		href: '/dashboard/image-generator',
		group: 'CONTENT',
	},
	{
		icon: Tag,
		label: 'Label Generator',
		href: '/dashboard/label-generator',
		group: 'CONTENT',
	},
	{
		icon: Globe,
		label: 'Website Maker',
		href: '/dashboard/website-maker',
		group: 'DEVELOPMENT',
	},
]

export { faqs, homePageNavbar, sidebarItems }
export type { NavItem }
