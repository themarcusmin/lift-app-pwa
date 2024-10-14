import defaultTheme from "tailwindcss/defaultTheme"
import formsPlugin from "@tailwindcss/forms"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryYellow: "#FFB801",
        secondaryYellow: "#FBD269",
        primaryOrange: "#FD5A00",
        customYellow: "#FBD269",
        customYellowHover: "#FFE8AF",
        primaryPurple: "#C9A0FF",
        secondaryPurple: "#8862B7",
        primaryGray: "#C5C5C5",
        primaryBg: "#0F1016",
        secondaryBg: "#232531",
        pastelBlue: "#9CA5DB",
        orangeRed: "#EB6949"
      },
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
        poiret: ["Poiret One", "cursive"]
      }
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [formsPlugin]
}
