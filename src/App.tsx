import React, { useEffect, useState } from "react";
import "./app.css";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";

type TUsers = { id: string; name: string; email: string };

export function App(props: { title: string }) {
  // const [users, setUsers] = useState<TUsers[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  const [state, setState] = useState<"LOGIN" | "DASHBOARD">("DASHBOARD");

  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        <LoginForm />
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}
