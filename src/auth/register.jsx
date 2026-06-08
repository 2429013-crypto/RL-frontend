import states from "./states.json";
import blood from "../assets/bloodicon.png";
import care from "../assets/care.png";
import { useState, useEffect } from "react";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  const [showOTP, setShowOTP] = useState(false);
  function toggleOTP() {
    setShowOTP(!showOTP);
  }
  const [timer, setTimer] = useState(600); // 10 minutes
  const [otpSent, setOtpSent] = useState(false);
   useEffect(() => {  
    // useEffect() runs whenever one of its dependencies changes like the OTP sent or the timer    
    let interval;

    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1); 
      }, 1000);  
    }

    return () => clearInterval(interval);
  }, [otpSent, timer]);
  function handleSendOTP() {
    alert("OTP sent successfully!");
    setOtpSent(true);
    setTimer(600);                                          
  }  

  function handleRegister() { 
 alert("Registration Successful!");
  }

  return (
    <div className="min-h-screen  bg-red-50">
      <nav className="bg-white px-10 py-5 flex justify-between">
        <h1 className=" text-4xl font-bold">
          Red<span className="text-red-600">Link</span>
        </h1> 
      </nav>
      {/* Main Section */}
      <div className="flex mt-8 mb-2">
        {/*  Left Section */}
        <div className="w-1/2 p-16">
          <h1 className="text-3xl font-bold ">
            Be a<span className="text-red-500"> Life Saver </span>
          </h1>
          <h2 className="text-xl font-bold mt-1">Save Lives, Donate Blood</h2>
          <p className="text-gray-600 text-1xl mt-3">
            Join our community of heroes and help make a difference in the
            world. Sign up now to start your journey as a hero!
          </p>
          <img src={blood} alt="Blood Donation" className="w-25  mx-auto mb-8" />
          <div
            className="bg-red-100 rounded-3xl shadow-lg p-8 w-112.5 mt-10"
          >
            <img src={care} alt="Security" className="w-500px] mx-auto mb-10" />

            <h2 className="font-bold text-lg">
              Your information is safe with us 
            </h2>

            <p className="text-gray-500 text-lg mt-3"> 
              We use advanced security to protect your data and privacy.
            </p> 
          </div>  
        </div>
        {/* Right Section */}
        <div className="w-1/2 flex justify-center">
          <div className="bg-white shadow-xl rounded-3xl  p-10 w-162.5">
            <h1 className="text-5xl font-bold">SIGN UP</h1>
            <p className="text-gray-500 mt-3 mb-5">
              Fill in the details below to register
            </p>

            <div className="flex  mt-3 justify-between items-center">
              <div className="flex flex-col w-[80%]">
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
                    type="text"
                    placeholder="Enter Your Email"
                    className=" w-full border rounded-xl p-4 pl-12"
                  />
                </div>
              </div>
              {/* Send OTP Button */}

              <button
                onClick={handleSendOTP}
                className="
        bg-red-600
      text-white        
      p-2                                                                                      
      rounded-xl      
     text-lg   
mt-5    
      hover:bg-red-700 
      transition"
              >
                SEND OTP
              </button>
            </div>

            {/* OTP Input */}
            <div className="flex flex-col mb-5 mt-5">
              <label className="font-bold">OTP Verification</label>
              <div className="relative mt-5">
                <input
                  type={showOTP ? "text" : "password"}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  pattern="[0-9]*"
                  className="
        w-full
        border 
        rounded-xl   
        p-3 
        pr-12 
        "
                />

                <i
                  className={
                    showOTP
                      ? "fa-solid fa-eye-slash absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      : "fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  }
                  onClick={toggleOTP}
                ></i>
              </div>
              {otpSent && (
                <p className="text-red-600 text-sm">
                  OTP expires in :{Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              )}
            </div>

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
                className="      
        w-full 
        border
     rounded-xl                                   
        p-4             
        pl-12"
              />
            </div>

            <label className="font-bold">Password</label>

            <div className="relative  mt-5 mb-5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className="flex gap-4 mt-5">
              {/* State */}
              <div className="relative flex-1">
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

              {/* District */}
              <div className="relative flex-1">
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

              {/* Pincode */}
              <div className="relative flex-1">
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
                  className="
            w-full
            border
            rounded-lg
            p-3
            pl-12"
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleRegister}
                className=" 
      bg-red-600
      text-white       
      w-full              
    py-5
      rounded-xl      
    text-2xl 

    mt-8 
      hover:bg-red-700
      transition"
              >
                <i className="fa-solid fa-user-plus"></i>
                REGISTER
              </button>
            </div>
            <p className="flex justify-center mt-4"> 
              Already have an account? 
              <span className="text-red-600 font-bold ml-2 cursor-pointer hover:bg-red-300 transition">
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
