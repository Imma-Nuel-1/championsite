import { useState } from "react";
import {
  FaEnvelope,
  FaNewspaper,
  FaCalendarAlt,
  FaPray,
  FaUsers,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    // Simulate API call
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: "" });
      setEmail("");
    }, 2000);
  };

  const newsletterFeatures = [
    {
      icon: <FaNewspaper className="text-2xl text-gold" />,
      title: "Weekly Updates",
      description: "Latest church news and announcements",
    },
    {
      icon: <FaCalendarAlt className="text-2xl text-gold" />,
      title: "Upcoming Events",
      description: "Be the first to know about special services and activities",
    },
    {
      icon: <FaPray className="text-2xl text-gold" />,
      title: "Devotionals",
      description: "Weekly inspirational messages and Bible studies",
    },
    {
      icon: <FaUsers className="text-2xl text-gold" />,
      title: "Community Stories",
      description: "Testimonies and updates from our church family",
    },
  ];

  const benefits = [
    "📧 Weekly digital newsletter delivered to your inbox",
    "⭐ Exclusive access to member-only content",
    "🎯 Personalized prayer requests and updates",
    "📅 Early registration for special events",
    "💌 Birthday and anniversary greetings",
    "📖 Access to sermon notes and study guides",
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-gold to-yellow-500 text-navy px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg">
                Stay Connected
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-navy via-blue-800 to-navy bg-clip-text text-transparent mb-6 text-shadow-lg drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileInView={{ scale: [0.9, 1] }}
            >
              Join Our Newsletter
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 text-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Stay connected with our church family! Get weekly updates,
              inspiring devotionals, event announcements, and exclusive content
              delivered straight to your inbox.
            </motion.p>
          </motion.div>

          {/* Newsletter Features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {newsletterFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Subscription Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-navy text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">
                  Subscribe Today
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of members in our digital community
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-navy to-blue-800 hover:from-blue-800 hover:to-navy text-white font-semibold py-4 rounded-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {status.loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaBell className="mr-2" />
                      Subscribe to Newsletter
                    </>
                  )}
                </button>

                {status.success && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <p className="text-green-700 dark:text-green-400 font-medium">
                      🎉 Welcome to our newsletter! Check your email for
                      confirmation.
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We respect your privacy. Unsubscribe at any time. No spam,
                    ever.
                  </p>
                </div>
              </form>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">
                  Why Subscribe?
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-navy/5 dark:bg-navy/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <FaUsers className="text-gold text-xl mr-3" />
                  <h4 className="text-lg font-semibold text-navy dark:text-white">
                    Join 2,500+ Subscribers
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You'll be part of a growing community of believers who stay
                  connected and informed about what God is doing in our church
                  family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
