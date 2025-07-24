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
            <Mcqs subject={subject} chapter={chapter} mcqData={data} />
        </div>
    )
}

export default page