import states from "./states.json";
import { useNavigate } from "react-router-dom";
import blood from "../assets/bloodicon.png";
import care from "../assets/care.png";
import { useState, useEffect, useRef } from "react";
import { BACKEND_BASE_URL } from "../../config";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  const [showOTP, setShowOTP] = useState(false);
  function toggleOTP() {
    setShowOTP(!showOTP);
  }
  const [timer, setTimer] = useState(180); // OTP expires after 3 minutes
  const [resendTimer, setResendTimer] = useState(30); // Resend cooldown
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const hasUserStartedTyping =
    email || password || otp || phone || selectedState || district || pincode;
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // useEffect() runs whenever one of its dependencies changes like the OTP sent or the timer
    let interval;

    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        // OTP expiry timer

        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpSent, timer]);
  useEffect(() => {
    // Resend button timer
    let interval;

    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  // API calling for handleSendOTP
  async function handleSendOTP() {
    try {
      if (!email.trim()) {
        alert("Email is required");
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log("RESPONSE :: ", response);

      const data = await response.json();
      // const text = await response.text();
      // console.log("Response body:", text);

      if (response.ok) {
        alert(data.message || "OTP sent successfully!");
        setOtpSent(true);
        setTimer(180); // expires OTP after every 3 min
        setResendTimer(30); // Resend enabled after 30 sec
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong!");
    }
  }
  // API calling for handleVerifyOTP
  async function handleVerifyOTP() {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      console.log("RESPONSE :: ", response);

      const data = await response.json();
      console.log("VERIFY OTP DATA:", JSON.stringify(data));
      // const text = await response.text();
      // console.log("Response body:", text);

      if (response.ok) {
        // localStorage.setItem("registerToken", data.token);

        setToken(data.verificationToken);
        alert(data.message || "OTP verified successfully!");
        setOtpVerified(true);
        setOtpSent(false);
        setTimer(0);
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong!");
    }
  }
  {
    /*API calling for handling registration */
  }
  async function handleRegister() {
    let newErrors = {};
    // validation code ...
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!selectedState) {
      newErrors.state = "Please select a state";
    }

    if (!district) {
      newErrors.district = "Please select a district";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    // const token = localStorage.getItem("registerToken");
    // check whether the OTP token exists

    if (!token) {
      alert("Please verify OTP first.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          phoneNumber: phone,
          password,
          state: selectedState,
          districtName: district,
          pinCode: pincode,
          verificationToken: token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
        // Optional: remove token after successful registration
        localStorage.removeItem("registerToken");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen  bg-red-50">
      <nav className="bg-white px-4 sm:px-10 py-5 flex justify-between items-center shadow-md">
        <h1 className=" text-4xl font-bold">
          <span className="text-red-500">RED</span>
          <span className="text-black">LINK</span>
          <p className="text-gray-600 text-sm mt-1">Blood Donor Network </p>
        </h1>
      </nav>
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row mt-8 mb-2">
        {/*  Left Section */}
        <div className="hidden lg:block lg:w-1/2 p-8 lg:p-16">
          <h1 className="text-5xl font-bold ">
            Be a<span className="text-red-500"> Life Saver </span>
          </h1>
          <h2 className="text-xl font-bold mt-1">Save Lives, Donate Blood</h2>
          <p className="text-gray-600 text-1xl mt-3">
            Join our community of heroes and help make a difference in the
            world. Sign up now to start your journey as a hero!
          </p>
          <img
            src={blood}
            alt="Blood Donation"
            className="w-24 sm:w-32 mx-auto mb-8"
          />
          <div className="bg-red-100 rounded-3xl shadow-lg p-8 w-full max-w-md mt-10 mx-auto">
            <img
              src={care}
              alt="Security"
              className="w-full max-w-sm mx-auto mb-10"
            />
            <h2 className="font-bold text-lg">
              Your information is safe with us
            </h2>

            <p className="text-gray-500 text-lg mt-3">
              We use advanced security to protect your data and privacy.
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center px-4">
          <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold text-red-600">
              SIGN UP
            </h1>
            <p className="text-gray-500 mt-3 mb-5">
              Fill in the details below to register
            </p>

            <div className="flex flex-col sm:flex-row mt-3 gap-4 items-start sm:items-center">
              <div className="flex flex-col w-full">
                {/* Email */}

                <label className="font-bold">Email</label>
                <div className="relative mt-3 gap-2 w-full">
                  <i
                    className="  
            fa-solid fa-envelope
           absolute
            left-4 
            top-1/2                                     
            -translate-y-1/2
            text-gray-500"
                  ></i>
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={email}
                    disabled={otpVerified}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                    className={`w-full border rounded-xl p-4 pl-12 ${
                      otpVerified ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </div>
              {/* Send OTP Button */}

              {!otpSent && !otpVerified && (
                <button
                  onClick={handleSendOTP}
                  className="bg-red-600 cursor-pointer text-white p-2 rounded-xl text-sm mt-5 hover:bg-red-700 transition"
                >
                  SEND OTP
                </button>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 cursor-pointer text-sm mt-1">
                {errors.email}
              </p>
            )}

            {/* OTP Input */}
            <div className="flex flex-col sm:flex-row my-5 gap-4">
              <div className="flex flex-col w-full">
                <label className="fSont-bold">OTP Verification</label>

                <div className="mt-3">
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

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  }}
  onKeyDown={(e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1].focus();
    }
  }}
  onPaste={(e) => {
    e.preventDefault(); 

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    setOtp(pastedData);

    const lastIndex = pastedData.length - 1;
    if (otpRefs.current[lastIndex]) {
      otpRefs.current[lastIndex].focus();
    }
  }}
  className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-lg text-center text-lg sm:text-xl ${
    otpVerified ? "bg-gray-100 cursor-not-allowed" : ""
  }`}
/>
                    ))}
                  </div>

                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:w-40">
                {!otpVerified && otpSent && (
                  <button
                    onClick={handleVerifyOTP}
                    className="bg-green-600 cursor-pointer text-white p-2 rounded-xl text-sm hover:bg-green-700 transition"
                  >
                    VERIFY OTP
                  </button>
                )}

                {!otpVerified && otpSent && (
                  <button
                    onClick={handleSendOTP}
                    disabled={resendTimer > 0}
                    className={`p-2 cursor-pointer rounded-xl text-sm transition ${
                      resendTimer > 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {resendTimer > 0
                      ? `RESEND OTP (${resendTimer}s)`
                      : "RESEND OTP"}
                  </button>
                )}
              </div>
            </div>
            {/* {otpSent && (                                   
                <p className="text-red-600 text-sm">
                  OTP expires in :{Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              )}   */}
            {otpSent && !otpVerified && (
              <p className="text-red-600 text-sm mt-2">
                OTP expires in : {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, "0")}
              </p>
            )}
            {/*API calling for Phone Number*/}
            <label className="font-bold">Phone Number</label>
            <div className="relative mt-5 mb-5">
              <i
                className="
        fa-solid fa-phone 
        absolute
        left-4
        top-1/2 
        -translate-y-1/2
        text-gray-500"
              ></i>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    phone: "",
                  }));
                }}
                className="w-full border rounded-xl p-4 pl-12"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}

            <label className="font-bold">Password</label>

            <div className="relative  mt-5 mb-5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
                className="w-full border rounded-lg p-3 pr-12"
              />

              <i
                className={
                  showPassword
                    ? "fa-solid fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    : "fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                }
                onClick={togglePassword}
              ></i>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm ">{errors.password}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mt-5">
              {/* State */}
              <div className="flex-1 flex-col">
                <div className="relative">
                  <i
                    className="
                     fa-solid fa-map
                     absolute
                    left-4
                     top-1/2
                   -translate-y-1/2
                   text-gray-500"
                  ></i>

                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        state: "",
                      }));
                    }}
                    className="                                                    
                       w-full
                 border
                  rounded-lg
                      p-3
                     pl-12"
                  >
                    <option value="">Select State</option>

                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* District */}
              <div className="flex-1 flex-col">
                <div className="relative">
                  <i
                    className="
            fa-solid fa-city
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-500"
                  ></i>

                  <select
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        district: "",
                      }));
                    }}
                    className="
    w-full
    border
    rounded-lg
    p-3
    pl-12"
                  >
                    <option value="">Select District</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>

                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
              </div>

              {/* Pincode */}
              <div className="flex-1 flex-col">
                <div className="relative">
                  <i
                    className=" 
            fa-solid fa-location-dot
            absolute                               
            left-4 
            top-1/2
            -translate-y-1/2
            text-gray-500"
                  ></i>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        pincode: "",
                      }));
                    }}
                    className="
    w-full
    border
    rounded-lg
    p-3
    pl-12"
                  />
                </div>

                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleRegister}
                disabled={!hasUserStartedTyping}
                className={`w-full py-4 sm:py-5 rounded-xl text-xl sm:text-2xl mt-8 text-white transition
      ${
        hasUserStartedTyping
          ? "bg-red-600 hover:bg-red-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
              >
                <i className="fa-solid fa-user-plus"></i>
                REGISTER
              </button>
            </div>
            <p className="flex flex-wrap justify-center mt-4 text-center">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-red-600 font-bold ml-2 cursor-pointer hover:bg-red-300 transition"
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
