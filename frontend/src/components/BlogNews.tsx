import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const posts = [
  {
    title: "Faith in Action: Community Outreach Recap",
    img: "https://images.unsplash.com/photo-1515169273893-b0a8b5964e52?auto=format&fit=crop&w=800&q=70",
    date: "Jun 14, 2024",
    slug: "community-outreach-recap",
  },
  {
    title: "Youth Conference Highlights",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=70",
    date: "May 28, 2024",
    slug: "youth-conference-highlights",
  },
  {
    title: "Testimonies of Healing and Hope",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=70",
    date: "Apr 30, 2024",
    slug: "healing-and-hope-testimonies",
  },
];

const BlogNews = () => (
  <motion.section
    className="py-20 bg-ash/20 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {/* Background Elements */}
    <motion.div
      className="absolute top-10 right-10 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.1, 0.05],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <div className="mx-auto max-w-6xl px-4 relative">
      <motion.header
        className="flex items-center justify-between mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-2xl lg:text-3xl font-bold text-navy text-shadow-md drop-shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Blog & News
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/blog"
            className="text-orange-600 dark:text-orange-400 font-medium hover:underline text-shadow-sm transition-all duration-300 hover:text-orange-700 dark:hover:text-orange-300"
          >
            View All
          </Link>
        </motion.div>
      </motion.header>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {posts.map((p, index) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/blog/${p.slug}`}
              className="group rounded-xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 block border border-white/30"
            >
              <div className="overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.title}
                  className="h-48 w-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div className="p-6">
                <motion.p
                  className="text-sm text-gray-500 mb-2 text-shadow-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {p.date}
                </motion.p>
                <motion.h3
                  className="font-semibold text-navy text-lg mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 text-shadow-sm drop-shadow-sm"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {p.title}
                </motion.h3>
                <motion.span
                  className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300 text-shadow-sm"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Read More <FiArrowRight className="drop-shadow-sm" />
                </motion.span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default BlogNews;
