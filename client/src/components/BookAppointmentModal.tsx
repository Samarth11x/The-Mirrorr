import React from "react";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEnquiryForm: () => void;
  phone?: string;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSelectEnquiryForm,
  phone = "+91 80883 23885",
}) => {
  if (!isOpen) return null;

  const cleanPhone = phone.replace(/[^\d]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20THE%20MIRRORR,%20I%20would%20like%20to%20book%20an%20appointment%20at%20your%20Hosa%20Road%20studio.`;
  const instagramUrl = "https://www.instagram.com/themirrorr_salon/";

  return (
    <div className="appointment-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book Appointment Options">
      <div className="appointment-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          type="button"
          className="appointment-modal-close"
          onClick={onClose}
          aria-label="Close booking modal"
        >
          &times;
        </button>

        <div className="appointment-modal-header">
          <span className="eyebrow" style={{ color: "#E07A5F", marginBottom: "8px" }}>
            Direct Salon Booking
          </span>
          <h2 className="appointment-modal-title">
            Book Your Appointment
          </h2>
          <p className="appointment-modal-subtitle">
            Choose your preferred channel to connect with our styling &amp; wellness team at THE MIRRORR Unisex Studio, Hosa Road, Bengaluru.
          </p>
        </div>

        <div className="appointment-options-list">
          {/* Option 1: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="appointment-option-item option-whatsapp"
          >
            <div className="option-icon-box icon-whatsapp-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.974.55 1.764.881 2.809.881 3.181 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.768-5.781-5.768zm7.143 11.233c-.347.98-1.721 1.796-2.404 1.916-.684.12-1.57.17-2.531-.137-.615-.197-1.408-.46-2.428-.908-4.29-1.89-7.078-6.27-7.293-6.557-.216-.288-1.744-2.321-1.744-4.428 0-2.107 1.104-3.143 1.496-3.567.393-.424.857-.53 1.143-.53.286 0 .571.002.82.015.263.013.614-.1.96.732.358.86 1.222 2.98 1.328 3.2.107.22.179.477.036.764-.143.288-.215.467-.429.722-.215.255-.452.569-.646.764-.216.215-.441.45-.19.878.251.428 1.116 1.838 2.395 2.978 1.644 1.464 3.031 1.916 3.46 2.132.429.215.68.179.93-.108.251-.287 1.074-1.252 1.36-1.681.286-.429.572-.358.96-.215.393.144 2.493 1.176 2.921 1.391.428.215.714.322.82.5.107.179.107 1.035-.24 2.015z"/>
              </svg>
            </div>
            <div className="option-text-group">
              <div className="option-title-row">
                <strong className="option-title">Chat &amp; Book on WhatsApp</strong>
                <span className="option-pill-tag">Instant Response</span>
              </div>
              <p className="option-description">
                Fastest way to confirm appointments. Chat directly with salon desk at <strong>{phone}</strong> for haircuts, custom color, therapeutic massages &amp; body polishing.
              </p>
            </div>
            <span className="option-arrow">&rarr;</span>
          </a>

          {/* Option 2: Instagram DM */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="appointment-option-item option-instagram"
          >
            <div className="option-icon-box icon-instagram-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="option-text-group">
              <div className="option-title-row">
                <strong className="option-title">Message on Instagram</strong>
                <span className="option-pill-tag">@themirrorr_salon</span>
              </div>
              <p className="option-description">
                Explore our latest client transformations, bridal portfolios, and send a direct message to book your slot.
              </p>
            </div>
            <span className="option-arrow">&rarr;</span>
          </a>

          {/* Option 3: Direct Phone Call */}
          <a
            href={`tel:${cleanPhone}`}
            className="appointment-option-item option-call"
          >
            <div className="option-icon-box icon-call-bg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="option-text-group">
              <div className="option-title-row">
                <strong className="option-title">Call Reception Directly</strong>
                <span className="option-pill-tag">9:00 AM – 9:00 PM</span>
              </div>
              <p className="option-description">
                Speak with front desk coordinator at <strong>{phone}</strong> for immediate booking &amp; inquiries.
              </p>
            </div>
            <span className="option-arrow">&rarr;</span>
          </a>

          {/* Option 4: Online Booking Enquiry Form */}
          <button
            type="button"
            className="appointment-option-item option-form"
            onClick={() => {
              onClose();
              onSelectEnquiryForm();
            }}
          >
            <div className="option-icon-box icon-form-bg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="option-text-group">
              <div className="option-title-row">
                <strong className="option-title">Fill Online Enquiry Form</strong>
                <span className="option-pill-tag">Standard Form</span>
              </div>
              <p className="option-description">
                Select your preferred service, date, and time slot. Our team will review and confirm your visit.
              </p>
            </div>
            <span className="option-arrow">&rarr;</span>
          </button>
        </div>

        <div className="appointment-modal-footer">
          <p>
            THE MIRRORR Unisex Studio • B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, Bengaluru 560100
          </p>
        </div>
      </div>
    </div>
  );
};
