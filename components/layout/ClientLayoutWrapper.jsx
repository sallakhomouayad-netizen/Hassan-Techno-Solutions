"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import WhatsAppFloat from "@/components/whatsapp/WhatsAppFloat";

export default function ClientLayoutWrapper({
  children,
  englishFont,
  arabicFont,
}) {
  const { isArabic, dir, mounted } = useLanguage();

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = dir;
  }, [isArabic, dir, mounted]);

  if (!mounted) {
    return (
      <div className={englishFont} dir="ltr">
        {children}
      </div>
    );
  }

  return (
    <div className={isArabic ? arabicFont : englishFont} dir={dir}>
      {children}
      <WhatsAppFloat />
    </div>
  );
}