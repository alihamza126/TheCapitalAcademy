"use client";

import Image from "next/image";
import contactSvg from "/public/page/contact.svg";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Mail,
  PhoneCall,
} from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/thecapitalacademy.online",
    Icon: Instagram,
    animation: { x: -150, y: -150 },
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61552018766463",
    Icon: Facebook,
    animation: { x: 150, y: -150 },
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/923479598144?text=Hello%2C%20I'd%20like%20to%20get%20in%20touch!",
    Icon: PhoneCall,
    animation: { x: -150, y: 150 },
  },
  {
    name: "Gmail",
    url: "mailto:example@email.com",
    Icon: Mail,
    animation: { x: 150, y: 150 },
  },
];




const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text + Socials */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-5xl font-bold text-blue-800 font-fredoka">Contact Us</h2>

          <div className="grid grid-cols-2 gap-6 mt-10">
            {socialLinks.map(({ name, url, Icon, animation }, index) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, ...animation }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.3 + index * 0.1 }}
                className="rounded-xl p-5 shadow-md bg-white hover:bg-blue-100 transition-colors duration-200 flex flex-col items-center gap-2 text-blue-700"
                aria-label={`Contact via ${name}`}
              >
                <Icon size={36} strokeWidth={1.8} />
                <span className="text-sm font-medium">{name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right - Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <Image
            src={contactSvg}
            alt="Contact Illustration"
            className="rounded-2xl shadow-xl"   
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
