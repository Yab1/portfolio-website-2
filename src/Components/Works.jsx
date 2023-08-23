// State and context hooks from React.
import React, { useState, useEffect, useRef } from "react";

// Import the JSON data.
import data from "../data/data.json";

// Importing the motion module from "framer-motion" for animations.
import { motion, AnimatePresence } from "framer-motion";
import { ThreeDots, XLg } from "react-bootstrap-icons";

export default function Works() {
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  useEffect(() => {
    setTestimonials(data.testimonials);
    let filteredProjects = data.projects.filter(
      (project) => project.priority === "High"
    );
    if (!showMore) {
      setProjects(filteredProjects);
    } else {
      setProjects(data.projects);
    }
  }, [showMore]);

  useEffect(() => {
    let scrollPosition = 0;
    let currentActiveTab = 0;
    const setScrollInterval = setInterval(() => {
      scrollPosition += carousel.current.offsetWidth;
      if (scrollPosition > width) {
        scrollPosition = 0;
      }

      currentActiveTab = (currentActiveTab + 1) % testimonials.length;
      setActiveTab(testimonials[currentActiveTab].id);

      carousel.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, 4000);

    return () => {
      clearInterval(setScrollInterval);
    };
  }, [width]);

  const closePopup = (event) => {
    event.preventDefault();
    setOpen((prev) => !prev);
    setCurrentProject((prev) => (prev = []));
    document.body.style.overflow = "auto";
  };

  const openPopup = (event, project) => {
    event.preventDefault();
    setOpen((prev) => !prev);
    setCurrentProject((prev) => (prev = project));
    document.body.style.overflow = "hidden";
  };

  const setShowMoreState = () => {
    setShowMore(!showMore);
  };

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
    hover: {
      scale: 0.95,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, scale: 1, duration: 0.8 },
  };
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <React.Fragment>
      {/* Recent Works */}
      <section
        id="works"
        className="px-2.5 md:px-10 lg:px-24 xl:px-60 lg:grid lg:content-center mt-24"
      >
        <div className="flex flex-col">
          <motion.div
            className="font-black text-2xl align-center relative mb-14"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            <img src="src/assets/download.svg" alt="dot" />

            <h2 className="absolute left-5 top-5 z-1">Recent Works</h2>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  className="group bg-slate-50 rounded-2xl relative z-0 before:inset-0 before:bg-slate-900 before:z-20 before:opacity-40 before:rounded-2xl hover:before:absolute "
                  variants={containerVariants}
                  initial="hidden"
                  exit="exit"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="rounded-2xl relative z-10"
                  />
                  <div className="absolute top-0 p-5 z-1 h-full z-0 flex flex-col justify-between rounded-2xl group-hover:z-30">
                    <h2 className="capitalize text-slate-50 relative text-1xl font-black">
                      {project.name}
                    </h2>
                    <button
                      id={project.id}
                      className="p-2 bg-yellow-500 rounded-full relative w-fit z-30"
                      onClick={(event) => openPopup(event, project)}
                    >
                      <ThreeDots className="pointer-events-none" />
                    </button>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
            {/* Popup */}
            <AnimatePresence>
              {open && (
                <motion.div
                  className="fixed inset-0 bg-slate-800 bg-opacity-50 top-0 z-50 grid content-center justify-items-center"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.button
                    className="p-2 text-slate-50 m-2 absolute top-0 right-0"
                    onClick={closePopup}
                    variants={buttonVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileTap={{ scale: 0.85 }}
                    viewport={{ once: true, amount: 0.8 }}
                  >
                    <XLg size={25} />
                  </motion.button>
                  <div className="bg-slate-0 rounded-2xl bg-slate-50 grid gap-3 p-5 mx-3">
                    <img
                      src={currentProject.image}
                      alt={currentProject.name}
                      className="rounded-2xl md:w-96"
                    />
                    <h2 className="capitalize text-slate-800 text-2xl w-fit font-black ">
                      {currentProject.name}
                    </h2>
                    <p className="text-slate-600 text-sm w-fit">
                      {currentProject.description}
                    </p>
                    <motion.button
                      className="bg-rose-600 px-6 py-1 rounded-full w-fit"
                      variants={buttonVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileTap={{ scale: 0.85 }}
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <a href={currentProject.url} target="_blank">
                        Go to Project
                      </a>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Button */}
          <motion.button
            className="bg-rose-600 px-6 py-1 rounded-full capitalize text-slate-50 w-fit mt-5 mx-auto"
            onClick={setShowMoreState}
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.85 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <a href="" className="pointer-events-none capitalize">
              {showMore ? "show less" : "load more"}
            </a>
          </motion.button>
        </div>
      </section>

      {/* Clients & Reviews */}
      <section className="flex flex-col gap-10 justify-center mt-24">
        <div
          id="works"
          className="px-2.5 md:px-10 lg:px-24 xl:px-60 grid lg:content-center gap-5"
        >
          <motion.div
            className="font-black text-2xl align-center relative mb-14"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            <img src="src/assets/download.svg" alt="dot" className="" />

            <h2 className="absolute left-5 top-5 z-1">Clients & Reviews</h2>
          </motion.div>

          {/* Testimonials */}
          <motion.div ref={carousel} className="overflow-x-auto hide-scrollbar">
            <motion.div
              drag="x"
              style={{ touchAction: "none" }}
              dragConstraints={{ right: 0, left: -width }}
              className="flex"
              // dragListener={false}
            >
              {testimonials.map((person) => (
                <div
                  key={person.id}
                  id={person.id}
                  className="min-w-full px-5 md:px-20"
                >
                  <img
                    src="src/assets/avatar-3-1.svg"
                    alt="testimonial"
                    className="mx-auto mb-2 pointer-event-none"
                  />
                  <p className="capitalize text-slate-900 dark:text-slate-50 text-lg font-bold text-center">
                    {person.name}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-center text-sm capitalize mb-3">
                    {person.designation}
                  </p>
                  <span className="relative before:absolute before:w-7 before:h-7 before:bg-slate-50 before:rotate-45 flex justify-center shadow before:dark:bg-slate-800"></span>
                  <div className="text-xs md:text-base bg-slate-50 dark:bg-slate-800 rounded-xl p-3 md:p-5 relative z-10">
                    <p>{person.testimonialText}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <div className="flex gap-2 justify-center">
            {testimonials.map((person) => (
              <span
                id={person.id}
                key={person.id}
                className={
                  "flex w-2 h-2 rounded-full" +
                  " " +
                  (person.id === activeTab ? "bg-rose-600" : "bg-slate-400") +
                  " " +
                  (person.id === activeTab ? "w-4 h-2" : "w-2 h-2")
                }
              ></span>
            ))}
          </div>
        </div>
        {/* Tools */}
        {/* <section className="grid grid-cols-5 px-2.5 md:px-10 lg:px-24 xl:px-60 justify-items-center">
          {links.map((link) => (
            <img
              key={link}
              src={link}
              alt="tool"
              className="w-16 grayscale opacity-10 "
            />
          ))}
        </section> */}
      </section>
    </React.Fragment>
  );
}
