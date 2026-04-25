"use client";

import Image from "next/image";
import Styles from "./Industries.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

export default function Industries() {
  const { t, isArabic } = useLanguage();
  const industriesData = t.industries.items;

  return (
    <section
      className={Styles.industries}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="industries-section-title"
    >
      <div className="container">
        <div className={Styles.text}>
          <div className={Styles.heading}>
            <span className={Styles.line}></span>
            <p>{t.industries.label}</p>
          </div>

          <div className={Styles.textContent}>
            <h2 id="industries-section-title" className={Styles.description}>
              {t.industries.title}
            </h2>
            <p className={Styles.subText}>{t.industries.subtitle}</p>
          </div>
        </div>

        <div className={Styles.desktopContent}>
          <div className="row g-3">
            {industriesData.map((item) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                <div className={Styles.box}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 575.98px) 100vw, (max-width: 767.98px) 100vw, (max-width: 991.98px) 50vw, (max-width: 1199.98px) 33vw, 25vw"
                  />
                  <div className={Styles.overlay}></div>

                  <p className={Styles.boxTitle}>
                    <span></span>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.mobileContent}>
          <div
            className={Styles.swiperWrap}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <Swiper
              key={isArabic ? "rtl" : "ltr"}
              modules={[Pagination]}
              slidesPerView={1.12}
              centeredSlides={false}
              spaceBetween={14}
              pagination={{ clickable: true }}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ direction: isArabic ? "rtl" : "ltr" }}
              breakpoints={{
                420: {
                  slidesPerView: 1.12,
                  spaceBetween: 14,
                },
                576: {
                  slidesPerView: 1.25,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 18,
                },
                992: {
                  slidesPerView: 2.1,
                  spaceBetween: 18,
                },
              }}
              className={Styles.industriesSwiper}
            >
              {industriesData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={`${Styles.box} ${Styles.swiperBox}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 575.98px) 92vw, (max-width: 767.98px) 88vw, (max-width: 991.98px) 50vw, 33vw"
                    />
                    <div className={Styles.overlay}></div>

                    <p className={Styles.boxTitle}>
                      <span></span>
                      {item.title}
                    </p>
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