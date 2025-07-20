"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Bookmark,
  Calculator,
  GraduationCap,
  User,
  Home,
  Menu,
  X,
  ChevronRight,
  Settings,
  LogOut,
  Bell,
} from "lucide-react"
import { easeInOut } from "framer-motion";

const menuItems = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    description: "Overview & analytics",
  },
  {
    text: "My Courses",
    icon: GraduationCap,
    path: "/dashboard/courses",
    description: "Learning paths",
  },
  {
    text: "Stats", // Renamed from Analytics for clarity
    icon: BarChart3,
    path: "/dashboard/analytics",
    description: "User MCQ Progress Stats",
  },
  {
    text: "Study Planner",
    icon: Calendar,
    path: "/dashboard/planner",
    description: "Manage calendar",
  },
  {
    text: "Saved MCQ's",
    icon: Bookmark,
    path: "/dashboard/saved",
    description: "Saved content",
  },
  // {
  //   text: "Aggregator",  
  //   icon: Calculator,
  //   path: "/dashboard/tools",
  //   description: "Utilities & tools",
  // },

  {
    text: "Subscriptions",
    icon: Bell,
    path: "/dashboard/subscriptions",
    description: "Account settings",
  },
  {
    text: "Profile",
    icon: User,
    path: "/dashboard/profile",
    description: "Account settings",
  },
]

const sidebarVariants = {
  expanded: {
    width: 280,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
  collapsed: {
    width: 72,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
}

const mobileMenuVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
}

const iconVariants = {
  rest: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

const menuItemVariants = {
  rest: {
    x: 0,
    transition: { duration: 0.2 },
  },
  hover: {
    x: 6,
    transition: { duration: 0.2 },
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1280) {
        setSidebarCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(path)
  }

  const getPageTitle = () => {
    const currentItem = menuItems.find((item) => isActive(item.path))
    return currentItem?.text || "Dashboard"
  }

  const getPageDescription = () => {
    const currentItem = menuItems.find((item) => isActive(item.path))
    return currentItem?.description || "Welcome back"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Mobile Navigation Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:hidden backdrop-blur-2xl bg-white/80 border-b border-white/30 shadow-lg relative z-50 sticky top-0"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <motion.button
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 touch-manipulation"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <div className="flex-1 min-w-0">
              <motion.h1
                key={getPageTitle()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-semibold text-base sm:text-lg text-slate-800 truncate"
              >
                {getPageTitle()}
              </motion.h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 touch-manipulation"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/")}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 touch-manipulation"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm font-medium cursor-pointer shadow-lg ring-2 ring-white/50 backdrop-blur-sm touch-manipulation"
            >
              JD
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 backdrop-blur-md bg-black/20"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-full max-w-sm backdrop-blur-2xl bg-white/90 border-r border-white/30 shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-white/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div>

                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      variants={menuItemVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 group touch-manipulation ${isActive(item.path)
                        ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 shadow-lg backdrop-blur-sm border border-blue-200/50"
                        : "text-slate-700 hover:bg-white/60 backdrop-blur-sm"
                        }`}
                    >
                      <motion.div variants={iconVariants} initial="rest" whileHover="hover" className="flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block">{item.text}</span>
                      </div>
                      {isActive(item.path) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex-shrink-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-white/30 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 touch-manipulation"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 backdrop-blur-sm transition-all duration-200 touch-manipulation"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          animate={sidebarCollapsed ? "collapsed" : "expanded"}
          className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 backdrop-blur-2xl bg-white/70 border-r border-white/30 shadow-2xl z-30"
        >
          {/* Desktop Sidebar Header */}
          <motion.div layout className="p-4 xl:p-6 border-b border-white/30">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                      <LayoutDashboard className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 xl:p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm transition-all duration-200"
              >
                <motion.div animate={{ rotate: sidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <Menu className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-4 xl:py-6">
            <nav className="px-3 xl:px-4 space-y-1 xl:space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <motion.button
                    variants={menuItemVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 xl:px-4 py-3 xl:py-3.5 rounded-xl text-left transition-all duration-200 backdrop-blur-sm relative overflow-hidden group ${isActive(item.path)
                      ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 shadow-lg border border-blue-200/50"
                      : "text-slate-700 hover:bg-white/60"
                      } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
                  >
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <motion.div
                      variants={iconVariants}
                      initial="rest"
                      whileHover="hover"
                      className="relative z-10 flex-shrink-0"
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 min-w-0 relative z-10"
                        >
                          <span className="font-medium block">{item.text}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isActive(item.path) && !sidebarCollapsed && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 flex-shrink-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          layout
          className={`flex-1 transition-all duration-400 ${sidebarCollapsed ? "lg:ml-18" : "lg:ml-70"} min-h-screen`}
          style={{
            marginLeft: isMobile ? 0 : sidebarCollapsed ? "72px" : "280px",
          }}
        >
          {/* Desktop Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hidden lg:flex lg:items-center lg:justify-between px-6 xl:px-8 py-4 xl:py-6 backdrop-blur-2xl bg-white/60 border-b border-white/30 shadow-lg sticky top-0 z-20"
          >
            <div className="flex-1 min-w-0">
              {/* <motion.h1
                key={getPageTitle()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl xl:text-2xl font-bold text-slate-800"
              >
                {getPageTitle()}
              </motion.h1> */}
            </div>
            <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
              <motion.button
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 xl:px-5 py-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 border border-white/40 shadow-lg"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium hidden sm:inline">Home</span>
              </motion.button>
              <div className="w-px h-6 xl:h-8 bg-slate-300/50"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-medium cursor-pointer shadow-lg ring-2 ring-white/50 hover:ring-blue-300/50 transition-all duration-200"
              >
                JD
              </motion.div>
            </div>
          </motion.header>

          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-3"
          >
            <motion.div
              layout
              className="backdrop-blur-xl bg-white/50 rounded-2xl xl:rounded-3xl border border-white/30 shadow-2xl min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-12rem)] relative overflow-hidden"
            >
              {/* Content Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10 p-4 sm:p-6 lg:p-6 xl:p-8">{children}</div>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}
