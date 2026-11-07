import React, { useState } from "react";
import { AdminUser } from "../types";

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setErrorMessage(data.error || "Invalid email or password.");
      }
    } catch (err: any) {
      setErrorMessage("Network error while connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-hero">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Salon Staff Access
          </span>
          <h1 className="admin-login-title">THE MIRRORR Portal</h1>
          <p className="admin-login-sub">
            Sign in to manage client enquiries, service content, and salon details.
          </p>
        </div>

        {errorMessage && (
          <div className="form-alert form-alert-error" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="adminEmail" className="form-label">
              Staff Email Address
            </label>
            <input
              type="email"
              id="adminEmail"
              className="form-input"
              placeholder="e.g. themirrorr2024@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="adminPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="adminPassword"
              className="form-input"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ marginTop: "12px" }}
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={onBackToHome}
            style={{ marginTop: "10px" }}
          >
            &larr; Back to Public Website
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#8C847E", lineHeight: "1.5" }}>
            For local setup: Create or update your credentials via CLI:
            <br />
            <code>npm run admin:create &lt;email&gt; &lt;password&gt;</code>
          </p>
        </div>
      </div>
    </div>
  );
};
