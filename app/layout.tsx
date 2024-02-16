import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import './index.css'

const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Netflix  Clone",
  description: "A Netflix clone built with NextJS and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
