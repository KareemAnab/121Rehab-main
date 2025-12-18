import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "121Rehab – Physical Therapy Clinic",
  description:
    "In-clinic and online physical therapy. Personalized care, convenient scheduling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-neutral-900 bg-white min-h-screen flex flex-col`}
      >
        <Header />

        <main className="flex-1 bg-neutral-50">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
