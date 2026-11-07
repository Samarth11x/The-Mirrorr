import React, { useState, useEffect } from "react";
import { AdminUser, Enquiry, Service, GalleryItem, SalonSetting } from "../types";

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onViewWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<"enquiries" | "services" | "gallery" | "settings">("enquiries");

  // State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<SalonSetting | null>(null);

  const [enquiryFilter, setEnquiryFilter] = useState("all");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load data for active tab
  const loadEnquiries = () => {
    fetch(`/api/admin/enquiries?status=${enquiryFilter}&search=${encodeURIComponent(enquirySearch)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEnquiries(data.data);
      })
      .catch((err) => console.error("Error loading enquiries:", err));
  };

  const loadServices = () => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      })
      .catch((err) => console.error("Error loading services:", err));
  };

  const loadGallery = () => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGallery(data.data);
      })
      .catch((err) => console.error("Error loading gallery:", err));
  };

  const loadSettings = () => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.data);
      })
      .catch((err) => console.error("Error loading settings:", err));
  };

  useEffect(() => {
    if (activeTab === "enquiries") loadEnquiries();
    if (activeTab === "services") loadServices();
    if (activeTab === "gallery") loadGallery();
    if (activeTab === "settings") loadSettings();
  }, [activeTab, enquiryFilter]);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Enquiries operations
  const handleUpdateEnquiryStatus = async (id: string, status: string, notes?: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      const data = await res.json();
      if (data.success) {
        showNotice("Enquiry status updated.");
        loadEnquiries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotice("Enquiry removed.");
        loadEnquiries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Settings update
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showNotice("Salon details updated successfully!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {}
    onLogout();
  };

  return (
    <div className="admin-wrapper">
      {/* Top Bar */}
      <header className="admin-top-nav">
        <div className="container admin-top-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700 }}>
              THE MIRRORR
            </span>
            <span className="badge-tag badge-verified" style={{ fontSize: "0.6875rem" }}>
              Staff Management
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "0.8125rem", color: "#A8A29E" }}>
              Logged in as: <strong style={{ color: "#FFFFFF" }}>{user.name}</strong>
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onViewWebsite}
              style={{ fontSize: "0.75rem", padding: "6px 14px" }}
            >
              View Website &rarr;
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handleLogoutClick}
              style={{
                fontSize: "0.75rem",
                padding: "6px 14px",
                background: "transparent",
                color: "#E5E7EB",
                border: "1px solid #4B5563",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Row */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid var(--border-medium)" }}>
        <div className="container">
          <nav className="admin-nav-tabs" aria-label="Admin Navigation Tabs">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "enquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("enquiries")}
            >
              Client Enquiries
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "services" ? "active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              Services Content
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              Studio Gallery
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Salon Settings &amp; Contact
            </button>
          </nav>
        </div>
      </div>

      {/* Main Body */}
      <main className="container admin-content-area">
        {actionNotice && (
          <div className="form-alert form-alert-success" style={{ marginBottom: "20px" }}>
            {actionNotice}
          </div>
        )}

        {/* 1. Enquiries Tab */}
        {activeTab === "enquiries" && (
          <section className="admin-panel-card">
            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">Customer Enquiries ({enquiries.length})</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                  Review, follow up, and manage client requests submitted via the website.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <select
                  value={enquiryFilter}
                  onChange={(e) => setEnquiryFilter(e.target.value)}
                  className="status-select"
                  style={{ padding: "8px 12px", fontSize: "0.8125rem" }}
                >
                  <option value="all">All Enquiries</option>
                  <option value="new">New Requests Only</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>

                <input
                  type="search"
                  placeholder="Search by name/service..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loadEnquiries();
                  }}
                  className="form-input"
                  style={{ width: "220px", padding: "6px 12px", fontSize: "0.8125rem" }}
                />

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={loadEnquiries}
                >
                  Refresh
                </button>
              </div>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--color-text-muted)" }}>
                <p>No enquiries found for this filter.</p>
              </div>
            ) : (
              <div className="enquiries-table-responsive">
                <table className="enquiries-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Contact Method</th>
                      <th>Requested Service</th>
                      <th>Date</th>
                      <th>Message &amp; Staff Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td>
                          <span className={`enquiry-status-badge status-${enq.status}`}>
                            {enq.status}
                          </span>
                          <div style={{ marginTop: "6px" }}>
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(enq.id, e.target.value, enq.notes || undefined)
                              }
                              className="status-select"
                            >
                              <option value="new">Mark New</option>
                              <option value="contacted">Mark Contacted</option>
                              <option value="closed">Mark Closed</option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <strong>{enq.customerName}</strong>
                          {enq.preferredTime && (
                            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                              Time: {enq.preferredTime}
                            </span>
                          )}
                        </td>
                        <td>
                          <a
                            href={
                              enq.contactMethod.includes("@")
                                ? `mailto:${enq.contactMethod}`
                                : `tel:${enq.contactMethod.replace(/\s+/g, "")}`
                            }
                            style={{ color: "var(--color-terracotta)", fontWeight: 600 }}
                          >
                            {enq.contactMethod}
                          </a>
                        </td>
                        <td>
                          <span style={{ fontWeight: 500 }}>
                            {enq.selectedService || "General Inquiry"}
                          </span>
                        </td>
                        <td style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                          {new Date(enq.createdAt).toLocaleDateString()}
                          <br />
                          {new Date(enq.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td>
                          {enq.message && (
                            <p style={{ fontSize: "0.8125rem", color: "var(--color-text)", marginBottom: "8px" }}>
                              <em>"{enq.message}"</em>
                            </p>
                          )}
                          <div>
                            <textarea
                              defaultValue={enq.notes || ""}
                              placeholder="Add internal staff notes (e.g. called on 7th Nov)..."
                              className="notes-input"
                              rows={2}
                              onBlur={(e) => {
                                if (e.target.value !== (enq.notes || "")) {
                                  handleUpdateEnquiryStatus(enq.id, enq.status, e.target.value);
                                }
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                              background: "none",
                              border: "1px solid #E5E7EB",
                              color: "#DC2626",
                              fontSize: "0.75rem",
                              padding: "4px 8px",
                            }}
                            onClick={() => handleDeleteEnquiry(enq.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* 2. Services Content Tab */}
        {activeTab === "services" && (
          <section className="admin-panel-card">
            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">Verified Services ({services.length})</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                  Manage the 4 core salon offerings. Custom pricing can be entered if confirmed by the salon.
                </p>
              </div>
            </div>

            <div>
              {services.map((svc) => (
                <div key={svc.id} className="service-admin-item">
                  <div className="service-admin-meta">
                    <span className="badge-tag badge-verified">{svc.category}</span>
                    <h3 style={{ fontSize: "1.25rem", marginTop: "6px", marginBottom: "6px" }}>
                      {svc.name}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                      {svc.description}
                    </p>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-subtle)" }}>
                      <strong>Price status:</strong>{" "}
                      {svc.price ? `₹${svc.price}` : "Empty (Displays 'Contact us for pricing')"}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background: svc.active ? "#DCFCE7" : "#FEE2E2",
                        color: svc.active ? "#15803D" : "#B91C1C",
                        fontWeight: 600,
                      }}
                    >
                      {svc.active ? "Active" : "Hidden"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Studio Gallery Tab */}
        {activeTab === "gallery" && (
          <section className="admin-panel-card">
            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">Studio Gallery Items ({gallery.length})</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                  Verified studio photographs from THE MIRRORR's Hosa Road location.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
              {gallery.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "#FFFFFF",
                  }}
                >
                  <img
                    src={`/${item.imagePath}`}
                    alt={item.altText}
                    style={{ width: "100%", height: "140px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "2px" }}>
                      {item.caption || item.altText}
                    </p>
                    <span style={{ fontSize: "0.6875rem", color: "var(--color-terracotta)", textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Salon Settings Tab */}
        {activeTab === "settings" && settings && (
          <section className="admin-panel-card">
            <div className="admin-panel-header">
              <div>
                <h2 className="admin-panel-title">Salon Settings &amp; Contact Details</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                  Verified business identity, address, phone number, and geographic coordinates.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} style={{ maxWidth: "680px" }}>
              <div className="form-field">
                <label className="form-label">Salon Business Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.salonName}
                  onChange={(e) => setSettings({ ...settings, salonName: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Tagline / Brand Subtitle</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Verified Physical Address</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-two-col">
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-field">
                  <label className="form-label">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    className="form-input"
                    value={settings.lat}
                    onChange={(e) => setSettings({ ...settings, lat: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    className="form-input"
                    value={settings.lng}
                    onChange={(e) => setSettings({ ...settings, lng: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Google Maps Directions URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={settings.googleMapsUrl}
                  onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ marginTop: "12px" }}
              >
                {loading ? "Saving Changes..." : "Save Salon Settings"}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};
