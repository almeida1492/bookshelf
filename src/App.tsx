import React, { useContext, useReducer } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoginForm, TFormValues } from "./components/LoginForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signup } from "./components/Signup";
import { useFetchData } from "./hooks/useFetchData";
import { reducer } from "./state/reducer";

type TUsers = { id: string; name: string; email: string };

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

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
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}
