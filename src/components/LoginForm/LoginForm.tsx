import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { StateContext } from "../../App";
import { ErrorMessage } from "../ErrorMessage";
import { CAMPO_OBBLIGATORIO } from "../labels";

export type TFormValues = { username: string; password: string };
export type TFormErrors = TFormValues;

export const validationSchema = object({
  username: string().required(CAMPO_OBBLIGATORIO),
  password: string().required(CAMPO_OBBLIGATORIO),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) navigate("/");
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      age: null,
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            navigate("/");
          } else {
            setErrorMessage(res.message);
          }
        });
    },
  });

  return (
    <form className="login-panel" onSubmit={formik.handleSubmit}>
      <input
        id="username"
        placeholder="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.username && formik.touched.username ? (
        <ErrorMessage message={formik.errors.username} />
      ) : null}

      <input
        id="password"
        placeholder="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password ? (
        <ErrorMessage message={formik.errors.password} />
      ) : null}
      <button type="submit" className="submit-button">
        submit
      </button>
      <ErrorMessage message={errorMessage} />
      <a onClick={() => navigate("/signup")}>Sign up</a>
    </form>
  );
}
