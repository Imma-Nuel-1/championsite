import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MeetPastor = () => (
  <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>

    <div className="mx-auto max-w-6xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-shadow-md drop-shadow-lg"
          whileInView={{ scale: [0.9, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Meet Our Pastor
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto text-shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover the heart behind our ministry and the vision that guides our
          church family.
        </motion.p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
              alt="Pastor John Smith"
              className="w-full h-96 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-4 rounded-xl shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-shadow-sm">
              Serving Since
            </p>
            <p className="text-2xl font-bold text-shadow-md">2015</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-shadow-md drop-shadow-lg">
              Pastor John Smith
            </h3>
            <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-4 text-shadow-sm">
              Senior Pastor & Founder
            </p>
          </motion.div>

          <motion.p
            className="text-gray-700 leading-relaxed text-lg text-shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            With over 15 years of ministry experience, Pastor John brings a
            heart for evangelism and discipleship to City of Champions. His
            passion for seeing lives transformed by the Gospel has been the
            driving force behind our church's growth and impact in the
            community.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-4 py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { value: "15+", label: "Years in Ministry" },
              { value: "1000+", label: "Lives Touched" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/30"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 text-shadow-md drop-shadow-md">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 text-shadow-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/pastors"
                className="inline-flex items-center justify-center bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-all duration-500 shadow-lg hover:shadow-xl text-shadow-sm backdrop-blur-sm"
              >
                Learn More About Our Team
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-lg hover:shadow-xl text-shadow-sm backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MeetPastor;
