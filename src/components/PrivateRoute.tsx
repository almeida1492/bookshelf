import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false;
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  } else {
    return children;
  }
}
