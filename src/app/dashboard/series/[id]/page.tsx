"use client"

import {
    Card,
    CardBody,
    CardHeader,
    Progress,
    Chip,
    Button,
    Avatar,
    Badge,
    Tabs,
    Tab,
    Skeleton,
} from "@heroui/react"
import { motion } from "framer-motion"
import { Clock, BookOpen, Target, Calendar, Trophy, Lock, CheckCircle, AlertCircle, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { redirect, useParams, useRouter } from "next/navigation"
import Axios from "@/lib/Axios"
import Link from "next/link"
import { Popconfirm } from "antd"
import toast from "react-hot-toast"
import TestResultModal from "./test-result-modal"

interface Test {
    _id: string
    title: string
    description: string
    subjects: string[]
    mode: string
    durationMin: number
    totalMarks: number
    availability: {
        startAt: string
        endAt: string
    }
    attempt: any
    status: string
}

interface SeriesDetailData {
    seriesId: string
    enrollment: {
        activatedAt: string
        expiresAt: string
        progress: {
            testsAttempted: number
        }
    }
    tests: {
        availableToday: Test[]
        upcoming: Test[]
        completed: Test[]
    }
    summary: {
        total: number
        available: number
        upcoming: number
        completed: number
    }
}

const SeriesDetail = () => {
    const [data, setData] = useState<SeriesDetailData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<any>(null)
    const [resultModalOpen, setResultModalOpen] = useState(false)
    const { id } = useParams();
    const router = useRouter()

    useEffect(() => {
        const fetchSeriesDetail = async () => {
            try {
                setLoading(true)
                const response = await Axios.get(`/api/v1/series/${id}/tests`)
                setData(response.data.data)
            } catch (err: any) {
                setError(err.message || "Failed to load series details")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchSeriesDetail()
        }
    }, [id])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "success"
            case "upcoming":
                return "warning"
            case "completed":
                return "primary"
            case "expired":
                return "danger"
            default:
                return "default"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "available":
                return <Play className="w-4 h-4" />
            case "upcoming":
                return <Lock className="w-4 h-4" />
            case "completed":
                return <CheckCircle className="w-4 h-4" />
            case "expired":
                return <AlertCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleSolve = (testId) => {
        toast.success("Redirecting to Test", { duration: 1500 })
        router.push(`/solve-mcq?type=series&testId=${testId}`)
    }

    const handleResult = async (testId) => {
        try {
            const response = await Axios.get(`/api/v1/test/student/${testId}/results`)
            console.log(response)
            setResult(response.data.data)
            setResultModalOpen(true)
        } catch (err: any) {
            console.log(err)
            setError(err.message || "Failed to load series details")
        }
    }

    const TestCard = ({ test }: { test: Test }) => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="mb-4">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start w-full">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{test.title}</h3>
                                <Chip
                                    color={getStatusColor(test.status)}
                                    variant="flat"
                                    size="sm"
                                    startContent={getStatusIcon(test.status)}
                                >
                                    {test.status}
                                </Chip>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{test.durationMin} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{test.totalMarks} marks</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">{test.mode}</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{formatDate(test.availability.startAt)}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-2">
                            {test.subjects.map((subject, index) => (
                                <Chip key={index} size="sm" variant="bordered">
                                    {subject}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Available: {formatDate(test.availability.startAt)} - {formatDate(test.availability.endAt)}
                        </div>
                        {test.status === "available" &&
                            <Popconfirm
                                title="Are you sure to start this test?"
                                description="You can retake this test only once."
                                onConfirm={() => handleSolve(test._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button color="primary" size="sm">
                                    Start Test
                                </Button>
                            </Popconfirm>
                        }
                        {test.status === "completed" && test.attempt && (
                            <Button onPress={() => handleResult(test._id)} color="success" variant="bordered" size="sm">
                                View Results
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                </div>
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <Card>
                    <CardBody className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Error Loading Series</h2>
                        <p className="text-gray-600">{error || "Failed to load series details"}</p>
                    </CardBody>
                </Card>
            </div>
        )
    }

    const progressPercentage =
        data.summary.total > 0 ? Math.round((data.enrollment.progress.testsAttempted / data.summary.total) * 100) : 0

    const daysRemaining = Math.ceil(
        (new Date(data.enrollment.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    )

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header Section */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardBody className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1">
                                <p className="text-gray-600 mb-4">
                                    Enrolled on {formatDate(data.enrollment.activatedAt)} • Expires on{" "}
                                    {formatDate(data.enrollment.expiresAt)}
                                </p>

                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Overall Progress</span>
                                        <span className="text-sm text-gray-600">
                                            {data.enrollment.progress.testsAttempted} / {data.summary.total} tests
                                        </span>
                                    </div>
                                    <Progress value={progressPercentage} color="primary" className="mb-2" />
                                    <p className="text-sm text-gray-600">{progressPercentage}% completed</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardBody className="text-center p-6">
                            <div className="flex items-center justify-center mb-2">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-600">{data.summary.total}</h3>
                            <p className="text-sm text-gray-600">Total Tests</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center p-6">
                            <div className="flex items-center justify-center mb-2">
                                <div className="p-2  bg-emerald-100 rounded-full">
                                    <Play className="w-6 h-6 text-emerald-500" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-green">{data.summary.available}</h3>
                            <p className="text-sm text-gray-600">Available Today</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center p-6">
                            <div className="flex items-center justify-center mb-2">
                                <div className="p-2 bg-orange-100 rounded-full">
                                    <Lock className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-orange-600">{data.summary.upcoming}</h3>
                            <p className="text-sm text-gray-600">Upcoming</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="text-center p-6">
                            <div className="flex items-center justify-center mb-2">
                                <div className="p-2 bg-purple/30 rounded-full">
                                    <Trophy className="w-6 h-6 text-purple" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-purple">{data.summary.completed}</h3>
                            <p className="text-sm text-gray-600">Completed</p>
                        </CardBody>
                    </Card>
                </div>

                {/* Tests Section */}
                <Card className="shadow-none px-0">
                    <CardHeader className="py-4 px-5">
                        <h2 className="text-xl font-semibold">Tests Overview</h2>
                    </CardHeader>
                    <CardBody>
                        <Tabs aria-label="Test categories" color="primary" variant="underlined">
                            <Tab
                                key="available"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Available Today ({data.summary.available})
                                    </div>
                                }
                            >
                                <div className="mt-4">
                                    {data.tests.availableToday.length > 0 ? (
                                        data.tests.availableToday.map((test) => <TestCard key={test._id} test={test} />)
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p>No tests available today</p>
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab
                                key="upcoming"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Upcoming ({data.summary.upcoming})
                                    </div>
                                }
                            >
                                <div className="mt-4">
                                    {data.tests.upcoming.length > 0 ? (
                                        data.tests.upcoming.map((test) => <TestCard key={test._id} test={test} />)
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p>No upcoming tests</p>
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab
                                key="completed"
                                title={
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Completed ({data.summary.completed})
                                    </div>
                                }
                            >
                                <div className="mt-4">
                                    {data.tests.completed.length > 0 ? (
                                        data.tests.completed.map((test) => <TestCard key={test._id} test={test} />)
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p>No completed tests</p>
                                        </div>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Test Result Modal */}
            <TestResultModal
                isOpen={resultModalOpen}
                onClose={() => {
                    setResultModalOpen(false)
                    setResult(null)
                }}
                resultData={result}
            />
        </>
    )
}

export default SeriesDetail
