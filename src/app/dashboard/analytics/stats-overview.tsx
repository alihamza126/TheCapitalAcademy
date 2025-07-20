import { Card, CardBody, CardHeader } from "@heroui/react"
import { Statistic } from "antd"
import { TrophyIcon, XCircleIcon, BookmarkIcon, ClockIcon } from "lucide-react"

interface StatsOverviewProps {
  data: {
    totalSolved: number
    totalWrong: number
    totalSave: number
    lastSaveAt: string
  }
}

export default function StatsOverview({ data }: StatsOverviewProps) {
  const totalAttempted = data.totalSolved + data.totalWrong
  const successRate = totalAttempted > 0 ? ((data.totalSolved / totalAttempted) * 100).toFixed(1) : 0
  const lastSaveDate = new Date(data.lastSaveAt).toLocaleDateString()

  const stats = [
    {
      title: "Questions Solved",
      value: data.totalSolved,
      icon: <TrophyIcon className="w-8 h-8 text-green-500" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Wrong Answers",
      value: data.totalWrong,
      icon: <XCircleIcon className="w-8 h-8 text-red-500" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Saved Questions",
      value: data.totalSave,
      icon: <BookmarkIcon className="w-8 h-8 text-blue-500" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: <ClockIcon className="w-8 h-8 text-purple-500" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <Statistic
                  value={stat.value}
                  valueStyle={{
                    color: stat.color.replace("text-", ""),
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>{stat.icon}</div>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Last Activity Card */}
      <Card className="md:col-span-2 lg:col-span-4 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold text-gray-800">Last Activity</h3>
        </CardHeader>
        <CardBody className="pt-0">
          <p className="text-gray-600">
            Last saved question on <span className="font-semibold text-blue-600">{lastSaveDate}</span>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
