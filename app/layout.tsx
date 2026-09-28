import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { ModalProvider } from "@/lib/i18n/ModalContext";
import InquiryModal from "@/components/InquiryModal";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodySans = Plus_Jakarta_Sans({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0E16",
};

export const metadata: Metadata = {
  title: "Inovix | Modern Website Design & Hybrid Mobile Apps for Businesses",
  description:
    "We design and build fast, modern websites and hybrid mobile apps that help your business grow, look professional, and convert visitors into loyal clients.",
  keywords: [
    "Inovix",
    "Website Design",
    "Hybrid Mobile Apps",
    "UI/UX Design",
    "Web Development",
    "Business Growth",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-planet.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
      className={`${spaceGrotesk.variable} ${bodySans.variable} ${jetbrainsMono.variable} dark scroll-smooth overflow-x-hidden w-full`}
    >
      <body className="min-h-screen bg-[#0A0E16] text-[#F5F5F5] antialiased selection:bg-[#22D3EE]/25 selection:text-[#22D3EE] overflow-x-hidden w-full relative">
        <LanguageProvider>
          <ModalProvider>
            {children}
            <InquiryModal />
          </ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
