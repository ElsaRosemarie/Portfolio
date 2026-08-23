import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteJsonLd from "@/components/SiteJsonLd";
import { content } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-mulish",
});

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  description: content.siteDescription,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className={`${mulish.className} flex min-h-screen flex-col`}>
        <SiteJsonLd />
        <Header />
        <main className="flex-1 pt-4 md:pt-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
