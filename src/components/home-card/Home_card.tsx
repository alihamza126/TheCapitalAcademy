"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

// Import card images
import card1 from "/public/card/card1.png"
import card2 from "/public/card/card2.png"
import card3 from "/public/card/card3.png"
import card4 from "/public/card/card4.png"
import card5 from "/public/card/card5.png"
import card6 from "/public/card/card6.png"
import card7 from "/public/card/card7.png"
import card8 from "/public/card/card8.png"

const HomeCard = () => {
  // Define animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  // Use useInView to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })

  // Card data array for cleaner code
  const cardImages = [
    { src: card1, delay: 0 },
    { src: card2, delay: 0.1 },
    { src: card3, delay: 0.2 },
    { src: card4, delay: 0.3 },
    { src: card5, delay: 0.4 },
    { src: card6, delay: 0.5 },
    { src: card7, delay: 0.6 },
    { src: card8, delay: 0.7 },
  ]

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Title */}
        <div className="mb-10 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Specifications
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Cards Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {cardImages.map((card, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{
                duration: 0.5,
                delay: card.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.04,
                y: -5,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 bg-white p-1.5">
                {/* Card Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    width={140}
                    height={140}
                    src={card.src || "/placeholder.svg"}
                    alt={`Specification card ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 4}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default HomeCard
