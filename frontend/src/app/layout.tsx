import type { Metadata } from "next";
import { constants } from "@/constants/constants";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RidePhalt",
  description: "Blockchain based ride sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${constants.GoogleMapsApiKey}&libraries=places`}
        ></script>
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
