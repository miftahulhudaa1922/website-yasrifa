import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import Providers from "@/components/providers";
import { Toaster } from "sonner"
import PageLoaderClient from "@/components/PageLoaderClient";
import RouteLoader from "@/components/RouteLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yasrifa",
  description: "Yayasan Riyadlatul Falahin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <Providers>
        <Navbar />
        <PageLoaderClient>
          <RouteLoader>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        </RouteLoader>
        </PageLoaderClient>
        <Footer />
        <Toaster />
        </Providers>
      </body>
    </html>
  );
}
