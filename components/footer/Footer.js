"use client";

import Link from "next/link";
import { useCallback } from "react";
import Styles from "./Footer.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <footer className={Styles.footer}>
      <div className="container">
        <div className={Styles.topTag}>
          <span className={Styles.dot}></span>
          <p>{t.footer.tag}</p>
        </div>

        <div className={`row g-5 ${Styles.myRow}`}>
          <div className="col-lg-5">
            <div className={Styles.left}>
              <h3 className={Styles.newsTitle}>{t.footer.newsletterTitle}</h3>

              <form className={Styles.subscribeForm} onSubmit={handleSubmit}>
                <label htmlFor="footer-email" className={Styles.visuallyHidden}>
                  {t.footer.emailPlaceholder}
                </label>

                <input
                  id="footer-email"
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className={Styles.input}
                  autoComplete="email"
                  inputMode="email"
                />

                <button
                  type="submit"
                  className={Styles.submitBtn}
                  aria-label={t.footer.newsletterTitle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
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
                </button>
              </form>

              <div className={Styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6020.753773799345!2d36.299592699999984!3d33.51243949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e72c221428d5%3A0xa9bfc9b0fc1afed3!2z2LTYsdmD2Kkg2KfZhNi52YLYp9iv!5e1!3m2!1sar!2s!4v1775901709374!5m2!1sar!2s"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.footer.mapTitle}
                ></iframe>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className={Styles.right}>
              <nav aria-label="Footer navigation">
                <div className="row g-5">
                  <div className="col-6 col-md-4 col-lg-4">
                    <div className={Styles.linkGroup}>
                      <h4>{t.footer.groups.quickLinks}</h4>
                      <ul>
                        <li>
                          <Link href="/">{t.footer.links.home}</Link>
                        </li>
                        <li>
                          <Link href="/about-us">{t.footer.links.about}</Link>
                        </li>
                        <li>
                          <Link href="/solutions">{t.footer.links.solutions}</Link>
                        </li>
                        <li>
                          <Link href="/contact">{t.footer.links.contact}</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-6 col-md-4 col-lg-4">
                    <div className={Styles.linkGroup}>
                      <h4>{t.footer.groups.followUs}</h4>
                      <ul>
                        <li>
                          <a
                            href="https://www.instagram.com/tchno_solutions?igsh=aHFjNG9oNHR1MW04"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className={Styles.socialIcon} aria-hidden="true">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 0 1 4.25 4.25v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.75 1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5z" />
                              </svg>
                            </span>
                            {t.footer.social.instagram}
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://www.facebook.com/share/1B9cUHzqBN/?mibextid=wwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className={Styles.socialIcon} aria-hidden="true">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M13.5 22V13.8H16.3L16.72 10.6H13.5V8.56C13.5 7.64 13.76 7.01 15.08 7.01H16.83V4.15C15.98 4.03 15.13 3.97 14.27 3.98C11.72 3.98 9.97 5.54 9.97 8.41V10.6H7.2V13.8H9.97V22H13.5Z" />
                              </svg>
                            </span>
                            {t.footer.social.facebook}
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://www.linkedin.com/company/techno-solutions-sy/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className={Styles.socialIcon} aria-hidden="true">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3C4.17 3 3.5 3.72 3.5 4.66C3.5 5.58 4.15 6.31 5.21 6.31H5.23C6.33 6.31 7 5.58 7 4.66C6.98 3.72 6.33 3 5.25 3ZM20.5 12.87C20.5 9.58 18.74 8.05 16.39 8.05C14.5 8.05 13.66 9.09 13.18 9.82V8.5H9.8C9.84 9.37 9.8 19.5 9.8 19.5H13.18V13.36C13.18 13.03 13.2 12.69 13.3 12.45C13.56 11.79 14.15 11.1 15.15 11.1C16.46 11.1 16.98 12.09 16.98 13.55V19.5H20.36V13.16C20.36 12.99 20.36 12.93 20.5 12.87Z" />
                              </svg>
                            </span>
                            {t.footer.social.linkedin}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-6 col-md-4 col-lg-4">
                    <address className={Styles.linkGroup}>
                      <h4>{t.footer.groups.contactUs}</h4>
                      <ul>
                        <li>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Sangaqdar%2C+Damascus%2C+Syria"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.footer.contact.address}
                          </a>
                        </li>
                        <li>
                          <a href="tel:+963949612992">{t.footer.contact.phone}</a>
                        </li>
                        <li>
                          <a href="mailto:contact@tchnosolutions.sy">
                            {t.footer.contact.email}
                          </a>
                        </li>
                      </ul>
                    </address>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div className={Styles.bottom}>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}