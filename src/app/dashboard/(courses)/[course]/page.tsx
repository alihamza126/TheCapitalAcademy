
// import './subjectpage.scss';
import { redirect } from 'next/navigation'
import Subject from '@/components/dashboard/Subject';
import Axios from '@/lib/Axios';
import { Empty } from '@phosphor-icons/react/dist/ssr';


const Page = async ({ params }) => {
    const { course } = params;
    let data = [];

    const res = await Axios.get('/api/v1/course/active-courses');
    const activeCourses = res.data.activeCourses;
    if (!activeCourses.includes(course)) {
        return redirect('/dashboard/courses')
    }

    const bio = '/subjects/1.png'
    const chem = '/subjects/2.png';
    const phy = '/subjects/3.png';
    const eng = '/subjects/4.png';
    const logic = '/subjects/5.png';
    const mock = '/subjects/6.png';


    const numsSubjectData = [
        {
            name: "BIOLOGY",
            img: bio,
            link: '/dashboard/courses/nums/biology'
        },
        {
            name: "CHEMISTRY",
            img: chem,
            link: '/dashboard/courses/nums/chemistry'
        },
        {
            name: "PHYSICS",
            img: phy,
            link: '/dashboard/courses/nums/physics'
        },
        {
            name: "ENGLISH",
            img: eng,
            link: '/dashboard/courses/nums/english'
        },
        {
            name: "MOCK TESTS",
            img: mock,
            link: '/dashboard/courses/nums/mock/test'
        },
    ];

    const mdcatSubjectData = [
        {
            name: "BIOLOGY",
            img: bio,
            link: '/dashboard/courses/mdcat/biology'
        },
        {
            name: "CHEMISTRY",
            img: chem,
            link: '/dashboard/courses/mdcat/chemistry'
        },
        {
            name: "PHYSICS",
            img: phy,
            link: '/dashboard/courses/mdcat/physics'
        },
        {
            name: "ENGLISH",
            img: eng,
            link: '/dashboard/courses/mdcat/english'
        },
        {
            name: "LOGICAL REASONING",
            img: logic,
            link: '/dashboard/courses/mdcat/logic'
        },
        {
            name: "MOCK TESTS",
            img: mock,
            link: '/dashboard/courses/mdcat/mock/test'
        },
    ];


    if (course === "nums") {
        data = numsSubjectData;
    } else if (course === "mdcat") {
        data = mdcatSubjectData;
    }

    return (
        <>
            <div className="container h-full">
                <div className="flex justify-center pb-10">
                    <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent">
                        SELECT YOUR SUBJECT
                    </h1>
                </div>
                {
                    data.length == 0 &&
                    <p> not subject are here</p>
                }
                <div className="flex flex-wrap gap-4">
                    {data.map((ele, index) => (
                        <Subject key={index} name={ele.name} img={ele.img} isLocked={(false) ? ele.name == 'MOCK TESTS' : false} link={(false) ? ele.name == 'MOCK TESTS' ? '#' : ele.link : ele.link} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;
