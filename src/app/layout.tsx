import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { fontNotoSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Menu } from "@/components/menu";
import { StyleSwitcher } from "@/components/style-switcher";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  icons: {
    shortcut: ["#"],
  },
  description: "A Next.js starter styled with Tailwind CSS.",
  title: "Next.js Tailwind Starter",
};

export default function MyApp({ children }: LayoutProps) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className='overflow-clip bg-black'
    >
      <head />
      <body
        className='overflow-clip bg-transparent antialiased scrollbar-none'
        style={{
          fontFamily: fontNotoSans.style.fontFamily,
          fontWeight: 500,
          fontSize: "18px",
        }}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          <div className='h-screen overflow-clip '>
            <Menu />
            <div
              className={cn(
                "h-screen overflow-auto border-t bg-background pb-8"
              )}
            >
              {children}
            </div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
        <StyleSwitcher />
      </body>
    </html>
  );
}
