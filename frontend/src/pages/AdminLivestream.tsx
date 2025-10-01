import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaYoutube,
  FaEye,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { apiFetch } from "../utils/api";

interface LiveStream {
  _id: string;
  title: string;
  youtubeUrl: string;
  isActive: boolean;
  scheduledTime?: string;
  description: string;
  thumbnail?: string;
  createdAt: string;
}

interface StreamFormData {
  title: string;
  youtubeUrl: string;
  description: string;
  scheduledTime: string;
}

const AdminLivestream = () => {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStream, setEditingStream] = useState<LiveStream | null>(null);
  const [formData, setFormData] = useState<StreamFormData>({
    title: "",
    youtubeUrl: "",
    description: "",
    scheduledTime: "",
  });

  const fetchStreams = async () => {
    try {
      setLoading(true);
      const response = await apiFetch<{ success: boolean; data: LiveStream[] }>(
        "/api/livestream/all"
      );
      if (response.success) {
        setStreams(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch streams:", err);
      setError("Failed to load live streams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingStream) {
        // Update existing stream
        await apiFetch(`/api/livestream/${editingStream._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
      } else {
        // Create new stream
        await apiFetch("/api/livestream", {
          method: "POST",
          body: JSON.stringify(formData),
        });
      }

      // Reset form and refresh list
      setFormData({
        title: "",
        youtubeUrl: "",
        description: "",
        scheduledTime: "",
      });
      setShowForm(false);
      setEditingStream(null);
      fetchStreams();
    } catch (err) {
      console.error("Failed to save stream:", err);
      setError("Failed to save live stream");
    }
  };

  const handleEdit = (stream: LiveStream) => {
    setEditingStream(stream);
    setFormData({
      title: stream.title,
      youtubeUrl: stream.youtubeUrl,
      description: stream.description,
      scheduledTime: stream.scheduledTime
        ? stream.scheduledTime.split("T")[0]
        : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (streamId: string) => {
    if (!confirm("Are you sure you want to delete this live stream?")) return;

    try {
      await apiFetch(`/api/livestream/${streamId}`, {
        method: "DELETE",
      });
      fetchStreams();
    } catch (err) {
      console.error("Failed to delete stream:", err);
      setError("Failed to delete live stream");
    }
  };

  const handleToggleStatus = async (streamId: string) => {
    try {
      await apiFetch(`/api/livestream/${streamId}/toggle`, {
        method: "PATCH",
      });
      fetchStreams();
    } catch (err) {
      console.error("Failed to toggle stream:", err);
      setError("Failed to toggle stream status");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      youtubeUrl: "",
      description: "",
      scheduledTime: "",
    });
    setShowForm(false);
    setEditingStream(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Live Stream Management
          </h1>
          <p className="text-gray-600">
            Manage YouTube live streams for your website
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Stream
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingStream ? "Edit Live Stream" : "Add New Live Stream"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sunday Service Live"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeUrl: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste the full YouTube live stream URL here
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Join us for worship and the Word!"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Time (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduledTime: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaSave />
                    {editingStream ? "Update Stream" : "Create Stream"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Streams List */}
      <div className="bg-white rounded-lg shadow">
        {streams.length === 0 ? (
          <div className="text-center py-12">
            <FaYoutube className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Live Streams Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first live stream to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Live Stream
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Stream Details
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Created
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {streams.map((stream) => (
                  <tr key={stream._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {stream.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {stream.description}
                        </p>
                        <a
                          href={stream.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          <FaYoutube /> View on YouTube
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stream.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {stream.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(stream.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href="/livestream"
                          target="_blank"
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View Live"
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => handleToggleStatus(stream._id)}
                          className={`p-1 ${
                            stream.isActive
                              ? "text-green-600 hover:text-green-700"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={stream.isActive ? "Deactivate" : "Activate"}
                        >
                          {stream.isActive ? (
                            <FaToggleOn size={20} />
                          ) : (
                            <FaToggleOff size={20} />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(stream)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(stream._id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Only one stream can be active at a time</li>
          <li>• Copy your YouTube live stream URL and paste it in the form</li>
          <li>
            • The stream will automatically appear on your /livestream page when
            active
          </li>
          <li>• You can schedule streams for future dates</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLivestream;
