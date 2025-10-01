import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "../utils/api";
import {
  FaQuoteLeft,
  FaUser,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaSearch,
  FaExclamationTriangle,
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

interface AdminTestimonialsResponse {
  success: boolean;
  data: ITestimonial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  counts: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
}

interface StatusFilter {
  value: string;
  label: string;
  count?: number;
  color: string;
}

interface TestimonialCardProps {
  testimonial: ITestimonial;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: "approve" | "reject" | "delete";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type,
}) => {
  if (!isOpen) return null;

  const typeColors = {
    approve: "text-green-600 bg-green-50 border-green-200",
    reject: "text-yellow-600 bg-yellow-50 border-yellow-200",
    delete: "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`p-3 rounded-lg mb-4 ${typeColors[type]}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex space-x-3">
          <motion.button
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cancelText}
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              type === "approve"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : type === "reject"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {confirmText}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  onApprove,
  onReject,
  onDelete,
  isLoading,
}) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white">
            <FaUser className="text-sm" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-shadow-sm">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-shadow-sm">
              {testimonial.title}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            statusColors[testimonial.status]
          }`}
        >
          {testimonial.status.toUpperCase()}
        </span>
      </div>

      {/* Quote */}
      <div className="text-accent-500 mb-3">
        <FaQuoteLeft className="text-lg opacity-60" />
      </div>

      {/* Message */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm">
        "{truncateText(testimonial.message, 150)}"
      </p>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <FaCalendarAlt className="mr-2" />
        <span>
          Submitted:{" "}
          {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        {testimonial.status === "pending" && (
          <>
            <motion.button
              onClick={() => onApprove(testimonial._id)}
              disabled={isLoading}
              className="flex-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              <FaCheck className="inline mr-1" /> Approve
            </motion.button>
            <motion.button
              onClick={() => onReject(testimonial._id)}
              disabled={isLoading}
              className="flex-1 py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              <FaTimes className="inline mr-1" /> Reject
            </motion.button>
          </>
        )}
        {testimonial.status === "rejected" && (
          <motion.button
            onClick={() => onApprove(testimonial._id)}
            disabled={isLoading}
            className="flex-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            <FaCheck className="inline mr-1" /> Approve
          </motion.button>
        )}
        {testimonial.status === "approved" && (
          <motion.button
            onClick={() => onReject(testimonial._id)}
            disabled={isLoading}
            className="flex-1 py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            <FaTimes className="inline mr-1" /> Reject
          </motion.button>
        )}
        <motion.button
          onClick={() => onDelete(testimonial._id)}
          disabled={isLoading}
          className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          <FaTrash className="inline" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "approve" | "reject" | "delete";
    testimonialId: string;
    testimonialName: string;
  }>({
    isOpen: false,
    type: "approve",
    testimonialId: "",
    testimonialName: "",
  });

  const statusFilters: StatusFilter[] = [
    { value: "all", label: "All", color: "text-gray-600" },
    { value: "pending", label: "Pending", color: "text-yellow-600" },
    { value: "approved", label: "Approved", color: "text-green-600" },
    { value: "rejected", label: "Rejected", color: "text-red-600" },
  ];

  const fetchTestimonials = async (
    page: number = 1,
    status: string = "all"
  ) => {
    try {
      setLoading(true);
      setError(null);

      let url = `/api/testimonials/admin?page=${page}&limit=12`;
      if (status !== "all") {
        url += `&status=${status}`;
      }

      const response = await apiFetch<AdminTestimonialsResponse>(url);

      if (response.success) {
        setTestimonials(response.data);
        setPagination(response.pagination);
        setCounts(response.counts);
        setCurrentPage(page);
      } else {
        throw new Error("Failed to fetch testimonials");
      }
    } catch (err) {
      setError("Failed to load testimonials. Please try again later.");
      console.error("Admin testimonials fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(1, statusFilter);
  }, [statusFilter]);

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages && page !== currentPage) {
      fetchTestimonials(page, statusFilter);
    }
  };

  const handleAction = async (
    action: "approve" | "reject" | "delete",
    id: string
  ) => {
    setActionLoading(true);
    try {
      let url = "";
      let method = "";

      switch (action) {
        case "approve":
          url = `/api/testimonials/admin/${id}/approve`;
          method = "PUT";
          break;
        case "reject":
          url = `/api/testimonials/admin/${id}/reject`;
          method = "PUT";
          break;
        case "delete":
          url = `/api/testimonials/admin/${id}`;
          method = "DELETE";
          break;
      }

      const response = await apiFetch(url, { method });

      if (response.success) {
        // Refresh the testimonials list
        await fetchTestimonials(currentPage, statusFilter);

        // Show success message (you could add a toast notification here)
        console.log(`Testimony ${action}d successfully`);
      } else {
        throw new Error(`Failed to ${action} testimony`);
      }
    } catch (err) {
      setError(`Failed to ${action} testimony. Please try again.`);
      console.error(`Admin testimony ${action} error:`, err);
    } finally {
      setActionLoading(false);
      setConfirmModal({
        isOpen: false,
        type: "approve",
        testimonialId: "",
        testimonialName: "",
      });
    }
  };

  const openConfirmModal = (
    type: "approve" | "reject" | "delete",
    testimonialId: string,
    testimonialName: string
  ) => {
    setConfirmModal({
      isOpen: true,
      type,
      testimonialId,
      testimonialName,
    });
  };

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConfirmModalContent = () => {
    const { type, testimonialName } = confirmModal;
    switch (type) {
      case "approve":
        return {
          title: "Approve Testimony",
          message: `Are you sure you want to approve the testimony from ${testimonialName}? This will make it visible on the public testimonials page.`,
          confirmText: "Approve",
          cancelText: "Cancel",
        };
      case "reject":
        return {
          title: "Reject Testimony",
          message: `Are you sure you want to reject the testimony from ${testimonialName}? This will prevent it from being displayed publicly.`,
          confirmText: "Reject",
          cancelText: "Cancel",
        };
      case "delete":
        return {
          title: "Delete Testimony",
          message: `Are you sure you want to permanently delete the testimony from ${testimonialName}? This action cannot be undone.`,
          confirmText: "Delete",
          cancelText: "Cancel",
        };
      default:
        return {
          title: "",
          message: "",
          confirmText: "",
          cancelText: "",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading testimonials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-shadow-sm">
            Testimonials Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-shadow-sm">
            Review, approve, reject, or delete testimonials submitted by church
            members.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {statusFilters.map((filter, index) => (
            <motion.div
              key={filter.value}
              className={`bg-white dark:bg-gray-800 rounded-lg p-6 border-2 transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                statusFilter === filter.value
                  ? "border-accent-500 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:border-accent-300"
              }`}
              onClick={() => handleStatusChange(filter.value)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${filter.color}`}>
                    {filter.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filter.value === "all"
                      ? counts.total
                      : counts[filter.value as keyof typeof counts]}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    filter.value === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : filter.value === "approved"
                      ? "bg-green-100 text-green-600"
                      : filter.value === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaEye className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search testimonials by name, title, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <FaQuoteLeft className="text-6xl mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Testimonials Found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {testimonials.length === 0
                ? "No testimonials have been submitted yet."
                : "No testimonials match your current search or filter criteria."}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${statusFilter}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {filteredTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  onApprove={(id) =>
                    openConfirmModal("approve", id, testimonial.name)
                  }
                  onReject={(id) =>
                    openConfirmModal("reject", id, testimonial.name)
                  }
                  onDelete={(id) =>
                    openConfirmModal("delete", id, testimonial.name)
                  }
                  isLoading={actionLoading}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-accent-600 hover:bg-accent-100 dark:hover:bg-accent-900/20"
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              <FaChevronLeft />
            </motion.button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
              (page) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
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
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === pagination.pages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-accent-600 hover:bg-accent-100 dark:hover:bg-accent-900/20"
              }`}
              whileHover={
                currentPage !== pagination.pages ? { scale: 1.1 } : {}
              }
              whileTap={currentPage !== pagination.pages ? { scale: 0.95 } : {}}
            >
              <FaChevronRight />
            </motion.button>
          </motion.div>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {confirmModal.isOpen && (
            <ConfirmModal
              isOpen={confirmModal.isOpen}
              {...getConfirmModalContent()}
              onConfirm={() =>
                handleAction(confirmModal.type, confirmModal.testimonialId)
              }
              onCancel={() =>
                setConfirmModal({ ...confirmModal, isOpen: false })
              }
              type={confirmModal.type}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminTestimonials;
