"use client";

import Link from "next/link";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import HeaderSolutions from "@/components/layout/HeaderSolutions";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const { t, isArabic } = useLanguage();

  return (
    <main className={styles.projectsPage}>
      <HeaderSolutions />

      <section className={styles.projectsHero}>
        <div className={styles.bgGlowOne}></div>
        <div className={styles.bgGlowTwo}></div>
        <div className={styles.bgGlowThree}></div>

        <div className="container">
          <div className={styles.heroContent}>
            {/* <div className={styles.topTag}>
              <span></span>
              <p>{t.projectsPage.hero.tag}</p>
            </div> */}

            {/* <h1 className={styles.heroTitle}>
              <span>{t.projectsPage.hero.titleLine1}</span>
              <span>{t.projectsPage.hero.titleLine2}</span>
            </h1> */}

            <div className={styles.placeholderCard}>
              <div className={styles.cardBadge}>
                {t.projectsPage.status.badge}
              </div>

              <h2 className={styles.cardTitle}>
                {t.projectsPage.status.title}
              </h2>

              <p className={styles.cardText}>
                {t.projectsPage.status.description}
              </p>

              <div className={styles.actions}>
                <Link href="/" className={styles.primaryBtn}>
                  <span className={styles.btnIcon}>
                    {isArabic ? <HiArrowUpRight /> : <HiArrowLeft />}
                  </span>
                  <span>{t.projectsPage.actions.backHome}</span>
                </Link>

                <Link href="/contact" className={styles.secondaryBtn}>
                  <span>{t.projectsPage.actions.contactUs}</span>
                  <span className={styles.btnIcon}>
                    <HiArrowUpRight />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}