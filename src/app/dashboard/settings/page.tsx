'use client'

import { API_URL } from '@/env'
import { api } from '@/services/api'
import { authService } from '@/services/auth.service'
import axios from 'axios'
import { Bell, Lock, Moon, Palette, Sun, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UserProfile {
	name: string
	email: string
	avatar?: string
}

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState('profile')
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [theme, setTheme] = useState('dark')
	const [language, setLanguage] = useState('en')
	const [notifications, setNotifications] = useState({
		email: true,
		push: true,
		updates: false,
		marketing: false,
	})

	useEffect(() => {
		fetchProfile()
	}, [])

	const fetchProfile = async () => {
		try {
			const response = await api.get(`${API_URL}/auth/profile`)
			setProfile(response.data)
		} catch (error) {
			console.error('Error fetching profile:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const tabs = [
		{ id: 'profile', label: 'Profile', icon: User },
		{ id: 'notifications', label: 'Notifications', icon: Bell },
		{ id: 'appearance', label: 'Appearance', icon: Palette },
		{ id: 'security', label: 'Security', icon: Lock },
	]

	const renderTabContent = () => {
		switch (activeTab) {
			case 'profile':
				return (
					<div className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<label className='block text-sm font-medium text-[rgba(255,255,255,0.8)] mb-2'>
									Name
								</label>
								<input
									type='text'
									value={profile?.name || ''}
									onChange={e =>
										setProfile(prev => ({ ...prev!, name: e.target.value }))
									}
									className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-[rgba(255,255,255,0.8)] mb-2'>
									Email
								</label>
								<input
									type='email'
									value={profile?.email || ''}
									onChange={e =>
										setProfile(prev => ({ ...prev!, email: e.target.value }))
									}
									className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
								/>
							</div>
						</div>
						<button className='px-4 py-2 bg-[rgb(239,252,118)] text-black rounded-lg hover:bg-[rgba(239,252,118,0.8)] transition-all duration-200'>
							Save Changes
						</button>
					</div>
				)
			case 'notifications':
				return (
					<div className='space-y-6'>
						<div className='space-y-4'>
							{Object.entries(notifications).map(([key, value]) => (
								<div key={key} className='flex items-center justify-between'>
									<div>
										<h3 className='text-[rgba(255,255,255,0.8)] font-medium capitalize'>
											{key === 'push'
												? 'Push Notifications'
												: `${key.charAt(0).toUpperCase()}${key.slice(
													1
												)} Notifications`}
										</h3>
										<p className='text-sm text-[rgba(255,255,255,0.6)]'>
											Receive notifications about{' '}
											{key === 'push' ? 'important updates' : key} via{' '}
											{key === 'push' ? 'browser' : key}
										</p>
									</div>
									<label className='relative inline-flex items-center cursor-pointer'>
										<input
											type='checkbox'
											checked={value}
											onChange={() =>
												setNotifications(prev => ({
													...prev,
													[key as keyof typeof notifications]:
														!prev[key as keyof typeof notifications],
												}))
											}
											className='sr-only peer'
										/>
										<div className='w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[rgb(239,252,118)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(239,252,118)]'></div>
									</label>
								</div>
							))}
						</div>
						<button className='px-4 py-2 bg-[rgb(239,252,118)] text-black rounded-lg hover:bg-[rgba(239,252,118,0.8)] transition-all duration-200'>
							Save Preferences
						</button>
					</div>
				)
			case 'appearance':
				return (
					<div className='space-y-6'>
						<div>
							<h3 className='text-[rgba(255,255,255,0.8)] font-medium mb-4'>
								Theme
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<button
									onClick={() => setTheme('light')}
									className={`p-4 rounded-lg border ${theme === 'light'
											? 'border-[rgb(239,252,118)] bg-[rgba(239,252,118,0.1)]'
											: 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(239,252,118,0.5)]'
										} flex items-center gap-3`}
								>
									<Sun className='w-5 h-5 text-[rgba(255,255,255,0.8)]' />
									<span className='text-[rgba(255,255,255,0.8)]'>Light</span>
								</button>
								<button
									onClick={() => setTheme('dark')}
									className={`p-4 rounded-lg border ${theme === 'dark'
											? 'border-[rgb(239,252,118)] bg-[rgba(239,252,118,0.1)]'
											: 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(239,252,118,0.5)]'
										} flex items-center gap-3`}
								>
									<Moon className='w-5 h-5 text-[rgba(255,255,255,0.8)]' />
									<span className='text-[rgba(255,255,255,0.8)]'>Dark</span>
								</button>
							</div>
						</div>
						<div>
							<h3 className='text-[rgba(255,255,255,0.8)] font-medium mb-4'>
								Language
							</h3>
							<select
								value={language}
								onChange={e => setLanguage(e.target.value)}
								className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
							>
								<option value='en'>English</option>
								<option value='es'>Spanish</option>
								<option value='fr'>French</option>
								<option value='de'>German</option>
							</select>
						</div>
					</div>
				)
			case 'security':
				return (
					<div className='space-y-6'>
						<div>
							<h3 className='text-[rgba(255,255,255,0.8)] font-medium mb-4'>
								Change Password
							</h3>
							<div className='space-y-4'>
								<input
									type='password'
									placeholder='Current Password'
									className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
								/>
								<input
									type='password'
									placeholder='New Password'
									className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
								/>
								<input
									type='password'
									placeholder='Confirm New Password'
									className='w-full p-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white'
								/>
							</div>
							<button className='mt-4 px-4 py-2 bg-[rgb(239,252,118)] text-black rounded-lg hover:bg-[rgba(239,252,118,0.8)] transition-all duration-200'>
								Update Password
							</button>
						</div>
						<div className='pt-6 border-t border-[rgba(255,255,255,0.1)]'>
							<h3 className='text-[rgba(255,255,255,0.8)] font-medium mb-4'>
								Two-Factor Authentication
							</h3>
							<p className='text-[rgba(255,255,255,0.6)] mb-4'>
								Add an extra layer of security to your account by enabling
								two-factor authentication.
							</p>
							<button className='px-4 py-2 bg-[rgba(255,255,255,0.1)] text-white rounded-lg hover:bg-[rgba(255,255,255,0.15)] transition-all duration-200'>
								Enable 2FA
							</button>
						</div>
					</div>
				)
			default:
				return null
		}
	}

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(239,252,118)]'></div>
			</div>
		)
	}

	return (
		<div className='p-6 max-w-6xl mx-auto'>
			<h1 className='text-2xl font-semibold text-white mb-6'>Settings</h1>

			<div className='flex flex-col md:flex-row gap-6'>
				<div className='w-full md:w-64 space-y-1'>
					{tabs.map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === tab.id
									? 'bg-[rgb(239,252,118)] text-black'
									: 'hover:bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)]'
								}`}
						>
							<tab.icon className='w-4 h-4' />
							<span>{tab.label}</span>
						</button>
					))}
				</div>

				<div className='flex-1 bg-[rgba(255,255,255,0.03)] rounded-lg p-6'>
					{renderTabContent()}
				</div>
			</div>
		</div>
	)
}
