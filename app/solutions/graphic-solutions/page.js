"use client";

import Image from "next/image";
import HeaderGraphic from "@/components/layout/HeaderGraphic";
import styles from "./page.module.css";
import SolutionsList from "@/components/solutionsCom/SolutionsList";
import MainGraphicAccordion from "@/components/mainGraphicAccordion/MainGraphicAccordion";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function GraphicSolutionsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <HeaderGraphic />

      <section className={styles.graphicHero}>
        <div className={styles.bgGlowOne}></div>
        <div className={styles.bgGlowTwo}></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.graphicPage.hero.tag}</p>
            </div>

            <h1 className={styles.heroTitle}>{t.graphicPage.hero.title}</h1>

            <div className={styles.heroImageWrap}>
              <Image
                src="/images/Grafic_Banner.png"
                alt={t.graphicPage.hero.imageAlt}
                className={styles.heroImage}
                width={1600}
                height={420}
                priority
              />
            </div>
          </div>

          <MainGraphicAccordion />
        </div>
      </section>

      <SolutionsList excludeId="graphic" />
      <ContactSection />
      <Footer />
    </main>
  );
}