"use client";

import Image from "next/image";
import Styles from "./OurPartners.module.css";
import { useLanguage } from "@/context/LanguageContext";

const partnerRows = [
  [
    "/images/partner1.png",
    "/images/partner2.png",
    "/images/partner3.png",
    "/images/partner4.png",
    "/images/partner5.png",
    "/images/partner6.png",
  ],
  [
    "/images/partner7.png",
    "/images/partner8.png",
    "/images/partner9.png",
    "/images/partner10.png",
    "/images/partner11.png",
    "/images/partner12.png",
  ],
  [
    "/images/partner13.png",
    "/images/partner14.png",
    "/images/partner15.png",
    "/images/partner16.png",
    "/images/partner17.png",
    "/images/partner18.png",
  ],
  [
    "/images/partner19.png",
    "/images/partner20.png",
    "/images/partner21.png",
    "/images/partner22.png",
    "/images/partner23.png",
    "/images/partner24.png",
  ],
];

function PartnerRow({
  images,
  direction = "left",
  duration = "28s",
  altPrefix,
  rowIndex,
}) {
  const loopImages = [...images, ...images];

  return (
    <div className={Styles.rowWrapper} dir="ltr">
      <ul
        className={`${Styles.rowTrack} ${
          direction === "right" ? Styles.moveRight : Styles.moveLeft
        }`}
        style={{ "--duration": duration }}
        aria-label={`${altPrefix} row ${rowIndex + 1}`}
      >
        {loopImages.map((image, index) => (
          <li className={Styles.logoItem} key={`${rowIndex}-${index}`}>
            <div className={Styles.logoCard}>
              <Image
                src={image}
                alt={`${altPrefix} ${((index % images.length) + 1)}`}
                className={Styles.logoImage}
                width={180}
                height={56}
                sizes="(max-width: 767.98px) 125px, (max-width: 991.98px) 150px, 180px"
                loading="lazy"
                draggable={false}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OurPartners() {
  const { t, isArabic } = useLanguage();

  return (
    <section
      className={Styles.ourPartners}
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="partners-section-title"
    >
      <div className="container">
        <div className={Styles.top}>
          <div className={Styles.heading}>
            <span className={Styles.dot}></span>
            <p>{t.partners.label}</p>
          </div>

          <h2 id="partners-section-title" className={Styles.title}>
            {t.partners.title}
          </h2>
        </div>

        <div className={Styles.marqueeArea} dir="ltr">
          <PartnerRow
            images={partnerRows[0]}
            direction="right"
            duration="26s"
            altPrefix={t.partners.logosAltPrefix}
            rowIndex={0}
          />
          <PartnerRow
            images={partnerRows[1]}
            direction="left"
            duration="30s"
            altPrefix={t.partners.logosAltPrefix}
            rowIndex={1}
          />
          <PartnerRow
            images={partnerRows[2]}
            direction="right"
            duration="24s"
            altPrefix={t.partners.logosAltPrefix}
            rowIndex={2}
          />
          <PartnerRow
            images={partnerRows[3]}
            direction="left"
            duration="28s"
            altPrefix={t.partners.logosAltPrefix}
            rowIndex={3}
          />
        </div>
      </div>
    </section>
  );
}