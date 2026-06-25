import { useNavigate } from "react-router-dom";
import care from "../assets/care.png";
import { useState, useEffect, useRef } from "react";
import { BACKEND_BASE_URL } from "../../config";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(180);
  const [resendTimer, setResendTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});

  const hasUserStartedTyping = email || password || otp;

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  useEffect(() => {
    let interval;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  async function handleSendOTP() {
    if (!email.trim()) { alert("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { alert("Please enter a valid email address"); return; }
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "OTP sent successfully!");
        setOtpSent(true);
        setTimer(180);
        setResendTimer(30);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch {
      alert("Something went wrong!");
    }
  }

  async function handleVerifyOTP() {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.verificationToken);
        alert(data.message || "OTP verified successfully!");
        setOtpVerified(true);
        setOtpSent(false);
        setTimer(0);
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch {
      alert("Something went wrong!");
    }
  }

  async function handleRegister() {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!otp.trim()) newErrors.otp = "OTP is required";
    if (!otpVerified) newErrors.otp = "Please verify your OTP first";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!/^[a-zA-Z0-9]+$/.test(password)) newErrors.password = "Only letters and numbers allowed";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    if (!token) { alert("Please verify OTP first."); return; }

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, verificationToken: token }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful! Please login to continue.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* NAV */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm border-b border-gray-100">
        <h1 className="text-4xl font-bold">
          <span className="text-red-500">RED</span>
          <span className="text-black">LINK</span>
          <p className="text-gray-600 text-sm mt-1">Blood Donor Network</p>
        </h1>
      </nav>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        {/* LEFT */}
        <div className="hidden lg:flex lg:w-[45%] flex-col justify-center px-12 py-10 bg-red-50">
          <div>
            <h1 className="text-5xl font-bold">
              Be a <span className="text-red-500">Life Saver</span>
            </h1>
            <h2 className="text-xl font-bold mt-2 text-gray-700">Save Lives, Donate Blood</h2>
            <p className="text-gray-500 mt-3 text-base leading-relaxed max-w-md">
              Join our community of heroes and help make a difference in the world.
              Sign up now to start your journey as a hero!
            </p>
          </div>

          {/* Illustration in light red box */}
          {/* <div className="bg-red-100 rounded-3xl shadow-md p-6 flex justify-center"> */}
          <img src={care} alt="Donate Blood" className="w-56" />
          {/* // </div> */}

          {/* 3 Steps */}
          <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
            <p className="font-bold text-sm text-gray-800 mb-4">🚀 How It Works — 3 Simple Steps</p>
            {[
              { num: 1, title: "Create Your Account", desc: "Register with your email, verify with OTP and set a secure password." },
              { num: 2, title: "Complete Your Profile", desc: "Add your blood group, health info and location so we can match you with requests." },
              { num: 3, title: "Start Saving Lives", desc: "Receive emergency alerts nearby and respond to blood donation requests instantly." },
            ].map(({ num, title, desc }, i, arr) => (
              <div key={num}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-sm">
                    {num}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="w-px h-4 bg-red-100 ml-4 my-3" />}
              </div>
            ))}
          </div>

          {/* Why Join */}
          <div className="grid grid-cols-2 mt-3 gap-3">
            {[
              ["📍", "Find nearby blood requests"],
              ["🔔", "Get emergency notifications"],
              ["🕐", "Track your donation history"],
              ["❤️", "Help save lives in your community"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-red-100">
                <span className="text-lg">{icon}</span>
                <span className="text-sm text-gray-600 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-[55%] flex items-center justify-center px-12 py-10">
          <div className="bg-white shadow-xl rounded-3xl p-12 w-full max-w-2xl border border-gray-100">
            <h1 className="text-4xl font-bold text-red-600">SIGN UP</h1>
            <p className="text-gray-500 mt-2 mb-6 text-sm">Fill in the details below to register</p>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-droplet text-red-500"></i>
                Join the RedLink Community
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Register today and help connect blood donors with patients in need.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-5">
              <div className="flex flex-col w-full">
                <label className="font-bold mb-2">Email</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    disabled={otpVerified}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                    className={`w-full border rounded-xl p-3.5 pl-11 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 ${otpVerified ? "bg-gray-100 cursor-not-allowed text-gray-400" : "border-gray-200"}`}
                  />
                </div>
              </div>
              {!otpSent && !otpVerified && (
                <button
                  onClick={handleSendOTP}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition whitespace-nowrap mt-6"
                >
                  <i className="fa-solid fa-paper-plane"></i> SEND OTP
                </button>
              )}
            </div>
            {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email}</p>}

            {/* OTP — only shows after Send OTP clicked */}
            {(otpSent || otpVerified) && (
              <div className="mb-5">
                <label className="font-bold block mb-2">OTP Verification</label>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ""}
                        disabled={otpVerified}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, "");
                          let newOtp = otp.split("");
                          newOtp[index] = value;
                          setOtp(newOtp.join(""));
                          setErrors((p) => ({ ...p, otp: "" }));
                          if (value && index < 5) otpRefs.current[index + 1].focus();
                        }}
                        onKeyDown={(e) => { if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1].focus(); }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
                          setOtp(pasted);
                          if (otpRefs.current[pasted.length - 1]) otpRefs.current[pasted.length - 1].focus();
                        }}
                        className={`w-11 h-11 border rounded-lg text-center text-lg font-bold focus:outline-none focus:border-red-400 transition
                          ${otpVerified ? "bg-green-50 border-green-400 text-green-600" : "border-gray-200"}`}
                      />
                    ))}
                  </div>
                  {!otpVerified && otpSent && (
                    <button
                      onClick={handleVerifyOTP}
                      className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition"
                    >
                      VERIFY OTP
                    </button>
                  )}
                  {otpVerified && (
                    <span className="ml-2 text-green-600 text-sm font-bold">✓ Verified</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400 text-xs">Enter the 6-digit code sent to your email</p>
                  {otpSent && !otpVerified && (
                    <button
                      onClick={handleSendOTP}
                      disabled={resendTimer > 0}
                      className={`text-xs font-semibold ${resendTimer > 0 ? "text-gray-400" : "text-red-500 hover:underline"}`}
                    >
                      {resendTimer > 0
                        ? `Resend in 00:${String(resendTimer).padStart(2, "0")}`
                        : "Resend OTP"}
                    </button>
                  )}
                </div>
                {otpSent && !otpVerified && (
                  <p className="text-red-500 text-xs mt-1">
                    OTP expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                  </p>
                )}
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
            )}

            {/* Password */}
            <div className="mb-5">
              <label className="font-bold block mb-2">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                  className="w-full border border-gray-200 rounded-xl p-3.5 pl-11 pr-11 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                ></i>
              </div>
              <p className="text-gray-400 text-xs mt-1">⚠️ Min 6 characters — letters or numbers only</p>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            {/* Security note */}
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 mb-5">
              <span className="text-red-400 mt-0.5">🛡️</span>
              <p className="text-xs text-gray-500">Your information is securely stored and used only for blood donation purposes.</p>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={!hasUserStartedTyping}
              className={`w-full py-4 rounded-xl text-lg font-bold transition ${hasUserStartedTyping
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <i className="fa-solid fa-user-plus mr-2"></i>
              REGISTER
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              By creating an account, you agree to our{" "}
              <span className="text-red-500 font-semibold cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-red-500 font-semibold cursor-pointer">Privacy Policy</span>
            </p>

            {/* Already have account — bottom */}
            <p className="flex justify-center mt-5 text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-red-600 font-bold ml-2 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register; 