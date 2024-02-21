import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { object, string, date } from "yup";
import { StateContext } from "../../App";
import { ErrorMessage } from "../ErrorMessage";
import { CAMPO_OBBLIGATORIO, REQUIRED_FIELD, REQUIRED_FIELD_BOOLEAN } from "../labels";
import { validationSchema } from "./ValidationSchema";
import { BrowserRouter, Route, RouterProvider, Routes, 
  createBrowserRouter, useNavigate } from "react-router-dom";



// export type TFormValues = { username: string; password: string; termsofuse: checkbox };
// export type TFormErrors = TFormValues;




export function LoginForm() {
const navigate = useNavigate();


const { dispatch } = useContext(StateContext);
  
   
const formik = useFormik({
  initialValues: {
    username: "",
    email: "",
    password: "", 
    termsofuse: true,
  },


  validationSchema: validationSchema,
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
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <ErrorMessage message={formik.errors.password} isError={false} />
        ) : null}
</div>

<div className="checkbox-login">

<label htmlFor="termsofuse" className="form-label-termsofuse">I accept the terms of use</label>

<input
id="checkbox-login"
type="checkbox"
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>

{formik.errors.termsofuse  && formik.touched.termsofuse ? (
            <ErrorMessage message={formik.errors.termsofuse} isError={false} />  
            ) : null}

</div>
    
      
        <div className="div-btn">
                <button type="submit" className="btn">Log in</button>
            </div>
            
            <div className="register-access">
              <span>Don't have an account? </span> 
              <a href="" onClick ={() => navigate("/signup")}>Sign Up</a>
              
              </div>

      
      
      </form>
    );
}

