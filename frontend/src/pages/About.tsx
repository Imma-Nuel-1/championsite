import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaCross,
  FaEye,
  FaBullseye,
  FaHandHoldingHeart,
  FaUsers,
} from "react-icons/fa";

const Section = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};
const ImageContainer = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stackImages = useMemo(
    () => [
      {
        src: "https://res.cloudinary.com/dvr3sk23p/image/upload/v1751980409/COC_logo_eneb3x.jpg",
        alt: "City of Champions Church Logo - RCCG Parish",
        title: "Church Logo",
      },
      {
        src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop",
        alt: "Beautiful church interior with rows of wooden pews and stained glass windows",
        title: "Church Interior",
      },
      {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
        alt: "Modern church exterior building with cross and welcoming entrance",
        title: "Church Exterior",
      },
      {
        src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
        alt: "Congregation with hands raised in worship and praise during service",
        title: "Worship Service",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Church community members holding hands in prayer circle",
        title: "Prayer Circle",
      },
      {
        src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
        alt: "Diverse community gathering together in fellowship and unity",
        title: "Community Gathering",
      },
    ],
    []
  );

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % stackImages.length);
  }, [stackImages.length]);

  const selectImage = useCallback((index: number) => {
    setCurrentImage(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const getAnimationProps = useCallback(
    (index: number, currentIndex: number, totalImages: number) => {
      const isActive = index === currentIndex;
      const offset = (index - currentIndex + totalImages) % totalImages;

      const baseTransition = {
        duration: 0.9,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      };

      if (isActive) {
        return {
          scale: 1,
          opacity: 1,
          zIndex: 20,
          rotateY: -8,
          rotateX: 0,
          rotateZ: -3,
          x: 0,
          y: -10,
          transition: baseTransition,
        };
      } else if (offset === 1) {
        return {
          scale: 0.8,
          opacity: 0.15,
          zIndex: 9,
          rotateY: -12,
          rotateX: 2,
          rotateZ: -5,
          x: 80,
          y: 20,
          transition: baseTransition,
        };
      } else if (offset === 2) {
        return {
          scale: 0.7,
          opacity: 0.08,
          zIndex: 8,
          rotateY: -16,
          rotateX: 3,
          rotateZ: -7,
          x: 120,
          y: 40,
          transition: baseTransition,
        };
      } else if (offset === totalImages - 1) {
        return {
          scale: 0.75,
          opacity: 0.12,
          zIndex: 8,
          rotateY: -4,
          rotateX: 2,
          rotateZ: -1,
          x: -85,
          y: 25,
          transition: baseTransition,
        };
      } else if (offset === totalImages - 2) {
        return {
          scale: 0.65,
          opacity: 0.06,
          zIndex: 7,
          rotateY: 0,
          rotateX: 3,
          rotateZ: 1,
          x: -125,
          y: 45,
          transition: baseTransition,
        };
      } else {
        const depth = Math.min(offset, totalImages - offset);
        return {
          scale: Math.max(0.5 - depth * 0.05, 0.3),
          opacity: Math.max(0.04 - depth * 0.02, 0.01),
          zIndex: Math.max(6 - depth, 0),
          rotateY: offset > 3 ? 4 : -20,
          rotateX: 4 + depth * 0.5,
          rotateZ: offset > 3 ? 3 : -9,
          x: offset > 3 ? -150 - depth * 15 : 150 + depth * 15,
          y: 50 + depth * 15,
          transition: baseTransition,
        };
      }
    },
    []
  );

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage, isAutoPlaying]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-[450px] w-full max-w-lg mx-auto flex justify-center items-center"
      style={{ perspective: "1500px" }}
      role="img"
      aria-label="Church image carousel showcase"
    >
      {/* Angled Stacked Images Container */}
      <div
        className="relative w-full h-full"
        aria-live="polite"
        style={{
          transform: "rotateX(5deg) rotateY(-2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {stackImages.map((image, index) => {
          const isActive = index === currentImage;
          const animateProps = getAnimationProps(
            index,
            currentImage,
            stackImages.length
          );

          return (
            <motion.div
              key={`image-${index}`}
              className="absolute inset-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
              animate={animateProps}
              whileHover={isActive ? { scale: 1.02 } : undefined}
              onClick={() => selectImage(index)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectImage(index);
                }
              }}
              tabIndex={isActive ? 0 : -1}
              role="button"
              aria-label={`View ${image.title} - Image ${index + 1} of ${
                stackImages.length
              }`}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Multiple thick backing layers for active image - 2x thickness */}
                {isActive && (
                  <>
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 1 }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 2, transform: "translateZ(1px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 3, transform: "translateZ(2px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 4, transform: "translateZ(3px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 5, transform: "translateZ(4px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 6, transform: "translateZ(5px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 7, transform: "translateZ(6px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 8, transform: "translateZ(7px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 9, transform: "translateZ(8px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-900 rounded-2xl"
                      style={{ zIndex: 10, transform: "translateZ(9px)" }}
                      aria-hidden="true"
                    />
                  </>
                )}

                <img
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  className="w-full h-full object-cover relative z-10"
                  loading={index <= 2 ? "eager" : "lazy"}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${image.src}`);
                    e.currentTarget.src = stackImages[0].src;
                    e.currentTarget.alt =
                      "City of Champions Church - Fallback Image";
                  }}
                />

                {/* Gradient overlay for depth */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 z-20 ${
                    isActive
                      ? "from-black/10 via-transparent to-transparent"
                      : "from-black/30 via-black/10 to-black/5"
                  }`}
                  aria-hidden="true"
                />

                {/* Enhanced shadow for angled 3D effect */}
                <div
                  className="absolute inset-0 shadow-2xl rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: isActive
                      ? "0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.3)"
                      : "0 20px 40px -8px rgba(0, 0, 0, 0.7), 0 12px 24px -12px rgba(0, 0, 0, 0.4)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Indicator dots hidden as requested */}
    </motion.div>
  );
};

const About = () => {
  const beliefs = useMemo(
    () => [
      {
        icon: <FaCross className="text-gray-900 text-3xl" aria-hidden="true" />,
        title: "Our Beliefs",
        text: "We believe in the Holy Trinity, the divinity of Jesus Christ, and the authority of the Holy Scripture.",
      },
      {
        icon: <FaEye className="text-gray-900 text-3xl" aria-hidden="true" />,
        title: "Our Vision",
        text: "To make heaven. To take as many people as possible with us. To have a member of RCCG in every family of all nations.",
      },
      {
        icon: (
          <FaBullseye className="text-gray-900 text-3xl" aria-hidden="true" />
        ),
        title: "Our Mission",
        text: "To accomplish our vision, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.",
      },
      {
        icon: (
          <FaHandHoldingHeart
            className="text-gray-900 text-3xl"
            aria-hidden="true"
          />
        ),
        title: "Our Values",
        text: "We are committed to a life of holiness, service, and love for one another, reflecting the character of Christ in all we do.",
      },
    ],
    []
  );

  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 text-gray-800 dark:text-gray-100 overflow-x-hidden relative">
      {/* SEO Meta Information */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Church",
            name: "RCCG City of Champions",
            description:
              "A vibrant community of faith dedicated to growing in the knowledge of God, serving our neighbors with love, and spreading the life-changing gospel of Jesus Christ.",
            denomination: "Redeemed Christian Church of God (RCCG)",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Your City",
              addressRegion: "Your State",
              addressCountry: "US",
            },
          }),
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <Section>
        <header className="relative container-section section-padding text-center">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient-primary"
          >
            About City of{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Champions
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-3xl mx-auto leading-relaxed text-lg"
          >
            Welcome to RCCG – City of Champions, a vibrant community of faith
            dedicated to growing in the knowledge of God, serving our neighbors
            with love, and spreading the life-changing gospel of Jesus Christ.
          </motion.p>
        </header>
      </Section>

      {/* Beliefs Section */}
      <Section>
        <div className="relative py-20 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <div className="container-section">
            <h2 className="sr-only">Our Core Beliefs and Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {beliefs.map((item, index) => (
                <motion.article
                  key={`belief-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group text-center p-8 card-glass rounded-3xl shadow-glow hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-white/20"
                >
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Our Story Section */}
      <Section>
        <div className="container mx-auto py-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.article
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="leading-relaxed mb-4 text-lg">
                City of Champions was planted with a divine mandate to raise a
                generation of believers who are victorious in every sphere of
                life. From humble beginnings, our church has grown into a
                thriving family, united by a shared passion for God and a desire
                to impact our community for His glory.
              </p>
              <p className="leading-relaxed text-lg">
                We are a parish of the Redeemed Christian Church of God (RCCG),
                one of the largest and fastest-growing Pentecostal churches in
                the world.
              </p>
            </motion.article>
            <aside aria-label="Church image gallery">
              <ImageContainer />
            </aside>
          </div>
        </div>
      </Section>

      {/* Join Us Section */}
      <Section>
        <div className="bg-purple-700 text-white">
          <div className="container mx-auto py-20 px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <FaUsers
                className="text-5xl mx-auto mb-4 text-purple-300"
                aria-hidden="true"
              />
              <h2 className="text-4xl font-bold mb-4">Join Our Family</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-purple-100">
                We invite you to be a part of our church family. Whether you are
                new to the faith or seeking a new church home, you are welcome
                here.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                style={{
                  position: "relative",
                  zIndex: 1000,
                  pointerEvents: "auto",
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Visit our church - Go to contact page"
              >
                Visit Us
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default About;
