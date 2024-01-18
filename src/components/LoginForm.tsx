import React, { useEffect, useState } from "react";
import { VscSignIn } from "react-icons/vsc";
import { REQUIRED_FIELD } from "./label";



function validateValue(value: string) {
  let isValid = true;
  isValid = value !== "";
  return isValid;

}

export type TFormValues = { username: string; email: string; password: string; };
export type TFormErrors = TFormValues;

export function LoginForm({
  changeContent,
}: {
  changeContent: (credentials: TFormValues) => void;
}) {
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
    
    const isUsernameValid = validateValue(formValues.username);
    if (!isUsernameValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        username: REQUIRED_FIELD,
      }));
    }
   
    const isEmailValid = validateValue(formValues.email);
    if (!isEmailValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        email: REQUIRED_FIELD,
      }));
    }
    
    const isPasswordValid = validateValue(formValues.password);
    if (!isPasswordValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        password: REQUIRED_FIELD,
      }));
    }

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      changeContent(formValues);
    }
        
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setFormValues((prevState: any) => ({ ...prevState, [id]: value }));
  };

    
    const handleBlur = (e: { target: { id: any; value: any; }; }) => {
      const value = e.target.value;
      const id = e.target.id;
      const isValueValid = validateValue(value);
      if (!isValueValid) {
        setFormErrors((prevState: any) => ({ 
          ...prevState, 
          [id]: REQUIRED_FIELD,
        }));
      } else {
        setFormErrors((prevState: any) => ({
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
    <form onSubmit={handleSubmit} className="login-panel">
            <h2 className="titleH2">Welcome!</h2>
            <p className="paragraph">Enter your credentials to log in:</p>
            
            <div className="riga-form-login">
              <label htmlFor="username" className="form-label left">Username:</label>
              <input type="text" name="username" id="username" className="form-control username" placeholder="Enter your username" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.username ? (
                <ErrorMessage message= {formErrors.username} /> 
              ) : null}
            </div>

            <div className="riga-form-login">
              <label htmlFor="email" className="form-label left">Email:</label>
              <input type="email" name="email" id="email" className="form-control email"  placeholder="Enter your email" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.email ? (
                <ErrorMessage message= {formErrors.email} />
              ) : null}
            </div>

            <div className="riga-form-login">
              <label htmlFor="password" className="form-label left">Password:</label>
              <input type="password" name="password" id="password" className="form-control password" placeholder="Enter your password" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.password ? (
                <ErrorMessage message= {formErrors.password } /> 
              ): null}
            </div>

            
            <div className="div-btn">
                <button type="submit" className="btn">Log in <VscSignIn className="icon"/></button>
            </div>
            
            <div className="register-access"><span>You don't have an account?  Sign Up </span> <a href="/SignUp"> Sign Up </a> </div>
        </form>
  );
}

function ErrorMessage({ message }: { message: string }){
  return <span className="error-message">{message}</span>
}


