"use client";

import HeaderSolutions from "@/components/layout/HeaderSolutions";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import styles from "./page.module.css";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contactSection/ContactSection";
import { useLanguage } from "@/context/LanguageContext";

export default function SolutionsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderSolutions />

      <section
        className={styles.solutionsHero}
        aria-labelledby="solutions-page-title"
      >
        <div className={styles.bgGlowOne} aria-hidden="true"></div>
        <div className={styles.bgGlowTwo} aria-hidden="true"></div>
        <div className={styles.bgGlowThree} aria-hidden="true"></div>
        <div className={styles.bgGlowFour} aria-hidden="true"></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.solutionsPage.hero.tag}</p>
            </div>

            <h1 id="solutions-page-title" className={styles.heroTitle}>
              <span>{t.solutionsPage.hero.titleLine1}</span>
              <span>{t.solutionsPage.hero.titleLine2}</span>
            </h1>
          </div>
        </div>
      </section>

      <SolutionsList />

      <ContactSection />

      <Footer />
    </main>
  );
}