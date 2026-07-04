import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config";
import requestHero from "../assets/requestHero.png";
import {
  Droplets,
  Timer,
  CircleCheck,
  X,
  Send,
  Info,
  User,
  Users,
} from "lucide-react";
function Request() {
  // STATES

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    bloodGroup: "",
    status: "",
    priority: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [donors, setDonors] = useState([]);
  const [showDonors, setShowDonors] = useState(false);
  const fetchDonors = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/requests/${id}/donors`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log("DONORS:", data);
      if (data.success) {
        setDonors(data.data);
        setShowDonors(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/me`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [profileName, setProfileName] = useState("");
  const [requestType, setRequestType] = useState("self"); // "self" or "others"
  const [userProfile, setUserProfile] = useState(null);
  const fetchProfileName = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/profile/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setProfileName(data.fullName || "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/profile/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const applySelfAutofill = (profile) => {
    setFormData((prev) => ({
      ...prev,
      patientName: profile.fullName || "",
      bloodGroup: profile.bloodGroup || "",
      contactNumber: profile.User?.phoneNumber || "",
      location:
        profile.city && profile.state
          ? `${profile.city}, ${profile.state}`
          : "",
    }));
  };
  const clearAutoFilledFields = () => {
    setFormData((prev) => ({
      ...prev,
      patientName: "",
      bloodGroup: "",
      contactNumber: "",
      location: "",
    }));
  };
  const handleRequestTypeChange = (type) => {
    setRequestType(type);
    if (type === "self" && userProfile) {
      applySelfAutofill(userProfile);
    } else {
      clearAutoFilledFields();
    }
  };

  const dropdownRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsNeeded: "",
    hospitalName: "",
    contactNumber: "",
    location: "",
    priority: "",
    requiredBy: "",
  });

  const BACKEND_URL = BACKEND_BASE_URL;

  console.log("Current Tab:", activeTab);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    console.log("Changing:", e.target.name, e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE REQUEST

  const handleSubmit = async () => {
    try {
      console.log("FORM DATA:", formData);

      console.log("REQUEST BODY:", {
        ...formData,
        userId: 1,
      });

      const response = await fetch(`${BACKEND_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Request Created Successfully");

        setShowPopup(false);

        setFormData({
          patientName: "",
          bloodGroup: "",
          unitsNeeded: "",
          hospitalName: "",
          contactNumber: "",
          location: "",
          priority: "",
          requiredBy: "",
        });

        fetchRequests();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ALL REQUESTS

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/requests`, {
        credentials: "include",
      });

      const data = await response.json();

      console.log("Backend Response:", data);

      if (data.success) {
        setRequests(data.data);
        if (selectedRequest) {
          const updated = data.data.find((r) => r.id === selectedRequest.id);
          if (updated) setSelectedRequest(updated);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH MY REQUESTS

  const fetchMyRequests = async () => {
    console.log("fetchMyRequests called");

    try {
      const response = await fetch(`${BACKEND_URL}/api/requests/my-requests`, {
        credentials: "include",
      });

      const data = await response.json();

      console.log("My Requests Response:", data);

      if (data.success) {
        console.log("My Requests Data:", data.data);

        setRequests(data.data);

        // ADD THIS
        if (selectedRequest) {
          const updated = data.data.find((r) => r.id === selectedRequest.id);
          if (updated) setSelectedRequest(updated);
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // UPDATE STATUS (handles cancel + fulfill + any future status)

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/requests/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Request marked as ${status}`);

        fetchRequests();
        setSelectedRequest(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const acceptRequest = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/requests/${id}/accept`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchRequests();
        setSelectedRequest(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelDonation = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/requests/${id}/accept`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchRequests();
        setSelectedRequest(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchCurrentUser(); //  added
    fetchProfileName();
    fetchUserProfile();
    if (activeTab === "all") {
      fetchRequests();
    } else {
      fetchMyRequests();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedRequest || showDonors || showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedRequest, showDonors, showPopup]);

  // FILTER REQUESTS

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      request.bloodGroup?.toLowerCase().includes(search.toLowerCase()) ||
      request.hospitalName?.toLowerCase().includes(search.toLowerCase());

    const matchesBlood =
      !filters.bloodGroup || request.bloodGroup === filters.bloodGroup;

    const matchesStatus = !filters.status || request.status === filters.status;

    const matchesPriority =
      !filters.priority || request.priority === filters.priority;

    return matchesSearch && matchesBlood && matchesStatus && matchesPriority;
  });

  console.log("Search:", search);
  console.log("Filtered:", filteredRequests);

  // LOADING SCREEN

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9EEEE]">
      {/* Navbar */}
      {/* <nav className="bg-white border-b border-red-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          {/* Logo */}
      {/* <div>
            <h1 className="text-5xl font-extrabold leading-none">
              <span className="text-red-600">Red</span>
              <span className="text-black">Link</span>
            </h1>

            <p className="text-gray-600 font-semibold text-lg mt-1">
              Blood Donor Network
            </p>
          </div> */}
      {/* </div>
      </nav> */}
      <nav className="bg-white border-b border-red-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between relative">
          {/* LEFT — Logo */}
          <div>
            <h1 className="text-5xl font-extrabold leading-none">
              <span className="text-red-600">Red</span>
              <span className="text-black">Link</span>
            </h1>
            <p className="text-gray-600 font-semibold text-lg mt-1">
              Blood Donor Network
            </p>
          </div>

          {/* RIGHT — Avatar dropdown */}

          <div ref={dropdownRef} className="relative flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">
                Hello, {profileName || "User"}
              </p>
            </div>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-11 cursor-pointer h-11 rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-colors duration-200 ${
                dropdownOpen ? "border-red-500" : "border-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
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
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
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
                      d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                    />
                  </svg>
                  My Profile
                </button>

                <div className="border-t border-gray-100" />

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
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
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
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
        </div>
      </nav>
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        {/* Hero Section */}

        <div className="mb-6">
          <div className="relative bg-linear-to-br from-red-50 to-red-100 border border-red-100 rounded-3xl overflow-hidden">
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-67 h-64 bg-red-200/30 rounded-full hidden lg:block"></div>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center">
              {/* LEFT */}
              <div className="px-8 lg:px-12 py-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 mb-5">
                  <Droplets className="w-3.5 h-3.5 text-red-600" />
                  <span className="uppercase tracking-[1.5px] text-red-600 text-xs font-bold">
                    Blood Donation Management
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] text-gray-900">
                  Blood Requests
                </h1>

                <p className="mt-3 text-base leading-7 text-gray-600 max-w-md">
                  Manage, track and respond to active blood donation requests
                  across the network.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center gap-2 bg-white border border-red-200 rounded-full px-4 py-2 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {requests.filter((r) => r.status === "Active").length}{" "}
                      people need blood right now
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setShowPopup(true);
                      setRequestType("self");
                      if (userProfile) applySelfAutofill(userProfile);
                    }}
                    className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-2xl font-semibold shadow-xl ring-4 ring-red-200 hover:-translate-y-1 hover:shadow-red-300 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>New Request</span>
                  </button>
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex justify-center lg:justify-end">
                <img
                  src={requestHero}
                  alt="Blood Donation"
                  className="w-72 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {/* Total */}
          <div className="relative bg-white rounded-2xl shadow-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-red-500"></div>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Total Requests
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1 leading-none">
                  {requests.length}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5">
                  All time requests
                </p>
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="relative bg-white rounded-2xl shadow-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Timer className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Active Requests
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1 leading-none">
                  {requests.filter((r) => r.status === "Active").length}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5">
                  Currently needs help
                </p>
              </div>
            </div>
          </div>

          {/* Fulfilled */}
          <div className="relative bg-white rounded-2xl shadow-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-green-500"></div>
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <CircleCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Fulfilled Requests
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1 leading-none">
                  {requests.filter((r) => r.status === "Fulfilled").length}
                </h2>
                <p className="text-xs text-gray-400 mt-1.5">
                  Successfully fulfilled
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 relative overflow-hidden">
          {/* Red accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl"></div>
          {/* Left Side */}
          <div>
            <h3 className="text-xl font-bold text-gray-900">Requests</h3>
            <p className="text-gray-500 text-sm mt-1">
              View and manage blood donation requests
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              All Requests
            </button>

            <button
              onClick={() => setActiveTab("my")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "my"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Requests
            </button>
          </div>
        </div>
        {/* Search + Filter */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Search + Filter Button Row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400"
                fill="currentColor"
              >
                <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79.4 45.5-128C450.8 96.5 354.3 0 225.4 0S0 96.5 0 215.4s96.5 215.4 215.4 215.4c48.6 0 93.1-17.1 128-45.5L442.7 505c4.7 4.7 10.8 7 16.9 7s12.2-2.3 16.9-7l28.5-28.5c9.3-9.3 9.3-24.5 0-33.8z" />
              </svg>
              <input
                type="text"
                placeholder="Search patient, blood group, hospital..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl border text-sm font-semibold shadow-sm transition-all duration-200 ${
                showFilters
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-red-300"
              }`}
            >
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Blood Group
                  </p>
                  <select
                    value={filters.bloodGroup}
                    onChange={(e) =>
                      setFilters({ ...filters, bloodGroup: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <option value="">All</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (bg) => (
                        <option key={bg}>{bg}</option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Status
                  </p>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <option value="">All</option>
                    <option>Active</option>
                    <option>Fulfilled</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Priority
                  </p>
                  <select
                    value={filters.priority}
                    onChange={(e) =>
                      setFilters({ ...filters, priority: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <option value="">All</option>
                    <option>Emergency</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                  {filteredRequests.length} result(s) found
                </p>
                <button
                  onClick={() =>
                    setFilters({ bloodGroup: "", status: "", priority: "" })
                  }
                  className="text-sm text-red-500 font-semibold hover:text-red-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <pre className="mt-4">{JSON.stringify(requests, null, 2)}</pre> */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center mt-8 shadow">
            <h2 className="text-xl font-bold">No Blood Requests Found</h2>
            <p className="text-gray-500 mt-2">
              Try another search or create a new request.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                {/* Top color bar based on priority */}
                <div
                  className={`h-1.5 w-full ${
                    request.priority === "Emergency"
                      ? "bg-red-400"
                      : request.priority === "Medium"
                        ? "bg-orange-300"
                        : "bg-green-300"
                  }`}
                />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {/* Blood Group Circle */}
                      <div className="w-11 h-11 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-xs">
                          {request.bloodGroup}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base font-bold text-gray-900 leading-tight">
                          {request.patientName}
                        </h2>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {request.hospitalName}
                        </p>
                      </div>
                    </div>

                    {/* Priority Badge */}
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        request.priority === "Emergency"
                          ? "bg-red-100 text-red-500"
                          : request.priority === "Medium"
                            ? "bg-orange-100 text-orange-500"
                            : "bg-green-100 text-green-500"
                      }`}
                    >
                      {request.priority === "Emergency" && "🚨 "}
                      {request.priority === "Medium" && "⚠️ "}
                      {request.priority === "Low" && "🟢 "}
                      {request.priority}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-50 my-3.5" />

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-xs shrink-0">
                        📍
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400">Location</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {request.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-xs shrink-0">
                        📞
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400">Contact</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {request.contactNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-xs shrink-0">
                        🩸
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400">
                          Units Needed
                        </p>
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {request.unitsNeeded} Units
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-xs shrink-0">
                        📅
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400">Required By</p>
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {new Date(request.requiredBy).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-gray-50">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        request.status === "Active"
                          ? "bg-yellow-100 text-yellow-600"
                          : request.status === "Fulfilled"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                      }`}
                    >
                      ● {request.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-red-600 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Request Details
                  </h2>
                  <p className="text-red-100 text-sm mt-1">
                    Review and manage blood request information
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              {/* Status + Priority Strip */}
              <div className="flex border-b border-gray-100 px-6 py-3 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Status</span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedRequest.status === "Active"
                        ? "bg-yellow-100 text-yellow-600"
                        : selectedRequest.status === "Fulfilled"
                          ? "bg-green-100 text-green-600"
                          : selectedRequest.status === "Accepted"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-500"
                    }`}
                  >
                    ● {selectedRequest.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Priority</span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedRequest.priority === "Emergency"
                        ? "bg-red-100 text-red-500"
                        : selectedRequest.priority === "Medium"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-green-100 text-green-500"
                    }`}
                  >
                    {selectedRequest.priority}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Patient Name
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.patientName}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Blood Group
                    </p>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-xl text-sm font-semibold">
                      {selectedRequest.bloodGroup}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Units Needed
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.unitsNeeded} Units
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Hospital
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.hospitalName}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Location
                    </p>
                    <p className="font-semibold text-gray-800">
                      📍 {selectedRequest.location}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Contact
                    </p>
                    <p className="font-semibold text-gray-800">
                      📞 {selectedRequest.contactNumber}
                    </p>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="border-t border-gray-100 p-6 flex justify-end gap-3">
                {console.log(
                  "owner check:",
                  currentUser?.id,
                  selectedRequest?.userId,
                )}
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-medium"
                >
                  Close
                </button>
                {/* View Donors button — owner or admin only */}
                {currentUser &&
                  (currentUser.role === "admin" ||
                    Number(currentUser.id) ===
                      Number(selectedRequest.userId)) &&
                  selectedRequest.acceptanceCount > 0 && (
                    <button
                      onClick={() => fetchDonors(selectedRequest.id)}
                      className="px-5 py-3 rounded-2xl bg-purple-600 text-white font-medium hover:bg-purple-700"
                    >
                      View Donors ({selectedRequest.acceptanceCount})
                    </button>
                  )}
                {/* Cancel + Fulfill — owner or admin only */}
                {currentUser &&
                  (currentUser.role === "admin" ||
                    Number(currentUser.id) ===
                      Number(selectedRequest.userId)) && (
                    <>
                      {(selectedRequest.status === "Active" ||
                        selectedRequest.status === "Accepted") && (
                        <button
                          onClick={() =>
                            updateStatus(selectedRequest.id, "Cancelled")
                          }
                          className="px-5 py-3 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-700"
                        >
                          Cancel Request
                        </button>
                      )}

                      {(selectedRequest.status === "Active" ||
                        selectedRequest.status === "Accepted") && (
                        <button
                          onClick={() =>
                            updateStatus(selectedRequest.id, "Fulfilled")
                          }
                          className="px-5 py-3 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700"
                        >
                          Mark Fulfilled
                        </button>
                      )}
                    </>
                  )}

                {/* Accept / Cancel Donation — other users only, request must be Active or Accepted */}
                {currentUser &&
                  Number(currentUser.id) !== Number(selectedRequest.userId) &&
                  currentUser.role !== "admin" &&
                  (selectedRequest.status === "Active" ||
                    selectedRequest.status === "Accepted") &&
                  (selectedRequest.acceptances?.some(
                    (acc) => Number(acc.donorId) === Number(currentUser.id),
                  ) ? (
                    <button
                      onClick={() => cancelDonation(selectedRequest.id)}
                      className="px-5 py-3 rounded-2xl bg-orange-600 text-white font-medium hover:bg-orange-700"
                    >
                      Cancel Donation
                    </button>
                  ) : (
                    (selectedRequest.acceptanceCount || 0) < 10 && (
                      <button
                        onClick={() => acceptRequest(selectedRequest.id)}
                        className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                      >
                        Accept &amp; Donate
                      </button>
                    )
                  ))}
              </div>{" "}
              {showDonors && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                  <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          Accepted Donors
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          {donors.length} donor(s) ·{" "}
                          {selectedRequest.acceptanceCount >= 10
                            ? "0"
                            : 10 - selectedRequest.acceptanceCount}{" "}
                          slots remaining
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDonors(false)}
                        className="w-10 h-10 rounded-xl hover:bg-gray-100 text-xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-6 space-y-3 overflow-y-auto">
                      {donors.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          No donors yet
                        </p>
                      ) : (
                        donors.map((acceptance, index) => (
                          <div
                            key={acceptance.id}
                            className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                              {acceptance.serialNumber}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                Donor #{acceptance.serialNumber}
                              </p>
                              {acceptance.donor?.phoneNumber ? (
                                <p className="text-sm text-gray-500">
                                  📞 {acceptance.donor?.phoneNumber}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-500">
                                  📞 Not provided
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-t border-gray-100 p-4 flex justify-end">
                      <button
                        onClick={() => setShowDonors(false)}
                        className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <div
              className="
bg-white
w-full
max-w-300
rounded-[28px]
shadow-[0_30px_70px_rgba(0,0,0,0.25)]
overflow-hidden
flex
flex-col
max-h-[95vh]
"
            >
              {/* RED HEADER */}
              <div className="bg-linear-to-r from-red-500 to-red-600 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Droplets size={30} className="text-red-600 fill-red-600" />
                  </div>
                  <div>
                    <h2 className="text-4xl leading-none font-bold text-white">
                      New Blood Request
                    </h2>
                    <p className="text-red-100 text-lg mt-2">
                      Create a request for blood donation assistance
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowPopup(false);
                    setRequestType("self");
                  }}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              {/* END RED HEADER */}

              {/* SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto px-8 py-6 min-h-0">
                {/* Toggle */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* FOR MYSELF */}
                  <button
                    type="button"
                    onClick={() => handleRequestTypeChange("self")}
                    className={`
      h-16 rounded-2xl border flex items-center gap-3 px-5
      transition-all duration-300
      ${
        requestType === "self"
          ? "bg-linear-to-r from-red-600 to-red-500 border-red-600 text-white shadow-lg"
          : "bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"
      }
    `}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        requestType === "self"
                          ? "bg-white/20"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <User size={20} />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold">For Myself</p>
                      <p
                        className={`text-xs ${
                          requestType === "self"
                            ? "text-red-100"
                            : "text-gray-400"
                        }`}
                      >
                        Use profile details
                      </p>
                    </div>
                  </button>

                  {/* FOR SOMEONE ELSE */}
                  <button
                    type="button"
                    onClick={() => handleRequestTypeChange("others")}
                    className={`
      h-16 rounded-2xl border flex items-center gap-3 px-5
      transition-all duration-300
      ${
        requestType === "others"
          ? "bg-linear-to-r from-red-600 to-red-500 border-red-600 text-white shadow-lg"
          : "bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"
      }
    `}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        requestType === "others"
                          ? "bg-white/20"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <Users size={20} />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold">For Someone Else</p>
                      <p
                        className={`text-xs ${
                          requestType === "others"
                            ? "text-red-100"
                            : "text-gray-400"
                        }`}
                      >
                        Enter patient details
                      </p>
                    </div>
                  </button>
                </div>

                {/* Info banner */}
                {requestType === "self" && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl px-5 py-3 flex items-start gap-4">
                    <span className="text-red-500">
                      <Info size={22} className="text-red-500 mt-1" />
                    </span>
                    <div>
                      <p className="text-red-700 font-semibold text-sm">
                        Your profile details have been auto-filled.
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        You can edit any information if needed.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-">
                      👤 Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full border border-gray-200 bg-white rounded-xl h-12 px-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      🩸 Blood Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    >
                      <option value="">Select blood group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      📅 Units Needed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="unitsNeeded"
                      value={formData.unitsNeeded}
                      onChange={handleChange}
                      placeholder="Enter units required"
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      🏥 Hospital Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="Enter hospital name"
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      📞 Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      📍 Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      🚩 Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    >
                      <option value="">Select priority</option>
                      <option>Emergency</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      📅 Required By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="requiredBy"
                      value={formData.requiredBy}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          requiredBy: value,
                        }));
                      }}
                      className="
w-full
h-12
border
border-gray-200
bg-white
rounded-xl
px-4
outline-none
focus:border-red-500
focus:ring-4
focus:ring-red-100
"
                    />
                  </div>
                </div>
              </div>
              {/* END SCROLLABLE BODY */}

              {/* FOOTER — stays fixed, never scrolls away */}
              <div className="border-t border-gray-200 bg-white px-8 py-6 flex gap-5">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setRequestType("self");
                  }}
                  className="flex-1 h-12 border border-gray-300 rounded-2xl bg-white text-gray-700 font-semibold text-base hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  <span>Cancel</span>
                </button>

                <button
                  onClick={handleSubmit}
                  className="flex-1 h-12 rounded-2xl bg-linear-to-r from-red-600 to-red-500 text-white font-semibold text-base hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send size={20} />
                  <span>Submit Request</span>
                </button>
              </div>
              {/* END FOOTER */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Request;
