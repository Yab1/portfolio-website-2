// Importing the motion module from "framer-motion" for animations.
import { motion } from "framer-motion";
import FormComponent from "./Form";

// Import Assets
import dots from "../assets/download.svg";

export default function Contact() {
  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  const leftVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "", duration: 1 } },
  };
  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "", duration: 1 } },
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-2.5 md:px-10 lg:px-24 xl:px-60 lg:grid lg:content-center mt-24 grid content-center"
    >
      <motion.div
        className="font-black text-2xl align-center relative mb-14"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <img src={dots} alt="dot" />

        <h2 className="absolute left-5 top-5 z-1">Contact</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        <motion.div
          className="text-slate-500 relative content-center py-10 md:py-0"
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <span className="text-2xl font-bold block">
            Let's talk about everything!{" "}
          </span>
          Don&#8217;t like forms? Send me an{" "}
          <a
            href="mailto:yabilisanu@gmail.com"
            className="text-violet-950 relative z-10 hover:text-violet-500 transition-color ease-in duration-75"
          >
            email
          </a>{" "}
          👋
          <img
            src="src/assets/world-map.png"
            alt=""
            className="absolute top-3 md:top-12 opacity-20"
          />
        </motion.div>
        <FormComponent />
      </div>
    </section>
  );
}
