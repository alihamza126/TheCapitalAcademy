"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

interface Review {
  name: string
  comment: string
  city: string
  createdAt: string
  rating?: number
  avatar?: string
  course?: string
}

const Reviews = ({ reviews: data }) => {
  console.log(data)
  const [reviews, setReviews] = useState<Review[]>(data || [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Intersection observer for animations
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [reviews.length, isAutoPlaying])

  // Calculate days ago
  const calculateDaysAgo = (createdAt: string): string => {
    const now = new Date()
    const createdDate = new Date(createdAt)
    const diffInTime = now.getTime() - createdDate.getTime()
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(reviews.length / 2)) % Math.ceil(reviews.length / 2))
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 2))
    setIsAutoPlaying(false)
  }

  // Get current reviews to display (2 at a time)
  const getCurrentReviews = () => {
    const startIndex = currentIndex * 2
    return reviews.slice(startIndex, startIndex + 2)
  }

  // Render star rating
  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
            Student
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Success Stories
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our platform has transformed the exam preparation journey for thousands of students
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-red-600 font-semibold">{error}</div>
          </motion.div>
        )}

        {/* Reviews Navigation */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={goToPrevious}
                className="w-12 h-12 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center group hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="w-12 h-12 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center group hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </motion.button>
            </div>

            {/* Pagination */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(reviews.length / 2) }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {getCurrentReviews().map((review, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <Image
                              src="https://img.icons8.com/bubbles/50/user.png"
                              alt={`${review.name} avatar`}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {review.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{review.city}</span>
                          </div>
                          {review.course && (
                            <div className="mt-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full inline-block">
                              {review.course}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600 font-medium">{review.rating || 5}.0</span>
                      </div>

                      <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                        "{review.comment}"
                      </blockquote>

                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{calculateDaysAgo(review.createdAt)}</span>
                      </div>
                    </div>

                    {/* Gradient hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { number: "10,000+", label: "Happy Students", icon: "👨‍🎓" },
              { number: "4.9/5", label: "Average Rating", icon: "⭐" },
              { number: "95%", label: "Success Rate", icon: "🎯" },
              { number: "24/7", label: "Support Available", icon: "💬" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

export default Reviews
