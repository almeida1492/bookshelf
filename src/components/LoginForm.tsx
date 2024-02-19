import React, { useContext, useEffect, useState } from "react";
import { CAMPO_OBBLIGATORIO } from "./labels";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";

function validateValue(value: string) {
  let isValid = true;
  isValid = value !== "";
  return isValid;
}

export type TFormValues = { username: string; password: string };
export type TFormErrors = TFormValues;

export function LoginForm(){
  const navigate = useNavigate();

  const { dispatch } = useContext(StateContext);
  
  const [formValues, setFormValues] = useState<TFormValues>({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<TFormErrors>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUsernameValid = validateValue(formValues.username);
    if (!isUsernameValid) {
      setFormErrors((statoVecchio) => ({
        ...statoVecchio,
        username: CAMPO_OBBLIGATORIO,
      }));
    }

    const isPasswordValid = validateValue(formValues.password);
    if (!isPasswordValid) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: CAMPO_OBBLIGATORIO,
      }));
    }

    if (isUsernameValid && isPasswordValid) {
      dispatch({ type: "UPDATE_USERNAME",
      payload: formValues.username, });
      navigate("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleBlur = (e: { target: { value: any; id: any; }; }) => {
    const value = e.target.value;
    const id = e.target.id;
    const isValueValid = validateValue(value);
    if (!isValueValid) {
      setFormErrors((prevState) => ({
        ...prevState,
        [id]: CAMPO_OBBLIGATORIO,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
  };

  useEffect(() => {
    console.log("The component LoginForm was mounted");
    return () => console.log("The component LoginForm was unmounted");
  }, []);

  return (
    <form className="login-panel" onSubmit={handleSubmit}>
      <input
        id="username"
        placeholder="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {formErrors.username ? (
        <ErrorMessage message={formErrors.username} />
      ) : null}
      <input
        id="password"
        placeholder="password"
        type= "password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {formErrors.password ? (
        <ErrorMessage message={formErrors.password} />
      ) : null}
      <button type="submit" className="submit-button">
        submit
      </button>
      <a onClick={() => navigate("/signup")}>Sign up</a>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <span className="error-message">{message}</span>;
}
