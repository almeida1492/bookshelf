import React, { useEffect, useState } from "react";
import "./app.css";
import "../public/style.css";
import { VscSignIn } from "react-icons/vsc";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";


type TUsers = { id: string; username: string; email: string; password: string };

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

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const data = useFetchData();

  return (
    <div className="app">
      <Header title={props.title} />
      
      {state === "DASHBOARD" ? (
          <Dashboard username={username} />
        ) : (
          <LoginForm
            changeContent={(values: TFormValues) => {
              console.log(values);
              setUsername(values.username);
              setEmail(values.email);
              setPassword(values.password);
              if (values.email == "" || values.username == "" || values.password == ""){
                alert('Try again. You must enter all the request credentials!')
              } else {
              
                setState("DASHBOARD");}
            }}
          />
        )}
        
      <Footer />
    </div>
  );
}
