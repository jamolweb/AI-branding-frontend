'use client'

import { sidebarItems } from '@/data/siteData'
import { authService } from '@/services/auth.service'
import {
	Bell,
	ChevronDown,
	HelpCircle,
	LogOut,
	Menu,
	Search,
	Settings,
	Sun,
	User,
	X,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const Logo = () => (
	<svg viewBox='0 0 24 23' className='w-6 h-6'>
		<path
			d='M 14.744 23 C 12 23 12 16.556 9.256 16.556 C 6.097 16.556 0.245 17.274 0.245 14.184 C 0.245 11.499 6.831 11.499 6.831 8.815 C 6.831 5.726 6.097 0 9.256 0 C 12 0 12 6.444 14.744 6.444 C 17.903 6.444 23.755 5.726 23.755 8.815 C 23.755 11.499 17.168 11.499 17.168 14.184 C 17.168 17.274 17.903 23 14.744 23 Z'
			fill='rgb(239, 252, 118)'
		/>
	</svg>
)

interface AccordionItemProps {
	item: (typeof sidebarItems)[0]
	pathname: string
	onNavigate: (href: string) => void
}

const AccordionItem = ({ item, pathname, onNavigate }: AccordionItemProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const searchParams = useSearchParams()

	const isActive = useCallback(
		(href: string) => {
			const baseMatch = pathname === href.split('?')[0]
			if (!baseMatch) return false

			const itemParams = new URLSearchParams(href.split('?')[1] || '')
			const currentParams = searchParams

			// Special handling for chat routes
			if (href.startsWith('/dashboard/chat')) {
				const isHistory = currentParams.get('view') === 'history'
				const isHistoryRoute = href.includes('view=history')
				// Only return true if both are history or both are not history
				return isHistory === isHistoryRoute
			}

			// For other routes, check all params match
			for (const [key, value] of itemParams) {
				if (currentParams.get(key) !== value) return false
			}

			return true
		},
		[pathname, searchParams]
	)

	const hasChildren = item.children && item.children.length > 0
	const isItemActive = isActive(item.href)

	useEffect(() => {
		if (hasChildren && item.children) {
			const isChildActive = item.children.some(child =>
				child.children
					? child.children.some(grandChild => isActive(grandChild.href))
					: isActive(child.href)
			)
			if (isChildActive) {
				setIsOpen(true)
			}
		}
	}, [pathname, searchParams, hasChildren, item.children, isActive])

	return (
		<div className='space-y-1'>
			<button
				onClick={() => {
					if (hasChildren) {
						setIsOpen(!isOpen)
					} else {
						onNavigate(item.href)
					}
				}}
				className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
					isItemActive
						? 'bg-[rgb(239,252,118)]'
						: 'hover:bg-[rgba(255,255,255,0.1)]'
				}`}
			>
				{item.icon && (
					<item.icon
						className={`w-4 h-4 ${
							isItemActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
						}`}
					/>
				)}
				<span
					className={`text-sm font-medium flex-1 text-left whitespace-nowrap ${
						isItemActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
					}`}
				>
					{item.label}
				</span>
				{hasChildren && (
					<div
						className={`transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
					>
						<ChevronDown
							className={`w-4 h-4 ${
								isItemActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
							}`}
						/>
					</div>
				)}
			</button>

			{hasChildren && isOpen && item.children && (
				<div className='ml-4 space-y-1'>
					{item.children.map(child => (
						<div key={child.href}>
							<button
								onClick={() => {
									if (child.children) {
										setIsOpen(!isOpen)
									} else {
										onNavigate(child.href)
									}
								}}
								className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
									isActive(child.href)
										? 'bg-[rgb(239,252,118)]'
										: 'hover:bg-[rgba(255,255,255,0.1)]'
								}`}
							>
								{child.icon && (
									<child.icon
										className={`w-4 h-4 ${
											isActive(child.href)
												? 'text-black'
												: 'text-[rgba(255,255,255,0.8)]'
										}`}
									/>
								)}
								<span
									className={`text-sm font-medium whitespace-nowrap ${
										isActive(child.href)
											? 'text-black'
											: 'text-[rgba(255,255,255,0.8)]'
									}`}
								>
									{child.label}
								</span>
								{child.children && (
									<div
										className={`transition-transform duration-200 ${
											isOpen ? 'rotate-180' : ''
										}`}
									>
										<ChevronDown
											className={`w-4 h-4 ${
												isActive(child.href)
													? 'text-black'
													: 'text-[rgba(255,255,255,0.8)]'
											}`}
										/>
									</div>
								)}
							</button>
							{child.children && isOpen && (
								<div className='ml-4 space-y-1 mt-1'>
									{child.children.map(grandChild => (
										<button
											key={grandChild.href}
											onClick={() => onNavigate(grandChild.href)}
											className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
												isActive(grandChild.href)
													? 'bg-[rgb(239,252,118)]'
													: 'hover:bg-[rgba(255,255,255,0.1)]'
											}`}
										>
											{grandChild.icon && (
												<grandChild.icon
													className={`w-4 h-4 ${
														isActive(grandChild.href)
															? 'text-black'
															: 'text-[rgba(255,255,255,0.8)]'
													}`}
												/>
											)}
											<span
												className={`text-sm font-medium whitespace-nowrap ${
													isActive(grandChild.href)
														? 'text-black'
														: 'text-[rgba(255,255,255,0.8)]'
												}`}
											>
												{grandChild.label}
											</span>
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

// Define type based on sidebarItems structure
type SidebarItemType = {
	label: string
	href: string
	icon?: React.ElementType
	group: string
	children?: SidebarItemType[]
}

// Type for flattened navigation items
interface FlattenedNavItem {
	label: string
	href: string
	icon?: React.ElementType
}

// Helper function to flatten sidebar items (Ensure this is robust)
const flattenNavItems = (items: SidebarItemType[]): FlattenedNavItem[] => {
	let flattened: FlattenedNavItem[] = []
	const processItem = (item: SidebarItemType) => {
		// Add the item itself if it's directly navigable
		if (item.href) {
			flattened.push({
				label: item.label,
				href: item.href,
				icon: item.icon as React.ElementType | undefined,
			})
		}
		// Process children recursively
		if (item.children) {
			item.children.forEach(processItem)
		}
	}
	items.forEach(processItem)
	// Manually add items not in sidebarItems if needed
	flattened.push({
		label: 'Settings',
		href: '/dashboard/settings',
		icon: Settings as React.ElementType,
	})
	flattened.push({
		label: 'Help',
		href: '/dashboard/help',
		icon: HelpCircle as React.ElementType,
	})
	flattened.push({
		label: 'Profile',
		href: '/dashboard/profile',
		icon: User as React.ElementType,
	})
	// Remove duplicates by href if necessary (e.g., Settings might be in both places)
	flattened = flattened.filter(
		(v, i, a) => a.findIndex(t => t.href === v.href) === i
	)
	return flattened
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(true)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	// --- Search State & Refs ---
	const [searchQuery, setSearchQuery] = useState('')
	const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
	const [filteredResults, setFilteredResults] = useState<FlattenedNavItem[]>([])
	const flattenedNavItems = useMemo(
		() => flattenNavItems(sidebarItems as SidebarItemType[]),
		[]
	)
	const modalContainerRef = useRef<HTMLDivElement>(null) // Ref for the modal container
	const modalInputRef = useRef<HTMLInputElement>(null) // Ref for the input inside the modal
	// --- End Search State & Refs ---

	// --- Search Logic ---
	useEffect(() => {
		// Filter results based on query
		const results =
			searchQuery.trim() === ''
				? flattenedNavItems // <-- Show all items when query is empty
				: flattenedNavItems.filter(item =>
						item.label.toLowerCase().includes(searchQuery.toLowerCase())
				  )
		setFilteredResults(results)
	}, [searchQuery, flattenedNavItems])

	// Handle closing modal on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalContainerRef.current &&
				!modalContainerRef.current.contains(event.target as Node)
			) {
				closeSearchModal()
			}
		}
		if (isSearchDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isSearchDropdownOpen])

	// Focus input when modal opens
	useEffect(() => {
		if (isSearchDropdownOpen) {
			// Timeout needed to allow modal to render before focusing
			setTimeout(() => modalInputRef.current?.focus(), 50)
		}
	}, [isSearchDropdownOpen])

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const openSearchModal = () => {
		setIsSearchDropdownOpen(true)
	}

	const closeSearchModal = () => {
		setIsSearchDropdownOpen(false)
		setSearchQuery('') // Reset query on close
	}

	// Navigate and close dropdown/modal
	const handleResultClick = (href: string) => {
		router.push(href)
		closeSearchModal()
		setIsSidebarOpen(false) // Close sidebar if open (mobile)
	}
	// --- End Search Logic ---

	const handleLogout = async () => {
		try {
			// The logout endpoint will clear cookies on the server side
			await authService.logout()
			// No need to call authService.logout() again as it's already handled
			router.push('/auth/signin')
		} catch (error) {
			console.error('Logout error:', error)
			// Force redirect to signin page even if logout fails
			window.location.href = '/auth/signin' // Use direct navigation instead of router
		}
	}

	useEffect(() => {
		// Initialize authentication and verify user session
		const initializeAuth = async () => {
			try {
				// Try to get the user profile which will validate the session
				await authService.getProfile()
				// If we get here without errors, authentication succeeded
				authService.setAuthenticated(true)
			} catch (error) {
				console.warn('Error fetching profile:', error)
				// If there was an error even after token refresh attempts
				// (handled in the auth service), redirect to login
				if (window.location.pathname !== '/auth/signin') {
					window.location.href = '/auth/signin'
				}
			} finally {
				// Always set loading to false
				setIsLoading(false)
			}
		}

		initializeAuth()
	}, [])

	const handleNavigation = (href: string) => {
		router.push(href)
		setIsSidebarOpen(false)
	}

	if (isLoading) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: 'rgb(16, 16, 16)' }}
			>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(239,252,118)]'></div>
			</div>
		)
	}

	return (
		<div
			className='flex min-h-screen relative'
			style={{ backgroundColor: 'rgb(16, 16, 16)' }}
		>
			{isSidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden'
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			<aside
				className={`fixed lg:static inset-y-0 left-0 w-[280px] sm:w-64 border-r border-[rgba(255,255,255,0.1)] flex flex-col transform transition-transform duration-300 ease-in-out z-30 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				}`}
			>
				<div className='p-3 sm:p-4 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between'>
					<h1 className='text-lg sm:text-xl font-semibold flex items-center gap-2 text-white'>
						<Logo />
						<span className='whitespace-nowrap'>Brandlly</span>
					</h1>
					<button
						className='lg:hidden text-white hover:text-[rgb(239,252,118)] transition-colors p-1'
						onClick={() => setIsSidebarOpen(false)}
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				<nav className='flex-1 p-3 sm:p-4 overflow-y-auto'>
					{Object.entries(
						sidebarItems.reduce((acc, item) => {
							if (!acc[item.group]) acc[item.group] = []
							acc[item.group].push(item)
							return acc
						}, {} as Record<string, typeof sidebarItems>)
					).map(([group, items]) => (
						<div key={group} className='mb-4 sm:mb-6'>
							<h2 className='text-xs font-medium text-[rgba(255,255,255,0.4)] mb-2 sm:mb-3 px-2'>
								{group}
							</h2>
							<div className='space-y-1'>
								{items.map(item => (
									<AccordionItem
										key={item.href}
										item={item}
										pathname={pathname}
										onNavigate={handleNavigation}
									/>
								))}
							</div>
						</div>
					))}
				</nav>

				<div className='p-3 sm:p-4 border-t border-[rgba(255,255,255,0.1)]'>
					<button
						onClick={() => handleNavigation('/dashboard/settings')}
						className='w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 cursor-pointer'
					>
						<Settings className='w-4 h-4 text-[rgba(255,255,255,0.8)]' />
						<span className='text-sm font-medium text-[rgba(255,255,255,0.8)] whitespace-nowrap'>
							Settings
						</span>
					</button>
					<button
						onClick={() => handleNavigation('/dashboard/help')}
						className='w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 cursor-pointer'
					>
						<HelpCircle className='w-4 h-4 text-[rgba(255,255,255,0.8)]' />
						<span className='text-sm font-medium text-[rgba(255,255,255,0.8)] whitespace-nowrap'>
							Help
						</span>
					</button>
				</div>
			</aside>

			<div className='flex-1 min-w-0'>
				<header className='h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-10 bg-[rgb(16,16,16)] border-b border-[rgba(255,255,255,0.1)]'>
					<div className='flex items-center gap-2 sm:gap-4 flex-1 min-w-0 max-w-2xl'>
						<button
							className='lg:hidden text-white hover:text-[rgb(239,252,118)] transition-colors p-1'
							onClick={() => setIsSidebarOpen(true)}
						>
							<Menu className='w-5 h-5' />
						</button>
						{/* --- Header Search Trigger Button --- */}
						<button
							onClick={openSearchModal}
							className='flex items-center gap-2 sm:gap-3 h-8 sm:h-9 px-2 sm:px-3 text-left w-full max-w-xs bg-transparent border border-[rgba(255,255,255,0.1)] rounded-md text-xs text-[rgba(255,255,255,0.5)] hover:border-[rgba(255,255,255,0.2)] transition-colors'
						>
							<Search className='w-3 h-3 flex-shrink-0' />
							<span className='truncate'>Search pages...</span>
							<div className='hidden sm:flex items-center gap-1 ml-auto flex-shrink-0'>
								<svg viewBox='0 0 12 12' className='w-3 h-3'>
									<path
										d='M4.5 4.5V3A1.5 1.5 0 1 0 3 4.5h1.5Zm0 0v3m0-3h3m-3 3V9A1.5 1.5 0 1 1 3 7.5h1.5Zm0 0h3m0 0H9A1.5 1.5 0 1 1 7.5 9V7.5Zm0 0v-3m0 0V3A1.5 1.5 0 1 1 9 4.5H7.5Z'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<span className='text-xs font-medium'>+ F</span>
							</div>
						</button>
						{/* --- End Header Search Trigger Button --- */}
					</div>

					<div className='flex items-center gap-1 sm:gap-4 ml-2'>
						<button className='p-1.5 sm:p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-all duration-200'>
							<Sun className='w-4 h-4 text-[rgba(255,255,255,0.8)]' />
						</button>
						<button className='p-1.5 sm:p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-all duration-200'>
							<Bell className='w-4 h-4 text-[rgba(255,255,255,0.8)]' />
						</button>
						<div className='relative group'>
							<button className='p-1.5 sm:p-2 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] transition-all duration-200 flex items-center gap-2'>
								<User className='w-4 h-4 text-[rgba(255,255,255,0.8)]' />
								<ChevronDown className='w-3 h-3 text-[rgba(255,255,255,0.6)] group-hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200' />
							</button>
							<div className='absolute right-0 top-full mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-95 group-hover:scale-100 z-50'>
								<div className='bg-[rgb(24,24,24)] rounded-lg shadow-xl border border-[rgba(255,255,255,0.1)] py-1'>
									<button
										onClick={() => handleNavigation('/dashboard/profile')}
										className='flex items-center gap-2 px-4 py-2 w-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 text-[rgba(255,255,255,0.8)] text-sm'
									>
										<User className='w-4 h-4' />
										<span>Profile</span>
									</button>
									<button
										onClick={() => handleNavigation('/dashboard/settings')}
										className='flex items-center gap-2 px-4 py-2 w-full hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 text-[rgba(255,255,255,0.8)] text-sm'
									>
										<Settings className='w-4 h-4' />
										<span>Settings</span>
									</button>
									<div className='h-[1px] bg-[rgba(255,255,255,0.1)] my-1 mx-2' />
									<button
										onClick={handleLogout}
										className='flex items-center gap-2 px-4 py-2 w-full hover:bg-[rgba(255,255,255,0.1)] text-red-400 hover:text-red-300 transition-all duration-200 text-sm'
									>
										<LogOut className='w-4 h-4' />
										<span>Logout</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* --- Centered Search Modal --- */}
				{isSearchDropdownOpen && (
					<>
						{/* Overlay */}
						<div
							className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
							onClick={closeSearchModal}
						/>
						{/* Modal Container */}
						<div
							ref={modalContainerRef}
							className='fixed top-[15%] left-1/2 -translate-x-1/2 w-[90vw] max-w-xl bg-[rgb(28,28,28)] border border-[rgba(255,255,255,0.15)] rounded-lg shadow-2xl z-50 flex flex-col'
							style={{ maxHeight: '70vh' }} // Limit height
						>
							{/* Input inside Modal */}
							<div className='flex items-center gap-2 p-3 border-b border-[rgba(255,255,255,0.1)]'>
								<Search className='w-4 h-4 flex-shrink-0 text-[rgba(255,255,255,0.5)]' />
								<input
									ref={modalInputRef}
									type='text'
									placeholder='Search pages...'
									className='bg-transparent border-none focus:outline-none text-[rgba(255,255,255,0.9)] w-full text-sm placeholder:text-[rgba(255,255,255,0.5)]'
									value={searchQuery}
									onChange={handleSearchChange}
								/>
							</div>

							{/* Results List */}
							<div className='overflow-y-auto flex-1'>
								{filteredResults.length > 0 && (
									<ul className='p-2'>
										{filteredResults.map(item => {
											const Icon = item.icon
											return (
												<li key={item.href}>
													<button
														onClick={() => handleResultClick(item.href)}
														className='flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-md hover:bg-[rgba(255,255,255,0.08)] transition-colors duration-150'
													>
														{Icon && (
															<Icon className='w-4 h-4 text-[rgba(255,255,255,0.6)] flex-shrink-0' />
														)}
														<span className='text-sm text-[rgba(255,255,255,0.9)] truncate'>
															{item.label}
														</span>
													</button>
												</li>
											)
										})}
									</ul>
								)}
								{searchQuery.trim() !== '' && filteredResults.length === 0 && (
									<p className='text-center text-sm text-gray-500 py-6'>
										No results found for &quot;{searchQuery}&quot;.
									</p>
								)}
							</div>
						</div>
					</>
				)}
				{/* --- End Centered Search Modal --- */}

				<main>{children}</main>
			</div>
		</div>
	)
}
