import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    
    const isAuthenticated = true;
    const navigate = useNavigate();
    // in questo verifica se l'utente è autenticato (se autenticato mostra dashboard, se no login)
    // The useNavigate hook returns a function that lets you navigate programmatically
    
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