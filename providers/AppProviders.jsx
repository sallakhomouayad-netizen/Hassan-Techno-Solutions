"use client";

import { LanguageProvider } from "@/context/LanguageContext";

export default function AppProviders({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}