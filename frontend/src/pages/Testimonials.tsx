import React from "react";
import { motion } from "framer-motion";
import TestimonialsPage from "./TestimonialsPage";
import TestimonySubmissionForm from "../components/TestimonySubmissionForm";

/**
 * Main Testimonials page component that combines viewing testimonials and submission form
 */
const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Testimonials Display Section */}
      <TestimonialsPage />

      {/* Testimony Submission Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TestimonySubmissionForm />
      </motion.section>
    </div>
  );
};

export default Testimonials;
