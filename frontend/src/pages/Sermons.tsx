import { useEffect, useState, useRef } from "react";
import { FaSearch, FaPlay, FaTimes } from "react-icons/fa";
import { apiFetch } from "../utils/api";
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from "../utils/youtube";
import { motion, AnimatePresence } from "framer-motion";

interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  description?: string;
  mediaUrl?: string;
}

const Sermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const searchRef = useRef(search);
  const timeoutRef = useRef<number | null>(null);

  const fetchSermons = async (page = 1, term = "") => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `/api/sermons?page=${page}&search=${encodeURIComponent(term)}`
      );
      setSermons(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load sermons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      searchRef.current = search;
      fetchSermons(currentPage, search);
    }, 400);
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-gold to-yellow-500 text-navy px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Sermon Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-navy via-blue-800 to-navy bg-clip-text text-transparent mb-6">
            Messages That Transform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive into our collection of powerful sermons. Each message is
            crafted to inspire, challenge, and strengthen your faith journey
            with biblical truth and practical wisdom.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, preacher, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : error ? (
          <p className="text-center py-10 text-red-500 dark:text-red-400 text-lg">
            {error}
          </p>
        ) : sermons.length === 0 ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">
            No sermons found. Try a different search.
          </p>
        ) : (
          <>
            <div
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {sermons.map((s) => (
                <article
                  key={s._id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={
                        getYouTubeThumbnail(s.mediaUrl) ||
                        "https://images.unsplash.com/photo-1593106410333-65dd65a0c25b?q=80&w=2070&auto=format&fit=crop"
                      }
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        onClick={() => setSelectedSermon(s)}
                        className="w-16 h-16 bg-gold/90 hover:bg-gold rounded-full flex items-center justify-center cursor-pointer transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FaPlay className="text-navy text-xl ml-1" />
                      </div>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-white text-xs font-medium">
                        {new Date(s.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                      {s.title}
                    </h3>

                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-navy text-xs font-bold">
                          {s.preacher.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {s.preacher}
                      </p>
                    </div>

                    {s.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {s.description}
                      </p>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedSermon(s)}
                      className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-navy to-blue-800 hover:from-blue-800 hover:to-navy text-white text-sm font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaPlay className="mr-2 text-xs" />
                      Watch Sermon
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                className="px-4 py-2 rounded-md border text-sm font-medium bg-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-4 py-2 rounded-md border text-sm font-medium bg-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Modal for playing sermon */}
      {selectedSermon && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSermon(null)}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
            <button
              onClick={() => setSelectedSermon(null)}
              className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 z-10 transition-colors"
            >
              <FaTimes />
            </button>
            <div style={{ height: "80vh" }}>
              <iframe
                src={`${getYouTubeEmbedUrl(
                  selectedSermon.mediaUrl
                )}?autoplay=1`}
                title={selectedSermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedSermon.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(selectedSermon.date).toLocaleDateString()} â€¢ by{" "}
                {selectedSermon.preacher}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;
