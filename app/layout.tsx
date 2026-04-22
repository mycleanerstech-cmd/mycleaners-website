import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyCleaners — India's Largest Dry Clean And Laundry Chain",
    template: "%s | MyCleaners",
  },
  description:
    "India's 1st organized chain of dry cleaning and laundry services. Pickup & delivery 7 days a week at your doorstep across 50+ cities.",
  metadataBase: new URL("https://www.mycleaners.in"),
  icons: {
    icon: "/favicon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
