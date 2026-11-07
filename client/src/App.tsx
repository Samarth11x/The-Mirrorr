import React, { useState, useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminUser } from "./types";
import "./styles/editorial.css";
import "./styles/admin.css";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"landing" | "admin-login" | "admin-dashboard">("landing");
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check if user has an active admin session on load
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setCurrentUser(data.user);
          if (window.location.hash === "#admin") {
            setCurrentView("admin-dashboard");
          }
        }
      })
      .catch(() => {});

    // Handle hash route changes (e.g. #admin)
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setCurrentView(currentUser ? "admin-dashboard" : "admin-login");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [currentUser]);

  const handleNavigateAdmin = () => {
    if (currentUser) {
      setCurrentView("admin-dashboard");
    } else {
      setCurrentView("admin-login");
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setCurrentView("admin-dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
    if (window.location.hash === "#admin") {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  const handleViewWebsite = () => {
    setCurrentView("landing");
    if (window.location.hash === "#admin") {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      {currentView === "landing" && (
        <LandingPage onNavigateAdmin={handleNavigateAdmin} />
      )}

      {currentView === "admin-login" && (
        <AdminLoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={handleViewWebsite}
        />
      )}

      {currentView === "admin-dashboard" && currentUser && (
        <AdminDashboard
          user={currentUser}
          onLogout={handleLogout}
          onViewWebsite={handleViewWebsite}
        />
      )}
    </>
  );
};

export default App;
