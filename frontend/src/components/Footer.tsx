import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white py-12 px-6 md:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content - Split between content and Instagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Left Side - All Footer Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Column 1: Church Info & Quick Links */}
              <div className="space-y-6">
                {/* Church Info & Logo */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src="https://res.cloudinary.com/dvr3sk23p/image/upload/v1751980409/COC_logo_eneb3x.jpg"
                      alt="RCCG City of Champions Logo"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        R.C.C.G
                      </h3>
                      <p className="text-sm text-orange-400 font-semibold">
                        City of Champions
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-orange-400 mb-4 font-semibold">
                    "WHERE MEN REIGN AS GODS"
                    <br />
                    <span className="text-xs text-gray-300">
                      YOUTH PROVINCE 7
                    </span>
                  </p>

                  {/* Social Media */}
                  <div className="flex items-center gap-4 mb-6">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="text-white text-sm" />
                    </a>
                    <a
                      href="https://www.instagram.com/rccgcoc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-white text-sm" />
                    </a>
                    <a
                      href="http://www.youtube.com/@rccgcoc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="text-white text-sm" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-orange-400">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sermons"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Sermons
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/events"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Blog & News
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gallery"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Contact Info & Services */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-orange-400">
                    Contact Info
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p>26/28 Shonola Street,</p>
                        <p>Opposite Excellence Hotel,</p>
                        <p>Aguda-Ogba, Lagos State, Nigeria</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaPhone className="text-green-500 flex-shrink-0" />
                      <div>
                        <p>08061513753</p>
                        <p>0704-209-0001</p>
                        <p>0704-209-0002</p>
                        <p className="text-xs italic">(SMS & WhatsApp Only)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-blue-400 flex-shrink-0" />
                      <a
                        href="mailto:info@rccgcoc.org"
                        className="hover:text-white transition-colors"
                      >
                        info@rccgcoc.org
                      </a>
                    </div>
                  </div>
                </div>

                {/* Services & Programs */}
                <div>
                  <h3 className="font-bold text-lg mb-4 text-orange-400">
                    Services
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Sunday Service - 8:00 AM</li>
                    <li>Bible Study - Wednesday 6:00 PM</li>
                    <li>Prayer Meeting - Friday 6:00 PM</li>
                    <li>Youth Service - Saturday 4:00 PM</li>
                    <li>
                      <Link
                        to="/prayer-request"
                        className="hover:text-white transition-colors"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Prayer Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/livestream"
                        className="hover:text-white transition-colors"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Live Stream
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Instagram Feed */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-accent-400">
              Instagram Feed
            </h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://widgets.sociablekit.com/instagram-feed/iframe/25576026"
                className="w-full h-[500px] border-none"
                scrolling="yes"
                title="Instagram Feed"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Stay Connected
            </h3>
            <p className="text-gray-300 mb-4 max-w-md mx-auto">
              Subscribe to our newsletter for updates on events, sermons, and
              church news.
            </p>
            <Link
              to="/newsletter"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} RCCG City of Champions. All
              rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span>|</span>
              <span>
                Designed by{" "}
                <span className="text-yellow-400 font-medium">
                  Olumuyiwa Emmanuel Adesanya
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
