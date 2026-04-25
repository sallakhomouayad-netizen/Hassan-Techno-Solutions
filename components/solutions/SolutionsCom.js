"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Styles from "./SolutionsCom.module.css";
import { useLanguage } from "@/context/LanguageContext";

const OrbitScene = dynamic(() => import("../hero-section/OrbitScene"), {
  ssr: false,
  loading: () => <div className={Styles.scenePlaceholder} aria-hidden="true" />,
});

const orbitColorMap = {
  strato: "#63d0c5",
  power: "#e8cd52",
  cyber: "#4d82f5",
  smart: "#b7c8de",
  graphic: "#d867b8",
};

const defaultOrbitColor = "#4d82f5";

export default function Solutions() {
  const { t, isArabic } = useLanguage();
  const solutionsData = t.solutionsSection.items;
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [activeOrbitColor, setActiveOrbitColor] = useState(defaultOrbitColor);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    if (!mediaQuery.matches) return;

    const enableScene = () => {
      setShouldRenderScene(true);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enableScene, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enableScene, 600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const preparedSolutions = useMemo(() => solutionsData || [], [solutionsData]);

  const getItemAccent = (item) => {
    return orbitColorMap[item.colorClass] || defaultOrbitColor;
  };

  const handleItemEnter = (item) => {
    setActiveOrbitColor(getItemAccent(item));
  };

  const handleItemLeave = () => {
    setActiveOrbitColor(defaultOrbitColor);
  };

  return (
    <section
      className={Styles.Solutions}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="solutions-section-title"
    >
      <div className="container">
        <div className={Styles.text}>
          <div className={Styles.heading}>
            <span className={Styles.line}></span>
            <p>{t.solutionsSection.label}</p>
          </div>

          <div className={Styles.textContent}>
            <h2 id="solutions-section-title" className={Styles.description}>
              {t.solutionsSection.title}
            </h2>
            <p className={Styles.subText}>{t.solutionsSection.subtitle}</p>
          </div>
        </div>

        <div className="row align-items-center g-4 g-xl-5">
          <div className="col-12 col-lg-6">
            <div className={Styles.leftSide}>
              {preparedSolutions.map((item) => (
                <div
                  className={`${Styles.solutionItem} ${Styles[item.colorClass]}`}
                  key={item.id}
                  onMouseEnter={() => handleItemEnter(item)}
                  onMouseLeave={handleItemLeave}
                  onFocusCapture={() => handleItemEnter(item)}
                  onBlurCapture={handleItemLeave}
                >
                  <Link href={item.href} className={Styles.solutionInfo}>
                    <span className={Styles.number}>{item.id}</span>
                    <h3>{item.title}</h3>
                  </Link>

                  <Link
                    href={item.href}
                    className={Styles.arrowBtn}
                    aria-label={item.ariaLabel}
                  >
                    <svg
                      width="29"
                      height="16"
                      viewBox="0 0 29 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M28.33 9.13423C28.955 8.50923 28.955 7.49423 28.33 6.86923L21.93 0.469232C21.47 0.00923157 20.785 -0.125769 20.185 0.124232C19.585 0.374232 19.2 0.959232 19.2 1.60423V4.80423L2.4 4.80423C1.075 4.80423 0 5.87923 0 7.20423L0 8.80423C0 10.1292 1.075 11.2042 2.4 11.2042L19.2 11.2042V14.4042C19.2 15.0492 19.59 15.6342 20.19 15.8842C20.79 16.1342 21.475 15.9942 21.93 15.5342L28.33 9.13423Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className={Styles.rightSide}>
              <div className={Styles.sceneFrame}>
                {shouldRenderScene ? (
                  <OrbitScene activeColor={activeOrbitColor} />
                ) : (
                  <div className={Styles.scenePlaceholder} aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}