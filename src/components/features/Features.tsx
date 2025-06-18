"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

import png1 from "/public/features/1.png"
import png2 from "/public/features/2.png"
import png3 from "/public/features/3.png"
import png4 from "/public/features/4.png"
import png5 from "/public/features/5.png"
import png6 from "/public/features/6.png"

const Features = () => {
    const featureData = [
        {
            img: png5,
            title: "All Questions in One Place",
            desc: "Access the complete MDCAT & NUMS MCQs database — no more scattered resources.",
        },
        {
            img: png1,
            title: "Anytime, Anywhere",
            desc: "Practice seamlessly on mobile, tablet, or desktop — learn wherever life takes you.",
        },
        {
            img: png3,
            title: "Always Updated",
            desc: "Stay ahead with content synced to the latest entry test syllabi and formats.",
        },
        {
            img: png4,
            title: "User-Friendly Design",
            desc: "Clean, intuitive interface tailored to help you focus on learning effectively.",
        },
        {
            img: png2,
            title: "Cost-Effective",
            desc: "Affordable packages with full access — premium content at student-friendly pricing.",
        },
        {
            img: png6,
            title: "Scholarships Available",
            desc: "Apply for merit- or need-based scholarships and reduce your study costs.",
        },
    ]

    const colorThemes = [
        {
            gradient: "from-blue-100 to-cyan-100",
            ring: "ring-blue-300",
            glow: "from-blue-400/20 to-cyan-400/20",
            textHover: "text-blue-600",
        },
        {
            gradient: "from-orange-100 to-pink-100",
            ring: "ring-orange-300",
            glow: "from-orange-400/20 to-pink-400/20",
            textHover: "text-orange-500",
        },
        {
            gradient: "from-emerald-100 to-teal-100",
            ring: "ring-emerald-300",
            glow: "from-emerald-400/20 to-teal-400/20",
            textHover: "text-emerald-600",
        },
    ]

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <motion.h2
                    className="text-4xl text-center md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Built for
                    <span className="block text-transparent pb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Focused Learning
                    </span>
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {featureData.map((feature, index) => {
                        const color = colorThemes[index % colorThemes.length]
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
                                    <div className="p-8 flex items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div
                                                className={`relative w-20 h-20 bg-gradient-to-br ${color.gradient} rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300 ring-2 ${color.ring}`}
                                            >
                                                <Image
                                                    src={feature.img || "/placeholder.svg"}
                                                    alt={feature.title}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="80px"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-br ${color.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:${color.textHover} transition-colors duration-300`}>
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default Features
