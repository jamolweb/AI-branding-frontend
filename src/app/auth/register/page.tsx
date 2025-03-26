'use client'

import { authService } from '@/services/auth.service'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			await authService.register(formData)
			router.push('/dashboard')
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(
					error.response?.data?.message ||
						'An error occurred during registration'
				)
			} else {
				setError('An unexpected error occurred')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleGoogleLogin = () => {
		authService.initiateGoogleLogin()
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
						Create your account
					</h2>
					<p className='mt-2 text-center text-sm text-gray-400'>
						Or{' '}
						<Link
							href='/auth/signin'
							className='font-medium text-indigo-400 hover:text-indigo-300'
						>
							sign in to existing account
						</Link>
					</p>
				</div>

				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					{error && (
						<div className='rounded-md bg-red-900/50 p-4 border border-red-500'>
							<div className='text-sm text-red-400'>{error}</div>
						</div>
					)}

					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='name' className='sr-only'>
								Full Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 bg-gray-800 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Full Name'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor='email' className='sr-only'>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='new-password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 bg-gray-800 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password (minimum 8 characters)'
								minLength={8}
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={isLoading}
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isLoading ? 'Creating account...' : 'Create account'}
						</button>
					</div>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-700' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-gray-900 text-gray-400'>
									Or continue with
								</span>
							</div>
						</div>

						<div className='mt-6'>
							<button
								type='button'
								onClick={handleGoogleLogin}
								className='w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500'
							>
								<svg
									className='h-5 w-5 mr-2'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,2.448-2.578,4.303-5.09,4.303c-2.841,0-5.145-2.304-5.145-5.145s2.304-5.145,5.145-5.145c1.457,0,2.775,0.605,3.712,1.577l1.914-1.914c-1.357-1.357-3.232-2.196-5.299-2.196c-4.114,0-7.455,3.341-7.455,7.455s3.341,7.455,7.455,7.455c4.114,0,7.455-3.341,7.455-7.455v-1.909h-5.418C13.4,11.242,12.545,11.597,12.545,12.151z' />
								</svg>
								Sign up with Google
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
