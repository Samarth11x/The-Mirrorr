import React, { Component, ErrorInfo, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught client error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#191716",
          color: "#FAF7F2",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          padding: "24px",
          textAlign: "center"
        }}>
          <div style={{ maxWidth: "540px", backgroundColor: "#221F1E", padding: "40px", borderRadius: "12px", border: "1px solid #363230" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "16px", color: "#E07A5F" }}>
              THE MIRRORR Studio
            </h2>
            <p style={{ color: "#D1CBC4", lineHeight: "1.6", marginBottom: "24px" }}>
              Something interrupted the interactive preview. Click below to reload the studio experience.
            </p>
            {this.state.error && (
              <pre style={{
                textAlign: "left",
                backgroundColor: "#121110",
                color: "#E29578",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                overflowX: "auto",
                marginBottom: "20px"
              }}>
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#C45D3E",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 28px",
                borderRadius: "30px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem"
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
