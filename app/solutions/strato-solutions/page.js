"use client";

import Image from "next/image";
import HeaderStrato from "@/components/layout/HeaderStrato";
import styles from "./page.module.css";
import MainAccordion from "@/components/mainAccordion/MainAccordion";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function StratoSolutionsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderStrato />

      <section
        className={styles.stratoHero}
        aria-labelledby="strato-hero-title"
      >
        <div className={styles.bgGlowOne} aria-hidden="true"></div>
        <div className={styles.bgGlowTwo} aria-hidden="true"></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.stratoPage.hero.tag}</p>
            </div>

            <h1 id="strato-hero-title" className={styles.heroTitle}>
              {t.stratoPage.hero.title}
            </h1>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/Banner-Strato.png"
                alt={t.stratoPage.hero.imageAlt}
                className={styles.heroImage}
                width={1600}
                height={400}
                priority
                fetchPriority="high"
                quality={90}
                sizes="(max-width: 767.98px) 100vw, (max-width: 1199.98px) 92vw, 1200px"
              />
            </div>
          </div>

          <MainAccordion />
        </div>
      </section>

      <SolutionsList excludeId="strato" />

      <ContactSection />
      <Footer />
    </main>
  );
}