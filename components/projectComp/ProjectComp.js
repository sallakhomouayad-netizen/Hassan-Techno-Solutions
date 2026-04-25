"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectComp.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

export default function ProjectComp() {
  const { t, isArabic } = useLanguage();
  const projects = t.projects.items;

  return (
    <section
      className={styles.Project}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="projects-section-title"
    >
      <div className="container">
        <div
          className={`${styles.topRow} ${
            isArabic ? styles.topRowArabic : styles.topRowEnglish
          }`}
        >
          <div
            className={`${styles.contentGroup} ${
              isArabic ? styles.contentGroupArabic : styles.contentGroupEnglish
            }`}
          >
            <div
              className={`${styles.heading} ${
                isArabic ? styles.headingArabic : styles.headingEnglish
              }`}
            >
              <span className={styles.line}></span>
              <p>{t.projects.label}</p>
            </div>

            <h2
              id="projects-section-title"
              className={`${styles.description} ${
                isArabic ? styles.descriptionArabic : styles.descriptionEnglish
              }`}
            >
              {t.projects.title}
            </h2>
          </div>

          <div
            className={`${styles.btnWrapper} ${
              isArabic ? styles.btnWrapperArabic : styles.btnWrapperEnglish
            }`}
          >
            <Link href="/projects" className={styles.viewAllBtn}>
              <span className={styles.viewAllText}>{t.projects.viewAll}</span>

              <span className={styles.arrowCircle} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7H17V15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.desktopContent}>
          <div className="row">
            {projects.map((project, index) => {
              const colClass =
                index === 0 || index === 1 || index === 2
                  ? "col-lg-4 col-md-6"
                  : index === 3
                  ? "col-lg-5 col-md-6"
                  : "col-lg-7 col-md-6";

              return (
                <div className={colClass} key={project.id}>
                  <Link
                    href="/projects"
                    className={`${styles.holderInfo} ${styles[project.cardClass]}`}
                    aria-label={project.title}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 575.98px) 100vw, (max-width: 767.98px) 100vw, (max-width: 991.98px) 50vw, (max-width: 1199.98px) 33vw, (max-width: 1399.98px) 30vw, 420px"
                      />
                    </div>

                    <div className={styles.infoRow}>
                      <p>{project.title}</p>
                      <span>{project.date}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mobileContent}>
          <div
            className={`${styles.mobileTop} ${
              isArabic ? styles.mobileTopArabic : styles.mobileTopEnglish
            }`}
          >
            <div
              className={`${styles.heading} ${
                isArabic ? styles.headingArabic : styles.headingEnglish
              }`}
            >
              <span className={styles.line}></span>
              <p>{t.projects.label}</p>
            </div>

            <h2
              className={`${styles.description} ${
                isArabic ? styles.descriptionArabic : styles.descriptionEnglish
              }`}
            >
              {t.projects.title}
            </h2>

            <div
              className={`${styles.btnWrapper} ${
                isArabic ? styles.btnWrapperArabic : styles.btnWrapperEnglish
              }`}
            >
              <Link href="/projects" className={styles.viewAllBtn}>
                <span className={styles.viewAllText}>{t.projects.viewAll}</span>

                <span className={styles.arrowCircle} aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 7H17V15"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className={styles.swiperWrap} dir={isArabic ? "rtl" : "ltr"}>
            <Swiper
              key={isArabic ? "rtl" : "ltr"}
              modules={[Pagination]}
              slidesPerView={1.08}
              spaceBetween={14}
              pagination={{ clickable: true }}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ direction: isArabic ? "rtl" : "ltr" }}
              breakpoints={{
                420: {
                  slidesPerView: 1.1,
                  spaceBetween: 14,
                },
                576: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.35,
                  spaceBetween: 18,
                },
              }}
              className={styles.projectSwiper}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <Link
                    href="/projects"
                    className={`${styles.holderInfo} ${styles.mobileCard}`}
                    aria-label={project.title}
                  >
                    <div className={styles.mobileImageWrap}>
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 575.98px) 92vw, (max-width: 767.98px) 88vw, 80vw"
                      />
                    </div>

                    <div className={styles.infoRow}>
                      <p>{project.title}</p>
                      <span>{project.date}</span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}