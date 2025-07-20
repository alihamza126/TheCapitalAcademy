import Mcqs from '@/components/mcq/Mcqs';
import Axios from '@/lib/Axios';
import React from 'react'

const page = async ({ searchParams }) => {
    let data = [];
    const {
        course = '',
        subject = '',
        chapter = '',
        topic = '',
        category = '',
    } = searchParams || {};

    const apiParams = {
        course,
        subject,
        chapter: decodeURIComponent(chapter),
        topic: decodeURIComponent(topic),
        category: decodeURIComponent(category)
    };


    const dummyMcqData = [
        {
            _id: "mcq_001",
            question: "What is the chemical formula for water?",
            options: [
                "H2O",
                "CO2",
                "NaCl",
                "CH4"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "chemistry",
            info: "Basic Chemistry",
            explain: "Water is composed of two hydrogen atoms and one oxygen atom, hence the chemical formula H2O. This is one of the most fundamental compounds in chemistry and essential for all life on Earth.",
            imageUrl: null
        },

        {
            _id: "mcq_015",
            question: "What is the time complexity of binary search?",
            options: [
                "O(n)",
                "O(log n)",
                "O(n²)",
                "O(1)"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "hard",
            subject: "computer science",
            info: "Algorithms",
            explain: "Binary search has a time complexity of O(log n) because it eliminates half of the remaining elements in each step. For an array of n elements, it takes at most log₂(n) comparisons to find the target element or determine it's not present. This makes it much more efficient than linear search O(n) for sorted arrays.",
            imageUrl: null
        }
    ]

    try {
        const response = await Axios.post('/api/v1/progress/get', apiParams);
        if (response.status == 200) {
            data = response.data;
        }
    } catch (error) {
        console.log(error);
    }



    return (
        <div>
            <Mcqs subject={"english"} chapter={"chapter-1"} mcqData={data} />
        </div>
    )
}

export default page