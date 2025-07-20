import { Card, CardBody, CardHeader } from "@heroui/react"
import { Progress } from "antd"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Subject {
  subject: string
  solved: number
  wrong: number
}

interface SubjectBreakdownProps {
  data: {
    subjects: Subject[]
  }
}

export default function SubjectBreakdown({ data }: SubjectBreakdownProps) {
  const subjectsWithStats = data.subjects.map((subject) => {
    const total = subject.solved + subject.wrong
    const accuracy = total > 0 ? (subject.solved / total) * 100 : 0
    return {
      ...subject,
      total,
      accuracy: accuracy.toFixed(1),
    }
  })

  const chartData = subjectsWithStats.map((subject) => ({
    subject: subject.subject,
    solved: subject.solved,
    wrong: subject.wrong,
    accuracy: Number.parseFloat(subject.accuracy),
  }))

  const colors = ["#1890ff", "#52c41a", "#faad14", "#ff4d4f", "#722ed1"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Subject Cards */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <h3 className="text-xl font-bold text-gray-800">Subject Performance</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          {subjectsWithStats.map((subject, index) => (
            <div key={subject.subject} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">{subject.subject}</h4>
                <span className="text-sm text-gray-600">
                  {subject.solved}/{subject.total} correct
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-semibold">{subject.accuracy}%</span>
                </div>
                <Progress
                  percent={Number.parseFloat(subject.accuracy)}
                  strokeColor={colors[index % colors.length]}
                  trailColor="#e5e7eb"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-3 text-center">
                <div>
                  <div className="text-green-600 font-bold text-lg">{subject.solved}</div>
                  <div className="text-xs text-gray-600">Solved</div>
                </div>
                <div>
                  <div className="text-red-600 font-bold text-lg">{subject.wrong}</div>
                  <div className="text-xs text-gray-600">Wrong</div>
                </div>
                <div>
                  <div className="text-blue-600 font-bold text-lg">{subject.total}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Subject Comparison Chart */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <h3 className="text-xl font-bold text-gray-800">Subject Comparison</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name === "solved" ? "Correct" : name === "wrong" ? "Wrong" : "Accuracy %",
                ]}
              />
              <Bar dataKey="solved" name="solved" fill="#52c41a" radius={[2, 2, 0, 0]} />
              <Bar dataKey="wrong" name="wrong" fill="#ff4d4f" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Accuracy Line Chart Alternative */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Accuracy by Subject</h4>
            <div className="space-y-3">
              {chartData.map((subject, index) => (
                <div key={subject.subject} className="flex items-center">
                  <div className="w-20 text-sm font-medium">{subject.subject}</div>
                  <div className="flex-1 mx-4">
                    <Progress percent={subject.accuracy} strokeColor={colors[index % colors.length]} showInfo={false} />
                  </div>
                  <div className="w-12 text-sm font-semibold text-right">{subject.accuracy}%</div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
