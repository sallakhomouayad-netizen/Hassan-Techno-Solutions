"use client";

import Image from "next/image";
import { useMemo } from "react";
import Styles from "./AboutUs.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUs() {
  const { t, isArabic } = useLanguage();

  const brands = useMemo(
    () => [
      { id: 1, image: "/images/brand1.png", alt: t.about.brands.brand1 },
      { id: 2, image: "/images/brand2.png", alt: t.about.brands.brand2 },
      { id: 3, image: "/images/brand3.png", alt: t.about.brands.brand3 },
      { id: 4, image: "/images/brand1.png", alt: t.about.brands.brand4 },
      { id: 5, image: "/images/brand2.png", alt: t.about.brands.brand5 },
      { id: 6, image: "/images/brand3.png", alt: t.about.brands.brand6 },
      { id: 7, image: "/images/brand1.png", alt: t.about.brands.brand7 },
      { id: 8, image: "/images/brand2.png", alt: t.about.brands.brand8 },
      { id: 9, image: "/images/brand3.png", alt: t.about.brands.brand9 },
    ],
    [t]
  );

  const marqueeBrands = useMemo(() => [...brands, ...brands], [brands]);

  return (
    <section className={Styles.about} dir={isArabic ? "rtl" : "ltr"} aria-labelledby="about-section-title">
      <div className="container">
        <div className={Styles.text}>
          <div className={Styles.heading}>
            <span className={Styles.line}></span>
            <p id="about-section-title">{t.about.label}</p>
          </div>

          <p className={Styles.description}>{t.about.description}</p>
        </div>
      </div>

      <div className={Styles.sliderWrapper} dir="ltr" aria-label={t.about.label}>
        <div
          className={`${Styles.marqueeTrack} ${isArabic ? Styles.marqueeReverse : ""}`}
        >
          <ul className={Styles.brandList} aria-hidden="false">
            {marqueeBrands.map((brand, index) => (
              <li className={Styles.brandItem} key={`${brand.id}-${index}`}>
                <div className={Styles.brandCard}>
                  <Image
                    src={brand.image}
                    alt={brand.alt}
                    className={Styles.brandImage}
                    width={160}
                    height={70}
                    sizes="(max-width: 575.98px) 120px, (max-width: 991.98px) 140px, 160px"
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}