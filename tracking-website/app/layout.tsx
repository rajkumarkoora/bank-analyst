import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Package Tracking System",
  description: "Track your packages and shipments in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
