"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FaBolt,
  FaPlug,
  FaLightbulb,
  FaChartLine,
  FaTabletAlt,
  FaHotel,
  FaLeaf,
  FaShieldAlt,
  FaEye,
  FaCogs,
  FaLink,
  FaExchangeAlt,
  FaUserCog,
  FaLock,
  FaStar,
  FaSyncAlt,
  FaMusic,
  FaGem,
  FaTools,
  FaWater,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./MainSmartAccordion.module.css";

const smartSolutionsMeta = [
  {
    id: "smart-building-control",
    images: [
      "/images/BBB1 .webp",
      "/images/BBB2.webp",
      "/images/BBB3.webp",
    ],
  },
  {
    id: "smart-monitoring-control",
    images: [
     "/images/BBB1 .webp",
      "/images/BBB2.webp",
      "/images/BBB3.webp",
    ],
  },
  {
    id: "interactive-smart-fountains",
    images: [
     "/images/BBB1 .webp",
      "/images/BBB2.webp",
      "/images/BBB3.webp",
    ],
  },
];

const iconMap = {
  FaBolt,
  FaPlug,
  FaLightbulb,
  FaChartLine,
  FaTabletAlt,
  FaHotel,
  FaLeaf,
  FaShieldAlt,
  FaEye,
  FaCogs,
  FaLink,
  FaExchangeAlt,
  FaUserCog,
  FaLock,
  FaStar,
  FaSyncAlt,
  FaMusic,
  FaGem,
  FaTools,
  FaWater,
};

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

function SolutionCards({ items, styles }) {
  return (
    <>
      <div className={styles.cardsDesktop}>
        <div className="row g-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className={styles.cardBox}>
                  <div className={styles.cardIconWrap}>
                    {Icon ? <Icon className={styles.cardIcon} /> : null}
                  </div>
                  <p>{item.title}</p>
                </div>
              </div>
            );
          })}
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
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <SwiperSlide key={index}>
                <div className={styles.cardBox}>
                  <div className={styles.cardIconWrap}>
                    {Icon ? <Icon className={styles.cardIcon} /> : null}
                  </div>
                  <p>{item.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default function MainSmartAccordion() {
  const { t, isArabic } = useLanguage();
  const accordionContent = t.mainSmartAccordion;

  const smartSolutionsData = useMemo(() => {
    const metaMap = new Map(smartSolutionsMeta.map((item) => [item.id, item]));

    return accordionContent.items.map((item) => {
      const meta = metaMap.get(item.id);

      return {
        ...item,
        images: meta?.images || [],
      };
    });
  }, [accordionContent]);

  const [activeTab, setActiveTab] = useState(smartSolutionsData[0]?.id || "");

  const activeIndex = useMemo(() => {
    const index = smartSolutionsData.findIndex((item) => item.id === activeTab);
    return index === -1 ? 0 : index;
  }, [activeTab, smartSolutionsData]);

  const activeSolution = useMemo(() => {
    return smartSolutionsData[activeIndex] || null;
  }, [activeIndex, smartSolutionsData]);

  const goToIndex = (index) => {
    if (!smartSolutionsData.length) return;

    const safeIndex = Math.max(0, Math.min(index, smartSolutionsData.length - 1));
    setActiveTab(smartSolutionsData[safeIndex].id);
  };

  const goPrev = () => goToIndex(activeIndex - 1);
  const goNext = () => goToIndex(activeIndex + 1);

  if (!activeSolution) return null;

  return (
    <section className={styles.mainSmartAccordionSection}>
      <div className={styles.holderTags}>
        {smartSolutionsData.map((item) => (
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
              aria-label={t.mainSmartAccordion.ui.previousSolution}
            >
              {isArabic ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}

          <button type="button" className={styles.mobileCurrentTab}>
            {smartSolutionsData[activeIndex].label}
          </button>

          {activeIndex < smartSolutionsData.length - 1 ? (
            <button
              type="button"
              className={`${styles.mobileNavBtn} ${styles.mobileNextBtn}`}
              onClick={goNext}
              aria-label={t.mainSmartAccordion.ui.nextSolution}
            >
              {isArabic ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </button>
          ) : (
            <div className={styles.mobileNavBtnPlaceholder}></div>
          )}
        </div>

        <div className={styles.mobileTabsDots}>
          {smartSolutionsData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.mobileDot} ${
                index === activeIndex ? styles.mobileDotActive : ""
              }`}
              onClick={() => goToIndex(index)}
              aria-label={`${t.mainSmartAccordion.ui.goTo} ${item.label}`}
            ></button>
          ))}
        </div>
      </div>

      <div className={styles.address}>
        <h2>{activeSolution.title}</h2>

        <button
          type="button"
          className={styles.arrowButton}
          aria-label={t.mainSmartAccordion.ui.openSection}
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

            {section.type === "cards" && (
              <SolutionCards items={section.items} styles={styles} />
            )}
          </div>
        ))}

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