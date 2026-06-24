import states from "./states.json";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });
        console.log("res", response);

        if (!response.ok) {
          navigate("/login");
          return;
        }
        const data = await response.json();
        console.log("Auth response:", data);
        //  if (data.user.isOnboarded) {
        //       navigate("/request");
        //     }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/login");
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    occupation: "",
    profilePhoto: null,
    address: "",
    city: "",
    state: "",
    pinCode: "",
    weight: "",
    medicalConditions: "",
    currentMedications: "",
    lastDonationDate: "",
    receiveAlerts: true,
    volunteerParticipation: false,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
        return;
      }

      const user = await response.json();

      // 👇 FETCH PROFILE AFTER AUTH
      const profileRes = await fetch(`${BACKEND_BASE_URL}/api/profile/me`, {
        credentials: "include",
      });

      if (profileRes.ok) {
        const profile = await profileRes.json();
        setIsEdit(true);

        setFormData({
          fullName: profile.fullName || "",
          dateOfBirth: profile.dateOfBirth || "",
          gender: profile.gender || "",
          bloodGroup: profile.bloodGroup || "",
          occupation: profile.occupation || "",
          profilePhoto: null, // file cannot be prefilled
          address: profile.address || "",
          city: profile.city || "",
          state: profile.state || "",
          pinCode: profile.pinCode || "",
          weight: profile.weight || "",
          medicalConditions: profile.medicalConditions || "",
          currentMedications: profile.currentMedications || "",
          lastDonationDate: profile.lastDonationDate || "",
          receiveAlerts: profile.receiveAlerts ?? true,
          volunteerParticipation: profile.volunteerParticipation ?? false,
        });

        if (profile.profilePhoto) {
          setPhotoPreview(profile.profilePhoto);
        }
      }
    } catch (error) {
      navigate("/login");
    }
  };

  checkAuth();
}, []);

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.keys(formData).filter((key) => {
    const value = formData[key];
    if (key === "profilePhoto") {
      return photoPreview !== null;
    }
    if (typeof value === "boolean") {
      return true;
    }
    return value !== "" && value !== null && value !== undefined;
  }).length;
  const progressPercentage = Math.round((filledFields / totalFields) * 100);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!photoPreview) {
      alert("Please upload a profile photo.");
      return;
    }

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("dateOfBirth", formData.dateOfBirth);
    payload.append("gender", formData.gender);
    payload.append("bloodGroup", formData.bloodGroup);
    payload.append("occupation", formData.occupation);
    if (formData.profilePhoto) {
      payload.append("profilePhoto", formData.profilePhoto);
    }
    payload.append("address", formData.address);
    payload.append("city", formData.city);
    payload.append("state", formData.state);
    payload.append("pinCode", formData.pinCode);
    payload.append("weight", formData.weight);
    payload.append("medicalConditions", formData.medicalConditions);
    payload.append("currentMedications", formData.currentMedications);
    payload.append("lastDonationDate", formData.lastDonationDate);
    payload.append("receiveAlerts", formData.receiveAlerts);
    payload.append("volunteerParticipation", formData.volunteerParticipation);

    try {
      const url = isEdit
        ? `${BACKEND_BASE_URL}/api/profile/update/me`
        : `${BACKEND_BASE_URL}/api/profile/create`;
      const method = isEdit ? "PUT" : "POST";

      console.log("Submitting to:", url);

      const response = await fetch(url, {
        method: method,
        credentials: "include",
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/request");
      } else if (data.message === "Profile already exists") {
        alert("You already have a profile.");
        navigate("/request");
      } else {
        alert(`Server error: ${data.message}`);
      }
    } catch (error) {
      console.error("Submit failed:", error);
      alert(`Network error: ${error.message}`);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [errors, setErrors] = useState({});

  const nextStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full Name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.bloodGroup)
        newErrors.bloodGroup = "Blood Group is required";
      if (!formData.occupation.trim())
        newErrors.occupation = "Occupation is required";
      if (!photoPreview)
        newErrors.profilePhoto = "Profile Photo is required";
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pinCode.trim()) newErrors.pinCode = "Pin Code is required";
    }

    if (currentStep === 3) {
      if (!formData.weight) newErrors.weight = "Weight is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementsByName(firstErrorField)?.[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* ── NAV ── */}
      <nav className="bg-white px-4 sm:px-10 py-5 flex justify-between items-center shadow-md relative">
        {/* Logo */}
        <h1 className="text-4xl font-bold">
          <span className="text-red-500">RED</span>
          <span className="text-black">LINK</span>
          <p className="text-gray-600 text-sm mt-1">Blood Donor Network</p>
        </h1>
        <div ref={dropdownRef} className="relative flex items-center gap-3">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome, {formData.fullName || "User"}</p>
              {progressPercentage < 100 && (
                <p className="font-semibold text-red-600 hover:underline">
                  Complete Your Profile
                </p>
              )}
            </div>
            <div
              className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-colors duration-200 ${
                dropdownOpen ? "border-red-500" : "border-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                />
              </svg>
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 top-14 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* settings icon svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </button>
              <div className="border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                {/* logout icon svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* ── END NAV ── */}

      {/* Hero / Progress */}
      <div className="max-w-5xl mx-auto text-center mb-10 mt-8 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold">
          <span className="text-red-600">Complete</span>{" "}
          <span className="text-gray-700">Your Profile</span>
        </h1>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-500 text-sm mt-3">
          Your information helps us connect the right people at the right time
          ❤️
        </p>

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800">
              Profile Completion
            </h3>
            <p className="text-sm text-gray-500">
              Complete your profile to help save lives during emergency
              situations
            </p>
            <div className="text-3xl font-bold text-red-600">
              {progressPercentage}%
            </div>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Stepper */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-5">
              {[1, 2, 3, 4].map((step) => (
                <div key={step}>
                  <div
                    onClick={() => {
                      if (isEdit || step < currentStep) setCurrentStep(step);
                    }}
                    className={`flex items-center gap-4 ${
                      isEdit || step < currentStep ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${
                          currentStep === step
                            ? "bg-red-600 text-white"
                            : currentStep > step
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {step}
                    </div>
                    <span>
                      {step === 1 && "Personal Information"}
                      {step === 2 && "Contact Details"}
                      {step === 3 && "Health Information"}
                      {step === 4 && "Preferences"}
                    </span>
                  </div>
                  {step !== 4 && (
                    <div className="h-10 border-l-2 border-gray-300 ml-5 my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step panels */}
          <div className="md:w-3/4">
            {/* Step 1 – Personal */}
            {currentStep === 1 && (
              <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                <h2 className="text-red-600 font-bold text-lg mb-6">
                  🩸 1. PERSONAL INFORMATION
                </h2>

                <div className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* DOB + Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Date of Birth
                      </label>
                      <input
                        className="w-full cursor-pointer p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Gender
                      </label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm">{errors.gender}</p>
                      )}
                    </div>
                  </div>

                  {/* Blood Group + Occupation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Blood Group
                      </label>
                      <select
                        className="w-full cursor-pointer p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ),
                        )}
                      </select>
                      {errors.bloodGroup && (
                        <p className="text-red-500 text-sm">
                          {errors.bloodGroup}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Occupation
                      </label>
                      <input
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="text"
                        name="occupation"
                        placeholder="eg: Software Developer"
                        value={formData.occupation}
                        onChange={handleChange}
                      />
                      {errors.occupation && (
                        <p className="text-red-500 text-sm">
                          {errors.occupation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="md:w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Profile Photo
                    </label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-200 rounded-xl p-5 cursor-pointer hover:bg-red-50 transition relative overflow-hidden">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-red-300 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setPhotoPreview(null);
                              setFormData((prev) => ({
                                ...prev,
                                profilePhoto: null,
                              }));
                              if (fileInputRef.current)
                                fileInputRef.current.value = "";
                            }}
                            className="absolute -top-2 -right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md hover:bg-red-700 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl mb-2">
                            👤
                          </div>
                          <span className="font-medium text-gray-700">
                            Upload Profile Photo
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            JPG, PNG (Max 5 MB)
                          </span>
                          <span className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
                            Choose File
                          </span>
                        </>
                      )}
                    </label>
                    {errors.profilePhoto && (
                      <p className="text-red-500 text-sm mt-2 text-center">
                        {errors.profilePhoto}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 – Contact */}
            {currentStep === 2 && (
              <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                <h2 className="text-blue-600 font-bold text-lg mb-6">
                  📍 2. CONTACT INFORMATION
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Address
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        name="address"
                        placeholder="Enter Your Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        City
                      </label>
                      <input
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="text"
                        name="city"
                        placeholder="Enter Your City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        State
                      </label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="text-red-500 text-sm">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Pin Code
                      </label>
                      <input
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="text"
                        name="pinCode"
                        placeholder="Enter the Pin Code"
                        value={formData.pinCode}
                        onChange={handleChange}
                      />
                      {errors.pinCode && (
                        <p className="text-red-500 text-sm">{errors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 – Health */}
            {currentStep === 3 && (
              <div className="bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5 border border-red-100">
                <h2 className="text-green-600 font-bold text-lg mb-4">
                  🏥 HEALTH INFORMATION
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Weight
                      </label>
                      <input
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="number"
                        name="weight"
                        placeholder="Enter Your Weight in kg"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                      {errors.weight && (
                        <p className="text-red-500 text-sm">{errors.weight}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Medical Conditions
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        name="medicalConditions"
                        placeholder="Medical conditions if any"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Current Medications
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        name="currentMedications"
                        placeholder="Current medications if any"
                        value={formData.currentMedications}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Donation Date
                      </label>
                      <input
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="date"
                        name="lastDonationDate"
                        value={formData.lastDonationDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 – Preferences */}
            {currentStep === 4 && (
              <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                <h2 className="text-yellow-600 font-bold text-lg mb-6">
                  ⚙️ PREFERENCES
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Receive Alerts
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-red-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="receiveAlerts"
                        checked={formData.receiveAlerts}
                        onChange={handleChange}
                        className="w-5 h-5 accent-red-500"
                      />
                      <span className="text-gray-700">
                        Enable Notifications
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Volunteer Participation
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-red-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="volunteerParticipation"
                        checked={formData.volunteerParticipation}
                        onChange={handleChange}
                        className="w-5 h-5 accent-red-500"
                      />
                      <span className="text-gray-700">Join as Volunteer</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                >
                  Submit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      <p className="text-center text-sm text-gray-500 mt-1 mb-1 my-5">
        🔒 Your data is secure and only used for emergency blood donation
        requests.
      </p>
      <p className="flex flex-wrap justify-center mb-5 text-center">
        Already signed in with another account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-red-600 font-bold ml-2 cursor-pointer hover:bg-red-300 transition"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Profile;
