import React, { useState, useEffect } from "react";
import { SalonSetting } from "../types";

interface HeroProps {
  settings: SalonSetting | null;
  onExploreServices: () => void;
  onGetInTouch: () => void;
  onOpenBookingModal?: () => void;
}

const HERO_SLIDES = [
  {
    image: "/assets/images/hero_mirrorr_reception_clean.jpg",
    fallback: "/assets/images/gallery_8.jpg",
    alt: "THE MIRRORR Unisex Salon signature reception lounge, feature branding wall, L'Oreal care counter, and nail studio",
    label: "Signature Reception Lounge",
  },
  {
    image: "/assets/images/hero_studio_colour_bar.jpg",
    fallback: "/assets/images/gallery_1.jpg",
    alt: "THE MIRRORR Unisex Hair & Beauty Studio main styling floor, backlit arch mirrors, and custom Colour Bar",
    label: "Main Studio & Colour Bar",
  },
  {
    image: "/assets/images/hero_pedicure_lounge.jpg",
    fallback: "/assets/images/gallery_5.jpg",
    alt: "THE MIRRORR Pedicure & Foot Spa Suite with luxury quilted armchairs, illuminated arches, and 'Relax You Deserve It' script wall",
    label: "Pedicure & Foot Spa Lounge",
  },
  {
    image: "/assets/images/hero_hair_wash_spa.jpg",
    fallback: "/assets/images/gallery_2.jpg",
    alt: "THE MIRRORR Hair Wash & Spa Suite with reclining leather wash chairs, ceramic basins, and illuminated product shelving",
    label: "Hair Spa & Wash Recliners",
  },
  {
    image: "/assets/images/hero_styling_colour_bar.jpg",
    fallback: "/assets/images/gallery_4.jpg",
    alt: "THE MIRRORR Unisex Styling Stations with RICA and Schwarzkopf Professional colour bar",
    label: "Styling Stations & Product Bar",
  },
];

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreServices,
  onGetInTouch,
  onOpenBookingModal,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-editorial-blown" id="home" aria-label="Welcome to THE MIRRORR">
      {/* Background Slides with Cinematic Crossfade */}
      <div className="hero-slides-wrapper" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-item ${idx === activeSlide ? "active" : ""}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-slide-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = slide.fallback;
              }}
            />
          </div>
        ))}
      </div>

      {/* Cinematic Luxury Scrim Gradients (Exact Blown Lighting Architecture) */}
      <div className="hero-scrim-radial" aria-hidden="true"></div>
      <div className="hero-scrim-top" aria-hidden="true"></div>
      <div className="hero-scrim-bottom" aria-hidden="true"></div>

      {/* Right-Side Slide Indicator Lines (Blown Style) */}
      <div className="hero-slide-indicators" aria-label="Slide navigation">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            className={`hero-indicator-dash ${idx === activeSlide ? "active" : ""}`}
            onClick={() => setActiveSlide(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.label}`}
          />
        ))}
      </div>

      {/* Hero Editorial Content */}
      <div className="container hero-content-container">
        <div className="hero-editorial-body">
          {/* Subtle Location & Category Eyebrow */}
          <div className="hero-eyebrow-line">
            <span className="hero-eyebrow-accent"></span>
            <span className="hero-eyebrow-text">
              BENGALURU • HOSA ROAD • ELECTRONIC CITY VICINITY
            </span>
          </div>

          {/* Bold Editorial Headline (Blown-style light all-caps typography) */}
          <h1 className="hero-blown-headline">
            THE MIRRORR<br />
            EXPERIENCE.
          </h1>

          {/* Editorial Subtext */}
          <p className="hero-blown-subtext">
            {settings?.tagline || "Unisex Hair & Beauty Studio in Bengaluru"} —
            where personalized attention, meticulous detail, and an inclusive,
            tranquil environment meet precision haircuts, custom color blending,
            therapeutic massages, and radiant body polishing.
          </p>

          {/* High-Fashion Luxury CTA Action Buttons */}
          <div className="hero-blown-actions">
            <button
              type="button"
              className="btn-blown btn-blown-filled"
              onClick={onExploreServices}
            >
              EXPLORE 4 SERVICES
            </button>
            <button
              type="button"
              className="btn-blown btn-blown-outlined"
              onClick={onOpenBookingModal || onGetInTouch}
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Marquee Ticker (Inspired by Blown's "THIS MONTH'S RITUALS") */}
      <div className="hero-bottom-ticker" role="region" aria-label="Salon specialties ticker">
        <div className="ticker-label-box">
          <span className="ticker-dot"></span>
          <span className="ticker-label-text">VERIFIED RITUALS</span>
        </div>

        <div className="ticker-marquee-track">
          <div className="ticker-marquee-content">
            <span>WOMEN HAIR CUT — Personalized Face-Shape &amp; Texture Harmonization</span>
            <span className="ticker-separator">—</span>
            <span>WOMEN HAIR COLOR — Custom Blending &amp; Ammonia-Free Formulas</span>
            <span className="ticker-separator">—</span>
            <span>THERAPEUTIC MASSAGE — Swedish, Deep Tissue, Hot Stone &amp; Aromatherapy</span>
            <span className="ticker-separator">—</span>
            <span>BODY POLISHING — 4-Stage Radiant Skin Rejuvenation</span>
            <span className="ticker-separator">—</span>
            <span>LOCATION — B. No. 64, 1st Floor, Hosa Road, near Sobha Silicon Oasis</span>
            <span className="ticker-separator">—</span>
            <span>CONTACT — +91 80883 23885</span>
            <span className="ticker-separator">—</span>
            <span>WOMEN HAIR CUT — Personalized Face-Shape &amp; Texture Harmonization</span>
            <span className="ticker-separator">—</span>
            <span>WOMEN HAIR COLOR — Custom Blending &amp; Ammonia-Free Formulas</span>
            <span className="ticker-separator">—</span>
          </div>
        </div>

        <button
          type="button"
          className="ticker-cta-action"
          onClick={onGetInTouch}
        >
          ENQUIRE NOW ↗
        </button>
      </div>
    </section>
  );
};
