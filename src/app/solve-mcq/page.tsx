import Mcqs from '@/components/mcq/Mcqs';
import Axios from '@/lib/Axios';
import React from 'react'
import FreeTrialTopBar from './FreeTrailTopbar';


export const metadata = {
    title: "MCQs - Solve MCQs",
    description: `Solve MCQs for various subjects and chapters. Track your progress and improve your skills with our comprehensive MCQ platform.`,
    keywords: "MCQs, solve MCQs, practice MCQs, online MCQs, MCQ platform, educational MCQs, subject MCQs, chapter MCQs, progress tracking",
};

const page = async ({ searchParams }) => {
    let data = [];
    const {
        course = '',
        subject = '',
        chapter = '',
        topic = '',
        category = '',

        type = null,
        testId = null
    } = searchParams || {};

    const apiParams = {
        course,
        subject,
        chapter: decodeURIComponent(chapter),
        topic: decodeURIComponent(topic),
        category: decodeURIComponent(category)
    };


    try {
        if (type == "series") {
            const response = await Axios.get(`/api/v1/test/student/${testId}`);
            if (response.data.success) {
                data = response.data.test
            }
            // console.log(response.data);
        } else {
            const response = await Axios.post('/api/v1/progress/get', apiParams);
            if (response.status == 200) {
                data = response.data;
            }
        }
    } catch (error) {
        console.log(error);
    }



    return (
        <div>
            {course === "trial" && <FreeTrialTopBar isFreeTrial={course === "trial"} />}
            <Mcqs isSeries={type == "series"} subject={subject} chapter={chapter} mcqData={data} />
        </div>
    )
}

export default page