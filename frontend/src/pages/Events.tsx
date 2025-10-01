import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  status: "upcoming" | "today" | "ongoing" | "completed";
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: {
        text: "Coming Soon",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
      today: {
        text: "Today",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      },
      ongoing: {
        text: "Ongoing",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      },
      completed: {
        text: "Completed",
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.upcoming;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const data = (await apiFetch(`/api/events?page=${page}`)) as any;
      setEvents(data.events || data.data || data || []);
      setTotalPages(data.totalPages || data.pagination?.totalPages || 1);
      setError(null);
    } catch {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6 animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">âš ï¸</div>
          <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
          <button
            onClick={() => fetchEvents(currentPage)}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-primary text-white py-20"
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
            Church{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-shadow-md">
              Events
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join us for worship, fellowship, and community gatherings
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      {events.length > 0 && (
        <section className="relative container-section py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card-glass rounded-3xl p-8 text-center shadow-glow hover:shadow-xl transition-all duration-300 border border-white/20">
              <div className="text-4xl font-bold text-gradient-primary mb-3">
                {events.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">
                Upcoming Events
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {new Set(events.map((e) => e.category)).size || 1}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Event Categories
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {events.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Events
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      {events.length > 0 && (
        <section className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30"
              }`}
            >
              All Events
            </button>
            {Array.from(
              new Set(events.map((e) => e.category).filter(Boolean))
            ).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category!)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Events Content */}
      <section className="container mx-auto px-4 py-8 max-w-7xl">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">
              <FaCalendarAlt className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Upcoming Events
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
              No events are currently scheduled. Please check back later for
              updates on our upcoming church activities and programs.
            </p>
            <button
              onClick={() => fetchEvents(currentPage)}
              className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Refresh Events
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events
                .filter(
                  (event) =>
                    selectedCategory === "all" ||
                    event.category === selectedCategory
                )
                .map((event) => (
                  <Link
                    key={event._id}
                    to={`/events/${event._id}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 block"
                  >
                    {/* Event Image */}
                    {event.imageUrl ? (
                      <div className="relative overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                        <FaCalendarAlt className="text-6xl text-white/80" />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Status and Category */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {getStatusBadge(event.status)}
                        {event.category && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                            {event.category}
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h2>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaCalendarAlt className="w-4 h-4 mr-3 text-purple-500" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaClock className="w-4 h-4 mr-3 text-purple-500" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="w-4 h-4 mr-3 text-purple-500" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Event Description */}
                      {event.description && (
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      )}

                      {/* Click to view details */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Click to view details
                        </span>
                        <div className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                          â†’
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 space-x-3">
                <button
                  className="px-6 py-3 rounded-xl border border-primary-200 dark:border-primary-700 text-sm font-medium bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                        currentPage === i + 1
                          ? "bg-gradient-primary text-white shadow-glow-primary"
                          : "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      }`}
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="px-6 py-3 rounded-xl border border-primary-200 dark:border-primary-700 text-sm font-medium bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Events;
