"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./MainPowerAccordion.module.css";

const powerSolutionsMeta = [
  {
    id: "solar-energy",
    images: [
      "/images/Solar1.webp",
      "/images/Solar2.webp",
      "/images/Solar3.webp",
    ],
  },
  {
    id: "integrated-electrical",
    images: [
      "/images/Solar1.webp",
      "/images/Solar2.webp",
      "/images/Solar3.webp",
    ],
  },
  {
    id: "alternative-energy",
    images: [
      "/images/Solar1.webp",
      "/images/Solar2.webp",
      "/images/Solar3.webp",
    ],
  },
];

function ArrowOutwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderTextContent(content, styles) {
  if (Array.isArray(content)) {
    return content.map((paragraph, index) => (
      <span key={index} className={styles.textParagraph}>
        {paragraph.strong ? <strong>{paragraph.strong} </strong> : null}
        {paragraph.text}
      </span>
    ));
  }

  return <span className={styles.textContent}>{content}</span>;
}

function renderListItems(items) {
  return items.map((item, itemIndex) => (
    <li key={itemIndex}>
      {typeof item === "object" && item !== null ? (
        <>
          {item.strong ? <strong>{item.strong} </strong> : null}
          {item.text ? item.text : null}
        </>
      ) : (
        item
      )}
    </li>
  ));
}

function FeatureCards({ items, styles }) {
  return (
    <>
      <div className={styles.cardsDesktop}>
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className={styles.box}>
                <div className={styles.iconWrap}>
                  <Image
                    src={item.icon}
                    alt={item.iconAlt || item.title}
                    width={42}
                    height={42}
                    loading="lazy"
                    sizes="42px"
                  />
                </div>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardsMobile}>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.08}
          spaceBetween={14}
          pagination={{ clickable: true }}
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
              slidesPerView: 1.5,
              spaceBetween: 18,
            },
          }}
          className={styles.cardsSwiper}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.box}>
                <div className={styles.iconWrap}>
                  <Image
                    src={item.icon}
                    alt={item.iconAlt || item.title}
                    width={42}
                    height={42}
                    loading="lazy"
                    sizes="42px"
                  />
                </div>
                <p>{item.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default function MainPowerAccordion() {
  const { t, isArabic } = useLanguage();
  const accordionContent = t.mainPowerAccordion;

  const powerSolutionsData = useMemo(() => {
    const metaMap = new Map(powerSolutionsMeta.map((item) => [item.id, item]));

    return accordionContent.items.map((item) => {
      const meta = metaMap.get(item.id);

      return {
        ...item,
        images: meta?.images || [],
      };
    });
  }, [accordionContent]);

  const [activeTab, setActiveTab] = useState(powerSolutionsData[0]?.id || "");

  const activeIndex = useMemo(() => {
    const index = powerSolutionsData.findIndex((item) => item.id === activeTab);
    return index === -1 ? 0 : index;
  }, [activeTab, powerSolutionsData]);

  const activeSolution = useMemo(() => {
    return powerSolutionsData[activeIndex] || null;
  }, [activeIndex, powerSolutionsData]);

  const goToIndex = (index) => {
    if (!powerSolutionsData.length) return;

    const safeIndex = Math.max(0, Math.min(index, powerSolutionsData.length - 1));
    setActiveTab(powerSolutionsData[safeIndex].id);
  };

  const goPrev = () => goToIndex(activeIndex - 1);
  const goNext = () => goToIndex(activeIndex + 1);

  if (!activeSolution) return null;

  return (
    <section className={styles.mainPowerAccordionSection}>
      <div className={styles.holderTags}>
        {powerSolutionsData.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.tagButton} ${
              activeTab === item.id ? styles.activeTag : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.mobileTabsWrap}>
        <div className={styles.mobileTabsControls}>
          {activeIndex > 0 ? (
            <button
              type="button"
              className={`${styles.mobileNavBtn} ${styles.mobilePrevBtn}`}
              onClick={goPrev}
              aria-label={t.mainPowerAccordion.ui.previousSolution}
            >
              {isArabic ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}

          <button
            type="button"
            className={styles.mobileCurrentTab}
            onClick={() => setActiveTab(powerSolutionsData[activeIndex].id)}
          >
            {powerSolutionsData[activeIndex].label}
          </button>

          {activeIndex < powerSolutionsData.length - 1 ? (
            <button
              type="button"
              className={`${styles.mobileNavBtn} ${styles.mobileNextBtn}`}
              onClick={goNext}
              aria-label={t.mainPowerAccordion.ui.nextSolution}
            >
              {isArabic ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}
        </div>

        <div className={styles.mobileTabsDots}>
          {powerSolutionsData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.mobileDot} ${
                index === activeIndex ? styles.mobileDotActive : ""
              }`}
              onClick={() => goToIndex(index)}
              aria-label={`${t.mainPowerAccordion.ui.goTo} ${item.label}`}
            ></button>
          ))}
        </div>
      </div>

      <div className={styles.address}>
        <h2>{activeSolution.title}</h2>

        <button
          type="button"
          className={styles.arrowButton}
          aria-label={t.mainPowerAccordion.ui.openSection}
        >
          <ArrowOutwardIcon />
        </button>
      </div>

      <div key={activeSolution.id} className={styles.allDetails}>
        {activeSolution.sections.map((section, index) => (
          <div className={styles.sec} key={index}>
            <p>{section.heading}</p>

            {section.type === "text" &&
              renderTextContent(section.content, styles)}

            {section.type === "list" && (
              <ul className={styles.list}>{renderListItems(section.items)}</ul>
            )}
          </div>
        ))}

        {activeSolution.featureSection && (
          <div className={styles.sec}>
            <p>{activeSolution.featureSection.heading}</p>
            <FeatureCards
              items={activeSolution.featureSection.items}
              styles={styles}
            />
          </div>
        )}

        {activeSolution.closingSections &&
          activeSolution.closingSections.map((section, index) => (
            <div className={styles.sec} key={`closing-${index}`}>
              <p>{section.heading}</p>

              {section.type === "text" &&
                renderTextContent(section.content, styles)}

              {section.type === "list" && (
                <ul className={styles.list}>{renderListItems(section.items)}</ul>
              )}
            </div>
          ))}

        <div className={styles.holderImages}>
          <div className="row g-3">
            {activeSolution.images.map((image, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div className={styles.boxx}>
                  <Image
                    src={image}
                    alt={`${activeSolution.title} ${index + 1}`}
                    width={600}
                    height={290}
                    loading="lazy"
                    sizes="(max-width: 767.98px) 100vw, (max-width: 991.98px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}