import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface ITestimonial {
  _id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

interface TestimonialsProps {
  limit?: number;
  showTitle?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  limit,
  showTitle = true,
}) => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // Add limit parameter
        const queryParams = new URLSearchParams();
        if (limit) {
          queryParams.append("limit", limit.toString());
        }

        const data = await apiFetch<{ data: ITestimonial[] }>(
          `/api/testimonials?${queryParams.toString()}`
        );
        // The backend already filters for approved testimonials
        setTestimonials(data.data);
        setError(null);
      } catch (err) {
        setError("Failed to load testimonials. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [limit]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">Loading Testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't render the section if there are no approved testimonials
  }

  return (
    <motion.section
      className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showTitle && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-shadow-md drop-shadow-lg"
              whileInView={{ scale: [0.9, 1] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              What Our Family Says
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 text-shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Lives are being changed. See what God is doing in our community.
            </motion.p>
          </motion.div>
        )}
        <motion.div
          className={`${
            showTitle ? "mt-12" : "mt-0"
          } grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/30"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-shadow-sm">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
                <blockquote className="mt-6 text-gray-600 border-l-4 border-orange-200 pl-4 italic text-shadow-sm">
                  <p>"{testimonial.message}"</p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {limit && testimonials.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/testimonials"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              View All Testimonials
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Testimonials;
