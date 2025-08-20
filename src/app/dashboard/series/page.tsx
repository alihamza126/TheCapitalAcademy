"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  Progress,
  Chip,
} from "@heroui/react"
import {
  BookOpen,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"
import Axios from "@/lib/Axios"
import Link from "next/link"
import { useRouter } from "next/navigation"



export default function StudentDashboard() {
  const [enrolledSeries, setEnrolledSeries] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchSeries = async () => {
      const res = await Axios.get('/api/v1/series/dashboard');
      setEnrolledSeries(res.data.data.enrolledSeries);
      setStats(res.data.data.stats);
      setLoading(false);

      if (res.data.data.enrolledSeries.length === 0) {
        router.push('/series');
      }
    };
    fetchSeries();
  }, []);


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
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Series</p>
                  <p className="text-2xl font-bold font-playfair">{stats?.totalSeries}</p>
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
                    {stats?.totalTestsAttempted}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
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
          </Card> */}

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold font-playfair">
                    {stats?.averageScore}
                    %
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        {/* Enrolled Series */}
        <h3 className="text-xl font-bold font-playfair bg-gradient-to-r from-purple via-purple to-primary bg-clip-text text-transparent">My Series</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {enrolledSeries.map((item) => {
            const s = item.series
            return (
              <Link href={`/dashboard/series/${s._id}`}>
                <motion.div key={item.enrollmentId} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card fullWidth className="cursor-pointer pointer-events-none hover:shadow-lg transition-shadow" isPressable>
                    <CardBody className="p-0">
                      <div className="relative">
                        <img
                          src={s.coverImageUrl || "/placeholder.svg"}
                          alt={s.title}
                          className="w-full h-52 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Chip size="sm" color="primary" variant="solid">
                            {s.difficulty}
                          </Chip>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg font-playfair mb-2">{s.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{s.description}</p>

                        {/* Subjects */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {s.subjects.map((subj: string, idx: number) => (
                            <Chip
                              key={idx}
                              size="sm"
                              color="secondary"
                              variant="flat"
                              className="capitalize"
                            >
                              {subj}
                            </Chip>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-semibold">
                              {item.progress.testsAttempted}/{s.totalTests}
                            </span>
                          </div>
                          <Progress
                            value={(item.progress.testsAttempted / s.totalTests) * 100}
                            color="primary"
                            className="w-full"
                          />

                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{item.isExpired ? "Expired" : "Active"}</span>
                            {item.expiresAt && <span>Expires: {new Date(item.expiresAt).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>

                    </CardBody>
                  </Card>
                </motion.div>
              </Link>
            )
          })}

        </div>
      </div>
    </div>
  )
}
