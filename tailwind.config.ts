import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // Reduced padding for a tighter, modern look
        sm: "1rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1440px", // Slightly larger max-width for modern layouts
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lion: {
          gold: "#D4AF37",
          lightgold: "#F5D76E",
          darkgold: "#996515",
          black: "#1A1A1A",
          darkgray: "#333333",
          gray: "#555555",
          lightgray: "#CCCCCC",
          // Added modern accent colors
          teal: "#38B2AC", // Soft teal for modern accents
          coral: "#F687B3", // Warm coral for highlights
          ivory: "#F8F1E9", // Off-white for backgrounds
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // Added system-ui for better fallback
        display: ["Playfair Display", "serif"],
        heading: ["Poppins", "sans-serif"], // Modern, geometric font for headings
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)", // Slightly larger default radius for a softer look
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      boxShadow: {
        // Added modern shadow utilities for depth
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        // Added global transition for smoother hover effects
        "all-ease": "all",
      },
      transitionDuration: {
        DEFAULT: "300ms", // Smooth default transition duration
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", // Modern easing for transitions
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)", scale: "0.98" }, // Added slight scale for depth
          "100%": { opacity: "1", transform: "translateY(0)", scale: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // New animations for a modern feel
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out", // Slightly slower for smoothness
        "accordion-up": "accordion-up 0.3s ease-out",
        fadeIn: "fadeIn 0.6s ease-out forwards", // Slightly slower for elegance
        fadeOut: "fadeOut 0.5s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        slideInLeft: "slideInLeft 0.5s ease-out forwards",
        bounce: "bounce 0.8s ease-in-out",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;