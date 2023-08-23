// State and context hooks from React.
import React, { useState, useEffect, useRef } from "react";

// Import data.
import data from "../data/data.json";
import profile from "../assets/yeabsera.jpg";

// Importing the motion module from "framer-motion" for animations.
import { motion, AnimatePresence } from "framer-motion";

// Importing icons from the 'react-bootstrap-icons' library.
import { Telegram, Github, Pinterest, Linkedin } from "react-bootstrap-icons";

export default function Hero() {
  const [titles, setTitles] = useState([]);
  const [socials, setSocials] = useState([]);
  const [activeText, setActiveText] = useState("Front-End Developer");

  useEffect(() => {
    setTitles(data.titles);
    setSocials(data.socials);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    setActiveText(titles[currentIndex]);
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      setActiveText(titles[currentIndex]);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [titles.length]);

  const parentVariant = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const childVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
  };
  const scrollVariant = {
    hidden: { y: 300 },
    visible: { y: 0, transition: { type: "spring", duration: 2 } },
  };

  return (
    <AnimatePresence>
      <section
        id="home"
        className="h-screen grid grid-cols-1 justify-items-center content-evenly bg-slate-950 text-slate-50 shadow"
      >
        <motion.div
          className="grid grid-cols-1 justify-items-center gap-3"
          variants={parentVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={profile}
            alt="Profile Picture"
            className="rounded-full aspect-square w-44 md:w-48 lg:w-52"
            variants={childVariant}
          />
          <motion.div variants={childVariant}>
            <h2 className="font-black text-2xl capitalize">
              Yeabsera Lisanework
            </h2>
            {titles.map((title) => (
              <p
                key={title}
                className={
                  "text-loop text-center font-thin mt-1" +
                  " " +
                  (title === activeText ? "block" : "hidden")
                }
              >
                {title}
              </p>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-between w-4/6 mt-4"
            variants={childVariant}
          >
            {socials.map((social) => {
              const Icons = eval(social.platform);
              return (
                <a
                  key={social.id}
                  title={social.platform}
                  href={social.url}
                  target="_blank"
                  className="hover:text-violet-500 cursor:pointer"
                >
                  {social.id === 1 && <Telegram size={20} />}
                  {social.id === 2 && <Linkedin size={20} />}
                  {social.id === 3 && <Github size={20} />}
                  {social.id === 4 && <Pinterest size={20} />}
                </a>
              );
            })}
          </motion.div>
          <motion.button
            className="bg-violet-950 px-6 py-1 rounded-full mt-5"
            variants={childVariant}
            whileTap={{ scale: 0.85 }}
          >
            <a href="#contact">Hire me</a>
          </motion.button>
        </motion.div>
        <motion.a
          href="#about"
          variants={scrollVariant}
          initial="hidden"
          animate="visible"
        >
          <span className="capitalize text-xs font-light">scroll down</span>
          <div className="border rounded-lg w-fit px-2 mx-auto mt-3">
            <div className="animate-bounce font-bold text-xl">.</div>
          </div>
        </motion.a>
      </section>
    </AnimatePresence>
  );
}
