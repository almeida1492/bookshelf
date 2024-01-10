import React, { useEffect, useState } from "react";
import { CAMPO_OBBLIGATORIO } from "./labels";

function validateValue(value: string) {
  let isValid = true;
  isValid = value !== "";
  return isValid;
}

export type TFormValues = { username: string; password: string };
export type TFormErrors = TFormValues;

export function LoginForm({
  changeContent,
}: {
  changeContent: (credentials: TFormValues) => void;
}) {
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
      changeContent(formValues);
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
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {formErrors.password ? (
        <ErrorMessage message={formErrors.password} />
      ) : null}
      <button type="submit" className="submit-button">
        submit
      </button>
    </form>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <span className="error-message">{message}</span>;
}
