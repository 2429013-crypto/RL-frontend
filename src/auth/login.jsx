import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import handsymbol from "../assets/handsymbol.png";
import { BACKEND_BASE_URL } from "../../config";

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
          console.log("Navigating to:", data.user?.isOnboarded ? "/request" : "/profile");  
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
    <div className="min-h-screen bg-red-50">
      {/* Navbar */}

      <nav className="bg-white px-8 py-5 border-b border-red-100 shadow-md">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">
            <span className="text-red-500">RED</span>
            LINK
          </h1>

          <p className="ml-4 text-gray-600">Save Lives, Donate Blood</p>
        </div>
      </nav>

      {/* Main Section */}

      <div className="flex flex-col lg:flex-row mt-8 mb-2">
        {/* Left Section */}

        <div className="hidden lg:block lg:w-1/2 p-8 lg:p-16">
          <p className="text-red-500 font-bold tracking-wider">WELCOME BACK</p>

          <h1 className="text-5xl font-bold mt-5">Save Lives</h1>

          <h1 className="text-5xl font-bold text-red-600">Together</h1>

          <p className="text-gray-600 mt-8 text-base max-w-md">
            Sign in to continue helping donors and patients through REDLINK.
          </p>

          <div className="bg-red-100 rounded-3xl p-8 mt-12 shadow-md">
            <img
              src={handsymbol}
              alt="Blood Donation"
              className="w-64 mx-auto"
            />
          </div>
        </div>

        {/* Right Section */}

        <div className="w-full lg:w-1/2 flex justify-center px-4">
          <div className="bg-white border border-red-100 shadow-lg rounded-3xl p-10 w-full max-w-2xl">
            <h1 className="text-5xl font-bold text-red-500">Login</h1>

            <p className="text-gray-500 mt-3">
              Welcome back! Please enter your credentials to continue.
            </p>

            {/* Email */}

            <label className="block mt-10 font-bold">Email Address</label>

            <div className="relative mt-3">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
                placeholder="Enter your email address"
                className="w-full border border-black rounded-xl p-4 pl-12 text-black focus:outline-none focus:border-black"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            {/* Password */}

            <label className="block mt-6 font-bold">Password</label>

            <div className="relative mt-3">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
                placeholder="Enter your password"
                className="w-full border border-black rounded-xl p-4 pl-12 text-black focus:outline-none focus:border-black"
              />

              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {/* Forgot Password */}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => alert("Forgot Password Clicked")}
                className="text-red-600 font-medium hover:text-red-700"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim() || loading}
              className={`w-full py-4 rounded-xl text-xl mt-6 text-white transition ${
                !email.trim() || !password.trim() || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loading ? "Logging In..." : "LOGIN"}
            </button>

            {/* Register */}

            <p className="flex justify-center mt-6">
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-red-600 font-bold ml-2 cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
