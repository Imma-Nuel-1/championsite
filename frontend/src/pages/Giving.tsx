import { Link } from "react-router-dom";
import {
  FaCreditCard,
  FaHeart,
  FaChurch,
  FaGift,
  FaPiggyBank,
  FaHandsHelping,
} from "react-icons/fa";

const Giving = () => {
  const givingMethods = [
    {
      icon: <FaCreditCard className="text-3xl text-gold" />,
      title: "Online Giving",
      description: "Secure, convenient online donations available 24/7",
      status: "Coming Soon",
    },
    {
      icon: <FaPiggyBank className="text-3xl text-gold" />,
      title: "Bank Transfer",
      description: "Direct bank transfers for one-time or recurring gifts",
      details: "Account details available upon request",
    },
    {
      icon: <FaGift className="text-3xl text-gold" />,
      title: "In-Person Giving",
      description: "Traditional offering during Sunday services",
      details: "Every Sunday during worship",
    },
  ];

  const impactAreas = [
    {
      icon: <FaChurch />,
      title: "Church Operations",
      description: "Facility maintenance and utilities",
    },
    {
      icon: <FaHeart />,
      title: "Community Outreach",
      description: "Supporting local families in need",
    },
    {
      icon: <FaHandsHelping />,
      title: "Missions",
      description: "Spreading the Gospel worldwide",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div
          >
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-gold to-yellow-500 text-navy px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                Generous Giving
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-navy via-blue-800 to-navy bg-clip-text text-transparent mb-6">
              Partner With Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Your generous giving enables us to spread God's love, support our
              community, and advance His kingdom. Every gift, no matter the
              size, makes a difference.
            </p>
            <div className="bg-navy/5 dark:bg-navy/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-navy dark:text-gold font-medium italic">
                "Each of you should give what you have decided in your heart to
                give, not reluctantly or under compulsion, for God loves a
                cheerful giver."
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                - 2 Corinthians 9:7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Ways to Give
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the giving method that works best for you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {givingMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-4 text-center">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {method.description}
                </p>
                {method.status && (
                  <div className="text-center">
                    <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium">
                      {method.status}
                    </span>
                  </div>
                )}
                {method.details && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 px-4 bg-navy/5 dark:bg-navy/10">
        <div className="container mx-auto max-w-6xl">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Your Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how your generous giving makes a difference in our community
              and beyond
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gold text-xl">{area.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy dark:text-white">
                    {area.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div
            className="bg-gradient-to-r from-navy to-blue-800 rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About Giving?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Our team is here to help you understand how your giving can make
              the greatest impact.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gold hover:bg-yellow-500 text-navy font-semibold px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Giving;

