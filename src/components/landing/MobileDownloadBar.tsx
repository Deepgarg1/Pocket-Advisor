import React, { useState, useEffect } from 'react';
import { Download, Star, X, ShieldCheck } from 'lucide-react';
import './MobileDownloadBar.css';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';

export const MobileDownloadBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (window.innerWidth <= 800 && window.scrollY > 260 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <aside className="pa-mobile-sticky-bar" aria-label="Install Pocket Advisor App">
      <div className="pa-mobile-sticky-inner">
        <button
          type="button"
          className="pa-sticky-dismiss"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss download banner"
        >
          <X size={15} />
        </button>

        <div className="pa-sticky-app-info">
          <img
            src="/logo-round.png"
            alt="Pocket Advisor App Icon"
            className="pa-sticky-logo"
            width={40}
            height={40}
            loading="lazy"
          />
          <div className="pa-sticky-meta">
            <div className="pa-sticky-title-row">
              <span className="pa-sticky-name">Pocket Advisor</span>
              <span className="pa-sticky-badge">
                <ShieldCheck size={11} /> 100% Private
              </span>
            </div>
            <div className="pa-sticky-subtext">
              <span className="pa-sticky-stars">
                <Star size={11} fill="#f59e0b" stroke="#f59e0b" /> 4.8
              </span>
              <span className="pa-sticky-dot">•</span>
              <span>Offline UPI Tracker</span>
            </div>
          </div>
        </div>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pa-sticky-install-btn"
          aria-label="Install Pocket Advisor on Google Play Store"
        >
          <Download size={15} />
          <span>Install</span>
        </a>
      </div>
    </aside>
  );
};
