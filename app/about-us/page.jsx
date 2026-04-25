"use client";

import HeaderSolutions from "@/components/layout/HeaderSolutions";
import ContactSection from "@/components/contactSection/ContactSection";
import Footer from "@/components/footer/Footer";
import Solutions from "@/components/solutions/SolutionsCom";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function AboutUsPage() {
  const { t } = useLanguage();

  return (
    <main className={styles.aboutPage}>
      <HeaderSolutions />

      <section className={styles.heroSection}>
        <div className={styles.bgGlowOne}></div>
        <div className={styles.bgGlowTwo}></div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.topTag}>
              <span></span>
              <p>{t.aboutUsPage.hero.tag}</p>
            </div>

            <h1 className={styles.heroTitle}>
              {t.aboutUsPage.hero.titleLines.map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      <section className={styles.visionMissionSection}>
        <div className="container">
          <div className={styles.infoBlock}>
            <div className={styles.sideLabel}>
              <span className={styles.dot}></span>
              <p>{t.aboutUsPage.vision.label}</p>
            </div>

            <div className={styles.infoContent}>
              <p>{t.aboutUsPage.vision.text}</p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.sideLabel}>
              <span className={styles.dot}></span>
              <p>{t.aboutUsPage.mission.label}</p>
            </div>

            <div className={styles.infoContent}>
              <h2>{t.aboutUsPage.mission.title}</h2>
              <p>{t.aboutUsPage.mission.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {t.aboutUsPage.stats.items.map((item, index) => (
              <div className={styles.statItem} key={index}>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.infoBlock}>
            <div className={styles.sideLabel}>
              <span className={styles.dot}></span>
              <p>{t.aboutUsPage.story.label}</p>
            </div>

            <div className={styles.infoContent}>
              <h2>{t.aboutUsPage.story.title}</h2>

              <p>{t.aboutUsPage.story.paragraphs[0]}</p>
              <p>{t.aboutUsPage.story.paragraphs[1]}</p>
              <p>{t.aboutUsPage.story.paragraphs[2]}</p>

              <ul className={styles.storyList}>
                {t.aboutUsPage.story.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p>{t.aboutUsPage.story.paragraphs[3]}</p>
              <p>{t.aboutUsPage.story.paragraphs[4]}</p>
              <p>{t.aboutUsPage.story.paragraphs[5]}</p>
            </div>
          </div>
        </div>
      </section>

      <Solutions />
      <ContactSection />
      <Footer />
    </main>
  );
}