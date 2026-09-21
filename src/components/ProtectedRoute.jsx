import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useUserStore } from "../store/useUserStore";

const API_URL = "http://localhost:8080";

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState("checking");
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Authentication check failed: ${response.status}`);
        }

        const user = await response.json();

        if (isMounted) {
          console.log("Authenticated user:", user);
          setUserInfo(user);
          setAuthState("authenticated");
        }
      })
      .catch(() => {
        if (isMounted) {
          setAuthState("unauthenticated");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (authState === "checking") {
    return <p>Checking your session...</p>;
  }

  return authState === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;