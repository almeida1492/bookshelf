import React, { useState, useContext, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { ErrorMessage } from "../ErrorMessage";
import { GiArchiveRegister } from "react-icons/gi";
import { REQUIRED_FIELD } from "../labels";
import { MATCH_PASSWORD } from "../labels";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import YUP, { date } from "yup";


export type TFormValues = { name: string; lastname: string; gender: string; maritalstatus: string; age: string; phonenumber: string; birthdate: string; citizenship: string; linkedin: string; photo: string; username: string; email: string; password: string; confirmpassword: string; privacypolicy: boolean };

export type TFormErrors = TFormValues;

export function SignUp() {
  const navigate = useNavigate();

  const { dispatch } = useContext(StateContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      gender: "",
      maritalstatus: "",
      age: "",
      phonenumber: "",
      birthdate:"",
      citizenship: "",
      linkedin: "",
      photo: {},
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      privacypolicy: false,
    },

    validationSchema: validationSchema,

    validateOnChange: true,

    validateOnBlur: true, 

    onSubmit:(values) => {
      dispatch({
        type: "UPDATE_USERNAME",
        payload: values.username,
      });
      navigate("/");
    },
  });
    

  return (
    <form  className="login-panel" onSubmit= {formik.handleSubmit}>
      <h2 className="titleH2">Sign Up!</h2>
      <p className="paragraph">Enter your credentials to sign up:</p>
      <div className="col">
        <div className="riga-form-register ">
          <label htmlFor="name" className="form-label left">Name:</label>
          <input 
            id="name" 
            className="form-control name right" 
            placeholder="Enter your name" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.name && formik.touched.name ? (
            <ErrorMessage message={formik.errors.name} isError={false} /> 
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="lastname" className="form-label left">Last Name:</label>
          <input 
            id="lastname" 
            className="form-control lastname" 
            placeholder="Enter your last name" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <ErrorMessage message={formik.errors.lastname} isError={false} /> 
            ) : null}
        </div>
            
      </div>
      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="gender" className="form-label left">Gender:</label>
          <select 
            id="gender" 
            className="form-control gender"    
            defaultValue="Choose an option"
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}     
          >
               
            <option value="" hidden>Choose an option</option>
            <option value={"Female"}>Female</option>
            <option value={"Male"}>Male</option>
            <option value={"Other"}>Other</option>
                  
          </select>
          {formik.errors.gender && formik.touched.gender ? (
            <ErrorMessage message={formik.errors.gender} isError={false} /> 
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="maritalstatus" className="form-label left">Marital Status:</label>
          <select 
            id="maritalstatus" 
            className="form-control maritalstatus" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}     
          >
            <option value="" hidden>Choose an option</option>
            <option value={"Not married"}>Not married</option>
            <option value={"Married"}>Married</option>
            <option value={"Common-law married"}>Common-law married</option>
            <option value={"Separeted"}>Separeted</option>
            <option value={"Divorced"}>Divorced</option>
            <option value={"Widowed"}>Widowed</option>
          </select>
          {formik.errors.maritalstatus && formik.touched.maritalstatus ? (
            <ErrorMessage message={formik.errors.maritalstatus} isError={false} /> 
            ) : null}
        </div>
      </div>

      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="age" className="form-label left">Age:</label>
          <input
            id="age" 
            className="form-control age" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}   
          />
          {formik.errors.age && formik.touched.age ? (
            <ErrorMessage message={formik.errors.age} isError={false} />  
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="phonenumber" className="form-label left">Phone Number:</label>
          <input
            type="tel"
            id="phonenumber" 
            className="form-control phonenumber"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}  
          />
          {formik.errors.phonenumber && formik.touched.phonenumber ? (
            <ErrorMessage message={formik.errors.phonenumber} isError={false} />  
            ) : null}
        </div>
      </div>

      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="birthdate" className="form-label left">Birth Date:</label>
          <input 
            id="birthdate"
            type="date"
            className="form-control birthdate"  
            placeholder="Enter your birthdate" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.birthdate && formik.touched.birthdate ? (
            <ErrorMessage message={formik.errors.birthdate} isError={false} />
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="citizenship" className="form-label left">Citizenship:</label>
          <textarea 
            id="citizenship" 
            className="form-control citizenship" 
            placeholder="citiszenship" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.citizenship && formik.touched.citizenship ? (
            <ErrorMessage message={formik.errors.citizenship} isError={false} /> 
            ) : null}
        </div>
      </div>

      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="linkedin" className="form-label left">Linkedin:</label>
          <input 
            id="linkedin"
            type="url"
            className="form-control linkedin"  
            placeholder="Enter your linkedin address" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}  
          />
          {formik.errors.linkedin && formik.touched.linkedin ? (
            <ErrorMessage message={formik.errors.linkedin} isError={false} />
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="photo" className="form-label left">Photo:</label>
          <input 
            id="photo"
            type="file"
            accept=".jpg, .jpeg, .png, .svg, .gif"
            className="form-control photo"  
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.photo && formik.touched.photo ? (
            <ErrorMessage message={formik.errors.photo} isError={false} />
            ) : null}
        </div>

      </div>

      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="email" className="form-label left">Email:</label>
          <input 
            id="email" 
            className="form-control email"  
            placeholder="Enter your email" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}  
          />
          {formik.errors.email && formik.touched.email ? (
            <ErrorMessage message={formik.errors.email} isError={false} />
            ) : null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="username" className="form-label left">Username:</label>
          <input 
            id="username" 
            className="form-control username" 
            placeholder="Enter your username" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}  
          />
          {formik.errors.username && formik.touched.username ? (
            <ErrorMessage message={formik.errors.username} isError={false} /> 
            ) : null}
        </div>
      </div>

              
      <div className="col">
        <div className="riga-form-register">
          <label htmlFor="password" className="form-label left">Password:</label>
          <input 
            id="password" 
            type="password"
            className="form-control password" 
            placeholder="Enter your password" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          {formik.errors.password && formik.touched.password ? (
            <ErrorMessage message={formik.errors.password} isError={false} /> 
            ): null}
        </div>

        <div className="riga-form-register">
          <label htmlFor="confirmpassword" className="form-label left">Confirm password:</label>
          <input 
            id="confirmpassword" 
            type="password"
            className="form-control confirmpassword" 
            placeholder="Confirm your password" 
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur}  
          />
          {formik.errors.confirmpassword && formik.touched.confirmpassword ? (
            <ErrorMessage message={formik.errors.confirmpassword} isError={false} /> 
            ): null}    
        </div>
      </div>
                
      <div className="col">
        <div className="privacypolicyline">
          <input
            type="checkbox"
            id="privacypolicy" 
            className="form-control privacypolicy" 
            
            onChange={formik.handleChange} 
            onBlur = {formik.handleBlur} 
          />
          <label htmlFor="privacypolicy" className="form-label privacypolicy">Policy privacy</label>
          {formik.errors.privacypolicy  && formik.touched.privacypolicy ? (
            <ErrorMessage message={formik.errors.privacypolicy} isError={false} />  
            ) : null}
        </div>
      </div>

      <div className="div-btn">
        <button type="submit" className="btn">Sign Up <GiArchiveRegister className="icon"/></button>
      </div>
  
    </form>
  );

}

