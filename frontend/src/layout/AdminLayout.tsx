import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const cn = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { pathname } = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // clears localStorage + state
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 shadow-glow border-r border-gray-200/50 dark:border-gray-700/50 px-6 py-8 flex flex-col space-y-4">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src="https://res.cloudinary.com/dvr3sk23p/image/upload/v1751980409/COC_logo_eneb3x.jpg"
            alt="RCCG City of Champions"
            className="w-10 h-10 rounded-xl object-cover shadow-lg"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Church Admin
          </h1>
        </div>
        <nav className="flex flex-col space-y-3 text-sm flex-1">
          <Link
            to="/admin"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/sermons"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/sermons" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Sermons
          </Link>
          <Link
            to="/admin/events"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/events" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Events
          </Link>
          <Link
            to="/admin/livestream"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/livestream" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Live Stream
          </Link>
          <Link
            to="/admin/gallery"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/gallery" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Gallery
          </Link>
          <Link
            to="/admin/testimonials"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/testimonials" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Testimonials
          </Link>
          <Link
            to="/admin/blog"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/blog" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Blog
          </Link>
          <Link
            to="/admin/profile"
            className={cn(
              "px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300 group flex items-center space-x-3",
              pathname === "/admin/profile" &&
                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            )}
          >
            Profile
          </Link>
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 font-medium"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-8 overflow-auto relative">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
