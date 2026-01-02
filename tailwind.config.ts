import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        layout: '1440px', 
      },
    },
  },
  plugins: [],
}

export default config
