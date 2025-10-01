import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [honey, setHoney] = useState(""); // honeypot field

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // bot protection
    setStatus("loading");
    try {
      await apiFetch("/api/prayer-request", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-section text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent text-shadow-md">
              Touch
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="card-glass p-10 rounded-3xl shadow-glow border border-white/30 backdrop-blur-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.h2
                className="text-3xl font-bold text-gradient-primary mb-8 text-shadow-md drop-shadow-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Send us a Message
              </motion.h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="events">Events</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* Honeypot */}
                <input
                  type="text"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Failed to send message. Please try again later.
                  </div>
                )}
              </form>
            </motion.div>
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Contact Cards */}
              <div className="grid gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-purple-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Location
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Redemption Avenue
                    <br />
                    Redeemed Christian Church of God
                    <br />
                    Lagos, Nigeria
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <FaPhone className="text-purple-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Phone
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    +234 800 000 0000
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <FaEnvelope className="text-purple-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    info@rccg.org
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <FaClock className="text-purple-600 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Service Times
                    </h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <p>Sunday Service: 9:00 AM</p>
                    <p>Wednesday Bible Study: 6:00 PM</p>
                    <p>Friday Prayer Meeting: 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 text-2xl transition"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="text-pink-600 hover:text-pink-800 text-2xl transition"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="text-red-600 hover:text-red-800 text-2xl transition"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
