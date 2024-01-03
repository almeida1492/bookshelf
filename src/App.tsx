import React, { useEffect, useState } from "react";
import "./app.css";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";

type TUsers = { id: string; name: string; email: string };

export function useFetchData() {
  const [remoteData, setRemoteData] = useState();
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/105")
      .then((res) => res.json())
      .then((data) => setRemoteData(data));
  }, []);

  return remoteData;
}

export function App(props: { title: string }) {
  // const [users, setUsers] = useState<TUsers[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  const [state, setState] = useState<"LOGIN" | "DASHBOARD">("LOGIN");

  const [username, setUsername] = useState("");

  const data = useFetchData();

  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        {state === "DASHBOARD" ? (
          <Dashboard username={username} />
        ) : (
          <LoginForm
            changeContent={(values: TFormValues) => {
              console.log(values);
              setUsername(values.username);
              setState("DASHBOARD");
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
