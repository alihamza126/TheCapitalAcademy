import Mcqs from '@/components/mcq/Mcqs';
import Axios from '@/lib/Axios';
import React from 'react'

const page = async ({ searchParams }) => {
    const { query } = await searchParams;

    // const apiParams = {
    //     course: query.course || undefined,
    //     subject: query.subject || undefined,
    //     chapter: query.chapter || undefined,
    //     topic: query.topic || undefined,
    //     catagory: query.catagory || undefined,
    // };

    const mockData = [
        {
            _id: "1",
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctOption: 3,
            explain: "Paris is the capital and most populous city of France.",
            difficulty: "easy",
            subject: "geography",
            info: "Geography Question",
        },
        {
            _id: "2",
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctOption: 2,
            explain: "Basic addition: 2 + 2 = 4",
            difficulty: "easy",
            subject: "math",
            info: "Mathematics Question",
        },
    ]

    const fetchData = async () => {
        try {
            // const response = await Axios.post('/mcq/get', { course, subject, chapter, topic, catagory, userId: user._id });
        } catch (error) {
        }
    }
    fetchData();

    return (
        <div>
            <Mcqs subject={"english"} chapter={"chapter-1"} mcqData={mockData} />
        </div>
    )
}

export default page