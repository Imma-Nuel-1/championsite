import { useEffect, useState } from "react";
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

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Omit<Event, "_id">>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    location: "",
    description: "",
    imageUrl: "",
    category: "",
    status: "upcoming",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: {
        text: "Coming Soon",
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      },
      today: {
        text: "Today",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
      ongoing: {
        text: "Ongoing",
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
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

  const loadEvents = async () => {
    try {
      // For admin, we want to see all events including completed ones
      const data = (await apiFetch(
        `/api/events?page=${page}&limit=${limit}&includeAll=true`
      )) as any;
      console.log("Events API Response:", data); // Debug log
      setEvents(data.events || data.data || data || []); // Handle different response structures
      setTotalPages(data.totalPages || data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Error loading events:", err);
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: "10:00",
        location: "",
        description: "",
        imageUrl: "",
        category: "",
        status: "upcoming",
      });

      setPage(1); // Reset to page 1 after adding
      await loadEvents();
    } catch (err) {
      console.error(err);
      alert("Error adding event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await apiFetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
          Manage Events
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Create and manage church events
        </p>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-glass p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            {events.filter((e) => e.status === "upcoming").length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
            Upcoming Events
          </div>
        </div>
        <div className="card-glass p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {events.filter((e) => e.status === "today").length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
            Today's Events
          </div>
        </div>
        <div className="card-glass p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {events.filter((e) => e.status === "completed").length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
            Completed Events
          </div>
        </div>
        <div className="card-glass p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            {events.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
            Total Events
          </div>
        </div>
      </div>

      {/* Add Event Form */}
      <div className="card-glass p-8 rounded-3xl shadow-2xl mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-6">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select Category</option>
                <option value="worship">Worship Service</option>
                <option value="bible-study">Bible Study</option>
                <option value="prayer">Prayer Meeting</option>
                <option value="youth">Youth Program</option>
                <option value="children">Children's Ministry</option>
                <option value="outreach">Community Outreach</option>
                <option value="fellowship">Fellowship</option>
                <option value="conference">Conference</option>
                <option value="special">Special Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            {loading ? "Adding..." : "Add Event"}
          </button>
        </form>
      </div>

      {/* Events List */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="text-2xl font-semibold">Manage Events</h2>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border dark:border-gray-700 bg-white dark:bg-gray-800">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="py-2 px-4 border dark:border-gray-600 text-left">
                      Date & Time
                    </th>
                    <th className="py-2 px-4 border dark:border-gray-600 text-left">
                      Title
                    </th>
                    <th className="py-2 px-4 border dark:border-gray-600 text-left">
                      Category
                    </th>
                    <th className="py-2 px-4 border dark:border-gray-600 text-left">
                      Status
                    </th>
                    <th className="py-2 px-4 border dark:border-gray-600 text-left">
                      Location
                    </th>
                    <th className="py-2 px-4 border dark:border-gray-600 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events
                    .filter(
                      (event) =>
                        statusFilter === "all" || event.status === statusFilter
                    )
                    .map((event) => (
                      <tr
                        key={event._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <td className="py-2 px-4 border dark:border-gray-600">
                          <div className="text-sm">
                            <div className="font-medium">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {event.time}
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-4 border dark:border-gray-600 font-medium">
                          {event.title}
                        </td>
                        <td className="py-2 px-4 border dark:border-gray-600">
                          {event.category && (
                            <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium capitalize">
                              {event.category}
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border dark:border-gray-600">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="py-2 px-4 border dark:border-gray-600">
                          {event.location}
                        </td>
                        <td className="py-2 px-4 border dark:border-gray-600 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                window.open(`/events/${event._id}`, "_blank")
                              }
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Event"
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteEvent(event._id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete Event"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded border text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  &larr; Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1.5 rounded border text-sm ${
                        p === page
                          ? "bg-purple-600 text-white font-semibold"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      } hover:scale-105 transition`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="px-3 py-1.5 rounded border text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
