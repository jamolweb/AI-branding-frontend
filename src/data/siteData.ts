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

export { homePageNavbar }
export type { NavItem }
