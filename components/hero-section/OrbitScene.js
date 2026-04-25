"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./OrbitScene.module.css";

gsap.registerPlugin(MotionPathPlugin);

export default function OrbitScene({ activeColor = "#4d82f5" }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const desktopSceneMedia = window.matchMedia("(min-width: 768px)");

    let orbitTweens = [];
    let sceneTweens = [];
    let rafId = null;

    const clearOrbitTweens = () => {
      orbitTweens.forEach((tween) => tween.kill());
      orbitTweens = [];
    };

    const clearSceneTweens = () => {
      sceneTweens.forEach((tween) => tween.kill());
      sceneTweens = [];
    };

    const clearAllSceneAnimations = () => {
      clearOrbitTweens();
      clearSceneTweens();
    };

    const context = gsap.context(() => {
      const getOrbitIcons = () =>
        Array.from(root.querySelectorAll('[data-orbit-icon="true"]'));

      const getStaticIcons = () =>
        Array.from(root.querySelectorAll('[data-static-icon="true"]'));

      const positionOrAnimateIcons = () => {
        clearOrbitTweens();

        if (!desktopSceneMedia.matches) return;

        const orbitIcons = getOrbitIcons();

        orbitIcons.forEach((icon) => {
          const pathSelector = icon.getAttribute("data-path");
          const duration = Number(icon.getAttribute("data-duration")) || 30;
          const start = Number(icon.getAttribute("data-start")) || 0;

          if (!pathSelector) return;

          const path = root.querySelector(pathSelector);
          if (!path) return;

          if (prefersReducedMotion.matches) {
            gsap.set(icon, {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start,
              },
            });
            return;
          }

          const tween = gsap.to(icon, {
            duration,
            repeat: -1,
            ease: "none",
            force3D: true,
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start,
              end: start + 1,
            },
          });

          orbitTweens.push(tween);
        });
      };

      const animateStaticIcons = () => {
        if (!desktopSceneMedia.matches || prefersReducedMotion.matches) return;

        const staticIcons = getStaticIcons();

        staticIcons.forEach((icon, index) => {
          const tween = gsap.to(icon, {
            y: index % 2 === 0 ? -3 : 3,
            duration: 4.2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          });

          sceneTweens.push(tween);
        });
      };

      const animateScene = () => {
        clearSceneTweens();

        if (!desktopSceneMedia.matches || prefersReducedMotion.matches) return;

        const orbitScene = root.querySelector('[data-scene-root="true"]');
        const vortexGlow = root.querySelector('[data-vortex-glow="true"]');
        const vortexShadow = root.querySelector('[data-vortex-shadow="true"]');
        const haze = root.querySelectorAll('[data-haze="true"]');
        const orbitBlur = root.querySelectorAll('[data-orbit-blur="true"]');

        if (orbitScene) {
          const orbitSceneTween = gsap.to(orbitScene, {
            x: 14,
            y: -8,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          });

          sceneTweens.push(orbitSceneTween);
        }

        if (vortexGlow) {
          const glowTween = gsap.to(vortexGlow, {
            scale: 1.04,
            opacity: 0.92,
            duration: 6.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
            force3D: true,
          });

          sceneTweens.push(glowTween);
        }

        if (vortexShadow) {
          const shadowTween = gsap.to(vortexShadow, {
            scale: 1.035,
            opacity: 0.98,
            duration: 5.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
            force3D: true,
          });

          sceneTweens.push(shadowTween);
        }

        if (haze.length) {
          const hazeTween = gsap.to(haze, {
            opacity: "+=0.04",
            duration: 6.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.35,
          });

          sceneTweens.push(hazeTween);
        }

        if (orbitBlur.length) {
          const blurTween = gsap.to(orbitBlur, {
            opacity: "+=0.035",
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
          });

          sceneTweens.push(blurTween);
        }

        animateStaticIcons();
      };



      
      const initAnimations = () => {
        if (!desktopSceneMedia.matches) {
          clearAllSceneAnimations();
          return;
        }

        positionOrAnimateIcons();
        animateScene();
      };

      const handleResize = () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }

        rafId = window.requestAnimationFrame(() => {
          if (!desktopSceneMedia.matches) {
            clearAllSceneAnimations();
            return;
          }

          initAnimations();
        });
      };

      initAnimations();
      window.addEventListener("resize", handleResize);

      return () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }

        clearAllSceneAnimations();
        window.removeEventListener("resize", handleResize);
      };
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      className={styles.sceneAosWrap}
      ref={rootRef}
      style={{ "--orbit-accent": activeColor }}
    >
      <div
        className={`${styles.orbitScene} orbit-scene-root`}
        data-scene-root="true"
      >
        <div
          className={`${styles.sceneHaze} ${styles.sceneHazeA} scene-haze-a-node`}
          data-haze="true"
        ></div>

        <div
          className={`${styles.sceneHaze} ${styles.sceneHazeB} scene-haze-b-node`}
          data-haze="true"
        ></div>

        <div
          className={`${styles.vortexGlow} vortex-glow-node`}
          data-vortex-glow="true"
        ></div>

        <div
          className={styles.vortexShadow}
          data-vortex-shadow="true"
          aria-hidden="true"
        >
          <span className={styles.vortexCore}></span>
        </div>

        <svg
          id="orbital-svg"
          className={styles.orbitalSvg}
          viewBox="0 0 780 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="grad-outer-cyan"
              x1="100"
              y1="560"
              x2="760"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#86FFF4" stopOpacity="0" />
              <stop offset="18%" stopColor="#86FFF4" stopOpacity="0.12" />
              <stop offset="44%" stopColor="#CFFFFF" stopOpacity="0.42" />
              <stop offset="67%" stopColor="#79F8FF" stopOpacity="0.90" />
              <stop offset="84%" stopColor="#D9FFFF" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#D9FFFF" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="grad-middle-white"
              x1="140"
              y1="550"
              x2="705"
              y2="190"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#F5F9FF" stopOpacity="0.28" />
              <stop offset="74%" stopColor="#C9F8FF" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="grad-inner-mix"
              x1="210"
              y1="500"
              x2="640"
              y2="250"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="44%" stopColor="#D3FFFF" stopOpacity="0.36" />
              <stop offset="72%" stopColor="#7EFFFF" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="grad-accent"
              x1="565"
              y1="125"
              x2="770"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#7FFFF8" stopOpacity="0.28" />
            </linearGradient>

            <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>

            <symbol id="icon-atom" viewBox="0 0 24 24">
              <ellipse
                cx="12"
                cy="12"
                rx="8.8"
                ry="3.5"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="8.8"
                ry="3.5"
                transform="rotate(60 12 12)"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="8.8"
                ry="3.5"
                transform="rotate(-60 12 12)"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <circle cx="12" cy="12" r="1.55" fill="currentColor" />
            </symbol>

            <symbol id="icon-globe" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <path
                d="M3.9 12h16.2"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M12 3.8c2.5 2.3 3.9 5.3 3.9 8.2 0 2.9-1.4 5.9-3.9 8.2-2.5-2.3-3.9-5.3-3.9-8.2 0-2.9 1.4-5.9 3.9-8.2Z"
                stroke="currentColor"
                strokeWidth="1.35"
              />
            </symbol>

            <symbol id="icon-shield" viewBox="0 0 24 24">
              <path
                d="M12 3.5 18.7 7v5.1c0 4.1-2.6 7.1-6.7 8.4-4.1-1.3-6.7-4.3-6.7-8.4V7L12 3.5Z"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <path
                d="M9.4 12.2 11.2 14l3.7-4.3"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>

            <symbol id="icon-branch" viewBox="0 0 24 24">
              <circle
                cx="7"
                cy="6.4"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <circle
                cx="17"
                cy="5.8"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <circle
                cx="17"
                cy="17.4"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <path
                d="M8.6 6.4h4.2a4.2 4.2 0 0 1 4.2 4.2v5.2"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M8.5 6.4v8.1a2.8 2.8 0 0 0 2.8 2.8h4.1"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </symbol>

            <symbol id="icon-send" viewBox="0 0 24 24">
              <path
                d="M4.2 11.6 19.8 4.3l-5.4 15.4-3.1-5L4.2 11.6Z"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
                strokeLinejoin="round"
              />
              <path
                d="M11.4 14.7 19.8 4.3"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </symbol>

            <symbol id="icon-code" viewBox="0 0 24 24">
              <polyline
                points="9,6 4.5,12 9,18"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="15,6 19.5,12 15,18"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2 4.6 10.8 19.4"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </symbol>

            <symbol id="icon-network" viewBox="0 0 24 24">
              <circle
                cx="6.2"
                cy="12"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <circle
                cx="17.8"
                cy="7"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <circle
                cx="17.8"
                cy="17"
                r="1.55"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
              />
              <path
                d="M7.8 11.2 16 8"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M7.8 12.8 16 16"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
              <path
                d="M17.8 8.6v6.8"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            </symbol>

            <symbol id="icon-spark" viewBox="0 0 24 24">
              <path
                d="M12 4.2 13.6 9l4.8 1.6-4.8 1.6-1.6 4.8-1.6-4.8L5.6 10.6 10.4 9 12 4.2Z"
                stroke="currentColor"
                strokeWidth="1.35"
                fill="none"
                strokeLinejoin="round"
              />
            </symbol>
          </defs>

          <g className={styles.orbitGlowLayer}>
            <path
              className={`${styles.orbit} ${styles.orbitBlur} orbit-blur-node`}
              data-orbit-blur="true"
              d="M 84 546 C 18 454, 118 340, 302 280 C 508 213, 726 181, 769 262 C 807 334, 682 468, 478 543 C 277 616, 120 618, 84 546"
              stroke="url(#grad-outer-cyan)"
              filter="url(#orbitGlow)"
            />
            <path
              className={`${styles.orbit} ${styles.orbitBlur} ${styles.orbitBlurLight} orbit-blur-node`}
              data-orbit-blur="true"
              d="M 119 512 C 72 438, 158 356, 317 305 C 489 249, 659 224, 703 284 C 739 335, 641 432, 474 493 C 316 551, 157 565, 119 512"
              stroke="url(#grad-middle-white)"
              filter="url(#orbitGlow)"
            />
            <path
              className={`${styles.orbit} ${styles.orbitBlur} orbit-blur-node`}
              data-orbit-blur="true"
              d="M 164 470 C 133 418, 194 364, 319 324 C 447 282, 579 263, 616 305 C 648 343, 575 418, 450 463 C 321 509, 190 512, 164 470"
              stroke="url(#grad-inner-mix)"
              filter="url(#orbitGlow)"
            />
          </g>

          <g className={styles.orbitLineLayer}>
            <path
              id="orbit-outer"
              className={`${styles.orbit} ${styles.orbitMain}`}
              d="M 84 546 C 18 454, 118 340, 302 280 C 508 213, 726 181, 769 262 C 807 334, 682 468, 478 543 C 277 616, 120 618, 84 546"
              stroke="url(#grad-outer-cyan)"
            />
            <path
              id="orbit-middle"
              className={`${styles.orbit} ${styles.orbitMain} ${styles.orbitFaint}`}
              d="M 119 512 C 72 438, 158 356, 317 305 C 489 249, 659 224, 703 284 C 739 335, 641 432, 474 493 C 316 551, 157 565, 119 512"
              stroke="url(#grad-middle-white)"
            />
            <path
              id="orbit-inner"
              className={`${styles.orbit} ${styles.orbitMain}`}
              d="M 164 470 C 133 418, 194 364, 319 324 C 447 282, 579 263, 616 305 C 648 343, 575 418, 450 463 C 321 509, 190 512, 164 470"
              stroke="url(#grad-inner-mix)"
            />
          </g>

          <g className={styles.orbitAccentLayer}>
            <path
              className={`${styles.orbit} ${styles.orbitAccentPath}`}
              d="M 560 145 C 635 128, 710 144, 758 203"
              stroke="url(#grad-accent)"
            />
            <path
              className={`${styles.orbit} ${styles.orbitAccentPath}`}
              d="M 571 205 C 632 195, 692 214, 738 259"
              stroke="url(#grad-accent)"
            />
          </g>

          <g className={styles.orbitStaticIcons}>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconStatic} orbit-icon-static`}
              data-static-icon="true"
              transform="translate(654 165)"
            >
              <use href="#icon-branch" x="-11" y="-11" width="22" height="22"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconStatic} orbit-icon-static`}
              data-static-icon="true"
              transform="translate(717 210)"
            >
              <use href="#icon-atom" x="-11" y="-11" width="22" height="22"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconStatic} ${styles.orbitIconOptional} orbit-icon-static`}
              data-static-icon="true"
              transform="translate(665 318)"
            >
              <use
                href="#icon-network"
                x="-11.5"
                y="-11.5"
                width="23"
                height="23"
              ></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconStatic} ${styles.orbitIconOptional} orbit-icon-static`}
              data-static-icon="true"
              transform="translate(150 568)"
            >
              <use href="#icon-send" x="-11.5" y="-11.5" width="23" height="23"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconStatic} orbit-icon-static`}
              data-static-icon="true"
              transform="translate(88 598)"
            >
              <use href="#icon-code" x="-11.5" y="-11.5" width="23" height="23"></use>
            </g>
          </g>

          <g className={styles.orbitMovingIcons}>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-outer"
              data-duration="46"
              data-start="0.10"
            >
              <use href="#icon-atom" x="-13" y="-13" width="26" height="26"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-outer"
              data-duration="60"
              data-start="0.63"
            >
              <use href="#icon-spark" x="-11" y="-11" width="22" height="22"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-middle"
              data-duration="36"
              data-start="0.18"
            >
              <use href="#icon-branch" x="-12" y="-12" width="24" height="24"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-middle"
              data-duration="52"
              data-start="0.73"
            >
              <use href="#icon-globe" x="-12" y="-12" width="24" height="24"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-inner"
              data-duration="30"
              data-start="0.30"
            >
              <use href="#icon-shield" x="-13" y="-13" width="26" height="26"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-inner"
              data-duration="34"
              data-start="0.60"
            >
              <use href="#icon-send" x="-12" y="-12" width="24" height="24"></use>
            </g>
            <g
              className={`${styles.orbitIcon} ${styles.orbitIconMoving}`}
              data-orbit-icon="true"
              data-path="#orbit-inner"
              data-duration="39"
              data-start="0.87"
            >
              <use href="#icon-code" x="-11.5" y="-11.5" width="23" height="23"></use>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}