// 🎨 CHAMPION SITE - ULTRA-MODERN TAILWIND CONFIG
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // 🎨 PREMIUM COLOR SYSTEM
      colors: {
        // Primary - Soft Blue Palette
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae1fd",
          300: "#7cc8fb",
          400: "#4A90E2", // Main Primary - New Brand Blue
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8", // Deep Primary
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },

        // Accent - Vibrant Orange Palette
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF7A00", // Main Accent - New Brand Orange
          600: "#ea580c", // Deep Accent
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },

        // Legacy colors for backward compatibility
        navy: "#4A90E2", // Updated to new brand blue
        gold: "#FF7A00", // Updated to new brand orange
        ash: "#737373", // Keep neutral gray

        // Semantic colors
        success: {
          500: "#10b981",
          600: "#059669",
        },
        warning: {
          500: "#FF7A00", // Use new brand orange
          600: "#ea580c",
        },
        error: {
          500: "#ef4444",
          600: "#dc2626",
        },
        info: {
          500: "#4A90E2", // Use new brand blue
          600: "#2563eb",
        },
      },

      // 🌈 GRADIENTS
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4A90E2 0%, #2563eb 100%)", // New blue gradient
        "gradient-accent": "linear-gradient(135deg, #FF7A00 0%, #ea580c 100%)", // New orange gradient
        "gradient-hero":
          "linear-gradient(135deg, #1e3a8a 0%, #4A90E2 50%, #bae1fd 100%)", // New blue hero gradient
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // 📝 TYPOGRAPHY
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Inter", ...fontFamily.sans],
        mono: ["JetBrains Mono", "Fira Code", ...fontFamily.mono],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      // 🎭 SHADOWS
      boxShadow: {
        glow: "0 0 20px rgba(14, 165, 233, 0.3)",
        "glow-accent": "0 0 20px rgba(245, 158, 11, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
        neumorphism:
          "8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)",
        "neumorphism-dark":
          "8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05)",
      },

      // 📐 BORDER RADIUS
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "3rem",
      },

      // ⚡ ANIMATIONS
      animation: {
        "slide-up": "slideUp 0.6s ease-out",
        "slide-left": "slideLeft 0.6s ease-out",
        "fade-scale": "fadeScale 0.6s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "bounce-slow": "bounce 2s infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)" },
        },
      },

      // 📏 SPACING
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // 🎪 BACKDROP
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },

      // 🎯 Z-INDEX
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    // Custom plugin for design system utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-gradient-primary": {
          background: theme("backgroundImage.gradient-primary"),
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-accent": {
          background: theme("backgroundImage.gradient-accent"),
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(20px)",
          "-webkit-backdrop-filter": "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".hover-lift": {
          transition:
            "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            "box-shadow": theme("boxShadow.xl"),
          },
        },
        ".hover-glow": {
          transition: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            "box-shadow": theme("boxShadow.glow"),
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
