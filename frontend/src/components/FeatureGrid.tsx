// 🗑️ **REVIEW COMMENT**: This entire FeatureGrid component is commented out and unused.
// ❌ **UNUSED COMPONENT** - Safe to delete this file completely.
// The component is imported (but commented out) in Home.tsx line 10
// and the usage is commented out on line 71 of Home.tsx.
//
// RECOMMENDATION: Delete this file entirely to clean up codebase.

// import { Link } from "react-router-dom";
// import { FiBookOpen, FiPlayCircle, FiMail, FiClock } from "react-icons/fi";
// import { type ReactElement } from "react";
// import { motion } from "framer-motion";

// interface Feature {
//   title: string;
//   desc: string;
//   icon: ReactElement;
//   to: string;
// }

// const features: Feature[] = [
//   {
//     title: "About Us",
//     desc: "Learn more about our mission and beliefs",
//     icon: <FiBookOpen className="text-2xl" />,
//     to: "/about",
//   },
//   {
//     title: "Latest Sermon",
//     desc: "Listen to our most recent sermon online",
//     icon: <FiPlayCircle className="text-2xl" />,
//     to: "/sermons",
//   },
//   {
//     title: "Prayer Request",
//     desc: "Submit your prayer requests to us",
//     icon: <FiMail className="text-2xl" />,
//     to: "/prayer-request",
//   },
//   {
//     title: "Service Times",
//     desc: "View our weekly service times and schedule",
//     icon: <FiClock className="text-2xl" />,
//     to: "/about#services",
//   },
// ];

// const FeatureGrid = () => (
//   <motion.section
//     className="relative z-10 -mt-44 lg:-mt-52 px-4"
//     initial={{ opacity: 0, y: 100 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8, delay: 0.2 }}
//     viewport={{ once: true }}
//   >
//     <motion.div
//       className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-4"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.6, delay: 0.4 }}
//       viewport={{ once: true }}
//     >
//       {features.map((f, index) => (
//         <motion.div
//           key={f.title}
//           initial={{ opacity: 0, y: 50, scale: 0.9 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{
//             duration: 0.6,
//             delay: 0.5 + index * 0.1,
//             ease: "easeOut"
//           }}
//           viewport={{ once: true }}
//           whileHover={{
//             y: -10,
//             scale: 1.05,
//             transition: { duration: 0.3 }
//           }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <Link
//             to={f.to}
//             className="flex flex-col items-center rounded-xl bg-white/70 backdrop-blur-lg p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/40 group"
//           >
//             <motion.div
//               className="mb-4 text-gold drop-shadow-md"
//               whileHover={{ scale: 1.2, rotate: 5 }}
//               transition={{ duration: 0.3 }}
//             >
//               {f.icon}
//             </motion.div>
//             <h3 className="mb-2 font-semibold text-lg text-navy text-shadow-sm drop-shadow-sm group-hover:text-accent-600 transition-colors duration-300">
//               {f.title}
//             </h3>
//             <p className="text-sm text-gray-700 text-shadow-sm group-hover:text-gray-800 transition-colors duration-300">
//               {f.desc}
//             </p>
//           </Link>
//         </motion.div>
//       ))}
//     </motion.div>
//   </motion.section>
// );

// export default FeatureGrid;
