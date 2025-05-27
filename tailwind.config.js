export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "twitch-purple": "#9146FF",
        "twitch-dark": "#0E0E10",
        "twitch-light": "#18181B",
        "twitch-accent": "#772CE8",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
