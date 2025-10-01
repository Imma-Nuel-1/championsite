import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { motion } from "framer-motion";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  previewImageUrl: string;
  images: string[];
  category?: string;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = (await apiFetch(`/api/gallery?page=${page}`)) as {
          data: any[];
          totalPages?: number;
        };
        setItems(data.data);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError("Failed to load gallery items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

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
            Photo{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-shadow-md">
              Gallery
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing precious moments from our church community and events
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
                <p className="font-semibold">Oops! Something went wrong</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item) => (
                  <Link
                    to={`/gallery/${item._id}`}
                    key={item._id}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.previewImageUrl}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{item.images?.length || 0} photos</span>
                          </div>
                        </div>
                      </div>
                      {item.category && (
                        <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {item.category}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-semibold transition duration-300 ${
                            page === pageNum
                              ? "bg-purple-600 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 shadow-md"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-red-50 dark:hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
