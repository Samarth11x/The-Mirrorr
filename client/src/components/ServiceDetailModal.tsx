import React from "react";
import { Service } from "../types";

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onEnquire: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnquire,
}) => {
  if (!service) return null;

  return (
    <div
      className="lightbox-backdrop"
      style={{ zIndex: 2500 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalServiceTitle"
      onClick={onClose}
    >
      <div
        className="lightbox-dialog"
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "36px 28px",
          color: "var(--color-ink)",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service modal"
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.75rem",
            color: "var(--color-ink)",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <span
          className="eyebrow"
          style={{ marginBottom: "6px" }}
        >
          {service.category.replace("-", " ")}
        </span>

        <h2
          id="modalServiceTitle"
          className="serif-heading"
          style={{ fontSize: "1.875rem", marginBottom: "16px" }}
        >
          {service.name}
        </h2>

        {/* Full Verified Description */}
        <div
          style={{
            fontSize: "0.9375rem",
            lineHeight: "1.7",
            color: "var(--color-text)",
            whiteSpace: "pre-line",
            marginBottom: "24px",
          }}
        >
          {service.detailedContent}
        </div>

        {/* Feature Highlights */}
        {service.features && service.features.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4
              style={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-subtle)",
                marginBottom: "10px",
              }}
            >
              Protocol Highlights
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {service.features.map((feat, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    color: "var(--color-text)",
                  }}
                >
                  <span style={{ color: "var(--color-terracotta)", fontWeight: "bold" }}>&bull;</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pricing Transparency Pill */}
        <div
          style={{
            padding: "14px 18px",
            background: "var(--color-bg-alt)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          <strong>Pricing Policy:</strong> {service.price ? `₹${service.price}` : "Contact us for pricing"}. The salon tailors fees according to length, texture, and personalized consultation requirements without fabricated fixed rates.
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEnquire(service.name);
            }}
          >
            Enquire for this Service
          </button>
          <a
            href="tel:+918088323885"
            className="btn btn-secondary"
          >
            Call Desk (+91 80883 23885)
          </a>
        </div>
      </div>
    </div>
  );
};
