import "./globals.css";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "KEmunITa",
  icons: {
    icon: "/icon.png",
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
