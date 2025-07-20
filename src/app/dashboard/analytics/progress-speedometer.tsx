import { Card, CardBody, CardHeader } from "@heroui/react"
import { Progress } from "antd"

interface ProgressSpeedometerProps {
  data: {
    totalSolved: number
    totalWrong: number
  }
}

export default function ProgressSpeedometer({ data }: ProgressSpeedometerProps) {
  const totalAttempted = data.totalSolved + data.totalWrong
  const successRate = totalAttempted > 0 ? (data.totalSolved / totalAttempted) * 100 : 0

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 90) return { level: "Excellent", color: "#52c41a" }
    if (rate >= 75) return { level: "Good", color: "#1890ff" }
    if (rate >= 60) return { level: "Average", color: "#faad14" }
    return { level: "Needs Improvement", color: "#ff4d4f" }
  }

  const performance = getPerformanceLevel(successRate)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <h3 className="text-xl font-bold text-gray-800">Performance Meter</h3>
      </CardHeader>
      <CardBody className="flex flex-col items-center space-y-6">
        {/* Main Speedometer */}
        <div className="relative">
          <Progress
            type="dashboard"
            percent={successRate}
            size={200}
            strokeColor={performance.color}
            strokeWidth={8}
            format={(percent) => (
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: performance.color }}>
                  {percent?.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            )}
          />
        </div>

        {/* Performance Level */}
        <div className="text-center">
          <div className="text-lg font-semibold mb-2" style={{ color: performance.color }}>
            {performance.level}
          </div>
          <div className="text-sm text-gray-600">
            {data.totalSolved} correct out of {totalAttempted} attempts
          </div>
        </div>

        {/* Mini Progress Bars */}
        <div className="w-full space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Accuracy</span>
              <span>{successRate.toFixed(1)}%</span>
            </div>
            <Progress percent={successRate} strokeColor="#52c41a" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Questions Attempted</span>
              <span>{totalAttempted}</span>
            </div>
            <Progress percent={Math.min((totalAttempted / 50) * 100, 100)} strokeColor="#1890ff" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
