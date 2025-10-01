import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  featuredImage?: string;
  slug: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = (await apiFetch("/api/blog")) as any;
        setPosts(data.data || data || []);
      } catch (err) {
        setError("Failed to load blog posts");
      }
    };
    loadPosts();
  }, []);

  const deletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await apiFetch(`/api/blog/${slug}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((post) => post.slug !== slug));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Blog Posts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create and manage your blog content
          </p>
        </div>
        <Link
          to="/admin/blog/new"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold group"
        >
          <span className="flex items-center">+ New Post</span>
        </Link>
      </div>
      {error && (
        <div className="alert-error">
          <p>{error}</p>
        </div>
      )}
      <div className="card-glass rounded-2xl overflow-hidden shadow-2xl">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">
                Title
              </th>
              <th className="py-4 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">
                Author
              </th>
              <th className="py-4 px-6 text-left font-semibold text-slate-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post._id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-4 px-6 text-slate-900 dark:text-slate-100 font-medium">
                  {post.title}
                </td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                  {post.author}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/blog/edit/${post.slug}`)}
                      className="btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="btn-sm bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;
