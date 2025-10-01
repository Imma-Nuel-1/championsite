import {
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaHeart,
  FaUsers,
  FaBible,
} from "react-icons/fa";

const pastors = [
  {
    id: 1,
    name: "Pastor John Smith",
    title: "Senior Pastor & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Pastor John founded City of Champions in 2015 with a vision to create a church where people could encounter God's presence and discover their purpose. With over 15 years in ministry, he brings a passionate heart for evangelism and discipleship. He holds a Master of Divinity from Dallas Theological Seminary and has been married to his wife Sarah for 12 years. Together they have three children.",
    specialties: ["Church Planting", "Evangelism", "Leadership Development"],
    education: "M.Div, Dallas Theological Seminary",
    yearsInMinistry: "15+",
    email: "pastor.john@cityofchampions.org",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "Pastor Sarah Smith",
    title: "Associate Pastor & Women's Ministry Leader",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b98c?w=400&h=400&fit=crop&crop=face",
    bio: "Pastor Sarah leads our women's ministry and serves as Associate Pastor, bringing a heart for pastoral care and community building. She has a special calling to mentor women and families, helping them grow in their faith journey. She holds a Bachelor's in Biblical Studies and is pursuing her Master's in Christian Counseling.",
    specialties: ["Women's Ministry", "Pastoral Care", "Family Counseling"],
    education:
      "B.A. Biblical Studies, Currently pursuing M.A. Christian Counseling",
    yearsInMinistry: "12+",
    email: "pastor.sarah@cityofchampions.org",
    phone: "(555) 123-4568",
  },
  {
    id: 3,
    name: "Pastor Michael Johnson",
    title: "Youth Pastor",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Pastor Michael joined our team in 2018 and has been instrumental in building our thriving youth ministry. His energy and passion for reaching the next generation is contagious. He previously served in youth ministry for 8 years before joining City of Champions. He and his wife Lisa have two teenage children.",
    specialties: ["Youth Ministry", "Worship Leading", "Missions"],
    education: "B.A. Youth Ministry, Liberty University",
    yearsInMinistry: "10+",
    email: "pastor.michael@cityofchampions.org",
    phone: "(555) 123-4569",
  },
];

// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   }),
// };

const Pastors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-20">
        <div className="container-section text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Pastoral Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              God has blessed us with passionate leaders who are committed to
              serving Him and guiding our church family.
            </p>
          </div>
        </div>
      </section>

      {/* Pastors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
            {pastors.map((pastor) => (
              <div
                key={pastor.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="text-center md:text-left">
                    <img
                      src={pastor.image}
                      alt={pastor.name}
                      className="w-48 h-48 mx-auto md:mx-0 rounded-full object-cover shadow-lg mb-6"
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-purple-600">
                        <FaEnvelope />
                        <a
                          href={`mailto:${pastor.email}`}
                          className="hover:underline"
                        >
                          {pastor.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-purple-600">
                        <FaPhone />
                        <a
                          href={`tel:${pastor.phone}`}
                          className="hover:underline"
                        >
                          {pastor.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {pastor.name}
                      </h2>
                      <p className="text-lg text-purple-600 font-semibold">
                        {pastor.title}
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {pastor.bio}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaBible className="text-purple-600" />
                          <span className="font-semibold text-gray-800">
                            Years in Ministry
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {pastor.yearsInMinistry}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaGraduationCap className="text-purple-600" />
                          <span className="font-semibold text-gray-800">
                            Education
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {pastor.education}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaHeart className="text-purple-600" />
                        <span className="font-semibold text-gray-800">
                          Ministry Focus
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pastor.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div>
            <FaUsers className="text-5xl mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We'd Love to Connect With You
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Our pastoral team is here to support you on your spiritual
              journey. Don't hesitate to reach out if you need prayer, guidance,
              or just want to chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  console.log(
                    "Contact Us button clicked - navigating to /contact"
                  );
                  window.location.href = "/contact";
                }}
              >
                Contact Us
              </button>
              <button
                type="button"
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-purple-600 transition-colors cursor-pointer"
                onClick={() => {
                  console.log(
                    "Request Prayer button clicked - navigating to /prayer-request"
                  );
                  window.location.href = "/prayer-request";
                }}
              >
                Request Prayer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pastors;
