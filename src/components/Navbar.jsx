/**
 * Shared Navbar — matches the landing page design exactly.
 *
 * Props:
 *   variant  : "public" | "app"
 *              "public" → shows "← Back to Home" button (login / register)
 *              "app"    → shows avatar dropdown with user name (profile / request)
 *
 *   userName : string  — displayed as "Hello, {userName}" in app variant
 *   onLogout : async fn — called when user clicks Log out
 *   onProfile: fn      — called when user clicks My Profile
 *   progress : number  — 0-100, shown as "Complete Your Profile" prompt when < 100
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOGO_SVG = (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M12 3C12 3 6 10 6 14.5a6 6 0 0012 0C18 10 12 3 12 3z" fill="#fff" opacity="0.95"/>
    <path d="M9.5 14.5a2.5 2.5 0 005 0" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function Navbar({
  variant = "public",
  userName = "",
  onLogout,
  onProfile,
  progress = 100,
}) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── inline styles scoped to this component ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Barlow:wght@800;900&display=swap');

        /* Top announcement bar */
        .rl-topbar {
          background: #0A2540;
          color: #E2E8F0;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .rl-topbar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rl-topbar-right {
          display: flex;
          gap: 24px;
        }
        @media (max-width: 640px) {
          .rl-topbar {
            padding: 6px 16px;
            font-size: 11px;
            justify-content: center;
            text-align: center;
          }
          .rl-topbar-right {
            gap: 14px;
          }
        }

        .rl-shared-nav {
          position: sticky; top: 0; z-index: 100;
          background: #fff;
          border-bottom: 1px solid #F1F5F9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          font-family: 'Inter', sans-serif;
        }
        .rl-shared-nav-inner {
          max-width: 1240px; margin: 0 auto;
          padding: 0 32px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px;
        }

        /* Logo */
        .rl-snav-logo {
          display: flex; align-items: center; gap: 12px;
          cursor: pointer; text-decoration: none; flex-shrink: 0;
        }
        .rl-snav-logo-icon {
          width: 44px; height: 44px; background: #C8102E;
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(200,16,46,0.3);
        }
        .rl-snav-logo-text {
          display: flex; align-items: center; gap: 0;
        }
        .rl-snav-logo-red {
          font-family: 'Barlow', sans-serif; font-weight: 900;
          font-size: 26px; color: #C8102E; letter-spacing: 2px;
        }
        .rl-snav-logo-divider {
          width: 2px; height: 22px; background: #C8102E;
          margin: 0 4px; border-radius: 1px; opacity: 0.4;
        }
        .rl-snav-logo-dark {
          font-family: 'Barlow', sans-serif; font-weight: 900;
          font-size: 26px; color: #0A2540; letter-spacing: 2px;
        }
        .rl-snav-logo-sub {
          font-size: 9px; font-weight: 700; color: #94A3B8;
          letter-spacing: 0.25em; text-transform: uppercase; margin-top: 2px;
        }

        /* Back to home button (public variant) */
        .rl-snav-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; border: 1.5px solid #E2E8F0;
          color: #475569; padding: 8px 18px; border-radius: 9px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .rl-snav-back:hover {
          border-color: #C8102E; color: #C8102E; background: #FFF5F6;
        }

        /* Avatar button */
        .rl-snav-avatar-wrap {
          display: flex; align-items: center; gap: 12px; position: relative;
        }
        .rl-snav-greeting {
          text-align: right;
        }
        .rl-snav-greeting-name {
          display: block; font-size: 13px; font-weight: 700; color: #0A2540;
        }
        .rl-snav-greeting-hint {
          display: block; font-size: 11px; color: #C8102E; font-weight: 600;
          margin-top: 1px;
        }
        .rl-snav-avatar-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: #FFF5F6;
          border: 2px solid #E2E8F0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: border-color 0.15s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .rl-snav-avatar-btn:hover, .rl-snav-avatar-btn.open {
          border-color: #C8102E;
        }

        /* Dropdown */
        .rl-snav-dropdown {
          position: absolute; right: 0; top: calc(100% + 10px);
          width: 188px; background: #fff;
          border-radius: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #F1F5F9;
          overflow: hidden; z-index: 200;
          animation: rl-snav-drop 0.15s ease;
        }
        @keyframes rl-snav-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rl-snav-dd-item {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 11px 16px; font-size: 14px; font-weight: 600;
          color: #374151; background: none; border: none;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: background 0.12s, color 0.12s;
          text-align: left;
        }
        .rl-snav-dd-item:hover { background: #F8FAFC; color: #0A2540; }
        .rl-snav-dd-item.danger { color: #C8102E; }
        .rl-snav-dd-item.danger:hover { background: #FFF5F6; color: #a00e25; }
        .rl-snav-dd-sep { height: 1px; background: #F1F5F9; margin: 2px 0; }

        @media (max-width: 540px) {
          .rl-snav-greeting { display: none; }
          .rl-shared-nav-inner { padding: 0 16px; }
        }
      `}</style>

      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div className="rl-topbar">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" fill="#C8102E" opacity="0.6"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          National Blood Donor Network · Integrated Health Services Portal
        </span>
        <span className="rl-topbar-right">
          <span>🚨 Emergency: <strong style={{ color: "#F87171" }}>108</strong></span>
          <span>Blood Bank Helpline: <strong style={{ color: "#F87171" }}>1910</strong></span>
        </span>
      </div>

      <nav className="rl-shared-nav">
        <div className="rl-shared-nav-inner">

          {/* ── LOGO ── */}
          <div className="rl-snav-logo" onClick={() => navigate("/")}>
            <div className="rl-snav-logo-icon">{LOGO_SVG}</div>
            <div>
              <div className="rl-snav-logo-text">
                <span className="rl-snav-logo-red">RED</span>
                <span className="rl-snav-logo-divider" />
                <span className="rl-snav-logo-dark">LINK</span>
              </div>
              <div className="rl-snav-logo-sub">Blood Donor Network</div>
            </div>
          </div>

          {/* ── RIGHT SIDE ── */}
          {variant === "public" ? (
            /* PUBLIC: Back to Home */
            <button className="rl-snav-back" onClick={() => navigate("/")}>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </button>
          ) : (
            /* APP: Avatar + dropdown */
            <div className="rl-snav-avatar-wrap" ref={dropdownRef}>
              {userName && (
                <div className="rl-snav-greeting">
                  <span className="rl-snav-greeting-name">Hello, {userName}</span>
                  {progress < 100 && (
                    <span className="rl-snav-greeting-hint">Complete your profile</span>
                  )}
                </div>
              )}

              <button
                className={`rl-snav-avatar-btn ${dropdownOpen ? "open" : ""}`}
                onClick={() => setDropdownOpen((p) => !p)}
                aria-label="Account menu"
              >
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                    stroke="#C8102E"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="rl-snav-dropdown">
                  <button
                    className="rl-snav-dd-item"
                    onClick={() => { setDropdownOpen(false); onProfile ? onProfile() : navigate("/profile"); }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                        stroke="#6B7280"/>
                    </svg>
                    My Profile
                  </button>

                  <div className="rl-snav-dd-sep" />

                  <button
                    className="rl-snav-dd-item danger"
                    onClick={() => { setDropdownOpen(false); onLogout && onLogout(); }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                        stroke="currentColor"/>
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </nav>
    </>
  );
} 