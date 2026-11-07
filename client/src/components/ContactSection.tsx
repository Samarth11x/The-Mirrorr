import React, { useState } from "react";
import { SalonSetting, Service, EnquirySubmission } from "../types";

interface ContactSectionProps {
  settings: SalonSetting | null;
  services: Service[];
  preselectedService: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  services,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<EnquirySubmission>({
    customerName: "",
    contactMethod: "",
    selectedService: preselectedService || "",
    preferredTime: "Flexible",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync if preselected service changes from external button click
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, selectedService: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!formData.customerName.trim() || !formData.contactMethod.trim()) {
      setErrorMessage("Please enter both your name and a valid phone number or email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(
          result.message ||
            "Thank you! THE MIRRORR salon team has received your enquiry and will contact you directly to discuss pricing and schedule your visit."
        );
        setFormData({
          customerName: "",
          contactMethod: "",
          selectedService: "",
          preferredTime: "Flexible",
          message: "",
        });
      } else {
        setErrorMessage(
          result.error || "Unable to submit enquiry. Please call us directly at +91 80883 23885."
        );
      }
    } catch (err: any) {
      setErrorMessage(
        "Network connection failed. Please call our salon desk directly at +91 80883 23885."
      );
    } finally {
      setLoading(false);
    }
  };

  const address =
    settings?.address ||
    "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100";
  const phone = settings?.phone || "+91 80883 23885";
  const email = settings?.email || "themirrorr2024@gmail.com";
  const mapsUrl =
    settings?.googleMapsUrl ||
    "https://www.google.com/maps/search/?api=1&query=12.818598022474724,77.74761579415772";

  return (
    <section className="contact-section" id="contact" aria-label="Contact and Salon Inquiries">
      <div className="container">
        <div className="contact-editorial-grid">
          {/* Left Column: Verified Contact Information */}
          <div>
            <span className="eyebrow">Connect &amp; Directions</span>
            <h2 className="section-title">Visit THE MIRRORR Studio</h2>
            <p className="section-subtitle" style={{ marginBottom: "32px" }}>
              Reach out to inquire about custom pricing, hair consultations, or therapeutic
              massages. Walk-ins and phone inquiries are welcomed.
            </p>

            {/* Address */}
            <div className="contact-card-item">
              <div className="contact-icon-frame">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <p className="contact-card-label">Studio Address</p>
                <p className="contact-card-value">{address}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-terracotta)", fontSize: "0.8125rem", fontWeight: 600, display: "inline-block", marginTop: "4px" }}
                >
                  View on Google Maps &nearr;
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-card-item">
              <div className="contact-icon-frame">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="contact-card-label">Phone &amp; Tap-To-Call</p>
                <p className="contact-card-value">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                </p>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                  Direct line for quick inquiries
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="contact-card-item">
              <div className="contact-icon-frame">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <p className="contact-card-label">Email Inquiries</p>
                <p className="contact-card-value">
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="contact-card-item">
              <div className="contact-icon-frame" style={{ background: "#E8F5E9", color: "#2E7D32" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div>
                <p className="contact-card-label">WhatsApp Quick Connect</p>
                <p className="contact-card-value">
                  <a
                    href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Working Enquiry Form */}
          <div className="enquiry-card">
            <h3 className="serif-heading" style={{ fontSize: "1.625rem", marginBottom: "8px" }}>
              Send an Enquiry
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
              Request service information, consultation availability, or custom styling quotes.
            </p>

            {successMessage && (
              <div className="form-alert form-alert-success" role="status">
                <strong>Enquiry Received:</strong> {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="form-alert form-alert-error" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="customerName" className="form-label">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contactMethod" className="form-label">
                  Phone Number or Email *
                </label>
                <input
                  type="text"
                  id="contactMethod"
                  className="form-input"
                  placeholder="e.g. +91 98765 43210 or priya@example.com"
                  value={formData.contactMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, contactMethod: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-two-col">
                <div className="form-field">
                  <label htmlFor="selectedService" className="form-label">
                    Selected Service
                  </label>
                  <select
                    id="selectedService"
                    className="form-select"
                    value={formData.selectedService || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, selectedService: e.target.value })
                    }
                  >
                    <option value="">-- Choose a Service --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Bridal Styling Consultation">Bridal Styling Consultation</option>
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="preferredTime" className="form-label">
                    Preferred Time Slot
                  </label>
                  <select
                    id="preferredTime"
                    className="form-select"
                    value={formData.preferredTime || "Flexible"}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                  >
                    <option value="Flexible">Flexible / Anytime</option>
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Optional Message / Inquiry
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="form-textarea"
                  placeholder="Mention hair length, specific massage style (Swedish, deep tissue, hot stone), or custom requests..."
                  value={formData.message || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Submitting Enquiry..." : "Submit Salon Enquiry"}
              </button>

              <p style={{ fontSize: "0.71875rem", color: "var(--color-text-subtle)", marginTop: "12px", textAlign: "center", lineHeight: "1.4" }}>
                Notice: Submissions are saved securely to THE MIRRORR database. Staff will contact you directly to confirm pricing and visit timings. No live appointment slots are pre-reserved.
              </p>
            </form>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="map-embed-container">
          <iframe
            title="THE MIRRORR Unisex Hair &amp; Beauty Studio Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.740%2C12.814%2C77.755%2C12.823&amp;layer=mapnik&amp;marker=12.818598%2C77.747616"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
