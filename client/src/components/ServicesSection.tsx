import React, { useState } from "react";
import { Service } from "../types";

interface ServicesSectionProps {
  services: Service[];
  onSelectServiceDetail: (service: Service) => void;
  onEnquireForService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceDetail,
  onEnquireForService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Services" },
    { key: "hair-cut", label: "Hair Cuts" },
    { key: "hair-color", label: "Color & Highlights" },
    { key: "massage", label: "Massage Therapy" },
    { key: "body-polishing", label: "Body Polishing" },
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  return (
    <section className="services-section" id="services" aria-label="Verified Salon Services">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">The Verified Edit</span>
          <h2 className="section-title">Curated Hair, Skin &amp; Body Rituals</h2>
          <p className="section-subtitle centered">
            Every service is tailored with personalized attention and meticulous
            craftsmanship. Explore our four verified specialties below.
          </p>

          {/* Minimal Editorial Category Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "24px",
            }}
            role="tablist"
            aria-label="Filter Services"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`btn btn-sm ${
                  activeCategory === cat.key ? "btn-primary" : "btn-secondary"
                }`}
                style={{ borderRadius: "var(--radius-full)" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Image-Led Service Cards */}
        <div className="services-grid-editorial">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="service-card-editorial"
              id={`service-${service.slug}`}
            >
              <div className="service-media-frame">
                <img
                  src={
                    service.imagePath
                      ? service.imagePath.startsWith("/")
                        ? service.imagePath
                        : `/${service.imagePath}`
                      : "/assets/images/service_haircut.jpg"
                  }
                  alt={service.name}
                  className="service-img"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (service.slug === "women-hair-cut") {
                      target.src =
                        "https://productimages.withfloats.com/serviceimages/tile/660b99a65a08a11d4626643awoman-getting-her-hair-cut-beauty-salon-scaled";
                    } else if (service.slug === "women-hair-color") {
                      target.src =
                        "https://productimages.withfloats.com/serviceimages/tile/660b9d469f6e942b760d62d2HD-wallpaper-hair-colorful-skin-texture";
                    } else if (service.slug === "massage") {
                      target.src =
                        "https://productimages.withfloats.com/serviceimages/tile/66176d8d9e6097d4ec18726fthemirrorr01";
                    } else if (service.slug === "body-polishing") {
                      target.src =
                        "https://productimages.withfloats.com/serviceimages/tile/66177640c81c35d61fdfd13ddiy-body-polishingthemirrorr";
                    }
                  }}
                />
                <span className="service-card-category">
                  {service.category.replace("-", " ")}
                </span>
              </div>

              <div className="service-content-box">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>

                <div className="service-pricing-pill">
                  <span style={{ color: "var(--color-text-subtle)", textTransform: "uppercase", fontSize: "0.6875rem", letterSpacing: "0.08em" }}>
                    Service Rate
                  </span>
                  <span className="pricing-tag">
                    {service.price ? `₹${service.price}` : "Contact us for pricing"}
                  </span>
                </div>

                <div className="service-action-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectServiceDetail(service)}
                  >
                    View Protocol
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onEnquireForService(service.name)}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
