// State and context hooks from React.
import React, { useState, useEffect } from "react";

// Import the JSON data.
import data from "../data/data.json";

// Importing icons from the 'react-bootstrap-icons' library.
import { ArchiveFill, Bookshelf } from "react-bootstrap-icons";

// Importing the motion module from "framer-motion" for animations.
import { motion, AnimatePresence } from "framer-motion";

export default function Experience() {
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);

  useEffect(() => {
    setEducation(data.education);
    setWorkExperience(data.workExperience);
  }, []);

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.1,
      },
    },
  };
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
      },
    },
  };
  return (
    <section
      id="experience"
      className="md:h-screen px-2.5 md:px-10 lg:px-24 xl:px-60 lg:grid lg:content-center mt-24 md:mt-0"
    >
      <motion.div
        className="font-black text-2xl align-center relative mb-14"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <img src="src/assets/download.svg" alt="dot" className="" />

        <h2 className="absolute left-5 top-5 z-1">Experience</h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Education */}
        <section className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 shadow grid gap-5">
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              className="flex gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              <motion.div
                className=" flex flex-col items-center"
                variants={childVariants}
              >
                <div className="bg-rose-600 text-slate-50 w-10 h-10 p-3 rounded-full">
                  <Bookshelf />
                </div>
                <span className="border-l-2 h-full border-rose-600"></span>
              </motion.div>
              <motion.div
                className=" flex flex-col gap-3 lg:mt-2"
                variants={childVariants}
              >
                <p className="rounded-full px-3 w-fit text-md font-thin bg-slate-600 text-slate-90 capitalize">
                  {edu.institution}
                </p>
                <p className="capitalize text-slate-900 dark:text-slate-50 text-md font-medium">
                  {edu.degree}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Deeply passionate about technology and focused on innovative
                  problem-solving.
                </p>
              </motion.div>
            </motion.div>
          ))}
        </section>
        {/* Experience */}
        <section className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 shadow grid gap-5">
          {workExperience.map((exp) => (
            <motion.div
              key={exp.company}
              className="flex gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              <motion.div
                className=" flex flex-col items-center"
                variants={childVariants}
              >
                <div className="bg-rose-600 text-slate-50 w-10 h-10 p-3 rounded-full">
                  <ArchiveFill />
                </div>
                <span className="border-l-2 h-full border-rose-600"></span>
              </motion.div>
              <motion.div
                className=" flex flex-col gap-3 lg:mt-2"
                variants={childVariants}
              >
                <p className="rounded-full px-3 w-fit text-md font-thin bg-slate-600 text-slate-90 capitalize">
                  {exp.company}
                </p>
                <p className="capitalize text-slate-900 dark:text-slate-50 text-md font-medium">
                  {exp.position}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {exp.responsibilities}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </section>
      </div>
    </section>
  );
}
