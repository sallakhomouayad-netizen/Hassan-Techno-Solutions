"use client";

import Image from "next/image";
import HeaderPower from "@/components/layout/HeaderPower";
import styles from "./page.module.css";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import MainPowerAccordion from "@/components/mainPowerAccordion/MainPowerAccordion";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PowerSolutions() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderPower />

      <section
        className={styles.powerHero}
        aria-labelledby="power-hero-title"
      >
        <div className={styles.bgGlowOne} aria-hidden="true"></div>
        <div className={styles.bgGlowTwo} aria-hidden="true"></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.powerPage.hero.tag}</p>
            </div>

            <h1 id="power-hero-title" className={styles.heroTitle}>
              {t.powerPage.hero.title}
            </h1>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/Bannerpower.png"
                alt={t.powerPage.hero.imageAlt}
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

          <MainPowerAccordion />
        </div>
      </section>

      <SolutionsList excludeId="power" />

      <ContactSection />

      <Footer />
    </main>
  );
}