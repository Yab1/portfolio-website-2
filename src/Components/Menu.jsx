// Importing icons from the 'react-bootstrap-icons' library.
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Menu({ tabs, activeTab, setActiveTabState }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  const handleTabClick = (index) => {
    setActiveTabState(index);
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
      },
    },
    tab: {
      scale: 1.1,
      transition: {
        type: "spring",
        duration: 2,
      },
    },
  };
  return (
    <div
      className={
        "py-5 box-border w-full relative z-50 flex justify-between menu-container transition-all linear duration-500 lg:hidden " +
        (open ? "bg-slate-950 h-screen " : "bg-transparent")
      }
    >
      <label htmlFor="check" onChange={() => setOpen(!open)}>
        <input ref={ref} type="checkbox" id="check" />
        <span className="top-bread"></span>
        <span className="burger"></span>
        <span className="bottom-bread"></span>
      </label>
      <AnimatePresence>
        {open ? (
          <motion.nav
            className="flex-1 flex items-center text-violet-800 p-10 relative z-50"
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="flex flex-col gap-3">
              {tabs.map((tab, index) => (
                <div key={tab} className="flex items-center gap-2">
                  {index === activeTab ? (
                    <span className="active h-4 border bg-white"></span>
                  ) : null}
                  <li
                    className={
                      "capitalize font-medium text-lg " +
                      " " +
                      (index === activeTab ? "text-slate-50" : "null")
                    }
                  >
                    <a href={`#${tab}`} onClick={() => handleTabClick(index)}>
                      {tab}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      <motion.h1
        className={
          "font-black text-2xl align-center mr-3 transition-colors duration-500 ease-in " +
          (open ? "text-slate-50 " : "text-black ") +
          (tabs[activeTab] === "home" ? "hidden" : "")
        }
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Yeabsera<span className="font-black text-2xl text-rose-600">.</span>
      </motion.h1>
    </div>
  );
}
