import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";            

const stats = [
  { value: "0", label: "Registered donors" },
  { value: "0", label: "Requests fulfilled" },
  { value: "0", label: "Active requests" },
  { value: "0", label: "Cities covered" },
];

const steps = [
  {
    icon: "🔐",
    title: "Create your account",
    desc: "Sign up with your email and verify with OTP. Takes under a minute.",
  },
  {
    icon: "🩸",
    title: "Complete your profile",
    desc: "Add your blood group and location so we can match you with nearby requests.",
  },
  {
    icon: "📬",
    title: "Respond to requests",
    desc: "Get notified when someone nearby needs your blood group. Accept if you can help.",
  },
  {
    icon: "❤️",
    title: "Save a life",
    desc: "Show up, donate, and make a real difference for someone in critical need.",
  },
];

const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll reveals using IntersectionObserver (redBus transition system)
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll(".reveal");
    elementsToReveal.forEach((el) => observer.observe(el));

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#F4F7FA",
        color: "#0F172A",
        minHeight: "100vh",
      }}
    >
      <style>{`                                              
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Barlow:wght@900&family=Rajdhani:wght@600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
       
        html { scroll-behavior: smooth; }
        
        /* Scroll transitions (redBus style) */
        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: opacity, transform;
        }
        
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .btn-primary {
          background: #D90429; color: #fff; border: none;
          padding: 14px 28px; border-radius: 10px; font-size: 15px;
          font-weight: 700; cursor: pointer; transition: all 0.25s ease;
          font-family: inherit;
          box-shadow: 0 4px 12px rgba(217, 4, 41, 0.2);
        }
        .btn-primary:hover { background: #b30322; transform: translateY(-1.5px); box-shadow: 0 6px 16px rgba(217, 4, 41, 0.3); }
        
        .btn-outline {
          background: transparent; color: #0A2540; border: 2px solid #0A2540;
          padding: 12px 26px; border-radius: 10px; font-size: 15px;
          font-weight: 700; cursor: pointer; transition: all 0.25s ease;
          font-family: inherit;
        }
        .btn-outline:hover { background: #0A2540; color: #fff; transform: translateY(-1.5px); }
        
        .nav-link {
          color: #475569; text-decoration: none; font-size: 15px; font-weight: 600;
          padding: 6px 0; position: relative; background: none; border: none;
          cursor: pointer; font-family: inherit;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #0077B6; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: #0077B6; transition: width 0.2s;
        }
        .nav-link:hover::after { width: 100%; }
        
        .step-card {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
          padding: 28px 24px; flex: 1; min-width: 200px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
        }
        .step-card:hover { box-shadow: 0 8px 32px rgba(10,37,64,0.06); transform: translateY(-3px); border-color: #cbd5e1; }
        
        .blood-pill {
          background: #fff5f6; border: 1.5px solid #fbcfe8;
          color: #D90429; font-weight: 800; font-size: 18px;
          border-radius: 10px; padding: 14px 20px; text-align: center;
          transition: all 0.18s; cursor: default;
          font-family: inherit;
        }
        .blood-pill:hover { background: #D90429; color: #fff; border-color: #D90429; transform: scale(1.06); }
        
        .stat-block { text-align: center; padding: 24px 32px; }
        .stat-num { font-size: 42px; font-weight: 900; color: #0077B6; line-height: 1; }
        .stat-label { font-size: 13px; color: #64748B; margin-top: 6px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; }
        
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .steps-grid { flex-direction: column !important; }
          .blood-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .stats-row { flex-wrap: wrap; }
          .nav-links { display: none; }
          .hero-headline { font-size: 36px !important; }
        }
      `}</style>

      {/* TOP GOVERNMENT NOTICE BAR */}
      <div
        style={{
          background: "#0A2540",
          color: "#E2E8F0",
          padding: "8px 24px",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #0077B6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🏛️</span>
          <span>
            Integrated Blood Network Services • National Health Portal
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>Emergency Toll-free: 108</span>
          <span>Ministry of Health Initiative</span>
        </div>                           
      </div>                                                    

      <div className="min-h-screen">             
        {/* NAV */}
    <nav
  className="bg-white px-8 sm:px-16 lg:px-20 flex justify-between items-center shadow-sm relative"
  style={{
    height: "78px",         
  }}
> 
          {/* Logo */}
       <div style={{ display:"flex", alignItems:"center", gap:14,padding:3, cursor:"pointer" }} onClick={() => navigate("/")}>
  <div style={{ width:48, height:48, background:"#C8102E", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
      <path d="M12 3C12 3 6 10 6 14.5a6 6 0 0012 0C18 10 12 3 12 3z" fill="#fff" opacity="0.95"/>
      <path d="M9.5 14.5a2.5 2.5 0 005 0" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
  <div>
    <div style={{ display:"flex", alignItems:"center", lineHeight:1 }}>      
      <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:900, fontSize:28, color:"#C8102E", letterSpacing:3, textTransform:"uppercase" }}>RED</span>
      <div style={{ width:2, height:26, background:"#C8102E", margin:"0 5px", borderRadius:1, opacity:0.5 }}></div>
      <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:900, fontSize:28, color:"#111", letterSpacing:3, textTransform:"uppercase" }}>LINK</span>
    </div>
    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:600, color:"#999", letterSpacing:"0.3em", textTransform:"uppercase", marginTop:3 }}>Blood Donor Network</div>
  </div>
</div>                                                                                            

          <div     
            className="nav-links"
            style={{ display: "flex", gap: 32, alignItems: "center" }}
          >
            <button
              className="nav-link"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              How it works
            </button>
            <button
              className="nav-link"
              onClick={() =>
                document
                  .getElementById("blood-groups")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Blood groups
            </button>
            <button className="nav-link" onClick={() => navigate("/request")}>
              Find blood
            </button>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn-outline"
              onClick={() => navigate("/login")}
              style={{ padding: "10px 20px", fontSize: 14 }}
            >
              Log in
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
              style={{ padding: "10px 20px", fontSize: 14 }}
            >
              Register 
            </button>
          </div>
        </nav>

        {/* HERO */}        
        <section
          style={{
            padding: "20px 40px 80px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            {/* Left */}
          <div
  className="reveal"
  style={{
    flex: 1,
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
> 
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "stretch",
                  gap: 8,
                  background: "#E0F2FE",
                  border: "1px solid #BAE6FD",
                  borderRadius: 100,
                  padding: "6px 16px", 
                  marginBottom: 24,
                }}
              >
                <span style={{ fontSize: 13 }}>🔴</span>
                <span
                  style={{ fontSize: 13, color: "#0369A1", fontWeight: 700 }}
                >
                  Every 2 seconds someone needs blood
                </span>
              </div>

              <h1
                className="hero-headline"
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                  marginBottom: 20,
                  color: "#0A2540",
                }}                                           
              >
                The fastest way to
                <br />
                <span style={{ color: "#D90429" }}>find blood donors</span>
                <br />
                near you
              </h1>

              <p
                style={{
                  fontSize: 17,
                  color: "#475569",
                  lineHeight: 1.65,
                  marginBottom: 36,
                  maxWidth: 480,
                }}
              >
                RedLink connects people who need blood with willing donors in
                the same city — quickly, directly, and without middlemen.
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "#D90429",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                ❤️ One donation can save a life.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/register")}
                  style={{ fontSize: 16, padding: "16px 32px" }}
                >
                  Become a donor
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate("/request")}
                  style={{ fontSize: 16, padding: "16px 32px" }}
                >
                  Find blood now
                </button>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#94A3B8",
                  marginTop: 20,
                }}
              >
                Free to Join • Secure • No Hidden Charges
              </p>
            </div> 

            {/* Right — visual */}
            <div
              className="reveal"
              style={{
                flex: 1,
                maxWidth: "560px",
              }}
            >
              {/* Outer card */}
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl flex items-center flex-col">
                <img
                  src="/assets/bloodDonate.png"
                  alt="Blood Donation"
                  style={{
                    width: 190,
                    margin: "24px 0",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                {/* BOTTOM: 4 feature icons in a row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 0,
                    padding: "28px 20px 28px",
                    background: "#fff",
                    borderTop: "1px solid #F1F5F9",
                    width: "100%",
                  }}
                >
                  {[
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width="26"
                          height="26"
                        >
                          <path
                            d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z"
                            fill="#0077B6"
                            opacity="0.15"
                          />
                          <path
                            d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z"
                            stroke="#0077B6"
                            strokeWidth="1.6"
                            fill="none"
                          />
                          <path
                            d="M9 12l2 2 4-4"
                            stroke="#0077B6"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                      label: "Verified Donors",
                      sub: "Trusted & verified blood donors",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width="26"
                          height="26"
                        >
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            fill="#0077B6"
                            opacity="0.2"
                          />
                          <path
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                            stroke="#0077B6"
                            strokeWidth="1.6"
                            fill="none"
                          />
                          <circle
                            cx="12"
                            cy="9"
                            r="2.5"
                            stroke="#0077B6"
                            strokeWidth="1.4"
                            fill="none"
                          />
                        </svg>
                      ),
                      label: "Nearby Donors",
                      sub: "Find donors near your location",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width="26"
                          height="26"
                        >
                          <path
                            d="M12 2a7 7 0 00-7 7v3l-2 3h18l-2-3V9a7 7 0 00-7-7z"
                            fill="#0077B6"
                            opacity="0.15"
                          />
                          <path
                            d="M12 2a7 7 0 00-7 7v3l-2 3h18l-2-3V9a7 7 0 00-7-7z"
                            stroke="#0077B6"
                            strokeWidth="1.6"
                            fill="none"
                          />
                          <path
                            d="M10 19a2 2 0 004 0"
                            stroke="#0077B6"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      label: "Quick Alerts",
                      sub: "Get notified instantly",
                    },
                    {
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width="26"
                          height="26"
                        >
                          <circle
                            cx="9"
                            cy="7"
                            r="3"
                            stroke="#0077B6"
                            strokeWidth="1.5"
                            fill="#0077B6"
                            opacity="0.15"
                          />
                          <circle
                            cx="9"
                            cy="7"
                            r="3"
                            stroke="#0077B6"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <circle
                            cx="17"
                            cy="8"
                            r="2.2"
                            stroke="#0077B6"
                            strokeWidth="1.4"
                            fill="none"
                          />
                          <path
                            d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6"
                            stroke="#0077B6"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M17 14c2.21 0 4 1.79 4 4"
                            stroke="#0077B6"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      ),
                      label: "Save Lives",
                      sub: "Your help can change a life",
                    },
                  ].map(({ icon, label, sub }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "0 6px",
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: "#F0F7FF",
                          border: "1.5px solid #BAE6FD",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 10,
                        }}
                      >
                        {icon}
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#0A2540",
                          marginBottom: 4,
                          lineHeight: 1.2,
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          lineHeight: 1.4,
                        }}
                      >
                        {sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22px",
              marginTop: "38px",
            }}
          >
            {/* LEFT CARD */}
            <div
              style={{
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #E2E8F0",
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,.02)",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#0A2540",
                  marginBottom: "25px",
                }}
              >
<h1 className="text-1xl font-bold"> 
                  Why Choose <span className="text-red-500">RED</span>
      <span className="text-black">LINK?</span> 
    </h1> 
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  textAlign: "center", 
                  gap: "10px",
                }}
              >
                {[
                  {
                    icon: "🛡️",
                    title: "Trusted & Secure", 
                   text: "Verified users and secure data protection you can rely on.",
                  },
                  {
                    icon: "📍",
                    title: "Nearby & Fast",
                    text: "Find or request blood from nearby donors in real-time.",
                  },
                  {
                    icon: "🔔",
                    title: "Instant Alerts",
                    text: "Get notified quickly when someone nearby needs help.",
                  },
                  {
                    icon: "👥",
                    title: "Community Impact",
                    text: "Save lives and build a stronger blood donor community.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: "50%",
                        margin: "0 auto 15px",
                        background: "#F0F7FF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 28, 
                      }}
                    >
                      {item.icon}
                    </div>

                    <h4
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0A2540",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h4>

                    <p
                      style={{
                        fontSize: 12,
                        color: "#64748B",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div
              style={{
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #E2E8F0",
                background: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,.02)",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#0A2540",
                  marginBottom: "22px",
                }}
              >
                Helping Both Donors & Requesters
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                }}
              >
                {/* DONOR */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    background: "#F0FDF4",
                    padding: "18px",
                    borderRadius: "16px",
                    alignItems: "center",
                    border: "1px solid #DCFCE7",
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: "50%",
                      background: "#DCFCE7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 30,
                    }}
                  >
                    💚
                  </div>

                  <div>
                    <h4
                      style={{
                        color: "#16A34A",
                        fontWeight: 800,
                        marginBottom: 8,
                      }}
                    >
                      For Donors
                    </h4>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.6,
                      }}
                    >
                      Register, receive nearby requests, and help patients in
                      urgent need. One donation can save up to three lives.
                    </p>
                  </div>
                </div>

                {/* REQUESTER */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    background: "#EFF6FF",
                    padding: "18px",
                    borderRadius: "16px",
                    alignItems: "center",
                    border: "1px solid #DBEAFE",
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: "50%",
                      background: "#DBEAFE",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 30,
                    }}
                  >
                    🩸
                  </div>

                  <div>
                    <h4
                      style={{
                        color: "#2563EB",
                        fontWeight: 800,
                        marginBottom: 8,
                      }}
                    >
                      For Requesters
                    </h4>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.6,
                      }}
                    >
                      Create an emergency request and instantly connect with
                      verified nearby donors when every second matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          className="reveal"
          style={{
            background: "#ffffff",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <div
            className="stats-row"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="stat-block">
                <div className="stat-num">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="reveal"
          style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div
              style={{
                display: "inline-block",
                background: "#E0F2FE",
                border: "1px solid #BAE6FD",
                borderRadius: 100,
                padding: "5px 16px",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 13, color: "#0369A1", fontWeight: 600 }}>
                Simple process
              </span>
            </div>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: "-0.8px",
                color: "#0A2540",
              }}
            >
            <h1 className="text-4xl font-bold">
      HOW <span className="text-red-500">RED</span>
      <span className="text-black">LINK</span> Works 
    </h1> 
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#64748B",
                marginTop: 12,
                maxWidth: 480,
                margin: "12px auto 0",
              }}
            >
              From sign-up to saving a life — four straightforward steps.
            </p>
          </div>

          <div className="steps-grid" style={{ display: "flex", gap: 20 }}>
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="step-card reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#F0F7FF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 16,
                    border: "1.5px solid #BAE6FD",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#0077B6",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Step {i + 1}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0A2540",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
              style={{ fontSize: 16, padding: "16px 36px" }}
            >
              Get started — it's free
            </button>
          </div>
        </section>

        {/* BLOOD GROUPS */}
        <section
          id="blood-groups"
          className="reveal"
          style={{
            background: "#ffffff",
            borderTop: "1px solid #E2E8F0",
            padding: "72px 40px",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "-0.6px",
                color: "#0A2540",
                marginBottom: 12,
              }}
            >
              All blood groups covered
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", marginBottom: 40 }}>
              Whether you're A+ or AB−, there's always someone who needs your
              type.
            </p>
            <div
              className="blood-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: 12,
              }}
            >
              {bloodGroups.map((bg) => (
                <div key={bg} className="blood-pill">
                  {bg}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 24 }}>
              O− is the universal donor · AB+ is the universal recipient
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          className="reveal"
          style={{
            padding: "80px 40px",
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
          <h2
            style={{
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: "-0.8px",
              marginBottom: 16,
              color: "#0A2540",
            }}
          >
            Ready to make a difference?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748B",
              marginBottom: 36,
              lineHeight: 1.65,
            }}
          >
            Join RedLink today. Complete your profile, add your blood group, and
            start receiving alerts when someone near you needs help.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
              style={{ fontSize: 16, padding: "16px 36px" }}
            >
              Create your account
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/login")}
              style={{ fontSize: 16, padding: "16px 36px" }}
            >
              Already a member? Log in
            </button>
          </div>
        </section>
{/* FOOTER */}                           
<footer style={{ background: "#111", color: "#fff", padding: "60px 40px 0" }}>
  
  {/* Top section */}
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap", justifyContent: "space-between", paddingBottom: 48, borderBottom: "2px solid #0077B6" }}>
      
      {/* Brand */}
      <div style={{ maxWidth: 280 }}>  
         <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
  <div style={{ width:40, height:40, background:"#C8102E", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M12 3C12 3 6 10 6 14.5a6 6 0 0012 0C18 10 12 3 12 3z" fill="#fff" opacity="0.95"/>
      <path d="M9.5 14.5a2.5 2.5 0 005 0" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
  <div>
    <div style={{ display:"flex", alignItems:"center", lineHeight:1 }}>
      <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:900, fontSize:24, color:"#C8102E", letterSpacing:3, textTransform:"uppercase" }}>RED</span>
      <div style={{ width:2, height:22, background:"#C8102E", margin:"0 5px", borderRadius:1, opacity:0.5 }}></div>
      <span style={{ fontFamily:"'Barlow',sans-serif", fontWeight:900, fontSize:24, color:"#fff", letterSpacing:3, textTransform:"uppercase" }}>LINK</span>
    </div>  
    <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:10, fontWeight:600, color:"#555", letterSpacing:"0.3em", textTransform:"uppercase", marginTop:3 }}>Blood Donor Network</div>
  </div>
</div>            
<p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>
          Connecting blood donors with people in need — fast, free, and built to save lives.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {["💬", "📧", "📱"].map((icon, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a1a", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#C8102E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>Quick Links</p>
        {[
          { label: "Home", path: "/" },
          { label: "Find Blood", path: "/request" }, 
          { label: "Create Request", path: "/request" },
          { label: "My Profile", path: "/profile" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)} style={{ display: "block", background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer", marginBottom: 12, padding: 0, textAlign: "left", fontFamily: "inherit", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Account */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#C8102E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>Account</p>
        {[
          { label: "Register", path: "/register" },
          { label: "Log In", path: "/login" },
          { label: "Forgot Password", path: "/forgot-password" },
        ].map(({ label, path }) => (
          <button key={label} onClick={() => navigate(path)} style={{ display: "block", background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer", marginBottom: 12, padding: 0, textAlign: "left", fontFamily: "inherit", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Blood groups */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#C8102E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>Blood Groups</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
          {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((bg) => (
            <span key={bg} style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>{bg}</span>
          ))}
        </div>
        <div style={{ marginTop: 24, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "14px 16px" }}>
          <p style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Emergency helpline</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#C8102E" }}>108 · Blood Bank</p>
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", flexWrap: "wrap", gap: 12 }}>
      <p style={{ fontSize: 12, color: "#555" }}>© {new Date().getFullYear()} RedLink. All rights reserved.</p>
      <p style={{ fontSize: 12, color: "#555" }}>Built to save lives · Free forever · Made with ❤️</p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Privacy Policy", "Terms of Service"].map((item) => (
          <span key={item} style={{ fontSize: 12, color: "#555", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >{item}</span>
        ))}
      </div>
    </div>
  </div>
</footer> 
      </div>
    </div>
  );
}
