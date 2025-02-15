import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Providers } from "./provider";

import LoadingIndicator from "@/components/LoadingIndicator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthInitializer from "@/components/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogSpace",
  description: "Share Your Stories, Connect with the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LoadingIndicator />
          <AuthInitializer>
            <Navbar />
            {children}
          </AuthInitializer>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
