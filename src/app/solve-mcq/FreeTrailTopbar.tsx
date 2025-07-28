"use client"

import { BookOpenCheck, Crown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface FreeTrialTopBarProps {
  isFreeTrial: boolean
}

const FreeTrialTopBar = ({ isFreeTrial }: FreeTrialTopBarProps) => {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-purple to-pink border-b border-white/10 text-white  absolute  top-0 z-50 shadow-sm"
    >
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8">
          {/* Left - Logo + Free Trial Tag */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5" />
              <h1 className="text-base font-semibold">MCQ Solver</h1>
            </div>
            {isFreeTrial && (
              <div className="hidden md:flex items-center gap-1 text-sm bg-white/10 text-white px-3 py-1 rounded-md">
                <Crown className="w-4 h-4 text-yellow-300" />
                <span>Free Trial</span>
              </div>
            )}
          </div>

          {/* Right - Upgrade CTA */}
          {isFreeTrial && (
            <Link
              href="/checkout"
              className="group inline-flex items-center px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-md transition-all duration-200"
            >
              <Crown className="w-4 h-4 mr-1 text-yellow-300" />
              <span>Upgrade</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Banner */}
      {isFreeTrial && (
        <div className="md:hidden bg-white/10 border-t border-white/10 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span>Free Trial</span>
            </div>
            <Link
              href="/checkout"
              className="text-blue-200 hover:text-white transition"
            >
              Upgrade →
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  )
}

export default FreeTrialTopBar
