import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

interface BlogPostFormState {
  title: string;
  content: string;
  author: string;
  tags: string; // Join/split tags for the input field
  featuredImage?: string;
}

const BlogPostForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BlogPostFormState>({
    title: '',
    content: '',
    author: 'Admin',
    tags: '',
    featuredImage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(slug);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const data = await apiFetch(`/api/blog/${slug}`);
          setFormData({
            ...data.data,
            tags: data.data.tags.join(', '),
          });
        } catch (err) {
          setError('Failed to load post for editing');
        }
      };
      fetchPost();
    }
  }, [slug, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      if (isEditing) {
        await apiFetch(`/api/blog/${slug}`, {
          method: 'PUT',
          body: JSON.stringify(postData),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        await apiFetch('/api/blog', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      navigate('/admin/blog');
    } catch (err) {
      setError('Failed to save the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-2 border rounded" required />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content (Markdown supported)" rows={10} className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="w-full px-4 py-2 border rounded" />
        <input type="text" name="featuredImage" value={formData.featuredImage} onChange={handleChange} placeholder="Featured Image URL" className="w-full px-4 py-2 border rounded" />
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/admin/blog')} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;

