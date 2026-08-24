import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phidanghai-portfolio.vercel.app"),
  title: "Đặng Hải Phi | Fullstack & Backend Developer Intern",
  description:
    "Portfolio của Đặng Hải Phi — Sinh viên năm 4 HUFLIT. Chuyên môn ASP.NET Core, Next.js, 12 GoF Design Patterns, 50+ RESTful APIs, và Automation Testing với Selenium.",
  keywords: [
    "Đặng Hải Phi",
    "Fullstack Developer",
    "Backend Intern",
    "ASP.NET Core",
    "Next.js",
    "Portfolio",
    "HUFLIT",
    "GoF Design Patterns",
    "Selenium Testing",
    "Internship",
  ],
  authors: [{ name: "Đặng Hải Phi", url: "https://github.com/phidanghai-spec" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://phidanghai-portfolio.vercel.app",
    siteName: "Đặng Hải Phi — Portfolio",
    title: "Đặng Hải Phi | Fullstack & Backend Developer Intern",
    description:
      "Sinh viên năm 4 HUFLIT. 50+ RESTful APIs, 12 GoF Design Patterns, 100/100 Lighthouse SEO, Automation Testing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Đặng Hải Phi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đặng Hải Phi | Fullstack & Backend Developer Intern",
    description:
      "Sinh viên năm 4 HUFLIT. 50+ RESTful APIs, 12 GoF Design Patterns, 100/100 Lighthouse SEO.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-[#070d19] text-slate-200 selection:bg-teal-500/30 selection:text-teal-200`}
      >
        {children}
      </body>
    </html>
  );
}
