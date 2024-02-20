import { useFormik } from "formik";
import { VscSignIn } from "react-icons/vsc";
import React, { useContext } from "react";
import { object, string } from "yup";
import { StateContext } from "../../App";
import { GiArchiveRegister } from "react-icons/gi";
import { ErrorMessage } from "../ErrorMessage";
import { CAMPO_OBBLIGATORIO } from "../labels";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, useNavigate } from "react-router-dom";



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
    password: "", 
  },


  validationSchema,
  validateOnChange: true,
  validateOnBlur: true, 

  onSubmit: (values)  => {
    dispatch({
      type: "UPDATE_USERNAME",
      payload: values.username,
    });
    navigate("/");
    },

  });


  return (
      <form className="login-panel" onSubmit={formik.handleSubmit}>
<h2 className="titleH2">Welcome!</h2>
            <p className="paragraph">Enter your login details:</p>
            
            <div className="riga-form-login">
              <label htmlFor="username" className="form-label left">Username</label>


        <input
          id="username"
          placeholder="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.username && formik.touched.username ? (
          <ErrorMessage message={formik.errors.username} isError={false} />
        ) : null}
        </div>
  
        <div className="riga-form-login">
              <label htmlFor="password" className="form-label left">Password</label>

        <input
          id="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <ErrorMessage message={formik.errors.password} isError={false} />
        ) : null}
</div>
    
      
        <div className="div-btn">
                <button type="submit" className="btn">Log in <VscSignIn className="icon"/></button>
            </div>
            
            <div className="register-access">
              <span>Don't have an account? </span> 
              <a href="" onClick ={() => navigate("/signup")}>Sign Up</a>
              
              </div>

      
      
      </form>
    );
}

