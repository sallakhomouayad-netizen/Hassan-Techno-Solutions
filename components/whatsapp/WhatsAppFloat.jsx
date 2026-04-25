"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./WhatsAppFloat.module.css";

const INITIAL_DELAY = 14000;
const AUTO_HIDE_DELAY = 5000;
const REAPPEAR_DELAY = 25000;

export default function WhatsAppFloat() {
  const { t, isArabic, mounted } = useLanguage();

  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const initialTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const repeatTimerRef = useRef(null);

  const phoneNumber = "963949612992";

  const bubbleMessages = useMemo(() => {
    return t?.whatsappWidget?.bubbleMessages || [];
  }, [t]);

  const currentMessage =
    bubbleMessages.length > 0 ? bubbleMessages[messageIndex] : "";

  const whatsappUrl = useMemo(() => {
    const defaultMessage =
      t?.whatsappWidget?.defaultMessage ||
      "Hello, I would like to know more about your services";

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  }, [t]);

  const clearAllTimers = () => {
    if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (repeatTimerRef.current) clearTimeout(repeatTimerRef.current);
  };

  const isWidgetStopped = () => {
    if (typeof window === "undefined") return false;

    const dismissed =
      sessionStorage.getItem("whatsapp-widget-dismissed") === "true";
    const clicked =
      sessionStorage.getItem("whatsapp-widget-clicked") === "true";

    return dismissed || clicked;
  };

  const scheduleNextBubble = () => {
    if (typeof window === "undefined") return;
    if (isWidgetStopped()) return;
    if (!bubbleMessages.length) return;

    repeatTimerRef.current = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % bubbleMessages.length);
      showBubble();
    }, REAPPEAR_DELAY);
  };

  const showBubble = () => {
    if (isWidgetStopped()) return;
    if (!bubbleMessages.length) return;

    setIsBubbleVisible(true);

    hideTimerRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
      scheduleNextBubble();
    }, AUTO_HIDE_DELAY);
  };

  useEffect(() => {
    if (!mounted) return;
    if (!bubbleMessages.length) return;
    if (isWidgetStopped()) return;

    clearAllTimers();

    initialTimerRef.current = setTimeout(() => {
      showBubble();
    }, INITIAL_DELAY);

    return () => {
      clearAllTimers();
    };
  }, [mounted, bubbleMessages]);

  const handleCloseBubble = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsBubbleVisible(false);
    sessionStorage.setItem("whatsapp-widget-dismissed", "true");
    clearAllTimers();
  };

  const handleWhatsAppClick = () => {
    sessionStorage.setItem("whatsapp-widget-clicked", "true");
    setIsBubbleVisible(false);
    clearAllTimers();
  };

  if (!mounted) return null;

  return (
    <div
      className={`${styles.whatsappWrapper} ${
        isArabic ? styles.wrapperArabic : styles.wrapperEnglish
      }`}
    >
      <div
        className={`${styles.bubbleWrap} ${
          isBubbleVisible ? styles.bubbleWrapShow : ""
        }`}
      >
        <div
          className={`${styles.bubble} ${
            isArabic ? styles.bubbleArabic : styles.bubbleEnglish
          }`}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t?.whatsappWidget?.ariaLabel}
            className={`${styles.bubbleTextLink} ${
              isArabic ? styles.bubbleTextArabic : styles.bubbleTextEnglish
            }`}
            onClick={handleWhatsAppClick}
          >
            {currentMessage}
          </a>

          <button
            type="button"
            className={styles.closeBtn}
            aria-label={t?.whatsappWidget?.closeLabel}
            onClick={handleCloseBubble}
          >
            <HiXMark />
          </button>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t?.whatsappWidget?.ariaLabel}
        className={styles.whatsappButton}
        onClick={handleWhatsAppClick}
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}