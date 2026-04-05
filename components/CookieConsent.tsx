'use client'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sn_cookie_consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function setConsentMode(granted: boolean) {
  if (typeof window === 'undefined') return
  window.gtag?.('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: 'granted',
  })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    } else {
      setConsentMode(stored === 'accepted')
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsentMode(true)
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsentMode(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .cookie-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: var(--white, #fff);
          border-top: 1px solid var(--border, #e5e7eb);
          box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .cookie-bar__text {
          flex: 1;
          min-width: 240px;
          font-size: 13px;
          color: var(--text-muted, #6b7280);
          line-height: 1.6;
        }
        .cookie-bar__text a {
          color: var(--accent, #1d6b5a);
          text-decoration: underline;
        }
        .cookie-bar__actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .cookie-btn {
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: opacity 0.12s;
          white-space: nowrap;
        }
        .cookie-btn:hover { opacity: 0.85; }
        .cookie-btn--accept {
          background: var(--accent, #1d6b5a);
          color: #fff;
        }
        .cookie-btn--decline {
          background: transparent;
          border: 1px solid var(--border, #e5e7eb);
          color: var(--text-muted, #6b7280);
        }
      `}</style>

      <div className="cookie-bar" role="dialog" aria-label="Cookie consent">
        <p className="cookie-bar__text">
          We use cookies to improve your experience and show relevant ads.
          By clicking <strong>Accept</strong>, you consent to our use of cookies,
          including by Google AdSense for personalised advertising. See our{' '}
          <a href="/privacy-policy">Privacy Policy</a> for details.
        </p>
        <div className="cookie-bar__actions">
          <button className="cookie-btn cookie-btn--decline" onClick={decline}>
            Essential only
          </button>
          <button className="cookie-btn cookie-btn--accept" onClick={accept}>
            Accept all
          </button>
        </div>
      </div>
    </>
  )
}
