"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react"
import { signinSchema, zodResolver } from "@/lib/validatoins"
import { signIn, useSession } from "next-auth/react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { data: session, status } = useSession();
  if(status === 'loading') return <Loader2 className="animate-spin h-6 w-6" />

  if (session) {
    router.push(callbackUrl);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Show validation errors as toast
  const showValidationErrors = () => {
    if (errors.email) {
      toast.error(errors.email.message, {
        icon: "📧",
        duration: 4000,
      })
    }
    if (errors.password) {
      toast.error(errors.password.message, {
        icon: "🔒",
        duration: 4000,
      })
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    toast.loading('Logging in...', { id: 'login' });

    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Prevent automatic redirection
        callbackUrl: callbackUrl,
      }).then((res) => {
        if (res?.error) {
          return toast.error(res.error);
        }
        if (res?.ok) {
          router.push(callbackUrl);
        }
      }).catch((err) => {
        toast.error(err);
      })

    } catch (error) {
      // already handled in toast
    } finally {
      toast.dismiss('login');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    toast.dismiss()
    setIsLoading(true)
    const loadingToastId = toast.loading("Connecting to Google...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })

    try {
      // Simulate Google OAuth
      await signIn("google",{callbackUrl:callbackUrl})
      toast.dismiss(loadingToastId)
      setTimeout(() => {
        router.push(callbackUrl)
      }, 1000)
    } catch (error) {
      toast.dismiss(loadingToastId)
      toast.error("Google login failed. Please try again or use email/password.", {
        icon: "❌",
        duration: 5000,
        style: {
          borderRadius: "10px",
          background: "#EF4444",
          color: "#fff",
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInvalidSubmit = () => {
    showValidationErrors()
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-24 h-24 border-2 border-rose-200 rounded-full opacity-30">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-rose-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-2 left-1/2 w-1 h-1 bg-rose-300 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-rose-300 rounded-full transform -translate-x-1/2"></div>
          </div>

          <div className="absolute top-40 right-32 w-16 h-16 border-2 border-rose-200 rounded-full opacity-20">
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-rose-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="absolute bottom-32 right-20 w-20 h-24 bg-rose-200 opacity-20 rounded-lg">
            <div className="grid grid-cols-3 gap-1 p-2 h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-sm opacity-60"></div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 left-32 w-32 h-32 border border-rose-200 rounded-full opacity-20"></div>
          <div className="absolute top-60 left-10 w-12 h-12 border border-rose-200 rounded-full opacity-30"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Logo and Branding */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-4xl font-bold">
                  <span className="text-gray-900 me-2">The</span>
                  <span className="text-red-500 relative">
                    Capital Academy
                    <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" fill="none">
                      <path d="M0 5 Q25 0 50 5 T100 5" stroke="#ef4444" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-red-500 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Study. Anywhere. Anytime.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div className="relative">
                  <Label htmlFor="email" className="sr-only">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      {...register("email")}
                      className={`pl-10 h-12 shadow border-gray-200 focus:border-red-500 focus:ring-red-500 transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      disabled={isLoading}
                      onBlur={() => trigger("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      autoComplete="current-password"
                      className={`pl-10 shadow pr-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-colors ${errors.password ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      disabled={isLoading}
                      onBlur={() => trigger("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-rose-50 to-pink-100 text-gray-500 font-medium">OR</span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-12 border-gray-200 hover:shadow hover:bg-inherit hover:text-neutral-500 bg-white text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-10 text-center space-y-5 text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-red-500 hover:text-red-600 font-medium underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </p>

              <p className="text-gray-600">
                Forgot your password?{" "}
                <Link
                  href="/forgot"
                  className="text-red-500 hover:text-red-600 font-medium underline underline-offset-4"
                >
                  Reset Password
                </Link>
              </p>

              <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                By logging in, you agree to our{" "}
                <Link href="/terms" className="text-red-500 hover:text-red-600 underline underline-offset-4">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-red-500 hover:text-red-600 underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
