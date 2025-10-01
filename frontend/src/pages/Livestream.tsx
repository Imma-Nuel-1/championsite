import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaClock, FaUsers, FaShareAlt } from "react-icons/fa";
import { apiFetch } from "../utils/api";

interface LiveStream {
  _id: string;
  title: string;
  youtubeUrl: string;
  isActive: boolean;
  scheduledTime?: string;
  description: string;
  thumbnail?: string;
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const Livestream = () => {
  const [liveStream, setLiveStream] = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveStream = async () => {
      try {
        setLoading(true);
        const response = await apiFetch<{ success: boolean; data: LiveStream }>(
          "/api/livestream"
        );
        if (response.success) {
          setLiveStream(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch live stream:", err);
        setError("Unable to load live stream information.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStream();
  }, []);

  const videoId = liveStream ? getYouTubeVideoId(liveStream.youtubeUrl) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading live stream...</p>
        </div>
      </div>
    );
  }

  if (error || !liveStream) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaClock className="text-6xl text-purple-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">
              No Live Stream Currently
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're not currently live, but join us for our next service! Check
              back during our scheduled service times.
            </p>
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Service Times
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div>
                  <p className="font-semibold">Sunday Service</p>
                  <p className="text-gray-400">10:00 AM - 12:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Wednesday Bible Study</p>
                  <p className="text-gray-400">7:00 PM - 8:30 PM</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                console.log("Return to Homepage button clicked");
                window.location.href = "/";
              }}
            >
              Return to Homepage
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-purple-900 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-semibold uppercase tracking-wide">
                LIVE NOW
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {liveStream.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {liveStream.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              {videoId ? (
                <div
                  className="relative"
                  style={{ paddingBottom: "56.25%", height: 0 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={liveStream.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <FaPlay className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-xl text-gray-400">Invalid video URL</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 text-center"
            >
              <FaUsers className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <p className="text-gray-300">
                Connect with fellow believers and grow in faith together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 text-center"
            >
              <FaShareAlt className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Share the Stream</h3>
              <p className="text-gray-300 mb-4">
                Invite others to join us for this live service.
              </p>
              <button
                onClick={() => {
                  if (navigator.share && liveStream) {
                    navigator.share({
                      title: liveStream.title,
                      text: liveStream.description,
                      url: window.location.href,
                    });
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Share
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-800 rounded-xl p-6 text-center md:col-span-2 lg:col-span-1"
            >
              <FaClock className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Service Times</h3>
              <div className="text-gray-300 space-y-2">
                <div>
                  <p className="font-semibold">Sunday Service</p>
                  <p className="text-sm">10:00 AM - 12:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Wednesday Bible Study</p>
                  <p className="text-sm">7:00 PM - 8:30 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Livestream;
