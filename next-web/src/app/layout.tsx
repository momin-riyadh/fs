import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast";
import { CommonLayout } from "@/components/common-layout";

// Configure the primary and mono fonts for the app.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Default metadata for the app shell.
export const metadata: Metadata = {
  title: "Contacts Desk",
  description: "Simple contacts manager for name and phone numbers",
};

/**
 * App root layout with global font variables and styling.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <ToastProvider>
          <CommonLayout>{children}</CommonLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
