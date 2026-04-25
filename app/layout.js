import { Tajawal, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "./BootstrapClient";
import AppProviders from "@/providers/AppProviders";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Techno Solutions",
    template: "%s | Techno Solutions",
  },
  description:
    "Techno Solutions provides innovative digital, smart, cyber, and business technology solutions for modern organizations.",
  keywords: [
    "Techno Solutions",
    "technology solutions",
    "digital solutions",
    "smart solutions",
    "cyber solutions",
    "business solutions",
  ],
  applicationName: "Techno Solutions",
  authors: [{ name: "Techno Solutions" }],
  creator: "Techno Solutions",
  publisher: "Techno Solutions",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Techno Solutions",
    description:
      "Innovative digital, smart, cyber, and business technology solutions.",
    url: "https://your-domain.com",
    siteName: "Techno Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techno Solutions",
    description:
      "Innovative digital, smart, cyber, and business technology solutions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable}`}>
        <AppProviders>
          <BootstrapClient />
          <ClientLayoutWrapper
            englishFont="font-english"
            arabicFont="font-arabic"
          >
            {children}
          </ClientLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}