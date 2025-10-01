import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Pastors from "./pages/Pastors";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Livestream from "./pages/Livestream";
import PrayerRequest from "./pages/PrayerRequest";
import Giving from "./pages/Giving";
import Gallery from "./pages/Gallery";
import Album from "./pages/Album";
import AdminGallery from "./pages/AdminGallery";
import BlogPage from "./pages/BlogPage";
import BlogPostDetails from "./pages/BlogPostDetails";
import AdminBlog from "./pages/AdminBlog";
import BlogPostForm from "./pages/BlogPostForm";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import Volunteer from "./pages/Volunteer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSermons from "./pages/AdminSermons";
import AdminEvents from "./pages/AdminEvents";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminLivestream from "./pages/AdminLivestream";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import EventDetails from "./pages/EventDetails";
import Testimonials from "./pages/Testimonials";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col font-sans text-navy dark:text-white bg-white dark:bg-navy transition-colors duration-300">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pastors" element={<Pastors />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/prayer-request" element={<PrayerRequest />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<Album />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sermons"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSermons />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminEvents />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminGallery />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBlog />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BlogPostForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/edit/:slug"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BlogPostForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminTestimonials />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/livestream"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminLivestream />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="p-20 text-center">404 â€“ Page Not Found</div>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
