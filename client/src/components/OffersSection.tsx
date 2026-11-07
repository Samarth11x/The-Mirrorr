import React from "react";

interface OffersSectionProps {
  onEnquireBridal: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onEnquireBridal }) => {
  return (
    <section className="container" style={{ margin: "40px auto 80px" }} aria-label="Reference Offer Notice">
      <div
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFFBF9 100%)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-terracotta-border)",
          padding: "36px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          alignItems: "center",
          boxShadow: "var(--shadow-sm)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span className="badge-tag badge-sample">Sample Reference Content</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
              Awaiting Salon Confirmation
            </span>
          </div>

          <h3 className="serif-heading" style={{ fontSize: "1.625rem", marginBottom: "6px" }}>
            Bridal Season Promotion
          </h3>

          <div
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "1.45rem",
              fontWeight: 700,
              color: "var(--color-terracotta)",
              marginBottom: "12px",
            }}
          >
            &#8377;20 OFF on Bridal makeup
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
            The reference homepage lists this promotional banner with placeholder description
            copy (<em>"Lorem Ipsum is simply dummy text..."</em>). In accordance with our
            accuracy guidelines, this is labeled as sample template content. Please contact
            our front desk directly for active, comprehensive bridal styling packages.
          </p>
        </div>

        <div
          style={{
            background: "var(--color-bg)",
            borderRadius: "var(--radius-md)",
            padding: "24px",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <h4 style={{ fontSize: "1rem", color: "var(--color-ink)", fontWeight: 600 }}>
            Inquire for Bridal Styling
          </h4>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", lineHeight: "1.5" }}>
            Coordinate bridal consultations, hair color blending, skin prep, and trial styling
            with our senior team.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm btn-block"
            onClick={onEnquireBridal}
          >
            Inquire for Bridal Packages
          </button>
        </div>
      </div>
    </section>
  );
};
