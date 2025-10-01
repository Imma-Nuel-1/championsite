import { useState } from "react";
import { FaPrayingHands, FaHeart, FaUsers, FaClock } from "react-icons/fa";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";

const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const response = (await apiFetch("/api/prayer-request", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })) as { message: string };
      setStatus({ loading: false, error: "", success: response.message });
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (err: any) {
      setStatus({
        loading: false,
        error: err.message || "Failed to send request.",
        success: "",
      });
    }
  };

  const prayerPromises = [
    {
      icon: <FaPrayingHands className="text-2xl text-gold" />,
      title: "We Pray Together",
      description: "Our pastoral team prays over every request submitted",
    },
    {
      icon: <FaHeart className="text-2xl text-gold" />,
      title: "Confidential Care",
      description:
        "Your prayer requests are handled with complete confidentiality",
    },
    {
      icon: <FaUsers className="text-2xl text-gold" />,
      title: "Community Support",
      description:
        "Join our prayer chain for ongoing support and encouragement",
    },
    {
      icon: <FaClock className="text-2xl text-gold" />,
      title: "24/7 Availability",
      description: "Submit your requests anytime - we're always here for you",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-gold to-yellow-500 text-navy px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                Prayer Requests
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-navy via-blue-800 to-navy bg-clip-text text-transparent mb-6">
              We Stand With You
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Prayer is powerful, and we believe God hears and answers every
              prayer. Share your heart with us, and let our community surround
              you with faith and support.
            </p>
            <div className="bg-navy/5 dark:bg-navy/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-navy dark:text-gold font-medium italic">
                "The prayer of a righteous person is powerful and effective."
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                - James 5:16
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {prayerPromises.map((promise, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    {promise.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {promise.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPrayingHands className="text-navy text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">
                Submit Your Prayer Request
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Share what's on your heart, and we'll lift it up in prayer
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prayer Request
                </label>
                <textarea
                  name="message"
                  placeholder="Please share your prayer request... We'll keep it confidential and lift it up in prayer."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-gradient-to-r from-navy to-blue-800 hover:from-blue-800 hover:to-navy text-white font-semibold py-4 rounded-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {status.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Prayer Request...
                  </>
                ) : (
                  <>
                    <FaPrayingHands className="mr-2" />
                    Send Prayer Request
                  </>
                )}
              </button>

              {status.success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                  <p className="text-green-700 dark:text-green-400 font-medium">
                    âœ“ {status.success}
                  </p>
                </div>
              )}

              {status.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                  <p className="text-red-700 dark:text-red-400 font-medium">
                    âœ— {status.error}
                  </p>
                </div>
              )}
            </form>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                <strong>Privacy Notice:</strong> Your prayer requests are kept
                confidential and are only shared with our pastoral prayer team.
                We respect your privacy and will never share your information
                with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrayerRequest;
