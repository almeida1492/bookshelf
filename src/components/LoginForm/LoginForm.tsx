import React, { useContext, useEffect, useState } from "react";
import { CAMPO_OBBLIGATORIO } from "../labels";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { isEmptyString, validate } from "./validationUtils";
import { ErrorMessage } from "../ErrorMessage";

export type TFormValues = { username: string; password: string };
export type TFormErrors = TFormValues;

export function LoginForm() {
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

    const errors = validate(formValues);

    if (Object.keys(errors).length === 0) {
      dispatch({
        type: "UPDATE_USERNAME",
        payload: formValues.username,
      });
      navigate("/");
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const isValueValid = isEmptyString(value);
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
