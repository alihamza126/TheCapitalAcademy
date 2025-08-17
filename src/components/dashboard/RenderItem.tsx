"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface MenuItem {
  text: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  hasSubmenu?: boolean
  submenu?: MenuItem[]
}

interface RenderMenuItemProps {
  item: MenuItem
  index: number
  isMobile?: boolean
  expandedMenus: string[]
  sidebarCollapsed: boolean
  isActive: (path: string) => boolean
  toggleSubmenu: (text: string) => void
  handleNavigation: (path: string) => void
}

const menuItemVariants = {
  rest: {
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" },
  },
}

const iconVariants = {
  rest: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

const submenuVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
}

const submenuItemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, delay: index * 0.05 },
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, delay: index * 0.05, ease: "easeOut" },
  }),
}

export const RenderMenuItem: React.FC<RenderMenuItemProps> = ({
  item,
  index,
  isMobile = false,
  expandedMenus,
  sidebarCollapsed,
  isActive,
  toggleSubmenu,
  handleNavigation,
}) => {
  const hasSubmenu = item.hasSubmenu && item.submenu
  const isExpanded = expandedMenus.includes(item.text)
  const isParentActive = hasSubmenu && item.submenu.some((sub: MenuItem) => isActive(sub.path))

  return (
    <motion.div
      key={item.text}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        variants={menuItemVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={() => {
          if (hasSubmenu) {
            toggleSubmenu(item.text)
          } else {
            handleNavigation(item.path)
          }
        }}
        aria-expanded={hasSubmenu ? isExpanded : undefined}
        aria-haspopup={hasSubmenu ? "menu" : undefined}
        role={hasSubmenu ? "button" : "menuitem"}
        className={`
          group relative w-full rounded-2xl flex items-center gap-3 xl:gap-4 
          px-4 xl:px-5 py-3.5 xl:py-4 text-left font-medium
          transition-all duration-300 ease-out backdrop-blur-md
          border border-transparent overflow-hidden
          ${
            isActive(item.path) || isParentActive
              ? `
              bg-gradient-to-br from-slate-900/95 to-slate-800/95 
              text-white shadow-xl shadow-slate-900/25
              border-slate-700/50 backdrop-blur-xl
            `
              : `
              bg-gradient-to-br from-white/80 to-slate-50/80 
              text-slate-700 hover:text-slate-900
              hover:bg-gradient-to-br hover:from-white/95 hover:to-slate-100/95
              hover:shadow-lg hover:shadow-slate-200/50
              hover:border-slate-200/60 backdrop-blur-sm
            `
          }
          ${sidebarCollapsed && !isMobile ? "justify-center px-3" : ""}
        `}
      >
        {(isActive(item.path) || isParentActive) && (
          <motion.div
            layoutId={isMobile ? "mobileActiveIndicator" : "activeIndicator"}
            className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-2xl"
            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
          />
        )}

        <motion.div variants={iconVariants} className="relative z-10 flex-shrink-0">
          <item.icon
            className={`w-5 h-5 ${isActive(item.path) || isParentActive ? "text-white" : "text-slate-600 group-hover:text-slate-800"}`}
          />
        </motion.div>

        <AnimatePresence>
          {(!sidebarCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex-1 min-w-0 relative z-10"
            >
              <span className="text-sm xl:text-base font-semibold tracking-wide">{item.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {hasSubmenu && (!sidebarCollapsed || isMobile) && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10 flex-shrink-0"
          >
            <ChevronDown
              className={`w-4 h-4 ${isActive(item.path) || isParentActive ? "text-white/80" : "text-slate-500 group-hover:text-slate-700"}`}
            />
          </motion.div>
        )}
      </motion.button>

      {hasSubmenu && (!sidebarCollapsed || isMobile) && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={submenuVariants}
              className="overflow-hidden"
              role="menu"
              aria-label={`${item.text} submenu`}
            >
              <div className="ml-8 xl:ml-10 mt-2 space-y-1.5">
                {item.submenu?.map((subItem: MenuItem, subIndex: number) => (
                  <motion.button
                    key={subItem.text}
                    custom={subIndex}
                    variants={submenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={() => handleNavigation(subItem.path)}
                    role="menuitem"
                    className={`
                      group relative w-full flex items-center gap-3 
                      px-4 py-3 rounded-xl text-left font-medium text-sm
                      transition-all duration-250 ease-out backdrop-blur-lg
                      border border-transparent overflow-hidden
                      ${
                        isActive(subItem.path)
                          ? `
                          bg-gradient-to-br from-slate-800/90 to-slate-700/90 
                          text-white shadow-lg shadow-slate-800/20
                          border-slate-600/40 backdrop-blur-xl
                        `
                          : `
                          bg-gradient-to-br from-white/70 to-slate-50/70 
                          text-slate-600 hover:text-slate-800
                          hover:bg-gradient-to-br hover:from-white/90 hover:to-slate-100/90
                          hover:shadow-md hover:shadow-slate-200/40
                          hover:border-slate-200/50
                        `
                      }
                    `}
                  >
                    {isActive(subItem.path) && (
                      <motion.div
                        layoutId={isMobile ? "mobileSubmenuActiveIndicator" : "submenuActiveIndicator"}
                        className="absolute inset-0 bg-gradient-to-br from-slate-700/15 to-slate-800/15 rounded-xl backdrop-blur-xl"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}

                    <motion.div variants={iconVariants} className="relative z-10 flex-shrink-0">
                      <subItem.icon
                        className={`w-4 h-4 ${isActive(subItem.path) ? "text-white/90" : "text-slate-500 group-hover:text-slate-700"}`}
                      />
                    </motion.div>

                    <div className="flex-1 min-w-0 relative z-10">
                      <span className="font-semibold tracking-wide">{subItem.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
