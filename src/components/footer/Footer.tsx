"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Facebook, Instagram } from "@mui/icons-material";
import logo from "/public/favicon.png";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  return (
    <motion.footer
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 30 }}
      className="w-full bg-gray-100 text-gray-700 "
    >
      {/* Social Bar */}
      <div className="bg-primary md:px-20 py-4  px-6 rounded-t-2xl text-white flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm">Connect with us on social media:</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://www.facebook.com/profile.php?id=61552018766463&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-300 transition"
          >
            <Facebook />
          </a>
          <a
            href="https://www.instagram.com/thecapitalacademy.online?igsh=MWF6eGgzcnZyYTNjNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-300 transition"
          >
            <Instagram />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12 text-center md:text-left">
        {/* Logo & Tagline */}
        <div className=" flex flex-col items-center ">
          <Image src={logo} alt="Capital Academy Logo" width={130} height={130} />
          <p className="mt-4 text-[#A464B6] font-extrabold leading-snug">
            Capitalize Your Concepts <br /> With The Capital Academy
          </p>
        </div>

        {/* Vision Statement */}
        <div className=" flex flex-col items-center  ">
          <h4 className="uppercase font-bold text-[#1F63BE] tracking-wide">
            Our Vision
          </h4>
          <div className="w-12 h-1 bg-purple-500 my-2 mx-auto md:mx-0 rounded-full" />
          <p className="max-w-xs text-center text-gray-600 leading-relaxed">
            To enhance student learning through an accessible, personalized,
            and innovative online education platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center ">
          <h4 className="uppercase font-bold text-[#1F63BE] tracking-wide">
            Useful Links
          </h4>
          <div className="w-12 h-1 bg-purple-500 my-2 mx-auto md:mx-0 rounded-full" />
          <ul className="space-y-2 text-small text-gray-600">
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">About Us</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white text-center text-sm text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} The Capital Academy. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
