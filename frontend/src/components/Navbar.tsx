import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { FaChurch, FaPlay } from "react-icons/fa";
import { useTheme } from "../providers/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/about", label: "About" },
  { to: "/sermons", label: "Sermons" },
  { to: "/pastors", label: "Pastors" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
  { to: "/giving", label: "Giving" },
  { to: "/prayer-request", label: "Prayer" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 text-sm font-semibold transition-all duration-500 group ${
      isActive
        ? "text-orange-400 text-shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 text-shadow-sm"
    }`;

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "glass backdrop-blur-xl shadow-xl border-b border-white/20 dark:border-gray-700/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container-section">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <NavLink to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaChurch className="text-gray-900 text-lg drop-shadow-sm" />
                  </motion.div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-500 text-shadow-sm">
                    Champions
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 -mt-1 text-shadow-sm">
                    City of Champions
                  </div>
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden lg:flex items-center space-x-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <NavLink to={link.to} className={linkClasses}>
                    <span className="drop-shadow-sm">{link.label}</span>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform -translate-x-1/2 transition-all duration-500 group-hover:w-full shadow-lg"></span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side Actions */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Live Stream CTA */}
              <div className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/livestream"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 text-sm font-semibold backdrop-blur-sm group flex items-center"
                  >
                    <FaPlay className="mr-2 text-xs group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                    <span className="text-shadow-sm">Live Stream</span>
                  </NavLink>
                </motion.div>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-500 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === "light" ? (
                    <FiMoon className="text-lg drop-shadow-sm" />
                  ) : (
                    <FiSun className="text-lg drop-shadow-sm" />
                  )}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setOpen(!open)}
                aria-label="Toggle Menu"
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-500 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  key={open ? "close" : "open"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: open ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {open ? (
                    <FiX className="text-lg drop-shadow-sm" />
                  ) : (
                    <FiMenu className="text-lg drop-shadow-sm" />
                  )}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Mobile Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaChurch className="text-gray-900 text-sm drop-shadow-sm" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-shadow-sm">
                      Champions
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 text-shadow-sm">
                      City of Champions
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX className="text-lg drop-shadow-sm" />
                </motion.button>
              </motion.div>

              {/* Mobile Navigation Links */}
              <motion.div
                className="p-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Live Stream CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-6"
                >
                  <NavLink
                    to="/livestream"
                    onClick={() => setOpen(false)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 font-semibold backdrop-blur-sm group flex items-center justify-center"
                  >
                    <FaPlay className="mr-3 text-sm group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                    <span className="text-shadow-sm">Watch Live Stream</span>
                  </NavLink>
                </motion.div>

                {/* Navigation Links */}
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-500 ${
                          isActive
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200 text-shadow-sm shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400 text-shadow-sm"
                        }`
                      }
                    >
                      <span className="drop-shadow-sm">{link.label}</span>
                      <FiChevronDown className="text-sm opacity-60 drop-shadow-sm" />
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Footer */}
              <motion.div
                className="p-6 border-t border-gray-200 dark:border-gray-700 mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 text-shadow-sm">
                  Growing Together in Faith
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
