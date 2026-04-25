"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

function LanguageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm6.93 9h-3.02a15.93 15.93 0 0 0-1.38-5.02A8.03 8.03 0 0 1 18.93 11ZM12 4.04c.83 1.2 2.04 3.63 2.46 6.96H9.54C9.96 7.67 11.17 5.24 12 4.04ZM4.07 13h3.02c.16 1.8.64 3.52 1.38 5.02A8.03 8.03 0 0 1 4.07 13Zm3.02-2H4.07a8.03 8.03 0 0 1 4.4-5.02A15.93 15.93 0 0 0 7.09 11Zm4.91 8.96c-.83-1.2-2.04-3.63-2.46-6.96h4.92c-.42 3.33-1.63 5.76-2.46 6.96ZM15.91 13h3.02a8.03 8.03 0 0 1-4.4 5.02c.74-1.5 1.22-3.22 1.38-5.02Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.25 7.5 10 12.25 14.75 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [desktopLangOpen, setDesktopLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const { t, language, setLanguage, isArabic } = useLanguage();
  const pathname = usePathname();

  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);

  const solutionLinks = useMemo(
    () => [
      {
        key: "strato",
        label: t.header.solutionItems.strato,
        href: "/solutions/strato-solutions",
      },
      {
        key: "power",
        label: t.header.solutionItems.power,
        href: "/solutions/power-solutions",
      },
      {
        key: "cyber",
        label: t.header.solutionItems.cyber,
        href: "/solutions/cyber-solutions",
      },
      {
        key: "smart",
        label: t.header.solutionItems.smart,
        href: "/solutions/smart-solutions",
      },
      {
        key: "graphic",
        label: t.header.solutionItems.graphic,
        href: "/solutions/graphic-solutions",
      },
    ],
    [t]
  );

  const navLinks = useMemo(
    () => [
      { key: "projects", label: t.header.links.projects, href: "/projects" },
      { key: "contact", label: t.header.links.contact, href: "/contact" },
      { key: "about", label: t.header.links.about, href: "/about-us" },
    ],
    [t]
  );

  const currentLanguageLabel = useMemo(() => {
    return language === "ar" ? "AR" : "EN";
  }, [language]);

  const isSolutionsActive =
    pathname === "/solutions" || pathname.startsWith("/solutions/");

  const handleChangeLanguage = useCallback(
    (selectedLanguage) => {
      setLanguage(selectedLanguage);
      setDesktopLangOpen(false);
      setMobileLangOpen(false);
    },
    [setLanguage]
  );

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileSolutionsOpen(false);
    setMobileLangOpen(false);
  }, []);

  const toggleMobileSolutions = useCallback(() => {
    setMobileSolutionsOpen((prev) => !prev);
  }, []);

  const toggleDesktopLangDropdown = useCallback(() => {
    setDesktopLangOpen((prev) => !prev);
  }, []);

  const toggleMobileLangDropdown = useCallback(() => {
    setMobileLangOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopLangRef.current &&
        !desktopLangRef.current.contains(event.target)
      ) {
        setDesktopLangOpen(false);
      }

      if (
        mobileLangRef.current &&
        !mobileLangRef.current.contains(event.target)
      ) {
        setMobileLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDesktopLangOpen(false);
    setMobileLangOpen(false);
    setMenuOpen(false);
    setMobileSolutionsOpen(false);
  }, [pathname]);

  return (
    <header data-aos="fade-down" className={styles.siteHeader} role="banner">
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.heroNavWrapper}>
          {/* Desktop */}
          <div
            className={`d-none d-lg-flex align-items-center justify-content-between ${styles.heroNavDesktop}`}
          >
            <Link href="/" className={styles.brand} aria-label={t.header.logoAlt}>
              <Image
                src="/images/MMAinLogo.png"
                alt={t.header.logoAlt}
                width={184}
                height={60}
                sizes="184px"
                priority
              />
            </Link>

            <div className={styles.desktopRightSide}>
              <nav
                className={styles.desktopNav}
                aria-label={t.header.navAriaLabel}
              >
                <ul className={styles.desktopNavList}>
                  <li>
                    <Link
                      href="/"
                      aria-current={pathname === "/" ? "page" : undefined}
                      className={pathname === "/" ? styles.desktopActive : ""}
                    >
                      <span>{t.header.links.home}</span>
                    </Link>
                  </li>

                  <li className={styles.desktopDropdown}>
                    <Link
                      href="/solutions"
                      aria-current={isSolutionsActive ? "page" : undefined}
                      className={isSolutionsActive ? styles.desktopActive : ""}
                    >
                      <span>{t.header.links.solutions}</span>
                    </Link>

                    <div className={styles.desktopDropdownMenu}>
                      {solutionLinks.map((link) => (
                        <Link key={link.key} href={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </li>

                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={pathname === link.href ? styles.desktopActive : ""}
                      >
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className={styles.desktopLang}
                aria-label={t.header.languageSwitcherAriaLabel}
                ref={desktopLangRef}
              >
                <button
                  type="button"
                  className={styles.langDropdownToggle}
                  aria-expanded={desktopLangOpen}
                  aria-haspopup="menu"
                  onClick={toggleDesktopLangDropdown}
                >
                  <span className={styles.langIcon} aria-hidden="true">
                    <LanguageIcon />
                  </span>

                  <span className={styles.langShortLabel}>
                    {currentLanguageLabel}
                  </span>

                  <span
                    className={`${styles.langChevron} ${
                      desktopLangOpen ? styles.langChevronOpen : ""
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDownIcon />
                  </span>
                </button>

                <div
                  className={`${styles.langDropdownMenu} ${
                    desktopLangOpen ? styles.langDropdownMenuShow : ""
                  }`}
                  role="menu"
                >
                  <button
                    type="button"
                    className={`${styles.langDropdownItem} ${
                      language === "en" ? styles.langDropdownItemActive : ""
                    }`}
                    onClick={() => handleChangeLanguage("en")}
                    role="menuitem"
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    className={`${styles.langDropdownItem} ${
                      language === "ar" ? styles.langDropdownItemActive : ""
                    }`}
                    onClick={() => handleChangeLanguage("ar")}
                    role="menuitem"
                  >
                    AR
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className={`d-lg-none ${styles.mobileNavWrapper}`}>
            <div
              className={`d-flex align-items-center justify-content-between ${styles.heroNavMobile}`}
            >
              <Link
                href="/"
                className={`${styles.brand} ${styles.mobileBrand}`}
                aria-label={t.header.logoAlt}
              >
                <Image
                  src="/images/MMainLogoSolutions.png"
                  alt={t.header.logoAlt}
                  width={184}
                  height={60}
                  sizes="(max-width: 575.98px) 160px, 184px"
                  priority
                />
              </Link>

              <div
                className={`d-flex align-items-center ${styles.mobileHeaderActions}`}
              >
                <div
                  className={styles.mobileLangWrapper}
                  aria-label={t.header.mobileLanguageSwitcherAriaLabel}
                  ref={mobileLangRef}
                >
                  <button
                    type="button"
                    className={styles.mobileLangToggle}
                    aria-expanded={mobileLangOpen}
                    aria-haspopup="menu"
                    onClick={toggleMobileLangDropdown}
                  >
                    <span className={styles.langIcon} aria-hidden="true">
                      <LanguageIcon />
                    </span>

                    <span className={styles.langShortLabel}>
                      {currentLanguageLabel}
                    </span>

                    <span
                      className={`${styles.langChevron} ${
                        mobileLangOpen ? styles.langChevronOpen : ""
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>

                  <div
                    className={`${styles.mobileLangDropdownMenu} ${
                      mobileLangOpen ? styles.mobileLangDropdownMenuShow : ""
                    }`}
                    role="menu"
                  >
                    <button
                      type="button"
                      className={`${styles.langDropdownItem} ${
                        language === "en" ? styles.langDropdownItemActive : ""
                      }`}
                      onClick={() => handleChangeLanguage("en")}
                      role="menuitem"
                    >
                      EN
                    </button>

                    <button
                      type="button"
                      className={`${styles.langDropdownItem} ${
                        language === "ar" ? styles.langDropdownItemActive : ""
                      }`}
                      onClick={() => handleChangeLanguage("ar")}
                      role="menuitem"
                    >
                      AR
                    </button>
                  </div>
                </div>

                <button
                  className={`${styles.menuToggleBtn} ${
                    menuOpen ? styles.menuToggleBtnActive : ""
                  }`}
                  type="button"
                  aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={handleToggleMenu}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>

            {menuOpen && (
              <div
                id="mobile-menu"
                className={`${styles.mobileDropdownMenu} ${styles.mobileDropdownMenuShow}`}
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className={styles.mobileMenuBody}>
                  <nav
                    className={styles.mobileMenuLinks}
                    aria-label={t.header.mobileNavAriaLabel}
                  >
                    <Link
                      href="/"
                      aria-current={pathname === "/" ? "page" : undefined}
                      className={pathname === "/" ? styles.mobileCurrentPage : ""}
                      onClick={handleCloseMenu}
                    >
                      {t.header.links.home}
                    </Link>

                    <div
                      className={`${styles.mobileSolutionsBlock} ${
                        mobileSolutionsOpen ? styles.mobileSolutionsBlockOpen : ""
                      }`}
                    >
                      <div className={styles.mobileSolutionsTopRow}>
                        <Link
                          href="/solutions"
                          aria-current={isSolutionsActive ? "page" : undefined}
                          className={isSolutionsActive ? styles.mobileCurrentPage : ""}
                          onClick={handleCloseMenu}
                        >
                          {t.header.links.solutions}
                        </Link>

                        <button
                          type="button"
                          className={styles.mobileSolutionsToggle}
                          onClick={toggleMobileSolutions}
                          aria-expanded={mobileSolutionsOpen}
                          aria-label={t.header.links.solutions}
                          aria-controls="mobile-solutions-submenu"
                        >
                          <span
                            className={`${styles.mobileSolutionsArrow} ${
                              mobileSolutionsOpen ? styles.mobileSolutionsArrowOpen : ""
                            }`}
                          ></span>
                        </button>
                      </div>

                      <div
                        id="mobile-solutions-submenu"
                        className={`${styles.mobileSolutionsSubmenu} ${
                          mobileSolutionsOpen ? styles.mobileSolutionsSubmenuOpen : ""
                        }`}
                      >
                        {solutionLinks.map((link) => (
                          <Link
                            key={link.key}
                            href={link.href}
                            onClick={handleCloseMenu}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {navLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={pathname === link.href ? styles.mobileCurrentPage : ""}
                        onClick={handleCloseMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}