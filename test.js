"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Chip,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Badge,
} from "@heroui/react"
import {
  BookOpen,
  Clock,
  Calendar,
  Lock,
  Play,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Target,
} from "lucide-react"
import { motion } from "framer-motion"
import Axios from "@/lib/Axios"

interface Test {
  id: string
  title: string
  subject: string
  duration: number
  totalMarks: number
  availableFrom: string
  availableTo: string
  status: "upcoming" | "available" | "completed" | "locked"
  difficulty: "Easy" | "Medium" | "Hard"
  questionsCount: number
  coverImage?: string
}

interface Series {
  id: string
  title: string
  description: string
  progress: number
  totalTests: number
  completedTests: number
  coverImage: string
  category: string
  enrolledDate: string
  tests: {
    upcoming: Test[]
    availableToday: Test[]
    completed: Test[]
  }
}

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [enrolledSeries, setEnrolledSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API calls
  useEffect(() => {
    const mockData: Series[] = [
      {
        id: "1",
        title: "JEE Main 2024 Preparation",
        description: "Complete preparation series for JEE Main with Physics, Chemistry, and Mathematics",
        progress: 65,
        totalTests: 24,
        completedTests: 16,
        coverImage: "/placeholder-5j29l.png",
        category: "Engineering",
        enrolledDate: "2024-01-15",
        tests: {
          upcoming: [
            {
              id: "t1",
              title: "Physics Mock Test 5",
              subject: "Physics",
              duration: 180,
              totalMarks: 300,
              availableFrom: "2024-02-20T09:00:00Z",
              availableTo: "2024-02-22T23:59:59Z",
              status: "upcoming",
              difficulty: "Hard",
              questionsCount: 75,
            },
          ],
          availableToday: [
            {
              id: "t2",
              title: "Chemistry Practice Test",
              subject: "Chemistry",
              duration: 120,
              totalMarks: 200,
              availableFrom: "2024-02-18T09:00:00Z",
              availableTo: "2024-02-19T23:59:59Z",
              status: "available",
              difficulty: "Medium",
              questionsCount: 50,
            },
          ],
          completed: [
            {
              id: "t3",
              title: "Mathematics Foundation",
              subject: "Mathematics",
              duration: 90,
              totalMarks: 150,
              availableFrom: "2024-02-15T09:00:00Z",
              availableTo: "2024-02-17T23:59:59Z",
              status: "completed",
              difficulty: "Easy",
              questionsCount: 40,
            },
          ],
        },
      },
      {
        id: "2",
        title: "NEET Biology Mastery",
        description: "Comprehensive Biology preparation for NEET with detailed explanations",
        progress: 45,
        totalTests: 18,
        completedTests: 8,
        coverImage: "/biology-medical-preparation.png",
        category: "Medical",
        enrolledDate: "2024-01-20",
        tests: {
          upcoming: [],
          availableToday: [
            {
              id: "t4",
              title: "Human Physiology Test",
              subject: "Biology",
              duration: 150,
              totalMarks: 250,
              availableFrom: "2024-02-18T10:00:00Z",
              availableTo: "2024-02-19T22:00:00Z",
              status: "available",
              difficulty: "Medium",
              questionsCount: 60,
            },
          ],
          completed: [],
        },
      },
    ]

    // const fetchSeries = async () => {
    //   try {
    //     const response = await Axios.get("/api/v1/series/dashboard")
    //     const data = response.data.data.enrolledSeries
    //     setEnrolledSeries(data)
    //     console.log(response)
    //     setLoading(false)
    //   } catch (error) {
    //     console.error("Error fetching series:", error)
    //     setLoading(false)
    //   }
    // }
    // fetchSeries()
    setTimeout(() => {
      setEnrolledSeries(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success"
      case "Medium":
        return "warning"
      case "Hard":
        return "danger"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "success"
      case "upcoming":
        return "warning"
      case "completed":
        return "primary"
      case "locked":
        return "default"
      default:
        return "default"
    }
  }

  const handleStartTest = (test: Test) => {
    console.log("[v0] Starting test:", test.title)
    // Implement test start logic
  }

  const renderTestCard = (test: Test, showActions = true) => (
    <Card key={test.id} className="mb-4 hover:shadow-lg transition-shadow">
      <CardBody className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-lg font-playfair">{test.title}</h4>
              <Chip size="sm" color={getDifficultyColor(test.difficulty)} variant="flat">
                {test.difficulty}
              </Chip>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{test.subject}</p>
          </div>
          {test.status === "locked" && <Lock className="w-5 h-5 text-muted-foreground" />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{test.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span>{test.totalMarks} marks</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>{test.questionsCount} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {test.status === "available" ? "Available Now" : test.status === "upcoming" ? "Upcoming" : "Completed"}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="flex justify-between items-center">
            <Chip size="sm" color={getStatusColor(test.status)} variant="flat">
              {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
            </Chip>

            {test.status === "available" && (
              <Button
                color="primary"
                size="sm"
                startContent={<Play className="w-4 h-4" />}
                onClick={() => handleStartTest(test)}
              >
                Start Test
              </Button>
            )}

            {test.status === "completed" && (
              <Button color="success" variant="flat" size="sm" startContent={<CheckCircle className="w-4 h-4" />}>
                View Results
              </Button>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Series</p>
                <p className="text-2xl font-bold font-playfair">{enrolledSeries.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Tests</p>
                <p className="text-2xl font-bold font-playfair">
                  {enrolledSeries.reduce((acc, series) => acc + series.completedTests, 0)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Today</p>
                <p className="text-2xl font-bold font-playfair">
                  {enrolledSeries.reduce((acc, series) => acc + series.tests.availableToday.length, 0)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold font-playfair">
                  {Math.round(enrolledSeries.reduce((acc, series) => acc + series.progress, 0) / enrolledSeries.length)}
                  %
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Enrolled Series */}
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold font-playfair">My Series</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledSeries.map((series) => (
              <motion.div key={series.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  isPressable
                  onPress={() => {
                    setSelectedSeries(series)
                    onOpen()
                  }}
                >
                  <CardBody className="p-0">
                    <div className="relative">
                      <img
                        src={series.coverImage || "/placeholder.svg"}
                        alt={series.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Chip size="sm" color="primary" variant="solid">
                          {series.category}
                        </Chip>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg font-playfair mb-2">{series.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{series.description}</p>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-semibold">{series.progress}%</span>
                        </div>
                        <Progress value={series.progress} color="primary" className="w-full" />

                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            {series.completedTests}/{series.totalTests} tests completed
                          </span>
                          <span>
                            {series.tests.availableToday.length > 0 && (
                              <Badge content={series.tests.availableToday.length} color="success">
                                <span>Available</span>
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Available Tests Today */}
      <Card className="border-none ">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            <h3 className="text-xl font-bold font-playfair">Available Tests Today</h3>
          </div>
        </CardHeader>
        <CardBody>
          {enrolledSeries.some((series) => series.tests.availableToday.length > 0) ? (
            enrolledSeries.map((series) => series.tests.availableToday.map((test) => renderTestCard(test)))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tests available today. Check back tomorrow!</p>
            </div>
          )}
        </CardBody>
      </Card>


    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
     
     

      {/* Series Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="font-bold font-playfair">{selectedSeries?.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedSeries?.description}</p>
              </ModalHeader>
              <ModalBody>
                {selectedSeries && (
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold">Overall Progress</span>
                          <span className="text-lg font-bold font-playfair">{selectedSeries.progress}%</span>
                        </div>
                        <Progress value={selectedSeries.progress} color="primary" className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {selectedSeries.completedTests} of {selectedSeries.totalTests} tests completed
                        </p>
                      </CardBody>
                    </Card>

                    {/* Available Today */}
                    {selectedSeries.tests.availableToday.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-success" />
                          Available Today
                        </h4>
                        {selectedSeries.tests.availableToday.map((test) => renderTestCard(test))}
                      </div>
                    )}

                    {/* Upcoming Tests */}
                    {selectedSeries.tests.upcoming.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-warning" />
                          Upcoming Tests
                        </h4>
                        {selectedSeries.tests.upcoming.map((test) => renderTestCard(test, false))}
                      </div>
                    )}

                    {/* Completed Tests */}
                    {selectedSeries.tests.completed.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Completed Tests
                        </h4>
                        {selectedSeries.tests.completed.map((test) => renderTestCard(test))}
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
