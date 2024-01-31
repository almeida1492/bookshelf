import React, { useEffect, useState, useContext } from "react";
import { VscSignIn } from "react-icons/vsc";
import { REQUIRED_FIELD } from "../labels";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { isEmptyString, validate } from "./validationUtils";
import { ErrorMessage } from "../ErrorMessage";


export type TFormValues = { username: string; email: string; password: string };
export type TFormErrors = TFormValues;

export function LoginForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(StateContext);
  
  const [formValues, setFormValues] = useState<TFormValues>({
    username: "",
    email: "",
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState<TFormErrors>({
    username: "",
    email: "",
    password: "",
  });

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(formValues);
    //prende tutte le keys di un oggetto
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

    
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    const isValueValid = validate(formValues);
    if (Object.keys(isValueValid).length === 0) {
      dispatch({
        type: "UPDATE_USERNAME",
        payload: formValues.username,
      });
      navigate("/");
    } else {
      setFormErrors(isValueValid);
    }
  };
          
  useEffect(() => {
    console.log("The component LoginForm was mounted");
    return () => console.log("The component LoginForm was unmounted");
  }, []);

  // questa è una funzione jsx
  return (
    <form className="login-panel" onSubmit={handleSubmit}>
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
                onChange={handleChange} 
                onBlur = {handleBlur} 
              />
              {formErrors.username ? (
                <ErrorMessage message={formErrors.username} /> 
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
                 onChange={handleChange} 
                 onBlur = {handleBlur} 
              />
              {formErrors.email ? (
                <ErrorMessage message= {formErrors.email} />
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
                onChange={handleChange} 
                onBlur = {handleBlur} />
              {formErrors.password ? (
                <ErrorMessage message= {formErrors.password} /> 
              ): null}
            </div>

            
            <div className="div-btn">
                <button type="submit" className="btn">Log in <VscSignIn className="icon"/></button>
            </div>
            
            <div className="register-access"><span>You don't have an account? </span> <a href="" onClick ={() => navigate("/signup")}>Sign Up</a></div>

        </form>
  );
}




