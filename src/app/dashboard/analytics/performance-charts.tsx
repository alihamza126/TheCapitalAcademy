import { Card, CardBody, CardHeader } from "@heroui/react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface PerformanceChartsProps {
  data: {
    totalSolved: number
    totalWrong: number
    totalSave: number
  }
}

export default function PerformanceCharts({ data }: PerformanceChartsProps) {
  const pieData = [
    { name: "Correct", value: data.totalSolved, color: "#52c41a" },
    { name: "Wrong", value: data.totalWrong, color: "#ff4d4f" },
    { name: "Saved", value: data.totalSave, color: "#1890ff" },
  ]

  const barData = [
    { name: "Solved", value: data.totalSolved, fill: "#52c41a" },
    { name: "Wrong", value: data.totalWrong, fill: "#ff4d4f" },
    { name: "Saved", value: data.totalSave, fill: "#1890ff" },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-800">Performance Overview</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Comparison</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
