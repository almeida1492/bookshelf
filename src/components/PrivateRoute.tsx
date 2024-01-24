import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  } else {
    return children;
  }
}
