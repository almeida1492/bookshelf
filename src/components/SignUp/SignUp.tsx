import React, { useEffect, useState, useContext, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { isEmptyString, validate } from "../SignUp/validationUtils";
import { ErrorMessage } from "../ErrorMessage";
import { GiArchiveRegister } from "react-icons/gi";
import { REQUIRED_FIELD } from "../labels";
import { INVALID_EMAIL} from "../labels";
import { MATCH_PASSWORD } from "../labels";

export type TFormValues = { name: string; lastname: string; gender: string; maritalstatus: string; driverlicense: boolean; carowner: boolean; username: string; email: string; password: string; confirmpassword: string; };

export type TFormErrors = TFormValues;

export function SignUp() {
  const navigate = useNavigate();
  const { dispatch } = useContext(StateContext);

  const [formValues, setFormValues] = useState<TFormValues>({
    name: "",
    lastname: "",
    gender: "",
    maritalstatus: "",
    driverlicense: true,
    carowner: true,
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
   
    
  });

  const [formErrors, setFormErrors] = useState<TFormValues>({
    name: "",
    lastname: "",
    gender: "",
    maritalstatus: "",
    driverlicense: true,
    carowner: true,
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    
  });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formValues);

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
    setFormValues((prevState: any) => ({ ...prevState, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.value;
    const id = e.target.id;
    setFormValues((prevState) => ({ ...prevState, [id]: checked }));
  }
  
  useEffect(() => {
    console.log("The component LoginForm was mounted");
    return () => console.log("The component LoginForm was unmounted");
  }, []);

  return (
    <form  className="login-panel" onSubmit= {handleSubmit}>
            <h2 className="titleH2">Sign Up!</h2>
            <p className="paragraph">Enter your credentials to sign up:</p>
            <div className="col">
              <div className="riga-form-register ">
                <label htmlFor="name" className="form-label left">Name:</label>
                <input 
                  id="name" 
                  className="form-control name right" 
                  placeholder="Enter your name" 
                  onChange={handleChange} 
                   
                />
                {formErrors.name ? (
                  <ErrorMessage message={formErrors.name} isError={false} /> 
                ) : null}
              </div>

              <div className="riga-form-register">
                <label htmlFor="lastname" className="form-label left">Last Name:</label>
                <input 
                  id="lastname" 
                  className="form-control lastname" 
                  placeholder="Enter your last name" 
                  onChange={handleChange} 
                  
                />
                {formErrors.lastname ? (
                  <ErrorMessage message={formErrors.lastname} isError={false} /> 
                ) : null}
              </div>
            
              </div>
              <div className="col">
            <div className="riga-form-register">
              <label htmlFor="gender" className="form-label left">Gender:</label>
              <select 
                id="gender" 
                className="form-control gender" 
                value={formValues.gender}
                defaultValue="Choose an option"
                onChange={handleChange} 
                
                >
               
                  <option value="" hidden>Choose an option</option>
                  <option value={"Another"}>Another</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Male"}>Male</option>
                  
                </select>
                {formErrors.gender ? (
                <ErrorMessage message={formErrors.gender} isError={false} /> 
              ) : null}
            </div>

            <div className="riga-form-register">
              <label htmlFor="maritalstatus" className="form-label left">Marital Status:</label>
              <select 
                id="maritalstatus" 
                className="form-control maritalstatus" 
                onChange={handleChange} 
                 
                >
                  <option value="" hidden>Choose an option</option>
                  <option value={"Not married"}>Not married</option>
                  <option value={"Married"}>Married</option>
                  <option value={"Common-law married"}>Common-law married</option>
                  <option value={"Separeted"}>Separeted</option>
                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Widowed"}>Widowed</option>
                </select>
              {formErrors.maritalstatus ? (
                <ErrorMessage message={formErrors.maritalstatus} isError={false} /> 
              ) : null}
            </div>
            </div>

            <div className="col">
              <div className="riga-form-register">
                <label htmlFor="driverlicense" className="form-label left">Driver's license?</label>
                <input
                  type="checkbox"
                  id="driverlicense" 
                  className="form-control driverlicense" 
                  onChange={handleCheckboxChange} 
                  
                />
                {formErrors.carowner ? (
                  <ErrorMessage message={formErrors.driverlicense} isError={false} />  
                ) : null}
              </div>

              <div className="riga-form-register">
                <label htmlFor="carowner" className="form-label left">Car owner?</label>
                <input
                  type="checkbox"
                  id="carowner" 
                  className="form-control carowner"  
                  onChange={handleCheckboxChange} 
                   
                />
                {formErrors.carowner ? (
                  <ErrorMessage message={formErrors.carowner} isError={false} />  
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
                  onChange={handleChange} 
                  
                />
                {formErrors.email ? (
                  <ErrorMessage message={formErrors.email} isError={false} />
                ) : null}
              </div>

              <div className="riga-form-register">
              <label htmlFor="username" className="form-label left">Username:</label>
              <input 
                id="username" 
                className="form-control username" 
                placeholder="Enter your username" 
                onChange={handleChange} 
                
              />
              {formErrors.username ? (
                <ErrorMessage message={formErrors.username} isError={false} /> 
              ) : null}
              </div>
              </div>

            
              <div className="col">
            <div className="riga-form-register">
     
              <label htmlFor="password" className="form-label left">Password:</label>
              <input 
                id="password" 
                className="form-control password" 
                placeholder="Enter your password" 
                onChange={handleChange} 
                 
              />
              {formErrors.password ? (
                <ErrorMessage message={formErrors.password} isError={false} /> 
              ): null}
            </div>

            <div className="riga-form-register">
              <label htmlFor="confirmpassword" className="form-label left">Confirm password:</label>
              <input 
                id="confirmpassword" 
                className="form-control confirmpassword" 
                placeholder="Confirm your password" 
                onChange={handleChange} 
                 
              />
              {formErrors.confirmpassword ? (
                <ErrorMessage message={formErrors.confirmpassword} isError={false} /> 
              ): null}    
            </div>
            </div>
            <div className="div-btn">
                <button type="submit" className="btn">Sign Up <GiArchiveRegister className="icon"/></button>
            </div>
            
        </form>
  );

}

