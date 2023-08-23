import { useEffect, useState } from "react";
import * as Yup from "yup";
// Importing the motion module from "framer-motion" for animations.
import { motion, AnimatePresence, useScroll } from "framer-motion";
import.meta.env.VITE_EMAILJS_SERVICE_ID;

// import { useFormik } from "formik";
import { ErrorMessage, Field, Form, Formik } from "formik";
import submitForm from "../Functions/submitForm.js";
import { CheckLg, XLg } from "react-bootstrap-icons";

export default function FormComponent() {
  const [feedback, setFeedback] = useState("");
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email field is required"),
    subject: Yup.string().required("Subject field is required"),
    message: Yup.string().required("Message field is required"),
  });

  const setFeedbackState = (msg) => {
    setFeedback(msg);
  };

  const onSubmit = (values, helper) => {
    submitForm(values, helper, setFeedbackState);
  };

  useEffect(() => {
    setTimeout(() => {
      setFeedbackState("");
    }, 3000);
  }, [feedback]);

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };
  const alertVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, type: "spring" } },
    exit: { y: -100, opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid md:grid-cols-2 gap-5 md:col-span-2">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Your name"
                className="px-5 py-3 rounded-full outline-none text-slate-900 shadow w-full"
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email address"
                className={
                  "px-5 py-3 rounded-full outline-none text-slate-900 shadow w-full" +
                  " " +
                  (errors.email && touched.email
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                    : null)
                }
              />

              <ErrorMessage
                name="email"
                component="p"
                className="ml-5 text-sm text-red-600 dark:text-red-500 absolute"
              />
            </div>
            <div className="md:col-span-2">
              <Field
                type="text"
                name="subject"
                placeholder="Subject"
                className={
                  "px-5 py-3 rounded-full outline-none text-slate-900 shadow w-full" +
                  " " +
                  (errors.subject && touched.subject
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                    : null)
                }
              />

              <ErrorMessage
                name="subject"
                component="p"
                className="ml-5 text-sm text-red-600 dark:text-red-500 absolute"
              />
            </div>
            <div className="md:col-span-2">
              <Field
                as="textarea"
                cols="0"
                rows="4"
                name="message"
                placeholder="Message"
                className={
                  "px-5 py-3 rounded-xl outline-none text-slate-900 shadow w-full" +
                  " " +
                  (errors.message && touched.message
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                    : null)
                }
              />
              <ErrorMessage
                name="message"
                component="p"
                className="ml-5 text-sm text-red-600 dark:text-red-500 absolute"
              />
            </div>
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              whileTap={{ scale: 0.85 }}
              viewport={{ once: true, amount: 0.8 }}
              className={
                "text-slate-50 " +
                (isSubmitting
                  ? "border border-gray-200 text-slate-600 capitalize px-6 py-2 rounded-full text-sm h-fit w-fit flex gap-2 cursor-wait mb-20 bg-slate-50"
                  : " px-6 py-2 rounded-full capitalize text-slate-50 w-fit text-sm mb-20 bg-violet-950")
              }
            >
              <AnimatePresence>
                {isSubmitting ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="text-grey-200 animate-spin dark:text-gray-600 inline w-5 aspect-square"
                      viewBox="0 0 100 101"
                      fill="none"
                      variants={buttonVariants}
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>send message</span>
                )}
              </AnimatePresence>
            </motion.button>
          </Form>
        )}
      </Formik>
      {/* Alert Popup */}
      <div className="fixed left-0 w-full flex justify-center bg-transparent z-50 top-2">
        <AnimatePresence>
          {feedback === "Successful" && (
            <motion.div
              class="p-4 mb-4 text-sm text-green-50 rounded-lg bg-green-700 flex justify-center align-center gap-1 capitalize shadow"
              role="alert"
              onClick={() => setFeedbackState("")}
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <CheckLg size={20} />
              Email sent successfully
            </motion.div>
          )}
          {feedback === "Failed" && (
            <motion.div
              class="p-4 mb-4 text-sm text-slate-50 rounded-lg bg-red-700 flex justify-center align-center gap-1 capitalize shadow"
              role="alert"
              onClick={() => setFeedbackState("")}
              variants={alertVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <XLg size={18} />
              Failed to send email
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
