import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });

        setAuthenticated(res.ok);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;