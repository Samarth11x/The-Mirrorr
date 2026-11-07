import React from "react";
import { SalonSetting } from "../types";

interface FooterProps {
  settings: SalonSetting | null;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigateAdmin }) => {
  const address =
    settings?.address ||
    "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100";
  const phone = settings?.phone || "+91 80883 23885";
  const email = settings?.email || "themirrorr2024@gmail.com";
  const mapsUrl =
    settings?.googleMapsUrl ||
    "https://www.google.com/maps/search/?api=1&query=12.818598022474724,77.74761579415772";

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.375rem",
                color: "#FFFFFF",
                marginBottom: "10px",
              }}
            >
              THE MIRRORR
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#9E968F",
                lineHeight: "1.65",
                marginBottom: "18px",
              }}
            >
              Unisex Hair &amp; Beauty Studio in Bengaluru. Meticulous styling,
              bespoke color blending, therapeutic massage, and restorative body
              polishing rituals in a welcoming, inclusive setting.
            </p>
            <span className="badge-tag badge-verified">
              Verified Studio • Hosa Road
            </span>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#your-visit">Your Visit</a>
              </li>
              <li>
                <a href="#gallery">Studio Gallery</a>
              </li>
              <li>
                <a href="#about">About THE MIRRORR</a>
              </li>
              <li>
                <a href="#contact">Contact &amp; Directions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Specialties */}
          <div>
            <h4 className="footer-heading">Specialties</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#service-women-hair-cut">Women Hair Cut</a>
              </li>
              <li>
                <a href="#service-women-hair-color">Women Hair Color</a>
              </li>
              <li>
                <a href="#service-massage">Massage Therapy</a>
              </li>
              <li>
                <a href="#service-body-polishing">Body Polishing</a>
              </li>
              <li>
                <a href="#contact">Custom Consultation</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 className="footer-heading">Studio Coordinates</h4>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#DDD6CF",
                lineHeight: "1.5",
                marginBottom: "10px",
              }}
            >
              {address}
            </p>
            <p style={{ fontSize: "0.875rem", marginBottom: "6px" }}>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} style={{ color: "#FFFFFF" }}>
                {phone}
              </a>
            </p>
            <p style={{ fontSize: "0.875rem", marginBottom: "16px" }}>
              <a href={`mailto:${email}`} style={{ color: "#DDD6CF" }}>
                {email}
              </a>
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "0.75rem", padding: "6px 14px" }}
            >
              Get Directions &nearr;
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>
            &copy; {new Date().getFullYear()} THE MIRRORR Unisex Hair &amp;
            Beauty Studio. All verified content preserved.
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="https://themirrorrunisexhairbeautysalon.nowfloats.com/all-services/1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8C847E", textDecoration: "underline" }}
            >
              Live Reference Source &nearr;
            </a>
            <button
              type="button"
              onClick={onNavigateAdmin}
              style={{
                background: "none",
                border: "none",
                color: "#8C847E",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "0.75rem",
              }}
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
