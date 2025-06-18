"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { BookOpen, Dna, Calculator, Beaker, BookA } from "lucide-react"
import Image from "next/image"
import student from '/public/student.png';

export const UnifiedAnimation = () => {
    const [activeElement, setActiveElement] = useState<string | null>(null)

    return (
        <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
            {/* Central Knowledge Core - Unique Hexagonal Design */}
            <div>
                <div className="img-box  max-w-[240px]">
                    <Image src={student} quality={100} width={250} height={250}  alt="img is here" />
                </div>
            </div>

            {/* Enhanced Connection Visualization */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <radialGradient id="uniqueGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#7C3AED" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#EC4899" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                    </radialGradient>
                    <filter id="uniqueGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <pattern id="hexPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                        <polygon
                            points="12.5,2 20,7 20,17 12.5,22 5,17 5,7"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>

                {/* Hexagonal Grid Background */}
                <rect width="100%" height="100%" fill="url(#hexPattern)" />

                {/* Multi-layered Orbital Rings with Better Spacing */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="220"
                    stroke="url(#uniqueGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="15,10"
                    filter="url(#uniqueGlow)"
                    animate={{ strokeDashoffset: [0, -50] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="180"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="8,8"
                    animate={{ strokeDashoffset: [0, 32] }}
                    transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="140"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4,4"
                    animate={{ strokeDashoffset: [0, -16] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Enhanced Dynamic Quantum Field */}
                {activeElement && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.line
                                key={i}
                                x1="50%"
                                y1="50%"
                                x2={`${50 + Math.cos((i * 18 * Math.PI) / 180) * 35}%`}
                                y2={`${50 + Math.sin((i * 18 * Math.PI) / 180) * 35}%`}
                                stroke="#00D4FF"
                                strokeWidth="2"
                                strokeOpacity="0.7"
                                filter="url(#uniqueGlow)"
                                animate={{
                                    strokeOpacity: [0.2, 0.9, 0.2],
                                    strokeWidth: [1, 3, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.1,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.g>
                )}
            </svg>

            {/* Enhanced Floating Energy Orbs with Better Distribution */}
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full shadow-lg"
                    style={{
                        width: `${3 + (i % 4) * 2}px`,
                        height: `${3 + (i % 4) * 2}px`,
                        background: `linear-gradient(45deg, ${["#00D4FF", "#7C3AED", "#EC4899", "#F59E0B"][i % 4]
                            }, ${["#0EA5E9", "#8B5CF6", "#F472B6", "#FBBF24"][i % 4]})`,
                        left: `${20 + (i % 5) * 15}%`,
                        top: `${15 + (i % 4) * 20}%`,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, Math.sin(i) * 40, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.6, 2, 0.6],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 8 + i * 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.4,
                    }}
                />
            ))}

            {/* Enhanced Interactive Elements with Better Positioning */}
            <AnimatePresence>
                {activeElement === "biology" && (
                    <motion.div
                        className="absolute top-[8%] left-[8%]"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                    >
                        {/* Enhanced DNA Double Helix */}
                        <div className="relative w-20 h-40">
                            <svg viewBox="0 0 80 160" className="w-full h-full">
                                {/* DNA Strands */}
                                <motion.path
                                    d="M 20 0 Q 40 20 20 40 Q 0 60 20 80 Q 40 100 20 120 Q 0 140 20 160"
                                    stroke="#10B981"
                                    strokeWidth="5"
                                    fill="none"
                                    animate={{ pathLength: [0, 1, 0] }}
                                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                                />
                                <motion.path
                                    d="M 60 0 Q 40 20 60 40 Q 80 60 60 80 Q 40 100 60 120 Q 80 140 60 160"
                                    stroke="#059669"
                                    strokeWidth="5"
                                    fill="none"
                                    animate={{ pathLength: [0, 1, 0] }}
                                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                />

                                {/* Base Pairs */}
                                {[...Array(10)].map((_, i) => (
                                    <motion.line
                                        key={i}
                                        x1="20"
                                        y1={i * 16 + 10}
                                        x2="60"
                                        y2={i * 16 + 10}
                                        stroke="#34D399"
                                        strokeWidth="4"
                                        animate={{
                                            opacity: [0.4, 1, 0.4],
                                            strokeWidth: [3, 5, 3],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Enhanced Floating Cell Organelles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-5 h-5 bg-gradient-to-br from-emerald-300 to-teal-500 rounded-full shadow-xl border border-white/30"
                                    style={{
                                        left: `${-8 + i * 12}px`,
                                        top: `${15 + i * 25}px`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 360],
                                        scale: [0.8, 1.3, 0.8],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: i * 0.4,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeElement === "static" && (
                    <motion.div
                        className="absolute top-[8%] right-[8%]"
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                    >
                        {/* Enhanced Mathematical Formulas Visualization */}
                        <div className="relative w-32 h-32">
                            {/* Enhanced Geometric Shapes */}
                            <motion.div
                                className="absolute top-2 left-2 w-10 h-10 border-3 border-blue-400 rotate-45 bg-blue-400/20"
                                animate={{
                                    rotate: [45, 405],
                                    scale: [1, 1.3, 1],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            />

                            <motion.div
                                className="absolute top-4 right-2 w-8 h-8 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full shadow-lg"
                                animate={{
                                    y: [0, -15, 0],
                                    scale: [1, 1.4, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.div
                                className="absolute bottom-4 left-4 w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-blue-500 shadow-lg"
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            />

                            {/* Enhanced Mathematical Grid */}
                            <svg className="absolute inset-0 w-full h-full">
                                {[...Array(8)].map((_, i) => (
                                    <motion.line
                                        key={`h-${i}`}
                                        x1="0"
                                        y1={i * 4}
                                        x2="100%"
                                        y2={i * 4}
                                        stroke="rgba(59, 130, 246, 0.4)"
                                        strokeWidth="1.5"
                                        animate={{
                                            strokeOpacity: [0.2, 0.7, 0.2],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                                {[...Array(8)].map((_, i) => (
                                    <motion.line
                                        key={`v-${i}`}
                                        x1={i * 4}
                                        y1="0"
                                        x2={i * 4}
                                        y2="100%"
                                        stroke="rgba(59, 130, 246, 0.4)"
                                        strokeWidth="1.5"
                                        animate={{
                                            strokeOpacity: [0.2, 0.7, 0.2],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </motion.div>
                )}

                {activeElement === "chemistry" && (
                    <motion.div
                        className="absolute bottom-[8%] left-[8%]"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                    >
                        {/* Enhanced Molecular Structure */}
                        <div className="relative w-32 h-32">
                            {/* Enhanced Central Atom */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-2xl border-3 border-white/60"
                                animate={{
                                    scale: [1, 1.4, 1],
                                    boxShadow: [
                                        "0 0 25px rgba(168, 85, 247, 0.5)",
                                        "0 0 50px rgba(236, 72, 153, 0.9)",
                                        "0 0 25px rgba(168, 85, 247, 0.5)",
                                    ],
                                }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                            />

                            {/* Enhanced Orbiting Electrons */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-5 h-5 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full shadow-xl border border-white/40"
                                    style={{
                                        left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 45}%`,
                                        top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 45}%`,
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [0.8, 1.5, 0.8],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        rotate: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                                        scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 },
                                    }}
                                />
                            ))}

                            {/* Enhanced Chemical Bonds */}
                            <svg className="absolute inset-0 w-full h-full">
                                {[...Array(8)].map((_, i) => (
                                    <motion.line
                                        key={i}
                                        x1="50%"
                                        y1="50%"
                                        x2={`${50 + Math.cos((i * 45 * Math.PI) / 180) * 45}%`}
                                        y2={`${50 + Math.sin((i * 45 * Math.PI) / 180) * 45}%`}
                                        stroke="rgba(255,255,255,0.7)"
                                        strokeWidth="3"
                                        animate={{
                                            strokeOpacity: [0.3, 0.9, 0.3],
                                            strokeWidth: [2, 4, 2],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </motion.div>
                )}

                {activeElement === "english" && (
                    <motion.div
                        className="absolute bottom-[8%] right-[8%]"
                        initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                    >
                        {/* Enhanced Literary Elements Visualization */}
                        <div className="relative w-36 h-36">
                            {/* Enhanced Floating Letters */}
                            {["A", "B", "C", "D", "E", "F"].map((letter, i) => (
                                <motion.div
                                    key={letter}
                                    className="absolute w-10 h-10 bg-gradient-to-br from-orange-300 to-red-500 rounded-xl flex items-center justify-center text-white font-bold shadow-xl border border-white/30"
                                    style={{
                                        left: `${5 + i * 15}%`,
                                        top: `${15 + (i % 3) * 30}%`,
                                    }}
                                    animate={{
                                        y: [0, -25, 0],
                                        rotate: [0, 360],
                                        scale: [0.8, 1.3, 0.8],
                                    }}
                                    transition={{
                                        duration: 4 + i * 0.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: i * 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {letter}
                                </motion.div>
                            ))}

                            {/* Enhanced Word Formation Lines */}
                            <svg className="absolute inset-0 w-full h-full">
                                {[...Array(6)].map((_, i) => (
                                    <motion.path
                                        key={i}
                                        d={`M ${10 + i * 15} ${25 + i * 8} Q ${50} ${15} ${90 - i * 12} ${35 + i * 12}`}
                                        stroke="rgba(249, 115, 22, 0.7)"
                                        strokeWidth="3"
                                        fill="none"
                                        animate={{
                                            pathLength: [0, 1, 0],
                                            strokeOpacity: [0.3, 0.9, 0.3],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: i * 0.4,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Enhanced Grammar Symbols */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-orange-400 font-bold bg-white/20 rounded-full w-12 h-12 flex items-center justify-center shadow-xl"
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.4, 1],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            >
                                ?!
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
