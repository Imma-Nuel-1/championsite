import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import { Link } from 'react-router-dom';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  featuredImage?: string;
  slug: string;
  createdAt: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await apiFetch(`/api/blog?page=${page}&limit=5`);
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  if (loading) return <div className="text-center py-10">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Our Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover" />}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">{post.title}</Link>
              </h2>
              <p className="text-gray-600 mb-4">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }} />
              <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline mt-4 inline-block">Read More</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span className="px-4 py-2 mx-1">Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default BlogPage;

