"use client";

import { useState, useCallback } from "react";
import Styles from "./Questions.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Questions() {
  const { t } = useLanguage();
  const faqData = t.questions.items;
  const firstItemId = faqData?.[0]?.id ?? null;

  const [openId, setOpenId] = useState(firstItemId);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className={Styles.questions} aria-labelledby="questions-heading">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <div className={Styles.leftSide}>
              <div className={Styles.text}>
                <div className={Styles.heading}>
                  <span className={Styles.line}></span>
                  <p>{t.questions.label}</p>
                </div>

                <h2 id="questions-heading" className={Styles.description}>
                  {t.questions.titleLine1}
                  <br />
                  {t.questions.titleLine2}
                </h2>
              </div>

              <p className={Styles.subDescription}>
                {t.questions.description}
              </p>

              <button
                type="button"
                className={Styles.holderB}
                aria-label={t.questions.cta}
              >
                <span>{t.questions.cta}</span>
                <div aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
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
                </div>
              </button>
            </div>
          </div>

          <div className="col-lg-7">
            <div
              className={`accordion ${Styles.customAccordion}`}
              id="faqAccordion"
            >
              {faqData.map((item) => {
                const isOpen = openId === item.id;
                const headingId = `heading-${item.id}`;
                const panelId = `collapse-${item.id}`;

                return (
                  <div
                    className={`accordion-item ${Styles.accordionItem}`}
                    key={item.id}
                  >
                    <h2
                      className={`accordion-header ${Styles.accordionHeader}`}
                      id={headingId}
                    >
                      <button
                        className={`accordion-button ${Styles.accordionButton} ${
                          !isOpen ? "collapsed" : ""
                        }`}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(item.id)}
                      >
                        <span className={Styles.questionText}>
                          {item.question}
                        </span>
                        <span className={Styles.icon} aria-hidden="true"></span>
                      </button>
                    </h2>

                    <div
                      id={panelId}
                      className={`${Styles.accordionCollapse} ${
                        isOpen ? Styles.open : ""
                      }`}
                      role="region"
                      aria-labelledby={headingId}
                    >
                      <div className={Styles.accordionInner}>
                        <div className={`accordion-body ${Styles.accordionBody}`}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}