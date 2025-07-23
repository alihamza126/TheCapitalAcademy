'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react'; // Adjust if using custom component
import LockIcon from '@mui/icons-material/Lock';

interface ChapterProps {
    name: string;
    img: string;
    isLocked: boolean;
    course?: string;
    subject: string;
    chapter: string;
}

const Chapter = ({ course = null, subject, chapter, name, img, isLocked = false }: ChapterProps) => {

    return (
        <div className="w-[48%] md:w-[260px] md:p-1">
            <Link
                href={isLocked ? '#' : `/dashboard/${course}/${subject}/${name?.toLowerCase()}`}
                className="no-underline"
            >
                <Card className="rounded-2xl overflow-hidden shadow hover:shadow-lg relative">
                    <div className="relative h-48 bg-gray-100">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1.03 }}
                            whileHover={{ scale: 1.1 }}
                            className="h-full w-full"
                        >
                            <Image
                                src={img}
                                alt={name}
                                fill
                                loading='lazy'
                                className={`object-cover transition-opacity duration-700 `}
                            />
                        </motion.div>

                        {isLocked && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <LockIcon fontSize="large" className="text-white bg-blue-700 rounded-full p-2" />
                            </div>
                        )}
                    </div>

                    <div className="text-center p-3 bg-white">
                        <p className="text-sm font-semibold text-gray-700 line-clamp-1">{name}</p>
                    </div>
                </Card>
            </Link>
        </div>
    );
};

export default Chapter;
