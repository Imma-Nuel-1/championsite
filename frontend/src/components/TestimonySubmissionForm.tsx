import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "../utils/api";
import {
  FaUser,
  FaBriefcase,
  FaQuoteLeft,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface TestimonyFormData {
  name: string;
  title: string;
  message: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface NotificationProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 p-4 rounded-lg shadow-lg backdrop-blur-sm border ${
        type === "success"
          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === "success" ? (
            <FaCheckCircle className="h-5 w-5" />
          ) : (
            <FaExclamationTriangle className="h-5 w-5" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-shadow-sm">{message}</p>
        </div>
        <motion.button
          onClick={onClose}
          className="ml-3 text-sm font-medium hover:opacity-70 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      </div>
    </motion.div>
  );
};

const TestimonySubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<TestimonyFormData>({
    name: "",
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<Partial<TestimonyFormData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof TestimonyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TestimonyFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title/position is required";
    } else if (formData.title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters long";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Testimony message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Testimony must be at least 10 characters long";
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = "Testimony must be less than 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch<SubmissionResponse>("/api/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          title: formData.title.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.success) {
        setNotification({
          type: "success",
          message:
            response.message ||
            "Your testimony has been submitted and is awaiting approval.",
        });

        setFormData({ name: "", title: "", message: "" });
        setErrors({});
      } else {
        throw new Error(response.message || "Failed to submit testimony");
      }
    } catch (error) {
      console.error("Testimony submission error:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit testimony. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}

      <motion.div
        id="testimony-form"
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-accent-500 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="text-4xl mx-auto opacity-70" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-shadow-md">
            Share Your Testimony
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-shadow-sm">
            Your story matters! Share how God has worked in your life to
            encourage and inspire others in our church family.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-shadow-sm"
              >
                <FaUser className="inline mr-2 text-accent-500" />
                Full Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 backdrop-blur-sm text-shadow-sm ${
                  errors.name
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
                placeholder="Enter your full name"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm mt-1 text-shadow-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-shadow-sm"
              >
                <FaBriefcase className="inline mr-2 text-accent-500" />
                Title/Position
              </label>
              <motion.input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 backdrop-blur-sm text-shadow-sm ${
                  errors.title
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
                placeholder="e.g., Member, Youth Leader, Volunteer"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.title && (
                <motion.p
                  className="text-red-500 text-sm mt-1 text-shadow-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.title}
                </motion.p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-shadow-sm"
            >
              <FaQuoteLeft className="inline mr-2 text-accent-500" />
              Your Testimony
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={8}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 resize-none backdrop-blur-sm text-shadow-sm ${
                errors.message
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              }`}
              placeholder="Share your testimony here. How has God worked in your life? What would you like others to know about your faith journey?"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.message ? (
                <motion.p
                  className="text-red-500 text-sm text-shadow-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.message}
                </motion.p>
              ) : (
                <span></span>
              )}
              <span
                className={`text-sm ${
                  formData.message.length > 2000
                    ? "text-red-500"
                    : formData.message.length > 1800
                    ? "text-yellow-500"
                    : "text-gray-500 dark:text-gray-400"
                } text-shadow-sm`}
              >
                {formData.message.length}/2000
              </span>
            </div>
          </motion.div>

          <motion.div
            className="text-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 font-semibold backdrop-blur-sm ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="inline mr-2" />
                  Submit Testimony
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-8 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent-700 dark:text-accent-300 text-center text-shadow-sm">
            <FaCheckCircle className="inline mr-2" />
            Your testimony will be reviewed by our team before being published.
            We appreciate your patience as we ensure all content aligns with our
            community values.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TestimonySubmissionForm;
