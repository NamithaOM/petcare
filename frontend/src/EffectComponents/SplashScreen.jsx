import React, { useEffect, useState } from 'react';
import '../Styles/SplashScreen.css';

function SplashScreen({ onFinish }) {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in on mount

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Start fade-out after 2s

    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinish) onFinish();
    }, 3000); // Remove from DOM after fade-out

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`splash-content ${fadeIn ? 'fade-in-up' : ''}`}>
        <img
          src="/assets/img/logo3.png"
          alt="Auto Lead Logo"
          className="splash-logo"
        />
        <h1 className="splash-title">Auto Lead</h1>
      </div>
    </div>
  );
}

export default SplashScreen;
