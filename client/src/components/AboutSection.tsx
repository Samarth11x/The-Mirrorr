import React from "react";
import { SalonSetting } from "../types";

interface AboutSectionProps {
  settings: SalonSetting | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  return (
    <section className="about-section" id="about" aria-label="About THE MIRRORR Studio">
      <div className="container">
        <div className="about-editorial-grid">
          <div className="about-text-column">
            <span className="eyebrow">Studio Heritage &amp; Philosophy</span>
            <h2 className="section-title">Where Beauty Meets Meticulous Care</h2>

            <blockquote className="about-lead-quote">
              "The Mirror Unisex Hair &amp; Beauty Salon is a premier destination in Bangalore,
              renowned for its expertise in hairstyling and beauty services. With a focus on
              personalized attention and meticulous detail, our seasoned professionals provide a
              diverse range of services, including haircuts, coloring, facials, and massages. We
              prioritize client satisfaction and foster a welcoming environment where everyone
              feels valued. Committed to holistic wellness and sustainability, we offer
              eco-friendly practices and holistic treatments to nourish the body, mind, and
              soul."
            </blockquote>

            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)", lineHeight: "1.7", marginBottom: "16px" }}>
              Situated in Vinayaka Nagara on Hosa Road (directly near Sobha Silicon Oasis),
              THE MIRRORR serves discerning clients from Electronic City, Doddanagamangala,
              Naganathapura, and Pragathi Nagar. Our unisex studio provides an inclusive,
              unhurried space where women and men receive dedicated, one-on-one attention.
            </p>

            <div className="about-features-row">
              <div className="about-feature-box">
                <h4 className="about-feature-title">Personalized Attention</h4>
                <p className="about-feature-text">
                  Tailored styling, consultation, and individual face-shape harmonization.
                </p>
              </div>

              <div className="about-feature-box">
                <h4 className="about-feature-title">Inclusive Unisex Space</h4>
                <p className="about-feature-text">
                  A hospitable environment where both men and women feel valued and relaxed.
                </p>
              </div>

              <div className="about-feature-box">
                <h4 className="about-feature-title">Meticulous Detail</h4>
                <p className="about-feature-text">
                  Precision in cuts, custom color blending, and gentle restorative treatments.
                </p>
              </div>

              <div className="about-feature-box">
                <h4 className="about-feature-title">Holistic Wellness</h4>
                <p className="about-feature-text">
                  Therapeutic massages and skin rituals to restore body, mind, and spirit.
                </p>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "4px solid #FFFFFF",
                boxShadow: "var(--shadow-lg)",
                aspectRatio: "1 / 1",
                backgroundColor: "#12100E",
              }}
            >
              <img
                src="/assets/images/mirrorr_gold_emblem.jpg"
                alt="THE MIRRORR Unisex Hair &amp; Beauty Studio Official 3D Gold Emblem Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/images/logo.jpg";
                }}
              />
            </div>

            <div
              style={{
                marginTop: "16px",
                background: "var(--color-surface)",
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-medium)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-terracotta)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <strong style={{ fontSize: "0.875rem", color: "var(--color-ink)", display: "block" }}>
                  Verified Studio Location
                </strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  {settings?.address ||
                    "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Bengaluru"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
