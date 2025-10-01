import { Link } from "react-router-dom";
import { FaPlay, FaArrowRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
    {/* Animated Background Elements */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>

    {/* Enhanced glass morphism overlay with better contrast */}
    <div className="absolute inset-0 glass opacity-30 backdrop-blur-sm"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

    <div className="container-section relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Content */}
        <motion.div
          className="text-white space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaStar className="text-orange-400 text-sm drop-shadow-sm" />
            <span className="text-sm font-semibold tracking-wider uppercase text-shadow-md">
              Welcome to our church family
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="hero-heading text-shadow-lg drop-shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Growing{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Together
            </span>
            <br />
            in{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Faith
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl text-shadow-md drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join our vibrant community where faith meets fellowship. Discover
            your purpose, grow in love, and make a lasting impact in God's
            kingdom.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/livestream"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur-sm group text-lg font-semibold"
            >
              <FaPlay className="mr-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
              <span className="text-shadow-sm">Watch Live Service</span>
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
            </Link>

            <Link
              to="/about"
              className="btn-secondary btn-lg group backdrop-blur-md bg-white/15 border-white/40 text-white hover:bg-white/25 transition-all duration-500 hover:scale-105"
            >
              <span className="text-shadow-sm">Learn About Us</span>
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 pt-8 border-t border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { value: "2.5K+", label: "Members" },
              { value: "15+", label: "Years Serving" },
              { value: "50+", label: "Ministries" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-orange-400 mb-1 text-shadow-md drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 text-shadow-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            {/* Main Image */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://mdn.retna.io/photo-01hrjerq0f0cwfvwxvp08hjwzq.jpeg?f=webp&q=65&w=1000"
                alt="Church building - A place of worship and community"
                className="w-full h-[600px] object-cover"
              />

              {/* Enhanced Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -bottom-6 -left-6 card-glass p-6 backdrop-blur-xl bg-white/10 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay className="text-white text-lg drop-shadow-sm" />
                </motion.div>
                <div>
                  <div className="text-white font-semibold text-shadow-sm">
                    Live Now
                  </div>
                  <div className="text-gray-300 text-sm text-shadow-sm">
                    Sunday Service
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 card-glass p-4 backdrop-blur-xl bg-white/10 border border-white/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white text-shadow-md">
                  10:30 AM
                </div>
                <div className="text-gray-300 text-sm text-shadow-sm">
                  Next Service
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Decorative Elements */}
          <motion.div
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>

    {/* Enhanced Scroll Indicator */}
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
    >
      <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
        <motion.div
          className="w-1 h-3 bg-white rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>

    {/* Modern Wave Separator */}
    <div className="absolute -bottom-1 left-0 w-full">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
          fill="currentColor"
          className="text-gray-50 dark:text-gray-900"
        />
      </svg>
    </div>
  </section>
);

export default Hero;
