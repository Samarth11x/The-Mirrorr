import React, { useState } from "react";
import { GalleryItem } from "../types";

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section className="gallery-section" id="gallery" aria-label="Studio Photography Gallery">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">Studio Visuals</span>
          <h2 className="section-title">Inside THE MIRRORR Studio</h2>
          <p className="section-subtitle centered">
            Authentic photographs of our unisex styling stations, hair wash recliners,
            and private therapy suites on Hosa Road, Bengaluru.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              className={`btn btn-sm ${activeTab === "all" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab("all")}
            >
              All Photos ({galleryItems.length})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === "ambience" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab("ambience")}
            >
              Studio Ambience
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === "hair" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab("hair")}
            >
              Hair Styling Floor
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === "wellness" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab("wellness")}
            >
              Wellness &amp; Therapy Suite
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid-editorial">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-thumb-box"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.caption || item.altText}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openLightbox(idx);
              }}
            >
              <img
                src={item.imagePath.startsWith("/") ? item.imagePath : `/${item.imagePath}`}
                alt={item.altText}
                className="gallery-thumb-img"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://fpimages.withfloats.com/actual/660b9376c27c8bfa4465e790.jpg";
                }}
              />
              <div className="gallery-thumb-overlay">
                <span className="gallery-thumb-caption">
                  {item.caption || item.altText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              &times;
            </button>

            <button
              type="button"
              className="lightbox-nav prev"
              onClick={showPrev}
              aria-label="Previous photograph"
            >
              &larr;
            </button>

            <button
              type="button"
              className="lightbox-nav next"
              onClick={showNext}
              aria-label="Next photograph"
            >
              &rarr;
            </button>

            <img
              src={
                filteredItems[lightboxIndex].imagePath.startsWith("/")
                  ? filteredItems[lightboxIndex].imagePath
                  : `/${filteredItems[lightboxIndex].imagePath}`
              }
              alt={filteredItems[lightboxIndex].altText}
              className="lightbox-main-img"
            />

            <p className="lightbox-caption-text">
              {filteredItems[lightboxIndex].caption || filteredItems[lightboxIndex].altText} (
              {lightboxIndex + 1} of {filteredItems.length})
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
