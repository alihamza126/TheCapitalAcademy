"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import visionImg from "/public/png/vison.png";
import missionImg from "/public/png/mission.png";

const fadeLeft = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const fadeRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Section Wrapper */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-sky-50 to-white">
        {/* Vision Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center mb-24">
          <motion.div {...fadeLeft}>
            <h2 className="text-5xl font-extrabold tracking-tight mb-6 text-blue-800 font-fredoka">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To redefine how students learn by providing an accessible,
              personalized, and innovative online education platform that
              inspires lifelong learning and empowers every learner to thrive in
              the modern world.
            </p>
          </motion.div>

          <motion.div {...fadeRight} className="flex justify-center">
            <Image
              src={visionImg}
              alt="Our Vision"
              className="rounded-3xl shadow-2xl"
              placeholder="blur"
              priority
              width={500}
              height={400}
            />
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeLeft} className="order-2 md:order-1 flex justify-center">
            <Image
              src={missionImg}
              alt="Our Mission"
              className="rounded-3xl shadow-2xl"
              placeholder="blur"
              width={500}
              height={400}
            />
          </motion.div>

          <motion.div {...fadeRight} className="order-1 md:order-2">
            <h2 className="text-5xl font-extrabold tracking-tight mb-6 text-blue-800 font-fredoka">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              We aim to provide a wide variety of high-quality, affordable
              courses led by expert instructors. Our platform blends cutting-edge
              technology with interactive learning to ensure a dynamic and flexible
              academic experience.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By fostering a collaborative, inclusive, and inspiring learning
              environment, we help individuals reach their full potential and
              contribute meaningfully to society.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
