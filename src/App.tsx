import React, { createContext, useReducer } from 'react';
import './app.css';
import '../public/style.css';
import { VscSignIn } from 'react-icons/vsc';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm/LoginForm';
import { SignUp } from './components/SignUp/SignUp';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { useFetchData } from './hooks/useFetchData';
import { reducer } from './state/reducer';
import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  Router,
} from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { BookDetails } from './components/BookDetails';

type TUsers = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export const StateContext = createContext<{
  username: string;
  dispatch: React.Dispatch<any>;
} | null>(null);

// devo creare un'istanza del router. Dentro passo un array di oggetti con gli elementi che devo fare vedere.
// CreateBrowserRouter: It uses the DOM History API to update the URL and manage the history stack.
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  // {usiamo queryparams
  {
    path: "/bookdetails/",  
    element: (
        <PrivateRoute>
          <BookDetails />
        </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  
]);

export function App(props: { title: string }) {
  // const [users, setUsers] = useState<TUsers[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  const [appState, dispatch] = useReducer(reducer, { username: "" });

  // const data = useFetchData();

  return (
    <div className="app">
      <Header title={props.title} />
      <div className="content">
        <StateContext.Provider
          value={{
            username: appState.username,
            dispatch,
          }}
        >
          <RouterProvider router={router} />
        </StateContext.Provider>
      </div>
      <Footer />
    </div>
  );
}
