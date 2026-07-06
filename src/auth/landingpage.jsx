import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bloodDonateImg from "../assets/bloodDonate.png";

const steps = [
  {
    icon: "🔐",
    num: "01",
    title: "Create your account",
    desc: "Sign up with your email and verify with OTP. The whole process takes under a minute.",
  },
  {
    icon: "🩸",
    num: "02",
    title: "Complete your profile",
    desc: "Add your blood group, health details and location so we can match you precisely.",
  },
  {
    icon: "📬",
    num: "03",
    title: "Respond to requests",
    desc: "Get an instant email alert when someone nearby needs your blood group. Accept if available.",
  },
  {
    icon: "❤️",
    num: "04",
    title: "Save a life",
    desc: "Show up, donate, and make a lasting difference for someone in critical need.",
  },
];

const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

const features = [
  {
    icon: "🛡️",
    title: "Verified & Secure",
    text: "OTP-verified accounts and encrypted sessions protect every user on the platform.",
  },
  {
    icon: "📍",
    title: "Location-Aware",
    text: "Donor matching is powered by city and state data so requests reach the right people.",
  },
  {
    icon: "⚡",
    title: "Instant Alerts",
    text: "Automated email notifications fire the moment a matching blood request is created.",
  },
  {
    icon: "🩺",
    title: "Health-Screened",
    text: "Donors with recent donations (< 3 months) are excluded automatically — safety first.",
  },
  {
    icon: "🤝",
    title: "Zero Middlemen",
    text: "Direct connection between patient families and willing donors. No agencies, no fees.",
  },
  {
    icon: "📊",
    title: "Full Transparency",
    text: "Track every request from Active to Fulfilled. Know exactly who accepted and when.",
  },
];

const urgencyFacts = [
  { stat: "Every 2 sec", label: "someone in India needs blood" },
  { stat: "4.8 cr", label: "units of blood needed per year" },
  { stat: "Only 40%", label: "of demand is currently met" },
  { stat: "1 donation", label: "can save up to 3 lives" },
];

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rl-visible");
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );
    document.querySelectorAll(".rl-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rl-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Barlow:wght@800;900&display=swap');

        .rl-root { font-family: 'Inter', sans-serif; background: #fff; color: #0F172A; }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* ── Scroll reveal ── */
        .rl-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
        .rl-reveal.rl-visible { opacity: 1; transform: none; }
        .rl-delay-1 { transition-delay: 100ms; }
        .rl-delay-2 { transition-delay: 200ms; }
        .rl-delay-3 { transition-delay: 300ms; }
        .rl-delay-4 { transition-delay: 400ms; }

        /* ── Buttons ── */
        .rl-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #C8102E; color: #fff; border: none;
          padding: 14px 28px; border-radius: 10px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 20px rgba(200,16,46,0.35);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .rl-btn-primary:hover { background: #a00e25; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,16,46,0.4); }

        .rl-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #0A2540; border: 2px solid #CBD5E1;
          padding: 13px 26px; border-radius: 10px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .rl-btn-ghost:hover { border-color: #C8102E; color: #C8102E; background: #fff5f6; transform: translateY(-2px); }

        .rl-btn-ghost-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4);
          padding: 13px 26px; border-radius: 10px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          transition: border-color 0.2s, background 0.2s;
        }
        .rl-btn-ghost-white:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

        /* ── Nav ── */
        .rl-nav { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 1px solid #F1F5F9; }
        .rl-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
        .rl-nav-links { display: flex; gap: 8px; }
        .rl-nav-link { background: none; border: none; padding: 8px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; color: #475569; cursor: pointer; font-family: inherit; transition: color 0.15s, background 0.15s; }
        .rl-nav-link:hover { color: #C8102E; background: #fff5f6; }
        .rl-nav-actions { display: flex; gap: 10px; }

        /* ── Logo ── */
        .rl-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; text-decoration: none; }
        .rl-logo-icon { width: 44px; height: 44px; background: #C8102E; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(200,16,46,0.3); }
        .rl-logo-text-red { font-family: 'Barlow',sans-serif; font-weight: 900; font-size: 26px; color: #C8102E; letter-spacing: 2px; }
        .rl-logo-text-dark { font-family: 'Barlow',sans-serif; font-weight: 900; font-size: 26px; color: #0A2540; letter-spacing: 2px; }
        .rl-logo-sub { font-size: 9px; font-weight: 700; color: #94A3B8; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 1px; }

        /* ── Announcement bar ── */
        .rl-topbar { background: #0A2540; color: #CBD5E1; padding: 8px 32px; font-size: 12px; font-weight: 500; display: flex; justify-content: space-between; align-items: center; }
        .rl-topbar span { display: flex; align-items: center; gap: 8px; }

        /* ══════════════════════════════════════════
           HERO — darkest top, warming toward bottom
        ══════════════════════════════════════════ */
        .rl-hero {
          position: relative;
          /* pure near-black at top → deep navy-maroon at bottom
             so the page reads darkest at the very top, lifting into
             lighter warm tones as you scroll down into the white sections */
          background: linear-gradient(180deg,
            #02060D 0%,
            #060D1A 20%,
            #0A1525 45%,
            #0E1A2E 65%,
            #160A12 85%,
            #1F0B16 100%
          );
          overflow: hidden;
          min-height: calc(100vh - 112px);
          display: flex; align-items: center;
        }

        /* ── Big red glow — centre-right, very visible ── */
        .rl-hero::before {
          content: '';
          position: absolute; top: 50%; right: -60px;
          transform: translateY(-50%);
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(200,16,46,0.40) 0%,
            rgba(200,16,46,0.18) 35%,
            rgba(200,16,46,0.05) 65%,
            transparent 80%
          );
          pointer-events: none; z-index: 0;
        }
        /* ── Softer blue accent — top-left ── */
        .rl-hero::after {
          content: '';
          position: absolute; top: -80px; left: -80px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(56,100,180,0.22) 0%,
            rgba(13,49,89,0.12) 50%,
            transparent 72%
          );
          pointer-events: none; z-index: 0;
        }

        /* ── Visible diagonal grid lines ── */
        .rl-hero-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          /* horizontal lines */
          background-image:
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        /* fades the grid toward the edges so it doesn't feel like graph paper */
        .rl-hero-grid-bg::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 70% at 50% 50%,
            transparent 30%, rgba(3,8,15,0.75) 100%
          );
        }

        /* ── Top accent line — full width, bold ── */
        .rl-hero-line {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; z-index: 3;
          background: linear-gradient(
            to right,
            transparent 0%,
            #C8102E 20%,
            #FF4D6D 50%,
            #C8102E 80%,
            transparent 100%
          );
          filter: blur(0.5px);
        }
        /* matching bottom line */
        .rl-hero-bottom-line {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; z-index: 3;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(200,16,46,0.4) 30%,
            rgba(200,16,46,0.6) 50%,
            rgba(200,16,46,0.4) 70%,
            transparent 100%
          );
        }

        /* ── Left vertical glow streak ── */
        .rl-hero-streak {
          position: absolute; top: 0; left: 42%; bottom: 0;
          width: 1px; z-index: 1;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(200,16,46,0.25) 25%,
            rgba(200,16,46,0.45) 50%,
            rgba(200,16,46,0.25) 75%,
            transparent 100%
          );
        }

        .rl-hero-inner {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 56px;
          padding: 48px 48px 40px;
        }

        /* ── LEFT ── */
        .rl-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(200,16,46,0.5);
          background: rgba(200,16,46,0.14);
          border-radius: 100px; padding: 6px 16px; margin-bottom: 20px;
        }
        .rl-hero-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #FF6B6B; flex-shrink: 0;
          animation: rl-blink 2s ease-in-out infinite;
          box-shadow: 0 0 6px #FF6B6B;
        }
        @keyframes rl-blink {
          0%,100% { opacity: 1; box-shadow: 0 0 6px #FF6B6B; }
          50% { opacity: 0.5; box-shadow: 0 0 2px #FF6B6B; }
        }
        .rl-hero-eyebrow span { font-size: 12px; font-weight: 700; color: #FCA5A5; letter-spacing: 0.06em; text-transform: uppercase; }

        /* headline: dark → light gradient on the white line */
        .rl-hero-h1 {
          font-size: 62px; font-weight: 900; line-height: 1.0;
          letter-spacing: -3px; display: block; margin: 0 0 2px;
          background: linear-gradient(to right, #94A3B8 0%, #F8FAFC 60%, #fff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* red line: dark crimson → vivid red → light pink (dark→light) */
        .rl-hero-h1-red {
          font-size: 62px; font-weight: 900; line-height: 1.0;
          letter-spacing: -3px; display: block; margin-bottom: 20px;
          background: linear-gradient(to right, #7f0a1d 0%, #C8102E 40%, #FF4D6D 80%, #FFB3C1 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rl-hero-p {
          font-size: 16px; color: #94A3B8; line-height: 1.7;
          margin-bottom: 32px; max-width: 460px;
        }
        .rl-hero-p strong { color: #CBD5E1; font-weight: 600; }

        .rl-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 32px; }

        /* ghost button override for dark bg */
        .rl-hero-actions .rl-btn-ghost {
          color: #E2E8F0; border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.05);
        }
        .rl-hero-actions .rl-btn-ghost:hover {
          color: #fff; border-color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.1); transform: translateY(-2px);
        }

        /* social-proof row */
        .rl-hero-proof { display: flex; align-items: center; gap: 20px; }
        .rl-hero-avatars { display: flex; }
        .rl-hero-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #9B1A2A 0%, #C8102E 100%);
          border: 2.5px solid #0C1A30;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 900; color: #fff;
          margin-left: -10px;
          box-shadow: 0 2px 8px rgba(200,16,46,0.4);
        }
        .rl-hero-proof-text strong { display: block; font-size: 13px; font-weight: 800; color: #E2E8F0; }
        .rl-hero-proof-text span { display: block; font-size: 12px; color: #475569; margin-top: 2px; }

        /* ── RIGHT ── */
        .rl-hero-right { position: relative; display: flex; justify-content: center; }

        /* main visual card — gradient border via box-shadow */
        .rl-hero-vis {
          position: relative;
          width: 100%; max-width: 400px;
          background: linear-gradient(160deg,
            rgba(255,255,255,0.07) 0%,
            rgba(200,16,46,0.04) 60%,
            rgba(255,255,255,0.03) 100%
          );
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 28px;
          padding: 28px 28px 20px;
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column; align-items: center;
          box-shadow:
            0 0 0 1px rgba(200,16,46,0.15),
            0 32px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
        /* animated red border shimmer */
        .rl-hero-vis::before {
          content: '';
          position: absolute; inset: -1px; border-radius: 33px;
          background: linear-gradient(135deg,
            rgba(200,16,46,0.5) 0%,
            transparent 40%,
            transparent 60%,
            rgba(56,100,180,0.25) 100%
          );
          z-index: -1; pointer-events: none;
        }

        .rl-hero-vis-img {
          width: 170px; object-fit: contain;
          filter:
            drop-shadow(0 0 24px rgba(200,16,46,0.35))
            drop-shadow(0 12px 24px rgba(0,0,0,0.5));
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          margin-bottom: 8px;
        }
        .rl-hero-vis:hover .rl-hero-vis-img { transform: translateY(-10px) scale(1.04); }

        /* floating notification cards */
        .rl-hero-notif {
          position: absolute;
          background: linear-gradient(135deg, rgba(10,18,35,0.97) 0%, rgba(15,25,45,0.95) 100%);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 16px;
          padding: 12px 16px;
          backdrop-filter: blur(24px);
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,16,46,0.1);
          white-space: nowrap;
          animation: rl-float 4s ease-in-out infinite;
          z-index: 10;
        }
        @keyframes rl-float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .rl-hero-notif-1 { top: 20px; left: -60px; animation-delay: 0s; }
        .rl-hero-notif-2 { bottom: 140px; right: -44px; animation-delay: 2s; }
        .rl-hero-notif-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 19px;
        }
        .rl-hero-notif-icon-red {
          background: linear-gradient(135deg, rgba(200,16,46,0.3), rgba(200,16,46,0.1));
          border: 1px solid rgba(200,16,46,0.4);
        }
        .rl-hero-notif-icon-grn {
          background: linear-gradient(135deg, rgba(22,163,74,0.3), rgba(22,163,74,0.1));
          border: 1px solid rgba(22,163,74,0.4);
        }
        .rl-hero-notif-title { font-size: 12px; font-weight: 800; color: #E2E8F0; }
        .rl-hero-notif-sub { font-size: 11px; color: #64748B; margin-top: 2px; }

        /* stats bar — now rendered inline inside .rl-hero-vis card */

        /* ── HERO RESPONSIVE ── */
        @media (max-width: 1024px) {
          .rl-hero-inner { grid-template-columns: 1fr; padding: 48px 32px 40px; gap: 40px; }
          .rl-hero-h1, .rl-hero-h1-red { font-size: 48px; letter-spacing: -2px; }
          .rl-hero-right { justify-content: center; }
          .rl-hero-notif-1 { left: -8px; }
          .rl-hero-notif-2 { right: -4px; }
        }
        @media (max-width: 640px) {
          .rl-hero-h1, .rl-hero-h1-red { font-size: 36px; letter-spacing: -1.5px; }
          .rl-hero-inner { padding: 36px 20px 32px; }
          .rl-hero-notif { display: none; }
          .rl-hero-vis { max-width: 300px; padding: 24px 20px 16px; }
          .rl-hero-vis-img { width: 140px; }
        }

        /* ══════════════════════════════════════════════════════
           MASTER PAGE GRADIENT — dark at top, light at bottom
           Applied to .rl-root so the ENTIRE page shares one
           continuous vertical colour sweep:
             near-black (hero)  →  deep red/maroon  →  rose
             →  pale blush  →  off-white (CTA)
        ══════════════════════════════════════════════════════ */
        .rl-root {
          font-family: 'Inter', sans-serif;
          color: #0F172A;
          /* single gradient for the whole page scroll */
          background: linear-gradient(
            180deg,
            #02060D  0%,     /* hero top – near black           */
            #050D1B  5%,     /* hero body                       */
            #09162A  12%,    /* hero bottom                     */
            #120818  16%,    /* bridge to sections              */
            #1E0D18  20%,    /* dark warm maroon                */
            #3A1222  26%,    /* deep rose-red                   */
            #5C1E30  32%,    /* medium crimson                  */
            #7D2B3E  38%,    /* warming red                     */
            #A04055  44%,    /* soft red                        */
            #BF6070  50%,    /* muted rose                      */
            #D48E98  56%,    /* light rose                      */
            #E5B4BB  62%,    /* pale rose                       */
            #EFD0D4  67%,    /* very light blush                */
            #F6E4E6  72%,    /* near-white warm                 */
            #FAF0F1  77%,    /* off-white                       */
            #FFFFFF  83%     /* pure white – CTA and below      */
          );
          background-attachment: fixed; /* parallax: gradient stays fixed while content scrolls */
        }
        .rl-section { padding: 96px 32px; background: transparent; }
        .rl-section-inner { max-width: 1200px; margin: 0 auto; }
        .rl-section-label { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.75); border: 1px solid #FECDD3; border-radius: 100px; padding: 6px 16px; margin-bottom: 20px; font-size: 12px; color: #C8102E; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; backdrop-filter: blur(8px); }
        .rl-section-h2 { font-size: 42px; font-weight: 900; letter-spacing: -1.2px; color: #0A2540; line-height: 1.1; margin-bottom: 16px; }
        .rl-section-h2 span { color: #C8102E; }
        .rl-section-sub { font-size: 16px; color: #64748B; line-height: 1.7; max-width: 560px; }

        /* ── Steps ── */
        .rl-steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; margin-top: 56px; }
        .rl-step { background: #fff; border: 1px solid #E2E8F0; border-radius: 20px; padding: 32px 24px; position: relative; transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s; }
        .rl-step:hover { box-shadow: 0 16px 48px rgba(200,16,46,0.1); transform: translateY(-4px); border-color: #FECDD3; }
        .rl-step-num { font-size: 11px; font-weight: 800; color: #C8102E; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
        .rl-step-icon { width: 52px; height: 52px; background: #FFF5F6; border: 1px solid #FECDD3; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px; }
        .rl-step h3 { font-size: 16px; font-weight: 800; color: #0A2540; margin-bottom: 10px; }
        .rl-step p { font-size: 14px; color: #64748B; line-height: 1.65; }
        .rl-step-connector { position: absolute; top: 50px; right: -13px; width: 24px; height: 2px; background: linear-gradient(to right, #FECDD3, transparent); z-index: 1; }

        /* ── Features — transparent, sits on page gradient ── */
        .rl-features-bg { background: transparent; }
        .rl-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px; }
        .rl-feature-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 20px; padding: 32px; transition: box-shadow 0.25s, transform 0.25s; }
        .rl-feature-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.06); transform: translateY(-3px); }
        .rl-feature-icon { font-size: 32px; margin-bottom: 20px; }
        .rl-feature-card h3 { font-size: 16px; font-weight: 800; color: #0A2540; margin-bottom: 10px; }
        .rl-feature-card p { font-size: 14px; color: #64748B; line-height: 1.65; }

        /* ── Blood groups — transparent, page gradient is visible ── */
        .rl-blood-bg { background: transparent; }
        .rl-blood-grid { display: grid; grid-template-columns: repeat(8,1fr); gap: 12px; margin-top: 48px; }
        .rl-blood-pill { background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.12); color: #fff; font-weight: 900; font-size: 20px; border-radius: 14px; padding: 20px 12px; text-align: center; transition: all 0.2s; cursor: default; font-family: inherit; }
        .rl-blood-pill:hover { background: #C8102E; border-color: #C8102E; transform: scale(1.08); box-shadow: 0 8px 24px rgba(200,16,46,0.4); }
        .rl-blood-note { font-size: 13px; color: #94A3B8; text-align: center; margin-top: 24px; }

        /* ── CTA banner ── */
        .rl-cta-bg { background: #C8102E; }
        .rl-cta-inner { max-width: 900px; margin: 0 auto; text-align: center; padding: 96px 32px; }
        .rl-cta-inner h2 { font-size: 48px; font-weight: 900; color: #fff; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 20px; }
        .rl-cta-inner p { font-size: 17px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 44px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .rl-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
        .rl-btn-white { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #C8102E; border: none; padding: 15px 32px; border-radius: 10px; font-size: 16px; font-weight: 800; cursor: pointer; font-family: inherit; box-shadow: 0 4px 20px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s; }
        .rl-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
        .rl-cta-note { font-size: 13px; color: rgba(255,255,255,0.5); }

        /* ── Footer ── */
        .rl-footer { background: #080F1A; color: #fff; padding: 72px 32px 0; }
        .rl-footer-inner { max-width: 1200px; margin: 0 auto; }
        .rl-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 56px; border-bottom: 1px solid #1E293B; }
        .rl-footer-col-title { font-size: 11px; font-weight: 800; color: #C8102E; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
        .rl-footer-brand-p { font-size: 13px; color: #475569; line-height: 1.7; margin-top: 16px; }
        .rl-footer-link { display: block; background: none; border: none; color: #475569; font-size: 14px; cursor: pointer; padding: 6px 0; text-align: left; font-family: inherit; transition: color 0.15s; }
        .rl-footer-link:hover { color: #fff; }
        .rl-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; flex-wrap: wrap; gap: 12px; }
        .rl-footer-bottom p { font-size: 12px; color: #334155; }
        .rl-footer-emergency { background: #0F172A; border: 1px solid #1E293B; border-radius: 12px; padding: 16px 20px; margin-top: 24px; }
        .rl-footer-emergency p:first-child { font-size: 11px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .rl-footer-emergency p:last-child { font-size: 18px; font-weight: 800; color: #C8102E; }

        /* ── Divider ── */
        .rl-divider { width: 60px; height: 4px; background: #C8102E; border-radius: 2px; margin: 20px 0 0; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .rl-steps-grid { grid-template-columns: repeat(2,1fr); }
          .rl-features-grid { grid-template-columns: repeat(2,1fr); }
          .rl-footer-top { grid-template-columns: 1fr 1fr; }
          .rl-cta-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .rl-blood-grid { grid-template-columns: repeat(4,1fr); }
          .rl-steps-grid { grid-template-columns: 1fr; }
          .rl-features-grid { grid-template-columns: 1fr; }
          .rl-section-h2 { font-size: 30px; }
          .rl-topbar .rl-topbar-right { display: none; }
          .rl-nav-links { display: none; }
          .rl-footer-top { grid-template-columns: 1fr; }
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
        <span className="rl-topbar-right" style={{ display: "flex", gap: 24 }}>
          <span>🚨 Emergency: <strong style={{ color: "#F87171" }}>108</strong></span>
          <span>Blood Bank Helpline: <strong style={{ color: "#F87171" }}>1910</strong></span>
        </span>
      </div>

      {/* ── NAV ── */}
      <nav className="rl-nav">
        <div className="rl-nav-inner">
          <div className="rl-logo" onClick={() => navigate("/")}>
            <div className="rl-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M12 3C12 3 6 10 6 14.5a6 6 0 0012 0C18 10 12 3 12 3z" fill="#fff" opacity="0.95"/>
                <path d="M9.5 14.5a2.5 2.5 0 005 0" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span className="rl-logo-text-red">RED</span>
                <span style={{ width: 2, height: 22, background: "#C8102E", margin: "0 4px", borderRadius: 1, opacity: 0.4 }}/>
                <span className="rl-logo-text-dark">LINK</span>
              </div>
              <div className="rl-logo-sub">Blood Donor Network</div>
            </div>
          </div>

          <div className="rl-nav-links">
            <button className="rl-nav-link" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>How it works</button>
            <button className="rl-nav-link" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Features</button>
            <button className="rl-nav-link" onClick={() => document.getElementById("blood-groups")?.scrollIntoView({ behavior: "smooth" })}>Blood groups</button>
          </div>

          <div className="rl-nav-actions">
            <button className="rl-btn-ghost" style={{ padding: "9px 20px", fontSize: 14 }} onClick={() => navigate("/login")}>Log in</button>
            <button className="rl-btn-primary" style={{ padding: "9px 20px", fontSize: 14 }} onClick={() => navigate("/register")}>Register free →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="rl-hero">
        {/* texture + accents */}
        <div className="rl-hero-grid-bg" />
        <div className="rl-hero-line" />
        <div className="rl-hero-bottom-line" />
        <div className="rl-hero-streak" />

        <div className="rl-hero-inner">

          {/* ────── LEFT ────── */}
          <div className="rl-reveal">

            {/* eyebrow pill */}
            <div className="rl-hero-eyebrow">
              <div className="rl-hero-eyebrow-dot" />
              <span>Every 2 seconds, someone in India needs blood</span>
            </div>

            {/* headline */}
            <span className="rl-hero-h1">Connect donors.</span>
            <span className="rl-hero-h1-red">Save lives.</span>

            <p className="rl-hero-p">
              REDLINK is India's fastest-growing blood donor network.
              Post an emergency request and <strong>matching donors in your city</strong> are
              alerted instantly — no agencies, no delays.
            </p>

            {/* CTAs */}
            <div className="rl-hero-actions">
              <button
                className="rl-btn-primary"
                style={{ fontSize: 16, padding: "15px 32px" }}
                onClick={() => navigate("/register")}
              >
                <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
                  <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                Become a donor
              </button>
              <button
                className="rl-btn-ghost"
                style={{ fontSize: 16, padding: "15px 32px" }}
                onClick={() => navigate("/login")}
              >
                Find blood now →
              </button>
            </div>

            {/* social proof */}
            <div className="rl-hero-proof">
              <div className="rl-hero-avatars">
                {["A","B","O","AB","O−"].map((t, i) => (
                  <div
                    key={t}
                    className="rl-hero-avatar"
                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 5 - i }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="rl-hero-proof-text">
                <strong>All 8 blood groups covered</strong>
                <span>Completely free · No hidden charges</span>
              </div>
            </div>
          </div>

          {/* ────── RIGHT ────── */}
          <div className="rl-hero-right rl-reveal rl-delay-2">

            {/* floating notification — top left of card */}
            <div className="rl-hero-notif rl-hero-notif-1">
              <div className="rl-hero-notif-icon rl-hero-notif-icon-red">🚨</div>
              <div>
                <div className="rl-hero-notif-title">Emergency Request</div>
                <div className="rl-hero-notif-sub">B+ · AIIMS Delhi · 2 units</div>
              </div>
            </div>

            {/* floating notification — bottom right of card */}
            <div className="rl-hero-notif rl-hero-notif-2">
              <div className="rl-hero-notif-icon rl-hero-notif-icon-grn">✓</div>
              <div>
                <div className="rl-hero-notif-title">Donor Accepted</div>
                <div className="rl-hero-notif-sub">Request fulfilled · 3 min ago</div>
              </div>
            </div>

            {/* main illustration card — includes stats bar inside */}
            <div className="rl-hero-vis">
              <img
                src={bloodDonateImg}
                alt="Blood donation illustration"
                className="rl-hero-vis-img"
              />

              {/* inline label inside card */}
              <div style={{
                marginTop: 12, marginBottom: 8,
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(200,16,46,0.15)",
                border: "1px solid rgba(200,16,46,0.3)",
                borderRadius: 10, padding: "8px 16px",
                width: "100%", justifyContent: "center",
              }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#FCA5A5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  🩸 Live network active — donors being matched
                </span>
              </div>

              {/* stats 2×2 grid removed — restored as 4-col bar below */}
            </div>

            {/* 4-col stats bar — outside card, full width of right column */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              width: "100%",
              maxWidth: 420,
              marginTop: 14,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              {urgencyFacts.map(({ stat, label }) => (
                <div
                  key={stat}
                  style={{
                    background: "rgba(6, 12, 26, 0.92)",
                    padding: "14px 6px",
                    textAlign: "center",
                    cursor: "default",
                    transition: "background 0.25s, transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "linear-gradient(160deg, rgba(200,16,46,0.45) 0%, rgba(200,16,46,0.25) 100%)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(6,12,26,0.92)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{
                    fontSize: 15, fontWeight: 900, color: "#FF6B6B",
                    lineHeight: 1, marginBottom: 5,
                    textShadow: "0 0 12px rgba(255,107,107,0.5)",
                  }}>
                    {stat}
                  </div>
                  <div style={{ fontSize: 10, color: "#CBD5E1", fontWeight: 600, lineHeight: 1.3 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Seamless gradient bridge: hero bottom-colour → first section white */}
      <div style={{
        height: 80,
        background: "linear-gradient(180deg, #1F0B16 0%, #F9F4F5 100%)",
        marginTop: -1,
        position: "relative", zIndex: 2
      }} />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="rl-section">
        <div className="rl-section-inner">
          <div className="rl-reveal" style={{ textAlign: "center" }}>
            <div className="rl-section-label" style={{ margin: "0 auto 20px" }}>🔄 Simple process</div>
            <h2 className="rl-section-h2" style={{ textAlign: "center" }}>
              How <span>RED</span>LINK works
            </h2>
            <p className="rl-section-sub" style={{ margin: "0 auto" }}>
              From sign-up to saving a life — four straightforward steps that take minutes, not hours.
            </p>
            <div className="rl-divider" style={{ margin: "20px auto 0" }}/>
          </div>

          <div className="rl-steps-grid">
            {steps.map((step, i) => (
              <div key={step.title} className={`rl-step rl-reveal rl-delay-${i + 1}`}>
                {i < steps.length - 1 && <div className="rl-step-connector"/>}
                <div className="rl-step-num">Step {step.num}</div>
                <div className="rl-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="rl-reveal" style={{ textAlign: "center", marginTop: 56 }}>
            <button className="rl-btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => navigate("/register")}>
              Get started — it's free →
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="rl-section rl-features-bg">
        <div className="rl-section-inner">
          <div className="rl-reveal">
            <div className="rl-section-label">✨ Platform features</div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
              Why choose REDLINK
            </p>
            <h2 className="rl-section-h2">
              Built for <span>emergencies</span>
            </h2>
            <p className="rl-section-sub">
              Every feature is designed with one goal in mind — getting the right blood to the right person as fast as possible.
            </p>
            <div className="rl-divider"/>
          </div>

          <div className="rl-features-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`rl-feature-card rl-reveal rl-delay-${(i % 3) + 1}`}>
                <div className="rl-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR DONORS & REQUESTERS ── */}
      <section className="rl-section">
        <div className="rl-section-inner">
          <div className="rl-reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="rl-section-label" style={{ margin: "0 auto 20px" }}>👥 Who is it for?</div>
            <h2 className="rl-section-h2" style={{ textAlign: "center" }}>
              Serving both sides of the <span>lifeline</span>
            </h2>
            <div className="rl-divider" style={{ margin: "20px auto 0" }}/>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="rl-reveal">
            {/* Donor */}
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 24, padding: 40 }}>
              <div style={{ width: 64, height: 64, background: "#DCFCE7", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 24 }}>💚</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#15803D", marginBottom: 12 }}>For Donors</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>
                Register once, set your blood group, and turn on alerts. Whenever someone near you needs your blood type, you'll get an email instantly. No spam — only real, urgent requests.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Receive targeted email alerts for your blood group", "Cancel or accept donations with one click", "Track your donation history and impact", "3-month cooldown respected automatically"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                    <span style={{ color: "#16A34A", marginTop: 2, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="rl-btn-primary" style={{ marginTop: 32, background: "#16A34A", boxShadow: "0 4px 20px rgba(22,163,74,0.3)" }} onClick={() => navigate("/register")}>
                Register as donor →
              </button>
            </div>

            {/* Requester */}
            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 24, padding: 40 }}>
              <div style={{ width: 64, height: 64, background: "#DBEAFE", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 24 }}>🩸</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1D4ED8", marginBottom: 12 }}>For Requesters</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 24 }}>
                In a crisis, every minute counts. Post a blood request in under 60 seconds — specify the blood group, priority level, hospital, and required date. Matching donors are notified automatically.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Emergency, Medium, and Low priority levels", "Auto-notifies all eligible donors immediately", "Up to 10 donors can accept per request", "View donor list and contact details in real time"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                    <span style={{ color: "#2563EB", marginTop: 2, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="rl-btn-primary" style={{ marginTop: 32 }} onClick={() => navigate("/register")}>
                Post a request →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOOD GROUPS ── */}
      <section id="blood-groups" className="rl-section rl-blood-bg">
        <div className="rl-section-inner">
          <div className="rl-reveal" style={{ textAlign: "center" }}>
            <div className="rl-section-label" style={{ background: "rgba(200,16,46,0.2)", border: "1px solid rgba(200,16,46,0.35)", color: "#FCA5A5", margin: "0 auto 20px" }}>
              🩸 Coverage
            </div>
            <h2 className="rl-section-h2" style={{ textAlign: "center", color: "#fff" }}>
              All blood groups, <span style={{ color: "#F87171" }}>covered</span>
            </h2>
            <p className="rl-section-sub" style={{ color: "#94A3B8", margin: "0 auto" }}>
              Whether you're A+ or AB−, REDLINK has donors and requesters for every type. No blood group is left behind.
            </p>
          </div>

          <div className="rl-blood-grid rl-reveal rl-delay-1">
            {bloodGroups.map((bg) => (
              <div key={bg} className="rl-blood-pill">{bg}</div>
            ))}
          </div>

          <p className="rl-blood-note rl-reveal rl-delay-2">
            🌍 O− is the universal donor &nbsp;·&nbsp; AB+ is the universal recipient &nbsp;·&nbsp; Every type saves lives
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#fff", padding: "96px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Split card */}
          <div className="rl-reveal" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            borderRadius: 32, overflow: "hidden",
            boxShadow: "0 32px 80px rgba(200,16,46,0.12), 0 8px 24px rgba(0,0,0,0.06)"
          }}>

            {/* LEFT — dark with image */}
            <div style={{
              background: "linear-gradient(145deg, #0B1E35 0%, #0A2540 100%)",
              padding: "64px 48px",
              position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "center"
            }}>
              {/* decorative drop */}
              <svg viewBox="0 0 200 260" style={{ position: "absolute", right: -40, bottom: -40, width: 220, opacity: 0.06 }}>
                <path d="M100 10C100 10 20 90 20 150a80 80 0 00160 0C180 90 100 10 100 10z" fill="#C8102E"/>
              </svg>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(200,16,46,0.2)", border: "1px solid rgba(200,16,46,0.35)",
                borderRadius: 100, padding: "5px 14px", marginBottom: 28, width: "fit-content"
              }}>
                <span style={{ fontSize: 11, color: "#FCA5A5", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Join the movement
                </span>
              </div>

              <h2 style={{
                fontSize: 42, fontWeight: 900, color: "#fff",
                letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20
              }}>
                Ready to make<br />
                <span style={{ color: "#F87171" }}>a difference?</span>
              </h2>

              <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.75, marginBottom: 36, maxWidth: 360 }}>
                Join REDLINK today. Add your blood group, turn on alerts, and become the lifeline that someone in your city is desperately searching for.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Automated alerts for your blood group",
                  "Blood group compatibility enforced",
                  "Zero middlemen — direct donor contact",
                  "Free forever, no hidden charges",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: "rgba(200,16,46,0.25)", border: "1px solid rgba(200,16,46,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" width="11" height="11">
                        <path d="M5 13l4 4L19 7" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — red */}
            <div style={{
              background: "linear-gradient(145deg, #B00D26 0%, #C8102E 50%, #E01535 100%)",
              padding: "64px 48px",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"
            }}>
              {/* big blood drop icon */}
              <div style={{
                width: 80, height: 80, background: "rgba(255,255,255,0.18)",
                borderRadius: 20, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: 32,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}>
                <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
                  <path d="M12 3C12 3 5 11 5 16a7 7 0 0014 0C19 11 12 3 12 3z" fill="#fff" opacity="0.95"/>
                  <path d="M9 16a3 3 0 003 2.8" stroke="rgba(180,0,30,0.6)" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 style={{
                fontSize: 32, fontWeight: 900, color: "#fff",
                letterSpacing: -1, lineHeight: 1.15, marginBottom: 14,
                textShadow: "0 2px 12px rgba(0,0,0,0.25)"
              }}>
                One donation.<br/>
                <span style={{ color: "#FFE0E6" }}>Three lives saved.</span>
              </h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 40 }}>
                Create your account in under 2 minutes. Complete your donor profile and start receiving emergency alerts near you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
                <button
                  className="rl-btn-white"
                  style={{ fontSize: 16, padding: "16px 32px", width: "100%", justifyContent: "center" }}
                  onClick={() => navigate("/register")}
                >
                  Create your account →
                </button>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    background: "transparent", color: "rgba(255,255,255,0.7)",
                    border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10,
                    padding: "14px 32px", fontSize: 15, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit", width: "100%",
                    transition: "border-color 0.2s, color 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                >
                  Already a member? Log in
                </button>
              </div>

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 20, fontWeight: 600 }}>
                🔒 Secure · Free forever · Takes under 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="rl-footer">
        <div className="rl-footer-inner">
          <div className="rl-footer-top">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: "#C8102E", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                    <path d="M12 3C12 3 6 10 6 14.5a6 6 0 0012 0C18 10 12 3 12 3z" fill="#fff" opacity="0.95"/>
                    <path d="M9.5 14.5a2.5 2.5 0 005 0" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 900, fontSize: 22, color: "#C8102E", letterSpacing: 2 }}>RED</span>
                    <span style={{ width: 2, height: 20, background: "#C8102E", margin: "0 3px", borderRadius: 1, opacity: 0.4 }}/>
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: 2 }}>LINK</span>
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#334155", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 2 }}>Blood Donor Network</div>
                </div>
              </div>
              <p className="rl-footer-brand-p">
                Connecting blood donors with people in need — fast, free, and built to save lives across India.
              </p>
              <div className="rl-footer-emergency">
                <p>Emergency helpline</p>
                <p>108 · 1910 (Blood Bank)</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="rl-footer-col-title">Quick Links</div>
              {[{ label: "Home", path: "/" }, { label: "Find Blood", path: "/request" }, { label: "Create Request", path: "/request" }, { label: "My Profile", path: "/profile" }].map(({ label, path }) => (
                <button key={label} className="rl-footer-link" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>

            {/* Account */}
            <div>
              <div className="rl-footer-col-title">Account</div>
              {[{ label: "Register", path: "/register" }, { label: "Log In", path: "/login" }, { label: "Forgot Password", path: "/forgot-password" }].map(({ label, path }) => (
                <button key={label} className="rl-footer-link" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>

            {/* Blood groups */}
            <div>
              <div className="rl-footer-col-title">Blood Groups</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((bg) => (
                  <span key={bg} style={{ fontSize: 13, color: "#475569", fontWeight: 700 }}>{bg}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="rl-footer-bottom">
            <p>© {new Date().getFullYear()} REDLINK. All rights reserved.</p>
            <p>Built to save lives · Free forever · Made with ❤️</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <span key={item} className="rl-footer-link" style={{ display: "inline", padding: 0 }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
