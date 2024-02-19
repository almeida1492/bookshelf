import React, { createContext, useContext, useReducer } from "react";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, useNavigate } from "react-router-dom";
import "./app.css";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/Signup";
import { useFetchData } from "./hooks/useFetchData";
import { reducer } from "./state/reducer";
import { type } from "os";

type TUsers = { id: string; name: string; email: string };

export const StateContext = createContext<{username: string} | null>(null);

export function App(props: { title: string }) {
  // const [users, setUsers] = useState<TUsers[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  const [appState, dispatch] = useReducer(reducer, {
    activity: "LOGIN",
    username: "",
  });
  const data = useFetchData();

  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        <StateContext.Provider value={{...appState, dispatch}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
              <PrivateRoute>
                <Dashboard username={appState.username} />
              </PrivateRoute>} />
              <Route
                path="/login"
                element={
                <LoginForm
                />}
              />
              
              <Route path="/signup" element={<Signup
                    changeContent={() => {
                      dispatch({ type: "UPDATE_USERNAME" });
                    } } /> 
                  }
              />
            </Routes>
          </BrowserRouter>
        </StateContext.Provider>
    </div>
    <Footer />
    </div>
  );
}
