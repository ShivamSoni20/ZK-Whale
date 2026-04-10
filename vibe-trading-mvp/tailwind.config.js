/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0E1A",
        card: "rgba(13, 27, 42, 0.8)",
        "card-elevated": "#1A2744",
        cyan: {
          DEFAULT: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.3)",
        },
        purple: {
          DEFAULT: "#7B61FF",
          glow: "rgba(123, 97, 255, 0.3)",
        },
        success: "#00E5A0",
        warning: "#FF7043",
        text: {
          primary: "#E8F4FF",
          secondary: "#8899BB",
        },
        border: "#1E3A5F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "terminal-cursor": "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "grid-move": "gridMove 20s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 212, 255, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" },
        },
        blink: {
          "from, to": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
      },
    },
  },
  plugins: [],
};
