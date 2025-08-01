'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Input from '@/shared/Input/Input'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@heroui/button'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [strength, setStrength] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const passwordValue = watch('password', '')

  // password strength calculation
  useEffect(() => {
    let score = 0
    if (passwordValue.length >= 8) score++
    if (/[A-Z]/.test(passwordValue)) score++
    if (/[0-9]/.test(passwordValue)) score++
    if (/[^A-Za-z0-9]/.test(passwordValue)) score++
    if (passwordValue.length >= 12) score++ // bonus for length
    setStrength(score)
  }, [passwordValue])

  // token verification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (!t) {
      toast.error('No reset token provided.')
      router.replace('/forgot')
      return
    }

    setToken(t)
    fetch('/api/v1/users/verify-reset-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: t })
    })
      .then(async (res) => {
        const body = await res.json()
        if (!res.ok || !body.success) throw new Error(body.error)
      })
      .catch((err) => {
        toast.error(err.message)
        router.replace('/forgot-password')
      })
      .finally(() => setIsVerifying(false))
  }, [router])

  const onSubmit = async (data: any) => {
    if (!token) return
    setIsSubmitting(true)
    const toastId = toast.loading('Resetting password...')
    try {
      const res = await fetch('/api/v1/users/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password })
      })
      const body = await res.json()
      if (!res.ok || !body.success) throw new Error(body.error)
      toast.success(body.message, { id: toastId })
      setTimeout(() => router.replace('/signin'), 2000)
    } catch (err: any) {
      toast.error(err.message, { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface1">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple"></div>
      </div>
    )
  }

  const labels = ['Too Short', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const colors = ['bg-gray-300', 'bg-red', 'bg-yellow', 'bg-blue', 'bg-green', 'bg-success']

  return (
    <div className="min-h-screen bg-surface1 dark:bg-gray-900 flex flex-col">
      <main className="py-32 flex-grow container mx-auto px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-secondary">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  disabled={isSubmitting}
                  className="w-full pr-10"
                  icon={showPwd ? <EyeOff /> : <Eye />}
                  onIconClick={() => setShowPwd(!showPwd)}
                  iconPosition="end"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    validate: {
                      hasUpperCase: (v) =>
                        /[A-Z]/.test(v) || 'Must contain an uppercase letter',
                      hasNumber: (v) =>
                        /[0-9]/.test(v) || 'Must contain a number',
                      hasSpecialChar: (v) =>
                        /[^A-Za-z0-9]/.test(v) || 'Must contain a special character'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red text-sm">{errors.password.message}</p>
              )}

              {/* Strength Bar */}
              <div className="h-2 w-full bg-gray-200 rounded">
                <div
                  className={`${colors[strength]} h-2 rounded transition-all`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {labels[strength]}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-secondary">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  disabled={isSubmitting}
                  className="w-full pr-10"
                  icon={showConfirm ? <EyeOff /> : <Eye />}
                  onIconClick={() => setShowConfirm(!showConfirm)}
                  iconPosition="end"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match'
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              color="primary"
              className="w-full py-3"
            >
              Reset Password
            </Button>
          </form>

          <p className="mt-6 text-center text-secondary">
            Remembered your password?{' '}
            <Link href="/signin" className="text-purple hover:underline">
              Signin
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
