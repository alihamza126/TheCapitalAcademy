"use client"
import { Badge, Card, Select, Spin, Table } from "antd"
import { CalendarOutlined, BookOutlined, ClockCircleOutlined, FlagOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import type dayjs from "dayjs"
import Axios from "@/lib/Axios"

const Page = () => {
    const [enrolledSeries, setEnrolledSeries] = useState<any[]>([])
    const [selectedSeries, setSelectedSeries] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [tests, setTests] = useState<any[]>([])
    const [timetable, setTimetable] = useState<Record<string, any[]>>({})

    useEffect(() => {
        const fetchTimeTable = async () => {
            setLoading(true)
            try {
                const res = await Axios.get("/api/v1/series/timetable")
                const data = res.data
                if (data.success) {
                    setEnrolledSeries(data.enrolledSeries)
                    setTimetable(data.timetable)

                    // default first series
                    if (data.enrolledSeries.length > 0) {
                        const firstSeriesId = data.enrolledSeries[0].id
                        setSelectedSeries(firstSeriesId)
                        const sortedTests = (data.timetable[firstSeriesId] || []).sort(
                            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                        )
                        setTests(sortedTests)
                    }
                }
            } catch (error) {
                console.error("Error fetching timetable:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTimeTable()
    }, [])

    const handleSeriesChange = (seriesId: string) => {
        setSelectedSeries(seriesId)
        if (seriesId && timetable[seriesId]) {
            const sorted = timetable[seriesId].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            setTests(sorted)
        } else {
            setTests([])
        }
    }

    const columns = [
        {
            title: "📝 Test Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => <span>📌 {text}</span>,
        },
        {
            title: "📅 Date",
            dataIndex: "date",
            key: "date",
            render: (text: string) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: "📚 Subjects",
            dataIndex: "subjects",
            key: "subjects",
            render: (subjects: string[]) => <span>📖 {subjects.join(", ")}</span>,
        },
        {
            title: "⏱ Duration",
            dataIndex: "durationMin",
            key: "durationMin",
            render: (min: number) => <span><ClockCircleOutlined /> {min} min</span>,
        },
        {
            title: "🎯 Total Marks",
            dataIndex: "totalMarks",
            key: "totalMarks",
            render: (marks: number) => <span><FlagOutlined /> {marks}</span>,
        },
        {
            title: "📌 Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "default";
                let emoji = "⏳"; // default upcoming
                let text = "UPCOMING";

                if (status === "completed") {
                    color = "success";
                    emoji = "✅";
                    text = "COMPLETED";
                } else if (status === "available") {
                    color = "processing";
                    emoji = "🟢";
                    text = "AVAILABLE";
                }

                return <Badge status={color as any} text={`${emoji} ${text}`} />;
            },
        },
    ];
    

    return (
        <div className="p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="md:text-start text-center mb-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple  to-pink bg-clip-text text-transparent mb-2">View Schedule</h1>
                    <p className="text-gray-600">Select an enrolled series to view upcoming and completed tests</p>
                </div>

                <Select
                    value={selectedSeries}
                    onChange={handleSeriesChange}
                    placeholder="Select Series"
                    className="md:w-72 w-full"
                    size="large"
                    loading={loading}
                >
                    {enrolledSeries.map((s) => (
                        <Select.Option key={s.id} value={s.id}>
                            {s.title}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            {/* Table */}
            <Card className="shadow-lg border-0 mt-4 overflow-x-auto h-full">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Spin size="large" />
                    </div>
                ) : tests.length ? (
                    <Table
                        dataSource={tests.map((t) => ({ ...t, key: t.id }))}
                        columns={columns}
                        pagination={false}
                        bordered
                    />
                ) : (
                    <p className="text-center text-slate-500 py-12">
                        Select a series to view its timetable
                    </p>
                )}
            </Card>
        </div>
    )
}

export default Page
