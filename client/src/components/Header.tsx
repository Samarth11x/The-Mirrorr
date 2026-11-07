import React, { useState, useEffect } from "react";
import { SalonSetting } from "../types";

interface HeaderProps {
  settings: SalonSetting | null;
  onOpenBookingModal: () => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onNavigateAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onOpenBookingModal,
  onOpenEnquiry,
  onNavigateAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setMobileMenuOpen(false);
  const phone = settings?.phone || "+91 80883 23885";
  const cleanPhone = phone.replace(/[^\d]/g, "");

  return (
    <>
      <header
        className={`site-header-blown ${scrolled ? "scrolled" : "transparent"}`}
        role="banner"
      >
        <div className="container header-blown-inner">
          {/* Left: Subtle City Tag (Blown style) */}
          <div className="header-blown-left">
            <span className="location-tag-blown">BENGALURU</span>
          </div>

          {/* Center: Brand Wordmark in Crisp Box (Blown style) */}
          <a
            href="#home"
            className="header-blown-brand"
            aria-label="THE MIRRORR Unisex Hair & Beauty Studio - Home"
          >
            <span className="brand-wordmark-blown">THE MIЯЯORR</span>
          </a>

          {/* Right: Book Appointment + Menu Toggle (Blown style) */}
          <div className="header-blown-right">
            <button
              type="button"
              className="blown-header-book-btn"
              onClick={onOpenBookingModal}
            >
              BOOK APPOINTMENT
            </button>

            <button
              type="button"
              className="blown-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="menu-text-label">MENU</span>
              <div className="menu-burger-bars">
                <span className="burger-line"></span>
                <span className="burger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen / Side Luxury Editorial Drawer (Exact Blown Design in Image 1) */}
      <div
        className={`mobile-drawer-blown ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="drawer-mask-blown"
          onClick={closeDrawer}
          aria-hidden="true"
        />

        <div className="drawer-panel-blown" role="dialog" aria-modal="true" aria-label="Menu">
          {/* Top Right Close */}
          <div className="drawer-header-blown">
            <span className="drawer-brand-tag">THE MIЯЯORR</span>
            <button
              type="button"
              className="drawer-close-link"
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              CLOSE &times;
            </button>
          </div>

          {/* Large Typography Navigation List */}
          <nav className="drawer-nav-list-blown">
            <a href="#home" className="drawer-nav-item-large" onClick={closeDrawer}>
              Home
            </a>
            <a href="#services" className="drawer-nav-item-large" onClick={closeDrawer}>
              Services
            </a>
            <a href="#your-visit" className="drawer-nav-item-large" onClick={closeDrawer}>
              Locations &amp; Visit
            </a>
            <a href="#gallery" className="drawer-nav-item-large" onClick={closeDrawer}>
              Gallery
            </a>
            <a href="#about" className="drawer-nav-item-large" onClick={closeDrawer}>
              About
            </a>
            <a href="#contact" className="drawer-nav-item-large" onClick={closeDrawer}>
              Contact
            </a>
            <button
              type="button"
              className="drawer-nav-item-large staff-item"
              onClick={() => {
                closeDrawer();
                onNavigateAdmin();
              }}
            >
              Staff Portal
            </button>
          </nav>

          {/* Divider Line */}
          <div className="drawer-divider-line"></div>

          {/* High-Contrast Action Buttons */}
          <div className="drawer-actions-blown">
            <button
              type="button"
              className="drawer-btn-white"
              onClick={() => {
                closeDrawer();
                onOpenBookingModal();
              }}
            >
              BOOK APPOINTMENT
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=Hello%20THE%20MIRRORR,%20I%20would%20like%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-btn-white"
            >
              WHATSAPP
            </a>
          </div>

          {/* Bottom Social Icons */}
          <div className="drawer-socials-blown">
            <a
              href="https://www.instagram.com/themirrorr_salon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="drawer-social-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              aria-label="Direct Phone Call"
              className="drawer-social-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
