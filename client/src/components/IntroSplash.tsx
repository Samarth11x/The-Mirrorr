import React, { useState, useEffect } from "react";

export const IntroSplash: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this browser session
    const hasSeen = sessionStorage.getItem("mirrorr_intro_seen");
    if (hasSeen) {
      setVisible(false);
      return;
    }

    const timerOut = setTimeout(() => {
      setAnimatingOut(true);
    }, 900);

    const timerDismiss = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("mirrorr_intro_seen", "true");
    }, 1500);

    return () => {
      clearTimeout(timerOut);
      clearTimeout(timerDismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`intro-splash-screen ${animatingOut ? "fade-out" : ""}`}
      onClick={() => setVisible(false)}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro-splash-inner">
        <h1 className="intro-splash-brand">THE MIЯЯORR</h1>
        <span className="intro-splash-city">BENGALURU</span>
      </div>
    </div>
  );
};
