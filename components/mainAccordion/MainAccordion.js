"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./MainAccordion.module.css";

const variantClassMap = {
  strato: "variantStrato",
  cyber: "variantCyber",
  graphic: "variantGraphic",
  smart: "variantSmart",
  power: "variantPower",
};

const solutionsMeta = [
  {
    id: "web-development",
    images: [
      "/images/i need 1.webp",
      "/images/i need 2.webp",
      "/images/i need 3 .webp",
    ],
  },
  {
    id: "application-development",
    images: [
      "/images/i need 1.webp",
      "/images/i need 2.webp",
      "/images/i need 3 .webp",
    ],
  },
  {
    id: "ux-ui-product-design",
    images: [
      "/images/i need 1.webp",
      "/images/i need 2.webp",
      "/images/i need 3 .webp",
    ],
  },
  {
    id: "erp-systems",
    images: [
      "/images/i need 1.webp",
      "/images/i need 2.webp",
      "/images/i need 3 .webp",
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

function renderRichListItems(items) {
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

function renderPlainListItems(items) {
  return items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>);
}

function FeatureCards({ items, styles }) {
  return (
    <>
      <div className={styles.cardsDesktop}>
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className={styles.box}>
                <div className={styles.iconHolder}>
                  <Image
                    src={item.icon}
                    alt={item.iconAlt || item.title}
                    className={styles.cardIcon}
                    width={38}
                    height={38}
                    loading="lazy"
                  />
                </div>

                <p>{item.title}</p>
                <span>{item.description}</span>
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
            <SwiperSlide key={index} className={styles.cardsSlide}>
              <div className={styles.box}>
                <div className={styles.iconHolder}>
                  <Image
                    src={item.icon}
                    alt={item.iconAlt || item.title}
                    className={styles.cardIcon}
                    width={38}
                    height={38}
                    loading="lazy"
                  />
                </div>

                <p>{item.title}</p>
                <span>{item.description}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default function MainAccordion({ variant = "strato" }) {
  const { t, isArabic } = useLanguage();
  const accordionContent = t.mainAccordion;

  const solutionsData = useMemo(() => {
    const metaMap = new Map(solutionsMeta.map((item) => [item.id, item]));

    return accordionContent.items.map((item) => {
      const meta = metaMap.get(item.id);

      return {
        ...item,
        images: meta?.images || [],
      };
    });
  }, [accordionContent]);

  const [activeTab, setActiveTab] = useState(solutionsData[0]?.id || "");

  const activeIndex = useMemo(() => {
    const index = solutionsData.findIndex((item) => item.id === activeTab);
    return index === -1 ? 0 : index;
  }, [activeTab, solutionsData]);

  const activeSolution = useMemo(() => {
    return solutionsData[activeIndex] || null;
  }, [activeIndex, solutionsData]);

  const goToIndex = (index) => {
    if (!solutionsData.length) return;

    const safeIndex = Math.max(0, Math.min(index, solutionsData.length - 1));
    setActiveTab(solutionsData[safeIndex].id);
  };

  const goPrev = () => goToIndex(activeIndex - 1);
  const goNext = () => goToIndex(activeIndex + 1);

  if (!activeSolution) return null;

  return (
    <section
      className={`${styles.mainAccordionSection} ${
        styles[variantClassMap[variant] || "variantStrato"]
      }`}
    >
      <div className={styles.holderTags}>
        {solutionsData.map((item) => (
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
              aria-label={t.mainAccordion.ui.previousSolution}
            >
              {isArabic ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}

          <button
            type="button"
            className={styles.mobileCurrentTab}
            onClick={() => setActiveTab(solutionsData[activeIndex].id)}
          >
            {solutionsData[activeIndex].label}
          </button>

          {activeIndex < solutionsData.length - 1 ? (
            <button
              type="button"
              className={`${styles.mobileNavBtn} ${styles.mobileNextBtn}`}
              onClick={goNext}
              aria-label={t.mainAccordion.ui.nextSolution}
            >
              {isArabic ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}
        </div>

        <div className={styles.mobileTabsDots}>
          {solutionsData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.mobileDot} ${
                index === activeIndex ? styles.mobileDotActive : ""
              }`}
              onClick={() => goToIndex(index)}
              aria-label={`${t.mainAccordion.ui.goTo} ${item.label}`}
            ></button>
          ))}
        </div>
      </div>

      <div className={styles.address}>
        <h2>{activeSolution.title}</h2>

        <button
          type="button"
          className={styles.arrowButton}
          aria-label={t.mainAccordion.ui.openSection}
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
              <ul className={styles.list}>
                {renderRichListItems(section.items)}
              </ul>
            )}

            {section.type === "plain-list" && (
              <ul className={styles.plainList}>
                {renderPlainListItems(section.items)}
              </ul>
            )}
          </div>
        ))}

        {activeSolution.featureSection && (
          <div className={styles.sec}>
            <p>{activeSolution.featureSection.heading}</p>
            <FeatureCards items={activeSolution.featureSection.items} styles={styles} />
          </div>
        )}

        {activeSolution.closingSections &&
          activeSolution.closingSections.map((section, index) => (
            <div className={styles.sec} key={`closing-${index}`}>
              <p>{section.heading}</p>
              {renderTextContent(section.content, styles)}
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