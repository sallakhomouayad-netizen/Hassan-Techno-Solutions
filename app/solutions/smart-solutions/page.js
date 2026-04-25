"use client";

import Image from "next/image";
import HeaderSmart from "@/components/layout/HeaderSmart";
import styles from "./page.module.css";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import MainSmartAccordion from "@/components/mainSmartAccordion/MainSmartAccordion";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function SmartSolutionsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderSmart />

      <section className={styles.smartHero}>
        <div className={styles.bgGlowOne}></div>
        <div className={styles.bgGlowTwo}></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.smartPage.hero.tag}</p>
            </div>

            <h1 className={styles.heroTitle}>{t.smartPage.hero.title}</h1>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/Smart_Banner.png"
                alt={t.smartPage.hero.imageAlt}
                className={styles.heroImage}
                width={1600}
                height={420}
                priority
              />
            </div>
          </div>

          <MainSmartAccordion />
        </div>
      </section>

      <SolutionsList excludeId="smart" />
      <ContactSection />
      <Footer />
    </main>
  );
}