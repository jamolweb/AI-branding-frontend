'use client'

import { sidebarItems } from '@/data/siteData'
import { authService } from '@/services/auth.service'
import axios, { AxiosError } from 'axios'
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
import {
	redirect,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'

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
	const isActive = pathname === item.href
	const hasChildren = item.children && item.children.length > 0

	// Auto-open the accordion if a child is active
	useEffect(() => {
		if (hasChildren && item.children) {
			const isChildActive = item.children.some(child => pathname === child.href)
			if (isChildActive) {
				setIsOpen(true)
			}
		}
	}, [pathname, hasChildren, item.children])

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
					isActive
						? 'bg-[rgb(239,252,118)]'
						: 'hover:bg-[rgba(255,255,255,0.1)]'
				}`}
			>
				{item.icon && (
					<item.icon
						className={`w-4 h-4 ${
							isActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
						}`}
					/>
				)}
				<span
					className={`text-sm font-medium flex-1 text-left whitespace-nowrap ${
						isActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
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
								isActive ? 'text-black' : 'text-[rgba(255,255,255,0.8)]'
							}`}
						/>
					</div>
				)}
			</button>

			{hasChildren && isOpen && item.children && (
				<div className='ml-4 space-y-1'>
					{item.children.map(child => (
						<button
							key={child.href}
							onClick={() => onNavigate(child.href)}
							className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${
								pathname === child.href
									? 'bg-[rgb(239,252,118)]'
									: 'hover:bg-[rgba(255,255,255,0.1)]'
							}`}
						>
							{child.icon && (
								<child.icon
									className={`w-4 h-4 ${
										pathname === child.href
											? 'text-black'
											: 'text-[rgba(255,255,255,0.8)]'
									}`}
								/>
							)}
							<span
								className={`text-sm font-medium whitespace-nowrap ${
									pathname === child.href
										? 'text-black'
										: 'text-[rgba(255,255,255,0.8)]'
								}`}
							>
								{child.label}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

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

	const handleLogout = async () => {
		try {
			const accessToken = authService.getAccessToken()
			await axios.post(
				`${API_URL}/auth/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			authService.logout()
			router.push('/auth/signin')
		} catch (error) {
			console.error('Logout error:', error)
			authService.logout()
			router.push('/auth/signin')
		}
	}

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const accessToken = searchParams.get('accessToken')
				const refreshToken = searchParams.get('refreshToken')

				if (accessToken && refreshToken) {
					authService.setTokens({
						accessToken,
						refreshToken,
					})

					window.history.replaceState({}, document.title, '/dashboard')
					setIsLoading(false)
					return
				}

				const storedRefreshToken = authService.getRefreshToken()
				if (!storedRefreshToken) {
					redirect('/auth/signin')
					return
				}

				try {
					await authService.refreshToken()
					setIsLoading(false)
				} catch (error) {
					if (error instanceof AxiosError && error.response?.status === 401) {
						console.error('Invalid refresh token:', error)
						redirect('/auth/signin')
						return
					}

					console.warn(
						'Token refresh failed, continuing with current tokens:',
						error
					)
					if (authService.isAuthenticated()) {
						setIsLoading(false)
					} else {
						redirect('/auth/signin')
					}
				}
			} catch (error) {
				console.error('Auth initialization error:', error)
				redirect('/auth/signin')
			}
		}

		initializeAuth()
	}, [searchParams])

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
				className={`fixed lg:static inset-y-0 left-0 w-[280px] sm:w-64 border-r border-[rgba(255,255,255,0.1)] flex flex-col bg-[rgb(16,16,16)] transform transition-transform duration-300 ease-in-out z-30 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				}`}
			>
				<div className='p-3 sm:p-4 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between'>
					<h1 className='text-lg sm:text-xl font-semibold flex items-center gap-2 text-white'>
						<Logo />
						<span className='whitespace-nowrap'>Fluctus</span>
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
				<header className='h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6'>
					<div className='flex items-center gap-2 sm:gap-4 flex-1 min-w-0 max-w-2xl'>
						<button
							className='lg:hidden text-white hover:text-[rgb(239,252,118)] transition-colors p-1'
							onClick={() => setIsSidebarOpen(true)}
						>
							<Menu className='w-5 h-5' />
						</button>
						<div
							className='flex items-center gap-2 sm:gap-3 h-8 sm:h-9 px-2 sm:px-3 flex-1 min-w-0'
							style={{
								borderWidth: '1px',
								borderStyle: 'solid',
								borderColor: 'rgba(255, 255, 255, 0.1)',
								borderRadius: '6px',
							}}
						>
							<div className='flex items-center gap-2 flex-1 min-w-0'>
								<Search className='w-3 h-3 flex-shrink-0 text-[rgba(255,255,255,0.5)]' />
								<input
									type='text'
									placeholder='Search'
									className='bg-transparent border-none focus:outline-none text-[rgba(255,255,255,0.5)] w-full text-xs font-medium truncate'
								/>
							</div>
							<div className='hidden sm:flex items-center gap-1 text-[rgba(255,255,255,0.5)] flex-shrink-0'>
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
						</div>
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

				<main>{children}</main>
			</div>
		</div>
	)
}
