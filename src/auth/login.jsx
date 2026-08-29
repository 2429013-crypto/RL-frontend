import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimage from "../assets/loginimage.png";
import { BACKEND_BASE_URL } from "../../config";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfAlreadyLoggedIn() {
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          console.log(
            "Navigating to:",
            data.user?.isOnboarded ? "/request" : "/profile",
          );
          if (data.user?.isOnboarded) {
            navigate("/request");
          } else {
            navigate("/profile");
          }
        }
      } catch (err) {
        console.error("checkIfAlreadyLoggedIn error:", err);
      }
    }
    checkIfAlreadyLoggedIn();
  }, []);
  // Handle Login API Request
  async function handleLogin() {
    setErrors({});

    // email validation
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    //password validation
    if (!password.trim()) {
      setErrors({ password: "Password is required" });
      return;
    }

    if (password.length < 6) {
      setErrors({
        password: "Password must be at least 6 characters long",
      });
      return;
    }

    console.log("Attempting logins...");
    // If validation passes, proceed with API call
    try {
      setLoading(true);

      console.log("Backend URL:", BACKEND_BASE_URL);
      console.log("Login URL:", `${BACKEND_BASE_URL}/api/auth/login`);

      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("STATUS:", response.status);

      let data = {};

      try {
        const text = await response.text();

        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      } catch {
        data = { message: "Server returned invalid JSON" };
      }

      console.log("Response Data:", data);
      console.log("Login response:", data);
      if (response.ok) {
        alert(data.message);

        if (data.user.isOnboarded) {
          navigate("/request");
        } else {
          navigate("/profile");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-rose-50 to-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-md h-112 bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="max-w-362.5 mx-auto relative">
        {/* Navbar */}
        <Navbar variant="public" />

        {/* Main Section */}

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)] items-stretch pt-8">
          {/* Left Section */}

          <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-16 pt-12 pb-0">
            {/* Heading */}
            <h1 className="text-4xl font-black text-gray-900 leading-[1.05]">
              Welcome Back
            </h1>
            <h1 className="text-4xl font-black text-red-600 leading-tight mt-1">
              Let's continue
            </h1>
            <h1 className="text-4xl font-black text-red-600 leading-tight">
              saving lives.
            </h1>

            <p className="text-gray-600 mt-5 text-base max-w-md leading-relaxed">
              Sign in to your account and stay connected to help those who need
              blood.
            </p>

            {/* 3 Feature Cards */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md border border-red-100 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Find donors instantly
                  </p>
                  <p className="text-gray-700 text-sm mt-0.5">
                    Connect with blood donors near you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md border border-red-100 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Real-time alerts</p>
                  <p className="text-gray-700 text-sm mt-0.5">
                    Get notified for urgent blood requests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md border border-red-100 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Safe & trusted</p>
                  <p className="text-gray-700 text-sm mt-0.5">
                    A secure platform for donors and recipients.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-red-100">
              <div className="text-red-500 text-2xl mb-2">"</div>
              <p className="text-gray-700 text-sm leading-relaxed italic">
                Every blood donor is a lifesaver. Your one donation can save up
                to three lives.
              </p>
              <p className="text-red-500 text-xs font-semibold mt-3">
                — World Health Organization
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center mt-6">
              <img
                src={loginimage}
                alt="Blood Donation"
                className="w-130 xl:w-140 2xl:w-150 object-contain mx-auto"
              />
            </div>
          </div>

          {/* Right Section */}

          <div className="lg:w-[55%] flex items-center justify-center px-12 py-10 pb-0">
            <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-3xl p-12 w-full max-w-2xl border border-gray-100">
              {/* Top Icon */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Sign in to your REDLINK account
                </p>
              </div>

              {/* Email */}
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-400 rounded-2xl py-4 pl-11 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
              )}

              {/* Password */}
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 mt-5">
                Password
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
                  className="w-full border border-gray-400 rounded-2xl py-4 pl-11 pr-11 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-red-600 text-sm font-semibold hover:text-red-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={!email.trim() || !password.trim() || loading}
                className={`w-full py-4 rounded-xl text-base font-bold mt-5 text-white transition-all flex items-center justify-center gap-2 ${
                  !email.trim() || !password.trim() || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {loading ? "Logging In..." : "Login"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Register */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-red-600 font-bold cursor-pointer hover:text-red-700"
                >
                  Register
                </span>
              </p>

              {/* Bottom Info */}

              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                  What's inside
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
                  <span>🩸</span>
                  <p className="text-xs font-semibold text-gray-600">
                    Active blood requests
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
                  <span>⚡</span>
                  <p className="text-xs font-semibold text-gray-600">
                    Urgent alerts near you
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
                  <span>🤝</span>
                  <p className="text-xs font-semibold text-gray-600">
                    Donors waiting to help
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
                  <span>✅</span>
                  <p className="text-xs font-semibold text-gray-600">
                    Your impact dashboard
                  </p>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs text-gray-400">
                  🔒 Your data is safe and secure with REDLINK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
