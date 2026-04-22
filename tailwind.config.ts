import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F58220",
          dark: "#E47E1A",
          light: "#FEF3E2",
        },
        dark: {
          DEFAULT: "#212529",
          secondary: "#495057",
          muted: "#6C757D",
        },
        surface: {
          DEFAULT: "#F8F9FA",
          alt: "#F0F2F5",
          white: "#FFFFFF",
        },
        border: {
          DEFAULT: "#DEE2E6",
          light: "#E9ECEF",
        },
        success: "#28A745",
        error: "#DC3545",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        "display-sm": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "heading-lg": ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["1.375rem", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      spacing: {
        "section-y": "5rem",
        "section-y-sm": "3rem",
        "container-x": "1.5rem",
      },
      maxWidth: {
        "container": "1200px",
        "container-sm": "960px",
        "container-xs": "720px",
      },
      borderRadius: {
        "card": "1rem",
        "pill": "9999px",
        "btn": "0.5rem",
      },
      boxShadow: {
        "card": "0 2px 16px 0 rgba(33,37,41,0.08)",
        "card-hover": "0 8px 32px 0 rgba(33,37,41,0.14)",
        "nav": "0 2px 12px 0 rgba(33,37,41,0.1)",
        "btn": "0 2px 8px 0 rgba(245,130,32,0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
};

export default config;
