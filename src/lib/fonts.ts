import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Montserrat,
  Noto_Sans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontNotoSans = Noto_Sans({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--noto-sans",
  display: "swap",
})
