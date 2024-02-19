import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";

export function Signup({ changeContent }: { changeContent: () => void }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(StateContext);
  const [formValues, setFormValues] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
    conferma: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch ({ type: "UPDATE_USERNAME", payload: formValues.username })
    navigate("/")
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleBlur = () => {};

  return (
    <form className="login-panel" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        id="nome"
        placeholder="nome"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        id="cognome"
        placeholder="cognome"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        id="email"
        placeholder="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        id="username"
        placeholder="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        id="password"
        placeholder="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        id="conferma"
        placeholder="conferma"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button type="submit" className="submit-button">
        submit
      </button>
    </form>
  );
}
