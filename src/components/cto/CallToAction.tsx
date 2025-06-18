"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const CallToAction = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    })

    return (
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
                    <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default CallToAction