"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Accordion,
  AccordionItem,
} from "@heroui/react"
import { motion } from "framer-motion"
import { Trophy, Clock, CheckCircle, XCircle, BarChart3, FileText, Award } from "lucide-react"

interface TestResultData {
  attempt: {
    _id: string
    score: number
    totalQuestions: number
    percentage: number
    duration: number
    attemptedAt: string
  }
  test: {
    _id: string
    seriesId: {
      _id: string
      title: string
    }
    title: string
    description: string
    mode: string
    totalMarks: number
  }
  results: {
    correctAnswers: number
    incorrectAnswers: number
    totalQuestions: number
    percentage: number
    subjectWiseResults: Record<
      string,
      {
        total: number
        correct: number
        incorrect: number
      }
    >
  }
  detailedAnswers: Array<{
    questionNumber: number
    question: string
    options: string[]
    selectedOption: number
    correctOption: number
    isCorrect: boolean
    explanation: string
    info: string
    subject: string
  }>
}

interface TestResultModalProps {
  isOpen: boolean
  onClose: () => void
  resultData: TestResultData | null
}

const TestResultModal = ({ isOpen, onClose, resultData }: TestResultModalProps) => {
  if (!resultData) return null

  const { attempt, test, results, detailedAnswers } = resultData

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "success"
    if (percentage >= 60) return "warning"
    return "danger"
  }

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return "Excellent"
    if (percentage >= 80) return "Very Good"
    if (percentage >= 70) return "Good"
    if (percentage >= 60) return "Average"
    return "Needs Improvement"
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh]",
        body: "p-0",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{test.title} - Results</h2>
              <p className="text-sm text-gray-600">
                {test.seriesId.title} • {test.mode}
              </p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="px-6">
          <div className="space-y-6">
            {/* Overall Performance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardBody className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Award className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-blue-600">{results.percentage}%</h3>
                      <p className="text-sm text-gray-600">Overall Score</p>
                      <Chip color={getPerformanceColor(results.percentage)} variant="flat" size="sm" className="mt-1">
                        {getGradeText(results.percentage)}
                      </Chip>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-3 bg-green-100 rounded-full">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-green-600">{results.correctAnswers}</h3>
                      <p className="text-sm text-gray-600">Correct</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-3 bg-red-100 rounded-full">
                          <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-red-600">{results.incorrectAnswers}</h3>
                      <p className="text-sm text-gray-600">Incorrect</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-3 bg-orange-100 rounded-full">
                          <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-orange-600">{formatDuration(attempt.duration)}</h3>
                      <p className="text-sm text-gray-600">Time Taken</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600">
                        {results.correctAnswers} / {results.totalQuestions} questions
                      </span>
                    </div>
                    <Progress
                      value={results.percentage}
                      color={getPerformanceColor(results.percentage)}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500">Attempted on {formatDate(attempt.attemptedAt)}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Subject-wise Performance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Subject-wise Performance</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(results.subjectWiseResults).map(([subject, data]) => {
                      const percentage = Math.round((data.correct / data.total) * 100)
                      return (
                        <Card key={subject} className="border">
                          <CardBody className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium capitalize">{subject}</h4>
                              <Chip size="sm" variant="flat">
                                {percentage}%
                              </Chip>
                            </div>
                            <Progress value={percentage} color={getPerformanceColor(percentage)} className="mb-2" />
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>{data.correct} correct</span>
                              <span>{data.total} total</span>
                            </div>
                          </CardBody>
                        </Card>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Detailed Answers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Question-wise Analysis</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <Accordion variant="splitted">
                    {detailedAnswers.map((answer, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={`Question ${answer.questionNumber}`}
                        title={
                          <div className="flex items-center gap-3">
                            <div className={`p-1 rounded-full ${answer.isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                              {answer.isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <span className="font-medium">Question {answer.questionNumber}</span>
                            <Chip size="sm" variant="flat" className="capitalize">
                              {answer.subject}
                            </Chip>
                          </div>
                        }
                      >
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Question:</h4>
                            <p className="text-gray-700">{answer.question}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Options:</h4>
                            <div className="space-y-2">
                              {answer.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded-lg border ${
                                    optIndex === answer.correctOption
                                      ? "bg-green-50 border-green-200"
                                      : optIndex === answer.selectedOption && !answer.isCorrect
                                        ? "bg-red-50 border-red-200"
                                        : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                                    <span>{option}</span>
                                    {optIndex === answer.correctOption && (
                                      <Chip size="sm" color="success" variant="flat">
                                        Correct
                                      </Chip>
                                    )}
                                    {optIndex === answer.selectedOption && !answer.isCorrect && (
                                      <Chip size="sm" color="danger" variant="flat">
                                        Your Answer
                                      </Chip>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {answer.explanation && (
                            <div>
                              <h4 className="font-medium mb-2">Explanation:</h4>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-gray-700">{answer.explanation}</p>
                              </div>
                            </div>
                          )}

                          {answer.info && (
                            <div>
                              <h4 className="font-medium mb-2">Additional Info:</h4>
                              <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-gray-700">{answer.info}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </ModalBody>

        <ModalFooter className="px-6 py-4">
          <Button color="primary" onPress={onClose}>
            Close Results
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TestResultModal
