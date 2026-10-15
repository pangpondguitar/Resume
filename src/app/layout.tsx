import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Srattra Songrit — Web Developer Fullstack",
  description:
    "Portfolio and resume of Srattra Songrit, a full-stack web developer working with Next.js, React, Vue.js, Laravel and AWS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${dmSans.variable} ${plexThai.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
