"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Styles from "./SolutionsList.module.css";
import { useLanguage } from "@/context/LanguageContext";

const solutionsMeta = [
  {
    id: "strato",
    image: "/images/Last_Strato_Bannerr.webp",
    link: "/solutions/strato-solutions",
    colorClass: "strato",
  },
  {
    id: "power",
    image: "/images/Last_Power_Bannerr.webp",
    link: "/solutions/power-solutions",
    colorClass: "power",
  },
  {
    id: "cyber",
    image: "/images/Last_Cyber_Banerr.webp",
    link: "/solutions/cyber-solutions",
    colorClass: "cyber",
  },
  {
    id: "smart",
    image: "/images/Last_Smart_Bannerr.webp",
    link: "/solutions/smart-solutions",
    colorClass: "smart",
  },
  {
    id: "graphic",
    image: "/images/Last_Grafic_Bannerr.webp",
    link: "/solutions/graphic-solutions",
    colorClass: "graphic",
  },
];

function ArrowIcon({ isArabic, className }) {
  return (
    <svg
      className={`${className} ${isArabic ? Styles.arrowRtl : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SolutionsList({ excludeId = null }) {
  const { t, isArabic } = useLanguage();

  const solutionsData = useMemo(() => {
    return solutionsMeta.map((solutionMeta) => {
      const translatedItem = t.solutionsList.items.find(
        (item) => item.id === solutionMeta.id
      );

      return {
        ...solutionMeta,
        number: translatedItem?.number ?? "",
        title: translatedItem?.title ?? "",
        features: translatedItem?.features ?? [],
      };
    });
  }, [t]);

  const filteredSolutions = useMemo(() => {
    return excludeId
      ? solutionsData.filter((solution) => solution.id !== excludeId)
      : solutionsData;
  }, [excludeId, solutionsData]);

  return (
    <section className={Styles.solutionsList}>
      <div className="container">
        {filteredSolutions.map((solution, index) => (
          <div
            className={`${Styles.solutionItem} ${Styles[solution.colorClass]}`}
            key={solution.id}
          >
            <div className="row g-4 align-items-start">
              <div className="col-lg-2 col-md-2 col-12">
                <div className={Styles.number}>{solution.number}</div>
              </div>

              <div className="col-lg-8 col-md-8 col-12">
                <div className={Styles.content}>
                  <Link href={solution.link} className={Styles.titleLink}>
                    <h3>{solution.title}</h3>
                  </Link>

                  <div className="row g-4 g-lg-5 align-items-start">
                    <div className="col-lg-5 col-md-5 col-12">
                      <Link
                        href={solution.link}
                        className={Styles.imageWrapper}
                        aria-label={`${t.solutionsList.ariaLabelPrefix} ${solution.title}`}
                      >
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          sizes="(max-width: 767.98px) 100vw, (max-width: 991.98px) 42vw, 32vw"
                          loading={index === 0 ? "eager" : "lazy"}
                          quality={80}
                        />
                      </Link>
                    </div>

                    <div className="col-lg-7 col-md-7 col-12">
                      <ul className={Styles.features}>
                        {solution.features.map((item, i) => (
                          <li key={`${solution.id}-${i}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-2 col-12">
                <div className={Styles.actionWrapper}>
                  <Link
                    href={solution.link}
                    className={Styles.arrowBtn}
                    aria-label={`${t.solutionsList.ariaLabelPrefix} ${solution.title}`}
                  >
                    <ArrowIcon isArabic={isArabic} className={Styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}