import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const rightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

export default function ProjectInfoCard({ project }) {
  return (
    <motion.div
      className={
        "grid pl-2 md:pr-32 md:pl-10 " +
        ((project.id + 1) % 2 === 0 ? "bg-gray-50" : "bg-gray-100")
      }
      variants={(project.id + 1) % 2 === 0 ? leftVariants : rightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="flex gap-1 items-center w-ful">
        <span className="w-5 h-1 bg-violet-600"></span>
        <title className="flex flex-col select-none relative w-full">
          <span
            before={project.name}
            className={
              "before:md:text-lg  before:sm:text-base before:text-sm before:md:font-black before:font-medium before:text-slate-950 before:uppercase before:absolute before:content-[attr(before)] text-2xl sm:text-4xl md:text-6xl font-black before:md:top-4 before:top-2 " +
              ((project.id + 1) % 2 === 0 ? "text-gray-200" : "text-gray-50")
            }
          >
            PROJECT
          </span>
        </title>
      </div>
      <p className="uppercase font-thin text-xs ml-6 md:font-light md:ml-7">
        {project.languages.map(
          (lang, index) => `${index === 0 ? "" : " / "}${lang}`
        )}
      </p>
      <motion.button
        className={
          "mr-7 py-1 px-2 md:pl-6 md:pr-5 md:py-2 text-sm md:text-base rounded-lg capitalize text-slate-50 w-fit h-fit ml-auto flex items-center gap-2 " +
          ((project.id + 1) % 2 === 0
            ? "bg-violet-950"
            : "bg-slate-50 text-violet-950")
        }
        whileTap={{ scale: 0.85 }}
      >
        {(project.id + 1) % 2 === 0 ? null : <ArrowLeft />}
        <a href={project.url} target="_blank">
          View Work
        </a>
        {(project.id + 1) % 2 === 0 ? <ArrowRight /> : null}
      </motion.button>
    </motion.div>
  );
}
