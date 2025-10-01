import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Link } from "react-router-dom";

interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  description?: string;
  mediaUrl?: string;
}

const AdminSermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [formData, setFormData] = useState<Omit<Sermon, "_id">>({
    title: "",
    preacher: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    mediaUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadSermons = async () => {
    try {
      const data = (await apiFetch(`/api/sermons?page=${page}`)) as any;
      setSermons(data.data || data || []);
      setTotalPages(data.pagination?.totalPages || data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load sermons");
    }
  };

  useEffect(() => {
    loadSermons();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/sermons", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormData({
        title: "",
        preacher: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        mediaUrl: "",
      });
      await loadSermons();
    } catch (err) {
      console.error(err);
      alert("Error adding sermon");
    } finally {
      setLoading(false);
    }
  };

  const deleteSermon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sermon?")) return;
    try {
      await apiFetch(`/api/sermons/${id}`, { method: "DELETE" });
      setSermons((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete sermon");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Sermons
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create and manage sermon content
          </p>
        </div>
        <Link to="/admin" className="btn-secondary group">
          <span className="flex items-center">â† Back to Dashboard</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Sermon
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="preacher"
              value={formData.preacher}
              onChange={handleChange}
              placeholder="Preacher"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="url"
              name="mediaUrl"
              value={formData.mediaUrl || ""}
              onChange={handleChange}
              placeholder="Media URL"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-md disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Sermon"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Sermons
        </h2>
        {sermons.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No sermons found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Preacher</th>
                  <th className="py-2 px-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sermons.map((sermon) => (
                  <tr
                    key={sermon._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-2 px-4 border text-gray-800 dark:text-gray-100">
                      {new Date(sermon.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border font-medium text-gray-800 dark:text-white">
                      {sermon.title}
                    </td>
                    <td className="py-2 px-4 border text-gray-800 dark:text-gray-100">
                      {sermon.preacher}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => deleteSermon(sermon._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
                          ? "bg-blue-600 text-white font-semibold"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSermons;

