import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";
import { apiFetch } from "../utils/api";
import { getYouTubeThumbnail } from "../utils/youtube";
import MeetPastor from "../components/MeetPastor";
import BlogNews from "../components/BlogNews";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import HeroComponent from "../components/Hero";

// Interfaces for our data
interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  mediaUrl?: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
}

const Home = () => {
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch latest sermon
        const sermonRes = await apiFetch<{ data: Sermon[] }>(
          "/api/sermons?limit=1&page=1"
        );
        if (sermonRes.data && sermonRes.data.length > 0) {
          setLatestSermon(sermonRes.data[0]);
        }

        // Fetch next 3 upcoming events
        const eventRes = await apiFetch<{ events: Event[] }>(
          "/api/events/upcoming?limit=3"
        );
        if (eventRes.events) {
          setUpcomingEvents(eventRes.events);
        }
      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
        setError("Could not load homepage data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 transition-colors duration-300 overflow-x-hidden">
      <HeroComponent />
      {/* <FeatureGrid /> */}

      {loading && (
        <div className="text-center py-20">
          <div className="card-glass mx-auto max-w-md p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Loading content...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <div className="card-glass mx-auto max-w-md p-8 border-l-4 border-red-500">
            <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {latestSermon ? (
            <FeaturedSermon sermon={latestSermon} />
          ) : (
            <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
              <div className="container mx-auto px-6 text-center">
                <div className="card-glass p-12 max-w-2xl mx-auto rounded-3xl">
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    No recent sermon available.
                  </p>
                </div>
              </div>
            </section>
          )}

          <motion.section
            className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <motion.div
              className="container mx-auto px-6 text-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg text-shadow-lg"
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Upcoming Events
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-md text-shadow-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Join us for worship, fellowship, and growth. There's always
                something happening at City of Champions.
              </motion.p>
              {upcomingEvents.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event._id}
                      className="card-glass bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left group hover:shadow-3xl transition-all duration-500"
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6 + index * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.img
                        src={
                          event.imageUrl ||
                          "https://res.cloudinary.com/dvr3sk23p/image/upload/v1751980409/COC_logo_eneb3x.jpg"
                        }
                        alt={event.title}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300 text-shadow-md drop-shadow-md">
                          {event.title}
                        </h3>
                        <div className="text-white/80 space-y-2 mb-4 text-shadow-sm">
                          <div className="flex items-center">
                            <span className="text-sm drop-shadow-sm">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                              {event.time ? ` at ${event.time}` : ""}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm drop-shadow-sm">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link
                              to="/events"
                              className="inline-flex items-center font-semibold text-white hover:text-orange-400 transition-all duration-300 group border-b border-transparent hover:border-orange-400 pb-1 text-shadow-sm"
                            >
                              Learn More{" "}
                              <FaArrowRight className="inline ml-2 transform group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="card-glass bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-8 max-w-md mx-auto">
                    <p className="text-lg text-white/80 text-shadow-sm">
                      No upcoming events scheduled at this time.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>

          <Testimonials limit={3} />
          <MeetPastor />
          <BlogNews />
        </>
      )}
    </div>
  );
};

const FeaturedSermon = ({ sermon }: { sermon: Sermon | null }) => {
  if (!sermon) return null;

  return (
    <motion.section
      className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <motion.div
        className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="card-glass p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-lg border border-white/30"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent text-shadow-lg drop-shadow-lg"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Latest Message
          </motion.h2>
          <motion.h3
            className="text-2xl md:text-3xl font-semibold mb-4 text-slate-800 dark:text-white text-shadow-md drop-shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {sermon.title}
          </motion.h3>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 mb-8 text-shadow-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            by{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400 text-shadow-sm">
              {sermon.preacher}
            </span>{" "}
            -{" "}
            {new Date(sermon.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/sermons"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold group backdrop-blur-sm text-shadow-sm flex items-center"
            >
              <FaPlayCircle className="mr-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
              Watch Now
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl card-glass border border-white/30 p-2 hover:shadow-3xl transition-all duration-500 group"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <motion.img
              src={getYouTubeThumbnail(sermon.mediaUrl) || ""}
              alt={sermon.title}
              className="w-full h-auto object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                <FaPlayCircle className="text-white text-3xl ml-1 drop-shadow-md" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
