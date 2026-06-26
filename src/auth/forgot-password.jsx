import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const otpRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setStep(2);
      } else {
        setErrors({ email: data.message });
      }
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.verificationToken);
        setStep(3);
      } else {
        setErrors({ otp: data.message });
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!password) newErrors.password = "Password is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!/^[a-zA-Z0-9]+$/.test(password)) newErrors.password = "Password can only contain letters and numbers";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          verificationToken: token,
          newPassword: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password reset successfully. Please login with your new password.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Reset password failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white px-8 py-5 border-b border-red-100 shadow-md">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold cursor-pointer" onClick={() => navigate("/login")}>
            <span className="text-red-500">RED</span>LINK
          </h1>
          <p className="ml-4 text-gray-600 hidden sm:block">Save Lives, Donate Blood</p>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="bg-white border border-red-100 shadow-lg rounded-3xl p-10 w-full max-w-lg">
          
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <h1 className="text-4xl font-bold text-red-500">Forgot Password</h1>
              <p className="text-gray-500 mt-3">
                Enter your registered email address, and we'll send you an OTP to reset your password.
              </p>

              <label className="block mt-8 font-bold">Email Address</label>
              <div className="relative mt-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border border-black rounded-xl p-4 text-black focus:outline-none focus:border-red-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold p-4 rounded-xl mt-8 hover:bg-red-700 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <h1 className="text-4xl font-bold text-red-500">Verify OTP</h1>
              <p className="text-gray-500 mt-3">
                We've sent a 6-digit OTP code to <strong className="text-slate-800">{email}</strong>.
              </p>

              <label className="block mt-8 font-bold text-center">Enter 6-Digit OTP</label>
              <div className="flex gap-2 justify-center mt-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      let newOtp = otp.split("");
                      newOtp[index] = value;
                      setOtp(newOtp.join(""));
                      setErrors((p) => ({ ...p, otp: "" }));
                      if (value && index < 5) otpRefs.current[index + 1].focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        otpRefs.current[index - 1].focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
                      setOtp(pasted);
                      if (otpRefs.current[pasted.length - 1]) {
                        otpRefs.current[pasted.length - 1].focus();
                      }
                    }}
                    className="w-12 h-12 border border-black rounded-lg text-center text-xl font-bold focus:outline-none focus:border-red-500 transition"
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-2 text-center">{errors.otp}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold p-4 rounded-xl mt-8 hover:bg-red-700 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <h1 className="text-4xl font-bold text-red-500">Reset Password</h1>
              <p className="text-gray-500 mt-3">
                Choose a new secure password for your account.
              </p>

              <label className="block mt-8 font-bold">New Password</label>
              <div className="relative mt-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-black rounded-xl p-4 text-black focus:outline-none focus:border-red-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              <label className="block mt-6 font-bold">Confirm New Password</label>
              <div className="relative mt-3">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-black rounded-xl p-4 text-black focus:outline-none focus:border-red-500"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold p-4 rounded-xl mt-8 hover:bg-red-700 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-gray-500 font-semibold hover:text-red-500 transition duration-200"
            >
              Back to Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
