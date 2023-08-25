import { useEffect, useState } from "react";

// Importing the motion module from "framer-motion" for animations.
import { AnimatePresence, motion } from "framer-motion";

// Components for website displaying.
import ProjectImageCard from "./ProjectImageCard";
import ProjectInfoCard from "./ProjectInfoCard";

// Import the JSON data.
import data from "../data/data.json";

// Import Assets
import dots from "../assets/download.svg";

// Importing icons from the 'react-bootstrap-icons' library.
import { Arrow90degLeft, ArrowBarRight } from "react-bootstrap-icons";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!showMore) {
      const array = data.projects.filter(
        (project) => project.priority === "high"
      );
      setProjects(array);
    } else {
      setProjects(data.projects);
    }
  }, [showMore]);

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <section id="works" className="min-h-screen h-full grid content-center">
      <div className="px-2.5 md:px-10 lg:px-24 xl:px-60 mb-14">
        <motion.div
          className="font-black text-2xl align-center relative "
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <img src={dots} alt="dot" />

          <h2 className="absolute left-5 top-5 z-1">My Recent Projects</h2>
        </motion.div>
      </div>
      <AnimatePresence>
        {projects.map((project) => {
          if ((project.id + 1) % 2 === 0) {
            return (
              <motion.div
                key={project.id}
                className="grid grid-cols-2 h-40 md:h-52"
                variants={cardVariants}
                initial="hidden"
                exit="exit"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                <ProjectInfoCard project={project} />
                <ProjectImageCard project={project} />
              </motion.div>
            );
          } else {
            return (
              <motion.div
                key={project.id}
                className="grid grid-cols-2 h-40 md:h-52"
                variants={cardVariants}
                initial="hidden"
                exit="exit"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                <ProjectImageCard project={project} />
                <ProjectInfoCard project={project} />
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
      <motion.button
        className="mx-auto sm:mr-5 md:mr-7 py-1 px-2 md:pl-6 md:pr-5 md:py-2 text-sm rounded-lg capitalize  w-fit h-fit ml-auto flex items-center gap-2 bg-slate-50 text-violet-950 m-8"
        onClick={() => setShowMore(!showMore)}
        whileTap={{ scale: 0.85 }}
      >
        {showMore ? (
          <>
            View full portfolio
            <ArrowBarRight />
          </>
        ) : (
          <>
            View Recent projects
            <Arrow90degLeft className="rotate-90" />
          </>
        )}
      </motion.button>
    </section>
  );
}
