import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ element: Component, admin, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8001/users/verify/admin",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        if (response.data.admin) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
