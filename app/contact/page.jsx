"use client";

import HeaderSolutions from "@/components/layout/HeaderSolutions";
import ContactSection from "@/components/contactSection/ContactSection";
import Questions from "@/components/questions/Questions";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderSolutions />

      <section className={styles.contactHero}>
        <div className={styles.bgGlowOne}></div>
        <div className={styles.bgGlowTwo}></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.contactPage.hero.tag}</p>
            </div>

            <h1 className={styles.heroTitle}>{t.contactPage.hero.title}</h1>
          </div>
        </div>
      </section>

      <ContactSection />
      <Questions />
      <Footer />
    </main>
  );
}