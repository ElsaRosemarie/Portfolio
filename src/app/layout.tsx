import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "Elsa van Dam — Illustration",
  description:
    "Portfolio of Elsa van Dam — illustration, research, and workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className={`${mulish.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
