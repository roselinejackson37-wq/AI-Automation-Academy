/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F1A",
        panel: "#131A2B",
        panel2: "#1B2338",
        line: "#2A3350",
        text: "#EDEFF5",
        dim: "#9AA3B8",
        amber: "#FFB454",
        teal: "#4FD8C4",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "14px",
      },
    },
  },
  plugins: [],
};
