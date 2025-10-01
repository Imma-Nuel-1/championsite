import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Welcome back! Choose an action below to manage your church content:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Sermons",
            description: "Manage sermon recordings and details",
            link: "/admin/sermons",
            icon: (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            ),
            color:
              "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-white",
          },
          {
            title: "Events",
            description: "Manage upcoming church events",
            link: "/admin/events",
            icon: (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            ),
            color: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white",
          },
          {
            title: "Gallery",
            description: "Manage gallery images",
            link: "/admin/gallery",
            icon: (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m5 5l-5-5"
                />
              </svg>
            ),
            color:
              "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-white",
          },
          {
            title: "Testimonials",
            description: "Manage testimonials and reviews",
            link: "/admin/testimonials",
            icon: (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            ),
            color:
              "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-white",
          },
          {
            title: "Blog",
            description: "Manage blog posts and articles",
            link: "/admin/blog",
            icon: (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            ),
            color: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white",
          },
        ].map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group card-hover bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 p-8 rounded-3xl shadow-glow border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                className={`p-4 rounded-2xl ${card.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
