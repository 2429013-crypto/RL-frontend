import { useState, useEffect } from "react";

function Request() {
  // STATES

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const BACKEND_URL = "http://localhost:5000";

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
})

      const data = await response.json();

      console.log("My Requests Response:", data);

      if (data.success) {
        console.log("My Requests Data:", data.data);

        setRequests(data.data);
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

  // USE EFFECT

  useEffect(() => {
    if (activeTab === "all") {
      fetchRequests();
    } else {
      fetchMyRequests();
    }
  }, [activeTab]);

  // FILTER REQUESTS

  const filteredRequests = requests.filter(
    (request) =>
      request.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      request.bloodGroup?.toLowerCase().includes(search.toLowerCase()) ||
      request.hospitalName?.toLowerCase().includes(search.toLowerCase()),
  );

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
      <nav className="bg-white border-b border-red-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-5xl font-extrabold leading-none">
              <span className="text-red-600">Red</span>
              <span className="text-black">Link</span>
            </h1>

            <p className="text-gray-600 font-semibold text-lg mt-1">
              Blood Donor Network
            </p>
          </div>
        </div>
      </nav>
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>

            <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">
              Blood Donation Management
            </span>
          </div>

          <h1
            className="
        text-5xl
        lg:text-6xl
        font-extrabold
        text-gray-900
        tracking-tight
        leading-none
      "
          >
            Blood Requests
          </h1>

          <p
            className="
        mt-4
        text-lg
        text-gray-500
        max-w-3xl
        leading-relaxed
      "
          >
            Manage, track, and respond to active blood donation requests across
            the network.
          </p>
          {/* New Request Button */}
          <button
            onClick={() => setShowPopup(true)}
            className="
            mt-10
            bg-red-700
            hover:bg-red-800
            text-white
            font-semibold
            px-8
            py-4
            rounded-2xl
            shadow-md
            transition-all
            duration-200
            hover:scale-105
          "
          >
            + New Request
          </button>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {/* Total */}
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Requests
                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {requests.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 text-xl">
                🩸
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </p>

                <h2 className="text-4xl font-bold text-orange-500 mt-3">
                  {requests.filter((r) => r.status === "Active").length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* Fulfilled */}
          <div className="bg-white rounded-3xl border border-green-100 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fulfilled
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-3">
                  {requests.filter((r) => r.status === "Fulfilled").length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 text-xl">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mt-10 mb-4">
          {/* Left Side */}
          <div>
            <h3 className="text-xl font-bold text-gray-900">Requests</h3>

            <p className="text-gray-500 text-sm mt-1">
              View and manage blood donation requests
            </p>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1 flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-200
        ${
          activeTab === "all"
            ? "bg-red-600 text-white"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
            >
              All Requests
            </button>

            <button
              onClick={() => setActiveTab("my")}
              className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-200
        ${
          activeTab === "my"
            ? "bg-red-600 text-white"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
            >
              My Requests
            </button>
          </div>
        </div>
        {/* Search */}
        <div className="relative mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="currentColor"
          >
            <path d="M505 442.7L405.3 343c28.4-34.9 45.5-79.4 45.5-128C450.8 96.5 354.3 0 225.4 0S0 96.5 0 215.4s96.5 215.4 215.4 215.4c48.6 0 93.1-17.1 128-45.5L442.7 505c4.7 4.7 10.8 7 16.9 7s12.2-2.3 16.9-7l28.5-28.5c9.3-9.3 9.3-24.5 0-33.8zM215.4 366.8c-83.5 0-151.4-67.9-151.4-151.4S131.9 64 215.4 64s151.4 67.9 151.4 151.4-67.9 151.4-151.4 151.4z" />
          </svg>

          <input
            type="text"
            placeholder="Search patient, blood group, hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 shadow-sm"
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mt-8">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="
mt-5
bg-white
rounded-3xl
border
border-red-100
shadow-sm
hover:shadow-md
transition-all
duration-300
cursor-pointer
p-6
"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {request.patientName}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {request.hospitalName}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Required By:{" "}
                      {new Date(request.requiredBy).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className="
bg-red-50
text-red-700
px-4
py-2
rounded-full
text-sm
font-semibold
border
border-red-100
"
                  >
                    {request.priority}
                  </span>
                </div>

                <div className="mt-5 flex gap-3 flex-wrap">
                  <span
                    className="
bg-red-50
text-red-700
px-3
py-1
rounded-xl
font-semibold
"
                  >
                    {request.bloodGroup}
                  </span>

                  <span
                    className="
bg-slate-50
px-3
py-1
rounded-xl
text-gray-700
font-medium
"
                  >
                    {request.unitsNeeded} Units
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-gray-600">
                  <p>📍 {request.location}</p>
                  <p>📞 {request.contactNumber}</p>
                </div>

                <div className="mt-6 flex justify-end">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      request.status === "Active"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                        : request.status === "Fulfilled"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
              {/* Header */}

              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Request Details
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Review and manage blood request information
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Body */}

              <div className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Patient Name
                    </p>

                    <p className="font-semibold text-slate-900">
                      {selectedRequest.patientName}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Blood Group
                    </p>

                    <span className="bg-red-700 text-white px-3 py-1 rounded-xl text-sm font-semibold">
                      {selectedRequest.bloodGroup}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Units Needed
                    </p>

                    <p className="font-semibold">
                      {selectedRequest.unitsNeeded} Units
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Hospital
                    </p>

                    <p className="font-semibold">
                      {selectedRequest.hospitalName}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Location
                    </p>

                    <p className="font-semibold">{selectedRequest.location}</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">
                      Contact
                    </p>

                    <p className="font-semibold">
                      {selectedRequest.contactNumber}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>

                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        selectedRequest.status === "Active"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                          : selectedRequest.status === "Fulfilled"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                      }`}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Priority</p>

                    <span className="inline-block mt-2 bg-red-50 text-red-700 border border-red-100 px-4 py-2 rounded-full text-sm font-semibold">
                      {selectedRequest.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="border-t border-gray-100 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-medium"
                >
                  Close
                </button>

                <button
                  onClick={() => updateStatus(selectedRequest.id, "Cancelled")}
                  className="px-5 py-3 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-700"
                >
                  Cancel Request
                </button>

                <button
                  onClick={() => updateStatus(selectedRequest.id, "Fulfilled")}
                  className="px-5 py-3 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700"
                >
                  Mark Fulfilled
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div
              className="bg-white
rounded-4xl
w-full
max-w-3xl
shadow-[0_20px_60px_rgba(0,0,0,0.12)]
border
border-red-100
overflow-hidden
"
            >
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    New Blood Request
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Create a request for blood donation assistance
                  </p>
                </div>

                <button
                  onClick={() => setShowPopup(false)}
                  className="text-2xl text-gray-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Request Information
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Fill in all required details below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">
                      Patient Name
                    </label>

                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
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
                    <label className="block font-semibold mb-2">
                      Units Needed
                    </label>
                    <input
                      type="number"
                      name="unitsNeeded"
                      value={formData.unitsNeeded}
                      onChange={handleChange}
                      placeholder="Enter units required"
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="Enter hospital name"
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full border border-gray-500 rounded-xl p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    >
                      <option value="">Select priority</option>
                      <option>Emergency</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">
                      Required By
                    </label>

                    <input
                      type="datetime-local"
                      name="requiredBy"
                      value={formData.requiredBy}
                      onChange={(e) => {
                        const value = e.target.value;

                        console.log("DATE VALUE:", value);

                        setFormData((prev) => ({
                          ...prev,
                          requiredBy: value,
                        }));
                      }}
                      className="w-full border border-gray-500 rounded-lg p-3 focus:ring-1 focus:ring-black-500 focus:border-black-700 outline-none"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Request;
