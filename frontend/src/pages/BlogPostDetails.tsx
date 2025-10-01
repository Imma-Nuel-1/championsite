import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useParams } from "react-router-dom";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  featuredImage?: string;
  createdAt: string;
}

const BlogPostDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = (await apiFetch(`/api/blog/${slug}`)) as { data: any };
        setPost(data.data);
      } catch (err) {
        setError("Blog post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading post...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPostDetails;
