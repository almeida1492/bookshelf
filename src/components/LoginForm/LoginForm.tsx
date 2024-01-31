import { useFormik } from "formik";
import React, { useContext } from "react";
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

  const { dispatch } = useContext(StateContext);

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
      dispatch({
        type: "UPDATE_USERNAME",
        payload: values.username,
      });
      navigate("/");
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
      <a onClick={() => navigate("/signup")}>Sign up</a>
    </form>
  );
}
