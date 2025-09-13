import type { Metadata } from "next";
<<<<<<< HEAD
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Twinly - AI that drafts your responses instantly",
  description: "AI that drafts your responses instantly, in your tone, so you never have to stress about what to say again.",
=======
import "./globals.css";

export const metadata: Metadata = {
  title: "Twinly - AI that drafts your responses instantly",
  description:
    "AI that drafts your responses instantly, in your tone, so you never have to stress about what to say again.",
>>>>>>> e15fe06 (Initial commit)
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
=======
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@100,300,400,500,600,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Global monochrome theme */}
      <body className="font-sans antialiased mono">
>>>>>>> e15fe06 (Initial commit)
        {children}
      </body>
    </html>
  );
}
