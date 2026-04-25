"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Styles from "./statsKey.module.css";
import CountUpNumber from "./CountUpNumber";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsKey() {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const { t } = useLanguage();

  const stats = t.stats.items;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={Styles.statsKey}
      ref={sectionRef}
      aria-labelledby="stats-section-title"
    >
      <div className="container">
        <div className={Styles.text}>
          <div className={Styles.heading}>
            <span className={Styles.line}></span>
            <p>{t.stats.label}</p>
          </div>

          <h2 id="stats-section-title" className={Styles.description}>
            {t.stats.description}
          </h2>
        </div>

        <div className="row align-items-stretch g-lg-4 g-3">
          <div className="col-lg-4">
            <div className={Styles.imageWrapper}>
              <Image
                src="/images/statesKey.png"
                alt={t.stats.imageAlt}
                className={Styles.statsImage}
                width={800}
                height={430}
                loading="lazy"
                sizes="(max-width: 991.98px) 100vw, (max-width: 1199.98px) 33vw, 30vw"
              />
            </div>
          </div>

          <div className="col-lg-8">
            <div className={Styles.statsGrid}>
              {stats.map((item, index) => (
                <div
                  key={index}
                  className={`${Styles.statItem} ${
                    item.number === null ? Styles.emptyItem : ""
                  }`}
                >
                  {item.number !== null && (
                    <>
                      <h3>
                        <CountUpNumber end={item.number} start={startCount} />
                        {item.suffix}
                      </h3>
                      <p>{item.label}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}