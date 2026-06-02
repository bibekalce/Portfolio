import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Manish Adhikari — AI/ML Graduate & ICT Professional | Adelaide",
  description:
    "Portfolio of Manish Adhikari — AI/ML graduate, full-stack developer, and cloud professional based in Adelaide, South Australia.",
  openGraph: {
    title: "Manish Adhikari — AI/ML Graduate & ICT Professional",
    description:
      "Portfolio of Manish Adhikari — AI/ML graduate, full-stack developer, and cloud professional based in Adelaide, South Australia.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
