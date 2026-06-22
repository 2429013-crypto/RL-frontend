import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/login";
import Register from "./auth/register";
import Profile from "./auth/profile";
import Request from "./request/Request";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Open Register First */}

        <Route path="/" element={<Navigate to="/register" />} />

        {/* Public Routes */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;