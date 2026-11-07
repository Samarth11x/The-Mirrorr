import React from "react";

export const YourVisitSection: React.FC = () => {
  return (
    <section className="your-visit-section" id="your-visit" aria-label="Your Salon Visit Experience">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">The Experience</span>
          <h2 className="section-title">Your Visit to THE MIRRORR</h2>
          <p className="section-subtitle centered">
            Inspired by high-end salon hospitality, our guest journey revolves around
            attentive care, unhurried consultations, and bespoke hair and wellness rituals.
          </p>
        </div>

        <div className="visit-steps-grid">
          {/* Step 1 */}
          <div className="visit-step-card">
            <span className="visit-step-number">01</span>
            <h3 className="visit-step-title">Personalized Consultation</h3>
            <p className="visit-step-desc">
              Before any cut, color, or body treatment, our stylists sit down with you to
              understand your daily lifestyle, hair texture, skin tone, and aesthetic vision.
              Every service is tailored precisely to your facial contours and comfort.
            </p>
          </div>

          {/* Step 2 */}
          <div className="visit-step-card">
            <span className="visit-step-number">02</span>
            <h3 className="visit-step-title">The Meticulous Ritual</h3>
            <p className="visit-step-desc">
              Relax in our hygienic stations or private therapy suite. From gentle
              damage-free color formulas and four-stage body exfoliation to Swedish and hot
              stone massages, our seasoned therapists combine meticulous technique with
              soothing care.
            </p>
          </div>

          {/* Step 3 */}
          <div className="visit-step-card">
            <span className="visit-step-number">03</span>
            <h3 className="visit-step-title">Bespoke Finish &amp; Aftercare</h3>
            <p className="visit-step-desc">
              Every haircut and color service concludes with precision blowout styling and
              tailored aftercare guidance, equipping you with professional product knowledge
              to maintain vibrant, healthy hair between salon visits.
            </p>
          </div>
        </div>

        {/* Studio Arrival & Landmark Guide */}
        <div className="arrival-guide-card">
          <div className="arrival-guide-text-side">
            <span className="eyebrow">Studio Arrival Guide</span>
            <h3 className="arrival-guide-title">
              Finding Us on Hosa Road
            </h3>
            <p className="arrival-guide-desc">
              We are located at <strong>B. No. 64, 1st Floor, Vinayaka Nagara</strong>,
              directly above <em>Rajtilak Sweets &amp; Chats (Bikanerwala)</em>, right near
              Sobha Silicon Oasis on Hosa Road. Look for our illuminated 1st-floor storefront
              with large studio windows and dedicated reception access.
            </p>
            <div className="arrival-guide-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Bengaluru 560100 • Near Sobha Silicon Oasis</span>
            </div>
            <div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=12.8706239,77.6578591"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-xs)" }}
              >
                Open Google Maps Directions &rarr;
              </a>
            </div>
          </div>

          <div className="arrival-guide-media-side">
            <img
              src="/assets/images/studio_exterior_building.jpg"
              alt="THE MIRRORR Unisex Hair &amp; Beauty Studio 1st floor building on Hosa Road above Rajtilak Sweets"
              className="arrival-guide-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/images/gallery_8.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
