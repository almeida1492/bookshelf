import React, { useEffect, useReducer, useState } from "react";
import "./app.css";
import "../public/style.css";
import { VscSignIn } from "react-icons/vsc";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm";
import { SignUp } from "./components/SignUp";
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

  function reducer(state: any, action: { type: any; payload: string; }) {
    const draft = { ...state };
    switch (action.type) {
      case "GO_TO_DASHBOARD":
        draft.activity = "DASHBOARD";
        break;
      case "GO_TO_SIGNUP":
        draft.activity = "SIGNUP";
        break;
      case "UPDATE_USERNAME":
        draft.username = action.payload;
        break;
    }
    return draft;
  }

  const [appState, dispatch] = useReducer(reducer, {
    activity: "LOGIN",
    username: "", 
  });

  const data = useFetchData();

  
  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        {appState.activity === "DASHBOARD" ? (
          <Dashboard username={appState.username} />
        ) : (
          <>

          {/* <LoginForm
            changeContent={(values: TFormValues) => {
              dispatch({ type: "UPDATE_USERNAME", payload: values.username });
              dispatch({
                type: "GO_TO_DASHBOARD",
                payload: ""
              });
                                  
            }}
          />  */}

          <SignUp
            changeContent={(values: TFormValues) => {
                dispatch({ type: "UPDATE_USERNAME", payload: values.username });
                dispatch({
                  type: "GO_TO_DASHBOARD",
                  payload: ""
                });
              }}
            />

          </> 
        )}
      </div>
      <Footer />
    </div>
  );
}
