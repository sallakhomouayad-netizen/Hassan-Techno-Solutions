"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./HeaderPower.module.css";

function LanguageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 9H20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3.5 15H20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 3C14.2 5.2 15.45 8.49 15.45 12C15.45 15.51 14.2 18.8 12 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 3C9.8 5.2 8.55 8.49 8.55 12C8.55 15.51 9.8 18.8 12 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function DesktopIndicator({ isActive }) {
  if (isActive) {
    return (
      <span className={styles.activeIcon}>
        <ArrowUpRightIcon />
      </span>
    );
  }

  return (
    <span className={styles.navIndicator}>
      <span className={styles.navDot}></span>
      <span className={styles.hoverIcon}>
        <ArrowUpRightIcon />
      </span>
    </span>
  );
}

export default function HeaderPower() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const pathname = usePathname();
  const { t, language, setLanguage, isArabic } = useLanguage();

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
      { key: "home", label: t.header.links.home, href: "/" },
      { key: "projects", label: t.header.links.projects, href: "/projects" },
      { key: "contact", label: t.header.links.contact, href: "/contact" },
      { key: "about", label: t.header.links.about, href: "/about-us" },
    ],
    [t]
  );

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSolutionsActive =
    pathname === "/solutions" || pathname.startsWith("/solutions/");

  const handleChangeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setMobileSolutionsOpen(false);
  };

  const toggleMobileSolutions = () => {
    setMobileSolutionsOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false);
    setMobileSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className={styles.siteHeader}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.heroNavWrapper}>
          <div
            className={`d-none d-lg-flex align-items-center justify-content-between ${styles.heroNavDesktop}`}
          >
            <Link href="/" className={styles.brand} aria-label={t.header.logoAlt}>
              <Image
                src="/images/MMainLogoPower.png"
                alt={t.header.logoAlt}
                width={184}
                height={52}
                priority
                sizes="184px"
              />
            </Link>

            <nav
              className={styles.desktopNav}
              aria-label={t.header.navAriaLabel}
            >
              <Link
                href="/"
                className={`${styles.navLink} ${
                  pathname === "/" ? styles.desktopActive : ""
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <DesktopIndicator isActive={pathname === "/"} />
                <span>{t.header.links.home}</span>
              </Link>

              <div className={styles.desktopDropdown}>
                <Link
                  href="/solutions"
                  className={`${styles.navLink} ${
                    isSolutionsActive ? styles.desktopActive : ""
                  }`}
                  aria-current={isSolutionsActive ? "page" : undefined}
                >
                  <DesktopIndicator isActive={isSolutionsActive} />
                  <span>{t.header.links.solutions}</span>
                </Link>

                <div
                  className={styles.desktopDropdownMenu}
                  aria-label={t.header.links.solutions}
                >
                  {solutionLinks.map((link) => (
                    <Link key={link.key} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks
                .filter((link) => link.key !== "home")
                .map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={`${styles.navLink} ${
                        isActive ? styles.desktopActive : ""
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <DesktopIndicator isActive={isActive} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
            </nav>

            <div
              className={styles.desktopLang}
              aria-label={t.header.languageSwitcherAriaLabel}
            >
              <button
                type="button"
                onClick={() => handleChangeLanguage("en")}
                className={`${styles.langBtn} ${
                  language === "en" ? styles.desktopLangActive : ""
                }`}
                aria-pressed={language === "en"}
              >
                <span className={styles.langIcon}>
                  <LanguageIcon />
                </span>
                <span>{t.header.languages.english}</span>
              </button>

              <button
                type="button"
                onClick={() => handleChangeLanguage("ar")}
                className={`${styles.langBtn} ${
                  language === "ar" ? styles.desktopLangActive : ""
                }`}
                aria-pressed={language === "ar"}
              >
                <span>{t.header.languages.arabic}</span>
              </button>
            </div>
          </div>

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
                  src="/images/MMainLogoPower.png"
                  alt={t.header.logoAlt}
                  width={184}
                  height={52}
                  priority
                  sizes="(max-width: 575.98px) 160px, 184px"
                />
              </Link>

              <div
                className={`d-flex align-items-center ${styles.mobileHeaderActions}`}
              >
                <div
                  className={styles.mobileLangSwitch}
                  aria-label={t.header.mobileLanguageSwitcherAriaLabel}
                >
                  <button
                    type="button"
                    onClick={() => handleChangeLanguage("en")}
                    className={`${styles.mobileLangBtn} ${
                      language === "en" ? styles.mobileTopLangActive : ""
                    }`}
                    aria-pressed={language === "en"}
                  >
                    {t.common.switchToEnglish}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChangeLanguage("ar")}
                    className={`${styles.mobileLangBtn} ${
                      language === "ar" ? styles.mobileTopLangActive : ""
                    }`}
                    aria-pressed={language === "ar"}
                  >
                    {t.common.switchToArabic}
                  </button>
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

            <div
              id="mobile-menu"
              className={`${styles.mobileDropdownMenu} ${
                menuOpen ? styles.mobileDropdownMenuShow : ""
              }`}
              dir={isArabic ? "rtl" : "ltr"}
              aria-hidden={!menuOpen}
            >
              <div className={styles.mobileMenuBody}>
                <nav
                  className={styles.mobileMenuLinks}
                  aria-label={t.header.mobileNavAriaLabel}
                >
                  <Link
                    href="/"
                    className={pathname === "/" ? styles.mobileCurrentPage : ""}
                    onClick={handleCloseMenu}
                    aria-current={pathname === "/" ? "page" : undefined}
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
                        className={
                          isSolutionsActive ? styles.mobileCurrentPage : ""
                        }
                        onClick={handleCloseMenu}
                        aria-current={isSolutionsActive ? "page" : undefined}
                      >
                        {t.header.links.solutions}
                      </Link>

                      <button
                        type="button"
                        className={styles.mobileSolutionsToggle}
                        onClick={toggleMobileSolutions}
                        aria-expanded={mobileSolutionsOpen}
                        aria-controls="mobile-solutions-submenu"
                        aria-label={t.header.links.solutions}
                      >
                        <span
                          className={`${styles.mobileSolutionsArrow} ${
                            mobileSolutionsOpen
                              ? styles.mobileSolutionsArrowOpen
                              : ""
                          }`}
                        ></span>
                      </button>
                    </div>

                    <div
                      id="mobile-solutions-submenu"
                      className={`${styles.mobileSolutionsSubmenu} ${
                        mobileSolutionsOpen
                          ? styles.mobileSolutionsSubmenuOpen
                          : ""
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

                  {navLinks
                    .filter((link) => link.key !== "home")
                    .map((link) => {
                      const isActive = isLinkActive(link.href);

                      return (
                        <Link
                          key={link.key}
                          href={link.href}
                          className={isActive ? styles.mobileCurrentPage : ""}
                          onClick={handleCloseMenu}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}