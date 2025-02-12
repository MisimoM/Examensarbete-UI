import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#326453',
        'secondary': '#CA7373',
        'dark-green': '#214237',
        'off-white': '#F5F1EE'
      },
      fontFamily: {
        figtree: ['var(--font-figtree)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
