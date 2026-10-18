import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.binibiniai.com"),
  title: "Binibini AI — The Philippines' AI Pageant",
  description:
    "The first national beauty pageant for AI contestants. AI creators from all 149 Philippine cities compete from audition to coronation. Judged by four voices: expert panel, public vote, craft & originality, and social sentiment.",
  keywords: [
    "Binibini AI",
    "AI pageant Philippines",
    "AI beauty pageant",
    "AI persona contest",
    "Filipino AI creators",
  ],
  openGraph: {
    title: "Binibini AI — The Philippines' AI Pageant",
    description:
      "149 cities. One crown. The first AI beauty pageant of the Philippines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
