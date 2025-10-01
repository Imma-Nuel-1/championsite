import { useEffect, useState, useCallback } from "react";
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>;
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

interface AlbumData {
  _id: string;
  title: string;
  description?: string;
  images: string[];
}

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = (await apiFetch(`/api/gallery/${id}`)) as { data: any };
        setAlbum(res.data);
      } catch (err) {
        setError("Failed to load album");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null || !album) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % album.images.length
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null
            ? null
            : (i - 1 + album.images.length) % album.images.length
        );
    },
    [lightboxIndex, album]
  );

  useEffect(() => {
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [lightboxIndex, onKeyDown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading album...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Oops! Something went wrong</p>
            <p>{error}</p>
          </div>
          <Link
            to="/gallery"
            className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-medium"
          >
            â† Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (!album) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/gallery"
              className="inline-flex items-center text-purple-100 hover:text-white transition duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Gallery
            </Link>
            <div className="text-purple-100 text-sm">
              {album.images.length} photos
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{album.title}</h1>
          {album.description && (
            <p className="text-xl text-purple-100 max-w-3xl">
              {album.description}
            </p>
          )}
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {album.images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                aria-label={`Open image ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Album image ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={album.images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Close Button */}
            <button
              className="absolute -top-2 -right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              onClick={() =>
                setLightboxIndex((i) =>
                  i === null
                    ? null
                    : (i - 1 + album.images.length) % album.images.length
                )
              }
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center transition duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              onClick={() =>
                setLightboxIndex((i) =>
                  i === null ? null : (i + 1) % album.images.length
                )
              }
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {lightboxIndex + 1} of {album.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
