import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pagani-huayra-bc.local"),
  title: {
    default: "Pagani Huayra BC Macchina Volante",
    template: "%s | Pagani Huayra BC",
  },
  description:
    "A scroll-controlled luxury showcase for the Pagani Huayra BC Macchina Volante.",
  applicationName: "Pagani Huayra BC",
  keywords: [
    "Pagani",
    "Huayra BC",
    "Macchina Volante",
    "luxury car",
    "supercar showcase",
  ],
  authors: [{ name: "Pagani Showcase" }],
  creator: "Pagani Showcase",
  openGraph: {
    title: "Pagani Huayra BC Macchina Volante",
    description:
      "A scroll-controlled luxury showcase for the Pagani Huayra BC Macchina Volante.",
    type: "website",
    locale: "en_US",
    siteName: "Pagani Huayra BC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pagani Huayra BC Macchina Volante",
    description:
      "A scroll-controlled luxury showcase for the Pagani Huayra BC Macchina Volante.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body>{children}</body>
    </html>
  );
}
