import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/admin"
          className="text-2xl font-bold text-white tracking-wide"
        >
          Admin Panel
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/admin/sermons" className="hover:text-blue-400 transition">
            Sermons
          </Link>
          <Link to="/admin/events" className="hover:text-green-400 transition">
            Events
          </Link>
          <Link
            to="/admin/gallery"
            className="hover:text-purple-400 transition"
          >
            Gallery
          </Link>
          <Link
            to="/admin/testimonials"
            className="hover:text-orange-400 transition"
          >
            Testimonials
          </Link>
          <Link
            to="/admin/livestream"
            className="hover:text-red-400 transition"
          >
            Live Stream
          </Link>
          <Link
            to="/admin/settings"
            className="hover:text-yellow-400 transition"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
