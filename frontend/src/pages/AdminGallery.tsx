import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Link } from "react-router-dom";
import { uploadToCloudinary } from "../utils/cloudinary";

interface Album {
  _id: string;
  title: string;
  description?: string;
}

const AdminGallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadAlbums = async () => {
    try {
      const data = (await apiFetch(`/api/gallery?page=${page}`)) as any;
      setAlbums(data.data || data || []);
      setTotalPages(data.pagination?.totalPages || data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load albums");
    }
  };

  useEffect(() => {
    loadAlbums();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }
    setLoading(true);
    try {
      const imageUrls = await Promise.all(files.map(uploadToCloudinary));
      const newAlbum = {
        ...formData,
        previewImageUrl: imageUrls[0],
        images: imageUrls,
      };
      await apiFetch("/api/gallery", {
        method: "POST",
        body: JSON.stringify(newAlbum),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormData({ title: "", description: "" });
      setFiles([]);
      await loadAlbums();
    } catch (err) {
      console.error(err);
      alert("Error adding album");
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id: string) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      await apiFetch(`/api/gallery/${id}`, { method: "DELETE" });
      setAlbums((prev) => prev.filter((album) => album._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete album");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Gallery
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Upload and organize photo albums
          </p>
        </div>
        <Link to="/admin" className="btn-secondary group">
          <span className="flex items-center">â† Back to Dashboard</span>
        </Link>
      </div>

      {error && (
        <div className="alert-error">
          <p>{error}</p>
        </div>
      )}

      <div className="card-glass p-8 rounded-3xl shadow-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">
          Add New Album
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Album Title"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-md disabled:opacity-50"
          >
            {loading ? "Uploading & Adding..." : "Add Album"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Albums
        </h2>
        {albums.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No albums found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr
                    key={album._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-2 px-4 border font-medium text-gray-800 dark:text-white">
                      {album.title}
                    </td>
                    <td className="py-2 px-4 border text-gray-800 dark:text-gray-100">
                      {album.description}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => deleteAlbum(album._id)}
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

export default AdminGallery;

