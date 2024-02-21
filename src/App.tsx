import React, { createContext, useReducer } from "react";
import "./app.css";
import { BrowserRouter, Route, Routes, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm/LoginForm";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/SignUp/SignUp";
import { useFetchData } from "./hooks/UseFetchData";
import { reducer } from "./state/reducer";

type TUsers = { id: string; name: string; email: string };

export const StateContext = createContext<{
  username: string;
  dispatch: React.Dispatch<any>;
} | null>(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export function App(props: { title: string }) {


  const [appState, dispatch] = useReducer(reducer, { username: "" });

  const data = useFetchData();

  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        <StateContext.Provider
          value={{username: appState.username, dispatch, }}>
         
         <RouterProvider router={router} />
        </StateContext.Provider>
    </div>


          
       
     
      <Footer />
    </div>
  );
}