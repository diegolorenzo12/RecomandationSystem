import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark": "#18181B",
        "lightdark": "#424242",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "#047AA3",
        },
      },
      dark: {
        colors: {
          primary: "#047AA3",
        },
      },
    },
  })],
}
export default config
