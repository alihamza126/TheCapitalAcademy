import { Card, CardBody } from "@heroui/react"
import { Calendar, Target, TrendingUp, Clock } from "lucide-react"

interface ProgressDashboardProps {
  completedWeeks: number
  totalWeeks: number
  progressPercentage: number
  startDate: Date
}

export default function ProgressDashboard({
  completedWeeks,
  totalWeeks,
  progressPercentage,
  startDate,
}: ProgressDashboardProps) {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + totalWeeks * 7)

  const remainingWeeks = totalWeeks - completedWeeks
  const daysRemaining = remainingWeeks * 7

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
        <CardBody className="p-6 text-white">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8" />
            <div>
              <p className="text-blue-100 text-sm">Completed</p>
              <p className="text-2xl font-bold">
                {completedWeeks}/{totalWeeks}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
        <CardBody className="p-6 text-white">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <p className="text-green-100 text-sm">Progress</p>
              <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
        <CardBody className="p-6 text-white">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8" />
            <div>
              <p className="text-orange-100 text-sm">Days Left</p>
              <p className="text-2xl font-bold">{daysRemaining}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
        <CardBody className="p-6 text-white">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            <div>
              <p className="text-purple-100 text-sm">End Date</p>
              <p className="text-lg font-bold">{endDate.toLocaleDateString()}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
