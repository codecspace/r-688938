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
          // Editorial luxury palette — paper, ink, and gold used sparingly
          gold: "#C9A84C",
          lightgold: "#F0D78C",
          darkgold: "#8F7328",
          black: "#0D0D0D",
          obsidian: "#0A0A0A", // Full-bleed noir chapters
          darkgray: "#2D2D2D",
          gray: "#585652",
          lightgray: "#D8D4CC",
          ivory: "#F5F3EE", // Paper base
          paper: "#F5F3EE",
          paper2: "#E8E4DD", // Second paper tone for banding
          ink: "#1A1A1A", // Body text on paper
          stone: "#77736C", // Muted secondary text
        },
      },
      fontFamily: {
        sans: ['"Work Sans"', "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
        heading: ['"Instrument Serif"', "Georgia", "serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2.25rem, 5vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.75rem, 7vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3.25rem, 10vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        lg: "var(--radius, 0.25rem)", // Editorial: near-square corners
        md: "calc(var(--radius, 0.25rem) - 1px)",
        sm: "calc(var(--radius, 0.25rem) - 2px)",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)",
        editorial: "0 30px 60px -30px rgba(13, 13, 13, 0.35)",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;