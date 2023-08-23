// State and context hooks from React.
import React, { useState, useEffect, useRef } from "react";

// Import the JSON data.
import data from "../data/data.json";

// Import Assets
import dots from "../assets/download.svg";

// Importing the motion module from "framer-motion" for animations.
import { motion } from "framer-motion";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  useEffect(() => {
    setTestimonials(data.testimonials);
  }, []);

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

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  return (
    <React.Fragment>
      <section
        id="testimonials"
        className="px-2.5 md:px-10 lg:px-24 xl:px-60 lg:content-center gap-5 min-h-screen grid content-center"
      >
        <motion.div
          className="font-black text-2xl align-center relative mb-14"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <img src={dots} alt="dot" />

          <h2 className="absolute left-5 top-5 z-1">Clients & Reviews</h2>
        </motion.div>

        {/* Testimonials */}
        <motion.div ref={carousel} className="overflow-x-auto hide-scrollbar">
          <motion.div
            drag="x"
            style={{ touchAction: "none" }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex"
          >
            {testimonials.map((person) => (
              <div
                key={person.id}
                id={person.id}
                className="min-w-full px-5 md:px-20"
              >
                <img
                  src={person.image}
                  alt="testimonial"
                  className="mx-auto mb-2 pointer-event-none rounded-full aspect-square w-36 border-4"
                />
                <p className="capitalize text-slate-900 text-lg font-bold text-center">
                  {person.name}
                </p>
                <p className="text-slate-600 text-center text-sm capitalize mb-3">
                  {person.designation}
                </p>
                <span className="relative before:absolute before:w-7 before:h-7 before:bg-slate-50 before:rotate-45 flex justify-center shadow-2xl before:shadow-2xl"></span>
                <div className="text-xs md:text-base bg-slate-50 rounded-xl p-3 md:p-5 relative z-10">
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
                (person.id === activeTab ? "bg-violet-800" : "bg-slate-400") +
                " " +
                (person.id === activeTab ? "w-4 h-2" : "w-2 h-2")
              }
            ></span>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
