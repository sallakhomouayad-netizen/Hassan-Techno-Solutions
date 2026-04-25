"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const { isArabic } = useLanguage();

  const [showQuestionHint, setShowQuestionHint] = useState(false);
  const [hasInteractedWithQuestion, setHasInteractedWithQuestion] =
    useState(false);

  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const [isSolutionChanging, setIsSolutionChanging] = useState(false);

  const solutionSlides = useMemo(
    () => [
      {
        id: "strato",
        title: "Strato Solutions",
        href: "/solutions/strato-solutions",
        image: "/images/Ineed1.png",
      },
      {
        id: "power",
        title: "Power Solutions",
        href: "/solutions/power-solutions",
        image: "/images/Ineed2.png",
      },
      {
        id: "cyber",
        title: "Cyber Solutions",
        href: "/solutions/cyber-solutions",
        image: "/images/Ineed3.png",
      },
      {
        id: "smart",
        title: "Smart Solutions",
        href: "/solutions/smart-solutions",
        image: "/images/Ineed44.png",
      },
      {
        id: "graphic",
        title: "Graphic Solutions",
        href: "/solutions/graphic-solutions",
        image: "/images/Ineed5.png",
      },
    ],
    []
  );

  const partnerSlides = useMemo(
    () => [
      { id: 1, image: "/images/brand1.png", alt: "Microsoft" },
      { id: 2, image: "/images/brand2.png", alt: "Odoo" },
      { id: 3, image: "/images/brand3.png", alt: "Jinko" },
      { id: 4, image: "/images/brand1.png", alt: "Microsoft" },
      { id: 5, image: "/images/brand2.png", alt: "Odoo" },
      { id: 6, image: "/images/brand3.png", alt: "Jinko" },
      { id: 7, image: "/images/brand1.png", alt: "Microsoft" },
      { id: 8, image: "/images/brand2.png", alt: "Odoo" },
      { id: 9, image: "/images/brand3.png", alt: "Jinko" },
    ],
    []
  );

  useEffect(() => {
    if (hasInteractedWithQuestion) return;

    const showTimer = window.setTimeout(() => {
      setShowQuestionHint(true);
    }, 5000);

    const hideTimer = window.setTimeout(() => {
      setShowQuestionHint(false);
    }, 19000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hasInteractedWithQuestion]);

  const handleQuestionInteraction = () => {
    setHasInteractedWithQuestion(true);
    setShowQuestionHint(false);
  };

  const activeSolution = solutionSlides[activeSolutionIndex];

  return (
    <section
      className={styles.heroSection}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="hero-title"
    >
      <div className={`container ${styles.heroShell}`}>
        <div className={styles.heroMainWrapper}>
          <div
            className={`row align-items-center g-4 g-xl-5 ${styles.heroBody}`}
          >
            <div className={`col-12 col-lg-6 ${styles.heroCopy}`}>
              <div
                className={styles.heroContent}
                data-aos="fade-right"
                data-aos-duration="900"
                data-aos-once="true"
              >
                <p className={styles.heroTopText}>To travel to the future</p>

                <div
                  className={`${styles.heroQuestionBlock} ${
                    showQuestionHint ? styles.heroQuestionBlockHint : ""
                  }`}
                  onMouseEnter={handleQuestionInteraction}
                  onFocus={handleQuestionInteraction}
                >
                  <svg
                    className={styles.heroArrow}
                    viewBox="0 0 360 90"
                    aria-hidden="true"
                  >
                    <path
                      className={styles.heroArrowPath}
                      d="M18 58 C 85 16, 185 14, 255 30 C 287 37, 309 47, 326 59"
                    />
                    <path
                      className={styles.heroArrowHead}
                      d="M310.53 56.65 L326 59 L318.60 45.21"
                    />
                  </svg>

                  <h1 id="hero-title" className={styles.heroQuestion}>
                    <span className={styles.questionTextStart}>
                      Do you know{" "}
                    </span>

                    <Link href="/solutions" className={styles.questionLink}>
                      what we do
                    </Link>

                    <span className={styles.questionMark}> ?</span>
                  </h1>
                </div>

                <div className={styles.heroActions}>
                  <Link href="/contact" className={styles.contactButton}>
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className={`col-12 col-lg-6 ${styles.sceneCol}`}>
              <div className={styles.heroRightContent}>
                <div className={styles.heroSolutionsSliderWrapRight}>
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={1200}
                    spaceBetween={14}
                    grabCursor={true}
                    autoplay={{
                      delay: 4600,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={{
                      clickable: true,
                      el: `.${styles.heroSolutionsPaginationRight}`,
                    }}
                    onInit={(swiper) => {
                      setActiveSolutionIndex(swiper.realIndex);
                      setIsSolutionChanging(false);
                    }}
                    onSlideChangeTransitionStart={() => {
                      setIsSolutionChanging(true);
                    }}
                    onSlideChangeTransitionEnd={(swiper) => {
                      setActiveSolutionIndex(swiper.realIndex);
                      setIsSolutionChanging(false);
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1.12,
                      },
                      576: {
                        slidesPerView: 1.3,
                      },
                      768: {
                        slidesPerView: 1.45,
                      },
                      992: {
                        slidesPerView: 1.18,
                      },
                      1200: {
                        slidesPerView: 1,
                      },
                    }}
                    className={styles.heroSolutionsSwiper}
                  >
                    {solutionSlides.map((solution) => (
                      <SwiperSlide key={solution.id}>
                        <Link
                          href={solution.href}
                          className={styles.solutionCard}
                          aria-label={solution.title}
                        >
                          <div className={styles.solutionImageWrap}>
                            <Image
                              src={solution.image}
                              alt={solution.title}
                              fill
                              sizes="(max-width: 575.98px) 78vw, (max-width: 991.98px) 42vw, 320px"
                              className={styles.solutionImage}
                            />
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div
                    className={`${styles.solutionTextWrap} ${
                      !isSolutionChanging ? styles.solutionTextWrapActive : ""
                    }`}
                  >
                    <Link
                      href={activeSolution.href}
                      className={styles.solutionActiveTitle}
                    >
                      {activeSolution.title}
                    </Link>
                  </div>

                  <div className={styles.heroSolutionsPaginationRight}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroPartnersSection}>
            <Swiper
              modules={[Autoplay]}
              loop={true}
              speed={1000}
              spaceBetween={28}
              allowTouchMove={false}
              autoplay={{
                delay: 2300,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2.25,
                },
                576: {
                  slidesPerView: 3.2,
                },
                768: {
                  slidesPerView: 4.2,
                },
                992: {
                  slidesPerView: 5.2,
                },
                1200: {
                  slidesPerView: 6.2,
                },
              }}
              className={styles.heroPartnersSwiper}
            >
              {partnerSlides.map((partner) => (
                <SwiperSlide key={partner.id}>
                  <div className={styles.heroPartnerItem}>
                    <Image
                      src={partner.image}
                      alt={partner.alt}
                      width={170}
                      height={64}
                      sizes="(max-width: 575.98px) 88px, (max-width: 991.98px) 120px, 170px"
                      className={styles.heroPartnerLogo}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}