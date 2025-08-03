'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, HelpCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import { Button } from '@heroui/button'
import Axios from '@/lib/Axios'
import { signIn } from 'next-auth/react'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}



export default function PreMedSignup() {
  /* ----------------------------- local state ----------------------------- */
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const baseInput = 'w-full px-4 py-3 pr-12 rounded-md border transition'

  const getInputClasses = (fieldName: keyof FormData) => {
    const hasError = errors[fieldName] && touched[fieldName]
    return `${baseInput} ${hasError
        ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
        : 'border-gray-300 bg-white focus:ring-2 focus:ring-brand/60 focus:border-brand/60'
      }`
  }

  /* --------------------------- validation functions -------------------------- */
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required'
        if (value.trim().length < 2) return 'Full name must be at least 2 characters'
        return undefined

      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined

      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter'
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter'
        // if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number'
        // if (!/(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) return 'Password must contain at least one special character'
        return undefined


      case 'confirmPassword':
        if (!value) return 'Please confirm your password'
        if (value !== formData.password) return 'Passwords do not match'
        return undefined

      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* --------------------------- event handlers -------------------------- */
  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)
    setTouched(allTouched)

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting')
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await Axios.post('/api/v1/users/signup', {
        username: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      })

      toast.success('Account created successfully!')

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setTouched({})

      // You might want to redirect here
      // router.push('/dashboard') or similar

    } catch (error: any) {
      console.error('Registration error:', error)

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message })
        toast.error(error.response.data.message)
      } else if (error.response?.status === 409) {
        setErrors({ email: 'An account with this email already exists' })
        toast.error('Email already exists')
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        toast.error('Please check your information and try again')
      } else {
        setErrors({ general: 'Something went wrong. Please try again later.' })
        toast.error('Something went wrong. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    signIn('google', { callbackUrl: "/" })
  }

  /* --------------------------- component markup -------------------------- */
  return (
    <div className="px-0 relative overflow-hidden isolate min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-100">
      {/* decorative "bubbles" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="pointer-events-none absolute -top-20 -left-32 h-96 w-96 rounded-full bg-fuchsia-300 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="pointer-events-none absolute bottom-0 -right-32 h-[30rem] w-[30rem] rounded-full bg-rose-300 blur-3xl"
      />

      {/* main grid */}
      <div className="mx-auto px- grid max-w-7xl min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ------------- LEFT HERO ------------- */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* background illustration */}
          <motion.svg
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewBox="0 0 500 500"
            className="absolute inset-0 h-full w-full object-cover text-brand/30"
          >
            <defs>
              <linearGradient id="hero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#e879f9" offset="0%" />
                <stop stopColor="#fb7185" offset="100%" />
              </linearGradient>
            </defs>
            <path
              fill="url(#hero)"
              d="M113.3 -139.1C140.3 -111.1 154.2 -74.3 161.7 -39.9C169.1 -5.6 170.1 26.4 159.9 54.6C149.7 82.7 128.4 107 101.7 135.8C75 164.6 42.9 197.9 3.6 201.8C-35.6 205.7 -71.2 180.2 -100.2 151.4C-129.1 122.7 -151.4 90.6 -165.5 54.4C-179.6 18.3 -185.5 -22 -174.9 -57.5C-164.4 -93.1 -137.3 -123.9 -103.9 -153.3C-70.6 -182.6 -30.9 -210.6 5 -215.7C41 -220.8 82 -203 113.3 -139.1Z"
              transform="translate(250 265) scale(1.1)"
            />
          </motion.svg>

          {/* tagline */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center md:px-16 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 text-5xl font-black text-center leading-tight drop-shadow-xl"
            >
              <span className="text-brand text-center">The</span> <br />
              Capital Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-sm text-center text-lg font-medium"
            >
              Study smarter. Score higher. Join the next generation of future education.
            </motion.p>
          </div>
        </div>

        {/* ------------- RIGHT FORM ------------- */}
        <div className="flex items-center justify-center px-0 py-16 md:px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-full rounded-xl bg-white/70 backdrop-blur-lg shadow-2xl ring-1 ring-black/5"
          >
            <div className="px-8 py-10 sm:px-10">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-center text-sm text-gray-500">Join to start now</p>

              {/* General error message */}
              {errors.general && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="mt-1 text-xs text-red">{errors.general}</p>
                </div>
              )}

              {/* ------------------ form ------------------ */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* full name & email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      placeholder="Alex Karev"
                      className={getInputClasses('fullName')}
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      disabled={isLoading}
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="mt-1 text-xs text-red">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={getInputClasses('email')}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      disabled={isLoading}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-xs text-red">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* passwords */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Example@123"
                      className={getInputClasses('password')}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && touched.password && (
                      <p className="mt-1 text-xs text-red">{errors.password}</p>
                    )}
                  </div>
                  <div className="relative">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPw2 ? 'text' : 'password'}
                      placeholder="Example@123"
                      className={getInputClasses('confirmPassword')}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPw2(!showPw2)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="mt-1 text-xs text-red">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  type="submit"
                  color='primary'
                  className="flex w-full my-5 items-center justify-center gap-2 "
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Signup
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>

                {/* divider */}
                <div className="relative py-3 text-center text-sm">
                  <span className="relative z-10 bg-white px-4 text-gray-400">or</span>
                  <div className="absolute inset-0 top-1/2 -translate-y-1/2 border-t border-gray-300" />
                </div>

                {/* google btn */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="flex w-full items-center justify-center space-x-3 border-gray-300 bg-white py-3 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  <GoogleIcon /> <span>Continue with Google</span>
                </Button>
              </form>

              {/* footer links */}
              <div className="mt-8 space-y-1 text-center text-sm text-gray-600">
                <p>
                  Already have an account?{' '}
                  <Link href="/signin" className="font-medium text-brand hover:underline">
                    Sign in
                  </Link>
                </p>
                <p className="text-xs">
                  By registering you agree to our{' '}
                  <Link href="/terms" className="text-brand hover:underline">
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="text-brand hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              helper component                              */
/* -------------------------------------------------------------------------- */
function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.26c0-.82-.07-1.43-.22-2.06H12v3.75h5.98c-.12 1.02-.74 2.57-2.07 3.62l-.02.16 3.01 2.34.21.02c1.84-1.71 2.9-4.23 2.9-7.83Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.7 0 4.96-.87 6.61-2.37l-3.15-2.46c-.84.63-1.97 1.07-3.46 1.07-2.65 0-4.9-1.78-5.7-4.2l-.12.01-3.09 2.4-.04.11C4.77 20.71 8.09 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M6.3 14.04c-.2-.6-.32-1.25-.32-1.92s.11-1.32.3-1.92l-.01-.13-3.12-2.42-.1.05A11.05 11.05 0 0 0 1 12.12a10.9 10.9 0 0 0 1.78 5.71l3.53-2.79Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.5c1.86 0 3.1.81 3.8 1.5l2.77-2.72C17.28 2.39 14.7 1 12 1 8.09 1 4.77 3.29 3.21 6.52l3.5 2.87C7.1 7.29 9.35 5.5 12 5.5Z"
      />
    </svg>
  )
}

