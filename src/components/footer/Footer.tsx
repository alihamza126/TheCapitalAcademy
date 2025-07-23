"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Logo } from "../common/navbar/Navbar"

const Footer = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      })
    }
  }, [controls, inView])

  return (
    <footer
      className="w-full bg-gradient-to-br bg-purple/5"
    >
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Logo />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
                  The Capital Academy
                </h3>
                <p className="text-gray-600 text-sm mt-1">Online Education Platform</p>
              </div>
            </div>
            <p className=" text-neutral-500 text-base  leading-relaxed max-w-md text-center md:text-left">
              Capitalize Your Concepts with innovative online education. We enhance student learning through accessible,
              personalized, and cutting-edge educational experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center justify-center  md:items-start">
            <div className="font-semibold text-gray-800 mb-6 text-lg text-center ">Quick Links</div>
            <ul className="space-y-3 flex flex-col  justify-center items-center md:items-start">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-gray-800 mb-6 text-lg">Connect With Us</h4>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-purple-500" />
                <span className="text-sm">info@capitalacademy.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-purple-500" />
                <span className="text-sm">+92 347-9598144</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61552018766463&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 group"
              >
                <Facebook className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
              </a>
              <a
                href="https://www.instagram.com/thecapitalacademy.online?igsh=MWF6eGgzcnZyYTNjNw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 group"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} The Capital Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-purple-600 transition-colors">
                Terms
              </Link>
              {/* <Link href="/cookies" className="hover:text-purple-600 transition-colors">
                Cookies
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
