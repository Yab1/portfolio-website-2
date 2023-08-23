// importing Firebase services
import emailjs from "@emailjs/browser";

export default async function submitForm(values, helper, setFeedbackState) {
  try {
    helper.setSubmitting(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        helper.resetForm();
        setFeedbackState("Successful");
      })
      .catch((error) => {
        helper.setSubmitting(false);
        setFeedbackState("Failed");
      });
  } catch (error) {
    setFeedbackState("Failed to send email:");
  } finally {
    helper.setSubmitting(true);
  }
}
