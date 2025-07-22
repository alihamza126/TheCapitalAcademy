"use client"
import {
    Card,
    CardBody,
    Button,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react"
import { GraduationCap, BookOpen, Star, Trophy, ChevronRight, Sparkles, Clock, Target, CheckCircle, Info, Zap } from 'lucide-react'
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"


const MyCourses = ({ activeCourses }) => {
    const router = useRouter()
    const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure()

    // Destructure activeCourses with default values
    const {
        mdcat = false,
        nums = false,
        mdcatNums = false,
        trial = false,
    } = Object.fromEntries(
        activeCourses.map((course) => [course, true])
    );

    const hasAnyCourse = mdcat || nums || mdcatNums || trial

    const CourseCard = ({
        title,
        subtitle,
        icon: Icon,
        gradient,
        features = [],
        isPopular = false,
        isNew = false,
    }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card
                className={`h-full cursor-pointer shadow-2xl border-0 relative overflow-hidden ${gradient} backdrop-blur-xl hover:shadow-3xl transition-all duration-500`}
            >
                {/* Popular/New Badge */}
                {(isPopular || isNew) && (
                    <div className="absolute top-4 right-4 z-20">
                        <Chip
                            color={isPopular ? "warning" : "success"}
                            variant="solid"
                            size="sm"
                            startContent={isPopular ? <Star size={14} /> : <Sparkles size={14} />}
                            className="animate-pulse shadow-lg"
                        >
                            {isPopular ? "Popular" : "New"}
                        </Chip>
                    </div>
                )}

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <CardBody className="p-6 lg:p-8 relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                            <Icon size={32} className="text-white" />
                        </div>
                        <ChevronRight size={24} className="text-white/70" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{title}</h3>
                            <p className="text-white/80 text-sm lg:text-base">{subtitle}</p>
                        </div>

                        {features.length > 0 && (
                            <div className="space-y-2">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-white/90 text-sm">
                                        <CheckCircle size={16} className="text-white/70" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                color="default"
                                variant="solid"
                                className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                                endContent={<ChevronRight size={18} />}
                            >
                                Start Learning
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )



    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>

            <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
                <div className="space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
                            <GraduationCap size={20} className="text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">Choose Your Path</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent">
                            SELECT YOUR COURSE
                        </h1>
                        <p className="text font-medium text-gray-600 max-w-2xl mx-auto">
                            Choose from our comprehensive courses designed to help you excel in your medical entrance exams
                        </p>
                    </motion.div>
                    {/* Course Cards */}
                    {hasAnyCourse ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {nums && (
                                <Link href={`/dashboard/courses/nums`}>
                                    <CourseCard
                                        title="NUMS"
                                        subtitle="National University of Medical Sciences"
                                        icon={Trophy}
                                        gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700"
                                        features={["Comprehensive MCQ Practice", "Previous Year Papers", "Performance Analytics"]}
                                        isPopular={true}
                                    />
                                </Link>
                            )}

                            {mdcat && (
                                <Link href={`/dashboard/courses/mdcat`}>
                                    <CourseCard
                                        title="MDCAT"
                                        subtitle="Medical & Dental College Admission Test"
                                        icon={BookOpen}
                                        gradient="bg-gradient-to-br from-purple via-pink-600 to-purple"
                                        onClick={() => handleCourseClick("mdcat")}
                                        features={["Subject-wise Practice", "Mock Tests", "Detailed Explanations"]}
                                    />
                                </Link>
                            )}

                            {mdcatNums && (
                                <Link href={`/dashboard/courses/mdcatNums`}>
                                    <CourseCard
                                        title="MDCAT + NUMS"
                                        subtitle="Combined preparation for both exams"
                                        icon={Zap}
                                        gradient="bg-gradient-to-br from-orange-500 via-red-600 to-pink"
                                        onClick={() => handleCourseClick("mdcatNums")}
                                        features={["Dual Exam Preparation", "Comprehensive Coverage", "Advanced Analytics", "Priority Support"]}
                                        isPopular={true}
                                    />
                                </Link>
                            )}

                            {trial && (
                                <Link href={`/dashboard/courses/trail`}>
                                    <CourseCard
                                        title="Trial Course"
                                        subtitle="Free trial access to course content"
                                        icon={Clock}
                                        gradient="bg-gradient-to-br from-green via-emerald-600 to-teal-700"
                                        onClick={() => handleCourseClick("trial")}
                                        features={["Limited Access", "Sample Questions", "Basic Analytics"]}
                                        isNew={true}
                                    />
                                </Link>
                            )}
                        </div>
                    ) : (
                        /* No Courses Available */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-gradient-to-br from-white/90 via-blue-50/90 to-purple-50/90 backdrop-blur-xl border-0">
                                <CardBody className="text-center py-12 lg:py-16">
                                    <div className="space-y-6">
                                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                            <BookOpen size={48} className="text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">No Courses Available</h3>
                                            <p className="text-gray-600 max-w-md mx-auto">
                                                You don't have access to any courses yet. Visit our store to purchase a course and start your
                                                preparation journey.
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                            <Button
                                                color="primary"
                                                size="lg"
                                                as={Link}
                                                href="/checkout?course=mdcat"
                                                startContent={<Target size={20} />}
                                                className="bg-gradient-to-r from-blue-500 to-purple hover:from-blue-600 hover:to-purple transition-all duration-300 shadow-lg"
                                                onPress={() => toast.success("Redirecting to store...")}
                                            >
                                                Visit Store
                                            </Button>
                                            <Button
                                                variant="bordered"
                                                size="lg"
                                                startContent={<Info size={20} />}
                                                onClick={onInfoOpen}
                                                className="hover:scale-105 transition-all duration-300"
                                            >
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Info Modal */}
            <Modal isOpen={isInfoOpen} onClose={onInfoClose} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold">Course Information</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Our comprehensive medical entrance exam preparation courses are designed to help you succeed in NUMS and
                                MDCAT exams.
                            </p>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg">What's Included:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Thousands of practice questions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Detailed explanations for each answer</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Performance analytics and progress tracking</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Mock tests and timed practice sessions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={onInfoClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={onInfoClose}>
                            Got it
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default MyCourses
