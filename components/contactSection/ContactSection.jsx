"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [activeOffice, setActiveOffice] = useState(0);
  const { t, isArabic } = useLanguage();

  const officeCards = [
    {
      ...t.contactSection.offices[0],
      map: <SyriaMap />,
    },
    {
      ...t.contactSection.offices[1],
      map: <UaeMap />,
    },
    {
      ...t.contactSection.offices[2],
      map: <IraqMap />,
    },
  ];

  const serviceOptions = t.contactSection.services;

  return (
    <section className={styles.contactSection} dir={isArabic ? "rtl" : "ltr"}>
      <div className="container">
        <div className={styles.contactHeader}>
          <div className={styles.smallLabel}>
            <span></span>
            <p>{t.contactSection.label}</p>
          </div>

          <div className={styles.mainHeading}>
            <h2>{t.contactSection.title}</h2>
            <p>{t.contactSection.subtitle}</p>
          </div>
        </div>

        <div className={`row g-4 ${styles.equalRow}`}>
          <div className={`col-lg-5 ${styles.equalCol}`}>
            <div className={styles.officeCardsWrapper}>
              {officeCards.map((office, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.officeCard} ${
                    activeOffice === index ? styles.officeCardActive : ""
                  }`}
                  onClick={() => setActiveOffice(index)}
                >
                  <div className={styles.officeCardContent}>
                    <div className={styles.officeTextSide}>
                      <div className={styles.officeTop}>
                        <h3>{office.title}</h3>

                        <span className={styles.officeCallIcon}>
                          {/* Optional: add phone/location icon SVG here */}
                        </span>
                      </div>

                      <div className={styles.officeInfo}>
                        <h4>{t.contactSection.contactInfoLabel}</h4>
                        <p>{office.address}</p>
                        <a href={`tel:${office.phoneRaw}`}>{office.phone}</a>
                        <a href={`mailto:${office.email}`}>{office.email}</a>
                      </div>
                    </div>

                    <div className={styles.officeMap}>{office.map}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={`col-lg-7 ${styles.equalCol}`}>
            <div className={styles.formCard}>
              <form className={styles.contactForm}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.fullName}</label>
                      <div className={styles.inputWrap}>
                        <input
                          type="text"
                          placeholder={t.contactSection.form.placeholders.fullName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.emailAddress}</label>
                      <div className={styles.inputWrap}>
                        <input
                          type="email"
                          placeholder={t.contactSection.form.placeholders.email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.phoneOptional}</label>
                      <div className={styles.inputWrap}>
                        <input
                          type="text"
                          placeholder={t.contactSection.form.placeholders.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.companyName}</label>
                      <div className={styles.inputWrap}>
                        <input
                          type="text"
                          placeholder={t.contactSection.form.placeholders.company}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.serviceType}</label>
                      <div className={styles.inputWrap}>
                        <select defaultValue="">
                          <option value="" disabled>
                            {t.contactSection.form.selectService}
                          </option>
                          {serviceOptions.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className={styles.inputGroup}>
                      <label>{t.contactSection.form.message}</label>
                      <div className={styles.inputWrap}>
                        <textarea
                          rows="6"
                          placeholder={t.contactSection.form.placeholders.message}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className={styles.submitButton}>
                      {t.contactSection.form.submit}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   MAPS
=========================== */

function SyriaMap() {
  return (
    <iframe
      className={styles.mapIframe}
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31647.347747398202!2d36.30255404384483!3d33.513924315920754!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e72c221428d5%3A0xa9bfc9b0fc1afed3!2z2LTYsdmD2Kkg2KfZhNi52YLYp9iv!5e0!3m2!1sar!2sus!4v1776005216718!5m2!1sar!2sus"
      width="100%"
      height="220"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Syria Office Map"
    ></iframe>
  );
}

function UaeMap() {
  return (
    <svg
      className={styles.mapSvg}
      width="133"
      height="107"
      viewBox="0 0 133 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M106.514 20.6329L106.879 20.1731L107.084 19.7885L107.161 19.8392L107.177 19.9318L107.322 19.806L107.467 19.8304L107.49 19.972L107.413 20.257L107.406 20.5665L107.444 20.6085L107.649 20.6329L107.678 20.5997L107.656 20.549H107.497L107.49 20.3899L107.596 20.2972L107.573 20.2553L107.497 20.2465L107.481 20.0962L107.572 20.0717L107.64 20.2133L107.685 20.1801L107.67 20.063L107.533 19.8951L107.792 19.7273L108.089 19.8951L108.157 19.8776L108.28 19.9196L108.355 19.8444L108.348 19.8112H108.224L108.178 19.7605L108.049 19.785L107.904 19.7255L107.897 19.5909L108.019 19.4825L107.92 19.4073L107.851 19.5087L107.836 19.6503L107.531 19.7762L107.364 19.7518L107.318 19.6678L107.706 19.1993V19.1066L107.829 19.0646L108.133 18.5699L107.997 18.4352L108.049 18.1677L108.019 18.4108L108.042 18.4352L108.126 18.4108L108.119 18.4772L108.18 18.5104L108.264 18.3513L108.119 18.2499L108.171 18.1992L108.316 18.2412L108.407 18.124L108.453 18.2586L108.385 18.2761L108.392 18.3775L108.476 18.4282L108.621 18.8426L108.783 19.0017H108.965L109.102 18.9353L109.238 18.9527L109.397 19.0542L109.983 19.5822L110.241 19.6329L111.465 19.5909L111.679 19.6416L112.28 19.9004L112.31 19.9755L112.212 20.3602L111.93 21.1312L111.656 21.6243L111.526 21.7659L111.367 21.7834L111.079 21.6907L110.82 21.6662L110.448 21.6837L109.664 21.6173L108.92 21.6347L108.752 21.5928L108.539 21.4931L108.014 21.4179L107.642 21.2676L107.215 21.133L106.514 20.6329ZM121.718 24.0755L121.497 23.8919L121.4 23.7328L121.277 23.4058V23.2642L121.407 22.9548L121.543 22.8044L121.877 22.5789L122.424 22.8638L122.485 22.9478L122.569 23.2904L122.553 23.4408L122.279 23.7415L122.134 23.7328L122.027 23.7835L121.718 24.0755Z" />
      {/* keep the rest of your UAE SVG exactly as you already have it */}
    </svg>
  );
}

function IraqMap() {
  return (
    <svg
      className={styles.mapSvg}
      width="106"
      height="108"
      viewBox="0 0 106 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M58.5637 55.904L58.328 55.8316L57.6407 55.4235L57.3735 55.3432L57.1141 55.3063L56.0911 55.2997L55.1392 55.0469L54.652 54.9824L54.2874 55.0325L54.3413 55.3037L54.4848 55.484L55.0154 55.6157L56.0608 56.145L56.3886 56.4741L56.6467 57.2351L56.8376 58.1962L56.9706 58.5412L57.2655 58.8782L57.7342 59.2061L57.6131 60.4226L57.9106 60.4674L58.2859 60.5701L58.3425 60.578L58.3925 60.5701L58.5084 60.5056L58.565 60.4819L58.615 60.4792L58.6808 60.5056L58.7546 60.5609L59.0153 60.8268L59.0587 60.9282L59.0613 61.0032L59.0679 61.1481L58.9679 61.2547L58.5887 62.6398L58.6124 63.1177L58.7901 63.5508L59.3958 64.4396L59.4721 64.695L59.3694 64.9491L59.3168 65.1584L59.3958 65.4244L59.6196 65.8654L59.6538 66.0037L59.8065 66.6133L59.8803 66.7344L59.9461 66.8015L59.9026 67.0201L59.6433 67.1662L59.5643 67.2953L59.5814 67.4335L59.6657 67.6692L59.8697 67.997L59.9395 68.0786L60.0198 68.2024L60.0725 68.3104L60.2357 68.5289L60.6189 68.1629L60.8414 68.0102L60.8914 68.0128L60.9796 67.9944L61.0626 68.0036L61.5918 67.6231L61.8854 67.7798L62.1251 67.9825L62.445 68.1668L62.9914 68.3459L63.314 68.4486L63.9091 68.8107L64.0486 68.8633L64.1776 68.862L64.279 68.8278L64.3686 68.7778L64.441 68.7106L64.6477 68.4552L64.7109 68.4038L64.8728 68.3064L64.9307 68.259L64.9768 68.1892L64.9847 68.0958L64.9702 67.9799L64.8847 67.9022L64.8373 67.8482L64.8201 67.789L64.8504 67.7008L64.9136 67.5889L65.0176 67.4769L65.0966 67.4401L65.1611 67.4467L65.223 67.498L65.3455 67.6231L65.4126 67.656L65.485 67.6139L65.801 67.315L66.2724 66.9529L66.9636 66.6699L67.8878 66.0511L67.9616 65.9826L68.0919 65.822L68.2209 65.7259L68.7015 65.4336L68.8529 65.3743L68.9464 65.3493L69.103 65.3572L69.0859 65.0926L69.0556 64.6937L68.9174 64.691L68.2749 64.6621L68.0945 64.6107L67.9207 64.4896L67.714 64.2816L67.5271 64.0433L67.1071 63.094L66.6463 61.5641L66.5804 61.4259L66.4343 61.2652L66.2816 61.1428L66.0051 60.9861L65.6562 60.8373L65.5983 60.7399L65.5061 60.7083L65.1137 60.6714L64.57 60.499L63.8867 60.1066L63.8129 60.0882L62.291 59.9802L62.2251 59.9552L62.1738 59.9157L62.1001 59.8459L62.029 59.6432L61.9631 59.3272L61.9263 58.029L61.8459 57.6472L62.025 57.5445L62.0882 57.3655L62.0935 56.8665L62.0527 56.5953L61.9684 56.2793L61.7762 55.7869L61.6419 55.5143L61.6471 55.3629H61.6458L59.8618 55.2721L59.5867 55.1944L59.4484 55.172L59.3075 55.1931L58.9863 55.646L58.7901 55.8395L58.5637 55.904Z" />
      {/* keep the rest of your Iraq SVG exactly as you already have it */}
    </svg>
  );
}