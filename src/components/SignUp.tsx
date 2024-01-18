import React, { useEffect, useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { REQUIRED_FIELD } from "./label";
import { INVALID_EMAIL} from "./label";
import { MATCH_PASSWORD } from "./label";



function validateValue(value: string) {
  let isValid = true;
  isValid = value !== "";
  return isValid;

}

export type TFormValues = { name: string; lastname: string; username: string; email: string; password: string; confirmpassword: string };
export type TFormErrors = TFormValues;

export function SignUp({
  changeContent,
}: {
  changeContent: (credentials: TFormValues) => void;
}) {
  const [formValues, setFormValues] = useState<TFormValues>({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [formErrors, setFormErrors] = useState<TFormErrors>({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isNameValid = validateValue(formValues.name);
    if (!isNameValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        name: REQUIRED_FIELD,
      }));
    }

    const isLastnameValid = validateValue(formValues.lastname);
    if (!isLastnameValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        lastname: REQUIRED_FIELD,
      }));
    }

    const isUsernameValid = validateValue(formValues.username);
    
    if (!isUsernameValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        username: REQUIRED_FIELD,
      }));
    } 

    const isEmailValid = validateValue(formValues.email);
    const validEmail = RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    if (!isEmailValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        email: REQUIRED_FIELD,
      }));
    } else {
      if (!formValues.email.match(validEmail)) {
        setFormErrors((prevState: any) => ({
          ...prevState, 
          email: INVALID_EMAIL,
        }));
    } 
  }
      
    const isPasswordValid = validateValue(formValues.password);
    if (!isPasswordValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        password: REQUIRED_FIELD,
      }));
    }

    const isConfirmPasswordValid = validateValue(formValues.confirmpassword);
    
    if (!isConfirmPasswordValid) {
      setFormErrors((prevState: any) => ({
        ...prevState, 
        confirmpassword: REQUIRED_FIELD,
      }));
    } else {
     if (formValues.password !== formValues.confirmpassword) {
          setFormErrors((prevState: any) => ({
            ...prevState, 
            confirmpassword: MATCH_PASSWORD,
          }));
    }
  }
  
    if (isNameValid && isLastnameValid && isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
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
    <form onSubmit= {handleSubmit} className="login-panel">
            <h2 className="titleH2">Welcome!</h2>
            <p className="paragraph">Enter your credentials to register:</p>

            <div className="riga-form-register ">
              <label htmlFor="name" className="form-label left">Name:</label>
              <input type="text" name="name" id="name" className="form-control name right" placeholder="Enter your name" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.name ? (
                <ErrorMessage message= {formErrors.name} /> 
              ) : null}
            </div>

            <div className="riga-form-register">
              <label htmlFor="lastname" className="form-label left">Last Name:</label>
              <input type="text" name="lastname" id="lastname" className="form-control lastname" placeholder="Enter your last name" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.lastname ? (
                <ErrorMessage message= {formErrors.lastname} /> 
              ) : null}
            </div>

            <div className="riga-form-register">
              <label htmlFor="email" className="form-label left">Email:</label>
              <input type="email" name="email" id="email" className="form-control email"  placeholder="Enter your email" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.email ? (
                <ErrorMessage message= {formErrors.email} />
              ) : null}
             </div>

            <div className="riga-form-register">
              <label htmlFor="username" className="form-label left">Username:</label>
              <input type="text" name="username" id="username" className="form-control username" placeholder="Enter your username" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.username ? (
                <ErrorMessage message= {formErrors.username} /> 
              ) : null}
            </div>

            <div className="riga-form-register">
     
              <label htmlFor="password" className="form-label left">Password:</label>
              <input type="password" name="password" id="password" className="form-control password" placeholder="Enter your password" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.password ? (
                <ErrorMessage message= {formErrors.password } /> 
              ): null}
            </div>

            <div className="riga-form-register">
              <label htmlFor="confirmpassword" className="form-label left">Confirm password:</label>
              <input type="password" name="confirmpassword" id="confirmpassword" className="form-control confirmpassword" placeholder="Confirm your password" onChange={handleChange} onBlur = {handleBlur} />
              {formErrors.confirmpassword ? (
                <ErrorMessage message= {formErrors.confirmpassword } /> 
              ): null}    
            </div>
            
            <div className="div-btn">
                <button type="submit" className="btn">Register <GiArchiveRegister className="icon"/></button>
            </div>
            
        </form>
  );

}
function ErrorMessage({ message }: { message: string }){
  return <span className="error-message">{message}</span>
}
