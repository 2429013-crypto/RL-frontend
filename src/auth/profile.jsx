import states from "./states.json";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import { BACKEND_BASE_URL } from "../../config";
const Profile = () => {
  const navigate = useNavigate(); 
  //formData is just an object in state that stores all your form values
  //setFormData is the function used to update formData
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
  const totalFields = Object.keys(formData).length;

  const filledFields = Object.values(formData).filter(
    (value) => value !== "" && value !== null && value !== false,
  ).length;

  const progressPercentage = Math.round((filledFields / totalFields) * 100);

  // ✅ proper boolean check
  const hasUserStartedTyping = Object.values(formData).some(Boolean);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));

      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profilePhoto) {
      alert("Please upload a profile photo.");
      return;
    }

    const payload = new FormData();

    payload.append("fullName", formData.fullName);
    payload.append("dateOfBirth", formData.dateOfBirth);
    payload.append("gender", formData.gender);
    payload.append("bloodGroup", formData.bloodGroup);
    payload.append("occupation", formData.occupation);
    payload.append("profilePhoto", formData.profilePhoto);
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
      console.log("Submitting to:", `${BACKEND_BASE_URL}/api/profile/create`);

      const response = await fetch(`${BACKEND_BASE_URL}/api/profile/create`, {
        method: "POST",
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
      if (!formData.profilePhoto)
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

    // If errors exist → stop + scroll to first error
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
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const [errors, setErrors] = useState({});

  return (
    <div className="min-h-screen  bg-red-50">
      <nav className="bg-white px-4 sm:px-10 py-5 flex justify-between items-center shadow-md">
        <h1 className=" text-4xl font-bold">
          <span className="text-red-500">RED</span>
          <span className="text-black">LINK</span>
          <p className="text-gray-600 text-sm mt-1">Blood Donor Network </p>
        </h1>                                                                     
          {/* Complete Profile Section */}
  <div
    onClick={() => navigate("/profile")}
    className="flex items-center gap-3 cursor-pointer"
  >
    <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-sm">
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

    <div>                                                                                 
      <p className="text-sm  text-gray-500">
        Welcome
      </p>
      <p className="font-semibold text-red-600 hover:underline">
        Complete Your Profile
      </p>
    </div>
  </div>                                                                                 
   </nav>        
      {/* Hero section */}

      <div className="max-w-5xl mx-auto text-center mb-10">
        {/* Heading */}
  
          <h1 className="text-4xl lg:text-5xl font-bold">
    <span className="text-red-600">Complete</span>{" "}                                        
    <span className="text-gray-700">Your Profile</span>
  </h1>         
 <div className="w-20 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
  {/* Subtitle */}
        <p className="text-gray-500 text-sm mt-3">
     Your information helps us connect the right people at the right time ❤️                 
          </p>                                                                                 
      {/* Progress Card */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          {/* Percentage */}
          <div className="flex flex-col justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800">
              Profile Completion
            </h3>

            <p className="text-sm text-gray-500">                                                                                                       
            Complete your profile to help save lives during emergency situations                          
            </p>

            <div className="text-3xl font-bold text-red-600">
              {progressPercentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* GRID */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* STEPPER */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-5">
              {[1, 2, 3, 4].map((step) => (
                <div key={step}>
                  <div
                    onClick={() => setCurrentStep(step)}
                    className="flex items-center gap-4 cursor-pointer"
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
                    <div className="h-10 border-l-2 border-gray-300 ml-5 my-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-3/4">
            {currentStep === 1 && (
              <>
                <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                  <h2 className="text-red-600  font-bold text-lg mb-6">
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
                        required
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
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
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
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
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
                          <p className="text-red-500 text-sm">
                            {errors.gender}
                          </p>
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
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
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

                    {/* Profile Photo Upload */}
                    <div className="md:w-1/2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Profile Photo
                      </label>

                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-200 rounded-xl p-5 cursor-pointer hover:bg-red-50 transition relative overflow-hidden">
                        {/* hidden input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {/* IF IMAGE EXISTS */}
                        {photoPreview ? (
                          <div className="relative">
                            <img
                              src={photoPreview}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-2 border-red-300 shadow-md"
                            />

                            {/* REMOVE BUTTON */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();

                                setPhotoPreview(null);
                                setFormData((prev) => ({
                                  ...prev,
                                  profilePhoto: null,
                                }));

                                // IMPORTANT: reset file input
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
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

                      {/* ERROR */}
                      {errors?.profilePhoto && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                          {errors.profilePhoto}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                {/* CARD 2 - CONTACT */}
                <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                  <h2 className="text-blue-600 font-bold text-lg mb-6">
                    📍 2. CONTACT INFORMATION
                  </h2>

                  <div className="space-y-5">
                    {/* Address + City */}
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
                          <p className="text-red-500 text-sm">
                            {errors.address}
                          </p>
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

                    {/* State + Pin Code */}
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
                          placeholder="Enter the pinCode"
                          value={formData.pinCode}
                          onChange={handleChange}
                        />
                        {errors.pinCode && (
                          <p className="text-red-500 text-sm">
                            {errors.pinCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5 border border-red-100">
                  <h2 className="text-green-600 font-bold text-lg mb-4">
                    🏥 HEALTH INFORMATION
                  </h2>
                  <div className="space-y-5">
                    {/* Weight + Medical Conditions */}
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
                          <p className="text-red-500 text-sm">
                            {errors.weight}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Medical Conditions
                        </label>

                        <textarea
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                          name="medicalConditions"
                          placeholder="medicalConditions if any"
                          value={formData.medicalConditions}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Current Medications + Last Donation Date */}
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Current Medications
                        </label>

                        <textarea
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                          name="currentMedications"
                          placeholder="currentMedications if any"
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
                         // placeholder="DD/MM/YYYY"
                          value={formData.lastDonationDate}
                          onChange={handleChange} 
                           />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-red-100">
                  <h2 className="text-yellow-600 font-bold text-lg mb-6">
                    ⚙️ PREFERENCES
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Receive Alerts */}
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

                    {/* Volunteer Participation */}
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
              </>
            )}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600"
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
                  className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  Submit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* closes max-w-2xl mx-auto flex flex-col gap-4 */}
      </form>

      <p className="text-center text-sm text-gray-500 mt-1 mb-1 my-5">
        🔒 Your data is secure and only used for emergency blood donation
        requests.
      </p> 
      <p className="flex flex-wrap justify-center  mb-5 text-center">
  Already signed in with another account?
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
