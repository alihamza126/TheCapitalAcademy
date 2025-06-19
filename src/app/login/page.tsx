'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, signinSchema } from '@/lib/validatoins'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { Google } from '@mui/icons-material'

export default function Login() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const { data: session, status } = useSession()
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	if (status === 'authenticated') {
		router.replace(callbackUrl)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormData) => {
		setIsLoading(true)
		toast.loading('Logging in...', { id: 'login' })

		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
			callbackUrl,
		})

		toast.dismiss('login')
		setIsLoading(false)

		if (res?.error) return toast.error(res.error)
		if (res?.ok) router.replace(callbackUrl)
	}

	const handleGoogleLogin = async () => {
		await signIn('google', { callbackUrl })
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary via-[#F0F4FF] to-secondary">
			<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden">

				{/* Left Side - Image or Branding */}
				<div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-primary to-secondary text-white p-10">
					<h2 className="text-4xl font-bold mb-3">The Capital Academy</h2>
					<p className="text-lg font-light">Empowering Students to Achieve More</p>
					<img src="/images/education-side.svg" alt="Login Illustration" className="mt-8 w-[300px]" />
				</div>

				{/* Right Side - Form */}
				<div className="p-8 md:p-14">
					<h2 className="text-3xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>
					<p className="text-gray-500 mb-6 text-sm">Access your dashboard, courses, and materials</p>

					{/* Google Login */}
					<button
						onClick={handleGoogleLogin}
						className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
					>
						<Google size={20} className="mr-2" />
						Continue with Google
					</button>

					<div className="flex items-center my-5">
						<hr className="flex-grow border-gray-300" />
						<span className="px-3 text-gray-400 text-sm">OR</span>
						<hr className="flex-grow border-gray-300" />
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<input
								{...register('email')}
								type="email"
								placeholder="Email address"
								className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
						</div>

						<div className="relative">
							<input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<div
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
							>
								{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
							</div>
							{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
						</div>

						<div className="flex justify-between items-center text-sm">
							<label className="flex items-center space-x-2">
								<input type="checkbox" className="form-checkbox rounded text-primary" />
								<span>Remember me</span>
							</label>
							<Link href="/forgot" className="text-primary hover:underline">Forgot Password?</Link>
						</div>

						<button
							disabled={isLoading}
							className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition"
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</button>
					</form>

					<p className="text-sm text-gray-600 mt-6">
						New here?{' '}
						<Link href="/register" className="text-primary font-semibold hover:underline">
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
