import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "../utils/api";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaUser,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface ITestimonial {
  _id: string;
  name: string;
  title: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsResponse {
  success: boolean;
  data: ITestimonial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
    >
      <motion.div
        className="text-accent-500 mb-4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
      >
        <FaQuoteLeft className="text-2xl opacity-60" />
      </motion.div>

      <motion.p
        className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-shadow-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      >
        "{testimonial.message}"
      </motion.p>

      <motion.div
        className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <FaUser className="text-sm drop-shadow-sm" />
          </motion.div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-shadow-sm">
              {testimonial.name}
            </h4>
            <p className="text-sm text-accent-600 dark:text-accent-400 font-medium text-shadow-sm">
              {testimonial.title}
            </p>
          </div>
        </div>

        <motion.div
          className="flex items-center text-sm text-gray-500 dark:text-gray-400"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <FaCalendarAlt className="mr-2 drop-shadow-sm" />
          <span className="text-shadow-sm">
            {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-accent-500 mt-4 flex justify-end"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
        viewport={{ once: true }}
      >
        <FaQuoteRight className="text-xl opacity-60" />
      </motion.div>
    </motion.div>
  );
};

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0,
  });

  const fetchTestimonials = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch<TestimonialsResponse>(
        `/api/testimonials?page=${page}&limit=9`
      );

      if (response.success) {
        setTestimonials(response.data);
        setPagination(response.pagination);
        setCurrentPage(page);
      } else {
        throw new Error("Failed to fetch testimonials");
      }
    } catch (err) {
      setError("Failed to load testimonials. Please try again later.");
      console.error("Testimonials fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages && page !== currentPage) {
      fetchTestimonials(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 text-shadow-sm">
              Loading testimonials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg text-red-600 dark:text-red-400 mb-4 text-shadow-sm">
              {error}
            </p>
            <motion.button
              onClick={() => fetchTestimonials(currentPage)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gradient-primary mb-6 text-shadow-lg drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Testimonials
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Read inspiring stories and testimonies from our church family. These
            powerful accounts showcase God's faithfulness and transformative
            power in our lives.
          </motion.p>
        </motion.div>

        {testimonials.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <FaQuoteLeft className="text-6xl mx-auto opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2 text-shadow-sm">
              No Testimonials Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 text-shadow-sm">
              Be the first to share your testimony with our community!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {pagination.pages > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-2 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-accent-600 hover:bg-accent-100 dark:hover:bg-accent-900/20"
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              <FaChevronLeft className="drop-shadow-sm" />
            </motion.button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
              (page) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-shadow-sm backdrop-blur-sm ${
                    currentPage === page
                      ? "bg-accent-500 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-accent-100 dark:hover:bg-accent-900/20 hover:text-accent-600"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page}
                </motion.button>
              )
            )}

            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                currentPage === pagination.pages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-accent-600 hover:bg-accent-100 dark:hover:bg-accent-900/20"
              }`}
              whileHover={
                currentPage !== pagination.pages ? { scale: 1.1 } : {}
              }
              whileTap={currentPage !== pagination.pages ? { scale: 0.95 } : {}}
            >
              <FaChevronRight className="drop-shadow-sm" />
            </motion.button>
          </motion.div>
        )}

        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-8 border border-accent-200 dark:border-accent-800 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-shadow-md"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a Testimony to Share?
          </motion.h3>
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto text-shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            We'd love to hear how God has worked in your life. Share your story
            to encourage and inspire others in our church family.
          </motion.p>
          <motion.button
            onClick={() => {
              const submissionForm = document.getElementById("testimony-form");
              if (submissionForm) {
                submissionForm.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 font-semibold backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Share Your Testimony
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
