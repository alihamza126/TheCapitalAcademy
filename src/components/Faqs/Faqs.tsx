"use client";
import { Accordion, AccordionItem } from '@heroui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const faqData = [
    {
        q: "What type of courses are available on your website?",
        ans: "The Capital Academy offers a wide range of McQ banks customized for various entry test preparation including MdCAT, NUMS, ECAT & others (till now)."
    },
    {
        q: "How do I enroll in a course?",
        ans: `Enrolling in a course on our website is easy! Simply browse our selection of McQ banks for entry tests, choose the course that suits your needs, and follow the prompts to complete the enrollment process. Moreover, uploading proof of payment is necessary for gaining access to our McQ banks.\n(Note:\n If you feel difficulty in registering process, you can contact on our given WhatsApp number for help)`
    },
    {
        q: "Can I access course material on my mobile device?",
        ans: "Absolutely! Our McQ banks are optimized for mobile access, allowing you to study anytime, anywhere, directly from your smartphone or tablet. Simply log in to our website through your mobile browser for access to all course materials on the go."
    },
    {
        q: "How long do I have access to the course material after enrollment?",
        ans: "Upon enrollment, you'll have access to the McQ bank till your test date."
    },
    {
        q: "How do I communicate with the instructors or ask questions during the course?",
        ans: `To communicate with inspectors or ask questions related to the entry test, we're having our WhatsApp groups. You'll be added in the group soon after your enrollment. After joining the group:\n1) Check Group Guidelines: Before posting your questions, review the group guidelines.\n2) Post Your Questions: Clearly post your questions in the WhatsApp group.\n3) Tag Our Instructors: Tag our subject specific instructors.\n4) Search Previous Discussions.\n5) Follow Up: If you do not receive a response, follow up politely or use other communication channels.`
    },
    {
        q: "Are there any discounts or scholarships available for the courses?",
        ans: `Yes, we offer various discounts and scholarships for our McQ banks. We periodically run promotional discounts. Additionally, we have a scholarship program for students who demonstrate exceptional academic performance in their FSc exams.\n(Note: Scholarship only includes fee waivers on our McQ banks)`
    },
    {
        q: "Is there any trial before buying the course?",
        ans: "Yes, we offer a free trial of our MdCAT McQ bank. Sign up for the free trial on our website to get started."
    },
    {
        q: "Are there any assessment or full length exam in the course?",
        ans: `Yes, our MdCAT or other entry test McQ bank includes full-length exams or mock tests designed to simulate the actual entry test experience.`
    },
    {
        q: `Are the courses self-paced or we've to follow the specific schedule?`,
        ans: `Our MdCAT MCQ bank is completely self-paced. However, there are flexible schedules available to help you stay on track.`
    },
    {
        q: `Are there opportunities for networking with other students or professionals in the field?`,
        ans: `Yes, we offer networking opportunities through our Facebook study group and periodic webinars with medical professionals.`
    },
    {
        q: `Why should I choose The Capital Academy?`,
        ans: `1) User friendly interactive interface\n2) Availability of teachers via WhatsApp\n3) Past paper questions\n4) 50+ Mock Tests\n5) Explanation of all the McQs\n6) Save McQs to solve later\n7) Attempt the wrong McQs again\n8) Customized syllabus`
    }
];

export default function FAQAccordion() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div ref={ref} className="my-10 px-2 md:px-20">
            {/* <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2> */}

            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Frequently Asked
                    <span className="block bg-gradient-to-r mt-2 from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Questions
                    </span>
                </h2>
            </div>

            <Accordion
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            overflowY: "unset",
                            transition: {
                                height: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 1,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 1,
                                },
                            },
                        },
                        exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            overflowY: "hidden",
                            transition: {
                                height: {
                                    easings: "ease",
                                    duration: 0.25,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 0.3,
                                },
                            },
                        },
                    },
                }}

                variant="splitted" fullWidth className=" max-w-7xl mx-auto">
                {faqData.map((item, index) => (
                    <AccordionItem key={index}
                        className='mb-3'
                        classNames={{heading: 'font-semibold text-gray-500', content: 'text-gray-700'}}
                        title={item.q} aria-label={`Accordion ${index + 1}`}
                    >
                        {item.ans.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} >
                                {lineIndex === 0 ? line : <span className="block">{line}</span>}
                            </p>
                        ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}