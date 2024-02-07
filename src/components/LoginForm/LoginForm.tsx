import React, { useEffect, useState, useContext } from "react";
import { VscSignIn } from "react-icons/vsc";
import { REQUIRED_FIELD } from "../labels";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { ErrorMessage } from "../ErrorMessage";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import Yup from "yup";


export type TFormValues = { username: string; email: string; password: string };
export type TFormErrors = TFormValues;

export function LoginForm() {
  const navigate = useNavigate();

  const { dispatch } = useContext(StateContext);
  
   
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "", 
    },

    validationSchema: validationSchema,

    validateOnChange: true,

    validateOnBlur: true, 
    
    onSubmit: (values) => {
        //ho messo quello che c'era su handleSubmit. Abbiamo eliminato validate (e quindi errors) perché quello lo gestisce direttamente formik   
        dispatch({
          type: "UPDATE_USERNAME",
          payload: values.username,
        });
        navigate("/");
      
    },
  });

  
  // questa è una funzione jsx
  return (
    <form className="login-panel" onSubmit={formik.handleSubmit}>
            <h2 className="titleH2">Welcome!</h2>
            <p className="paragraph">Enter your credentials to log in:</p>
            
            <div className="riga-form-login">
              <label htmlFor="username" className="form-label left">Username:</label>
              <input 
                type="text"                
                id="username"
                name="username" 
                className="form-control username" 
                placeholder="Enter your username" 
                onChange={formik.handleChange} 
                onBlur = {formik.handleBlur} 
              />
              {formik.errors.username && formik.touched.username ? (
                <ErrorMessage message={formik.errors.username} isError={false} /> 
              ) : null}
            </div>

            <div className="riga-form-login">
              <label htmlFor="email" className="form-label left">Email:</label>
              <input 
                 type="email"     
                 id="email" 
                 name="email"
                 className="form-control email"  
                 placeholder="Enter your email" 
                 onChange={formik.handleChange} 
                 onBlur = {formik.handleBlur} 
              />
              {formik.errors.email && formik.touched.email ? (
                <ErrorMessage message={formik.errors.email} isError={false} />
              ) : null}
            </div>

            <div className="riga-form-login">
              <label htmlFor="password" className="form-label left">Password:</label>
              <input 
                type="password"                        
                id="password" 
                name="password"
                className="form-control password" 
                placeholder="Enter your password" 
                onChange={formik.handleChange} 
                onBlur = {formik.handleBlur} />
              {formik.errors.password  && formik.touched.password ? (
                <ErrorMessage message={formik.errors.password} isError={false} /> 
              ): null}
            </div>

            
            <div className="div-btn">
                <button type="submit" className="btn">Log in <VscSignIn className="icon"/></button>
            </div>
            
            <div className="register-access"><span>You don't have an account? </span> <a href="" onClick ={() => navigate("/signup")}>Sign Up</a></div>

        </form>
  );
}




