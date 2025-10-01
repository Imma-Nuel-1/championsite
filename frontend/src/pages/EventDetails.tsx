import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaShareAlt,
} from "react-icons/fa";
import { apiFetch } from "../utils/api";

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

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await apiFetch(`/api/events/${id}`);
        setEvent(data.event);
      } catch (err) {
        setError("Failed to load event details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const shareEvent = async () => {
    if (navigator.share && event) {
      try {
        await navigator.share({
          title: event.title,
          text: `Join us for ${event.title} on ${new Date(
            event.date
          ).toLocaleDateString()}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      if (event) {
        navigator.clipboard.writeText(window.location.href);
        alert("Event link copied to clipboard!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">âš ï¸</div>
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">
            {error || "Event not found"}
          </p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/events"
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {getStatusBadge(event.status)}
              {event.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {event.category}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-purple-100">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {event.imageUrl && (
              <div className="mb-8">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {event.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Event
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Event Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCalendarAlt className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Date
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaClock className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Time
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Location
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Actions
                </h3>

                <div className="space-y-3">
                  {event.status === "upcoming" || event.status === "today" ? (
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium">
                      Register for Event
                    </button>
                  ) : (
                    <div className="w-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-3 px-4 rounded-lg text-center font-medium">
                      Registration Closed
                    </div>
                  )}

                  <a
                    href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title
                    )}&dates=${new Date(event.date)
                      .toISOString()
                      .replace(/[-:]/g, "")
                      .replace(/\.\d{3}Z$/, "Z")}%2F${new Date(
                      new Date(event.date).getTime() + 60 * 60 * 1000
                    )
                      .toISOString()
                      .replace(/[-:]/g, "")
                      .replace(/\.\d{3}Z$/, "Z")}&location=${encodeURIComponent(
                      event.location
                    )}&details=${encodeURIComponent(event.description || "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 py-3 px-4 border border-purple-200 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200 font-medium"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Google Calendar
                  </a>

                  <button
                    onClick={shareEvent}
                    className="w-full flex items-center justify-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 py-3 px-4 border border-purple-200 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200 font-medium"
                  >
                    <FaShareAlt className="mr-2" />
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;

