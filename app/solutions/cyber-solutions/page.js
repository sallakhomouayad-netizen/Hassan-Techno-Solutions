"use client";

import Image from "next/image";
import HeaderCyber from "@/components/layout/HeaderCyber";
import styles from "./page.module.css";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import MainCyberAccordion from "@/components/mainCyberAccordion/MainCyberAccordion";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function CyberSolutionsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderCyber />

      <section
        className={styles.cyberHero}
        aria-labelledby="cyber-hero-title"
      >
        <div className={styles.bgGlowOne} aria-hidden="true"></div>
        <div className={styles.bgGlowTwo} aria-hidden="true"></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.cyberPage.hero.tag}</p>
            </div>

            <h1 id="cyber-hero-title" className={styles.heroTitle}>
              {t.cyberPage.hero.title}
            </h1>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/Cyber_Banner.png"
                alt={t.cyberPage.hero.imageAlt}
                className={styles.heroImage}
                width={1600}
                height={420}
                priority
                fetchPriority="high"
                quality={90}
                sizes="(max-width: 767.98px) 100vw, (max-width: 1199.98px) 92vw, 1200px"
              />
            </div>
          </div>

          <MainCyberAccordion />
        </div>
      </section>

      <SolutionsList excludeId="cyber" />
      <ContactSection />
      <Footer />
    </main>
  );
}