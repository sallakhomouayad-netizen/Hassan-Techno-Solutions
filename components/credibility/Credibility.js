"use client";

import Image from "next/image";
import Styles from "./credibility.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

export default function Credibility() {
  const { t, isArabic } = useLanguage();
  const credibilityData = t.credibility.items;

  return (
    <section className={Styles.credibility} dir={isArabic ? "rtl" : "ltr"}>
      <div className="container">
        <div className={Styles.text}>
          <div className={Styles.heading}>
            <span className={Styles.line}></span>
            <p>{t.credibility.label}</p>
          </div>

          <p className={Styles.description}>{t.credibility.title}</p>
        </div>

        <div className={Styles.desktopContent}>
          <div className="row g-4">
            {credibilityData.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className={`${Styles.box} ${Styles[item.colorClass]}`}>
                  <div className={Styles.iconWrap}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                    />
                  </div>

                  <p>{item.title}</p>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.mobileContent}>
          <div className={Styles.swiperWrap} dir={isArabic ? "rtl" : "ltr"}>
            <Swiper
              key={isArabic ? "rtl" : "ltr"}
              modules={[Pagination]}
              slidesPerView={1.02}
              spaceBetween={14}
              pagination={{ clickable: true }}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ direction: isArabic ? "rtl" : "ltr" }}
              breakpoints={{
                420: {
                  slidesPerView: 1.05,
                  spaceBetween: 14,
                },
                576: {
                  slidesPerView: 1.15,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.35,
                  spaceBetween: 18,
                },
                992: {
                  slidesPerView: 2.1,
                  spaceBetween: 18,
                },
              }}
              className={Styles.credibilitySwiper}
            >
              {credibilityData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className={`${Styles.box} ${Styles[item.colorClass]} ${Styles.swiperBox}`}
                  >
                    <div className={Styles.iconWrap}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={40}
                      />
                    </div>

                    <p>{item.title}</p>
                    <span>{item.text}</span>
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