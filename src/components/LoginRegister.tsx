import React, { useEffect, useState } from "react";
import { CAMPO_OBBLIGATORIO } from "./labels";

function validateValue(value: string) {
    let isValid = true;
    isValid = value !== "";
    return isValid;
}

function validateemail(value: string, value1: string) {
    let isValid = true;
    isValid = ( value == value1);
    console.log(value);
    console.log(value1);
    console.log('isvalid'+isValid);
    return isValid;
}
function validateemail1(value: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isValid = (value.match(emailRegex));
    return isValid;
}

export type TFormValues = { 
    nome: string,
    cognome: string,
    email : string,
    username:string ,
    password:string,
    confermapassword:string
 };
export type TFormErrors = TFormValues;

export function LoginRegister() {

    const [formValues, setFormValues] = useState<TFormValues>({
        nome: "",
        cognome: "",
        email :"",
        username:"",
        password:"",
        confermapassword:""
      });
    
      const [formErrors, setFormErrors] = useState<TFormErrors>({
        nome: "",
        cognome: "",
        email :"",
        username:"",
        password:"",
        confermapassword:""
      });
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dt1 = validateValue(formValues.nome);
        const dt2 = validateValue(formValues.cognome);
        const dt3 = validateValue(formValues.email);
        const dt4 = validateValue(formValues.username);
        const dt5 = validateValue(formValues.password);
        const dt6 = validateValue(formValues.confermapassword);
        const dt7 = validateemail(formValues.password, formValues.confermapassword);
        const dt8 = validateemail1(formValues.password);

        if (!dt1) {
          setFormErrors((statoVecchio) => ({
            ...statoVecchio, 
            nome: CAMPO_OBBLIGATORIO,
          }));
        }
        
        if (!dt2) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              cognome: CAMPO_OBBLIGATORIO,
            }));
          }
          
        if (!dt3) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              email: CAMPO_OBBLIGATORIO,
            }));
          }
          
        if (!dt4) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              username: CAMPO_OBBLIGATORIO,
            }));
          }
          
        if (!dt5) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              password: CAMPO_OBBLIGATORIO,
            }));
          }
          
        if (!dt6) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              confermapassword: CAMPO_OBBLIGATORIO,
            }));
          }
        console.log('dt7'+dt7);
          if (!dt7) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              confermapassword: 'Password diversa',
            }));
          }
          if (!dt8) {
            setFormErrors((statoVecchio) => ({
              ...statoVecchio, 
              password: 'Password invalida',
            }));
          }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const id = e.target.id;
        setFormValues((prevState) => ({ ...prevState, [id]: value }));
      };
    

    return (
    <form className="login-panel" onSubmit={handleSubmit}>
    
    <input
      id="nome"  
      placeholder="nome"
      onChange={handleChange}
    />
    
    {formErrors.nome ? (
      <ErrorMessage message={formErrors.nome} />
    ) : null}
    
    <input
      id="cognome"
      placeholder="cognome"
      onChange={handleChange}
    
    />
    
    {formErrors.cognome ? (<ErrorMessage message={formErrors.cognome} /> ) : null}

    <input
      id="email"
      placeholder="email"
      onChange={handleChange}
    />
    
    {formErrors.email ? (<ErrorMessage message={formErrors.email} /> ) : null}
    
    <input
      id="username"
      placeholder="username"
      onChange={handleChange}
    />
    
    {formErrors.username ? (<ErrorMessage message={formErrors.username} /> ) : null}

    <input
      id="password"
      placeholder="password"
      onChange={handleChange}
    />
    
    {formErrors.password ? (<ErrorMessage message={formErrors.password} /> ) : null}

    <input
      id="confermapassword"
      placeholder="confermapassword"
      onChange={handleChange}
    />

    {formErrors.confermapassword ? (<ErrorMessage message={formErrors.confermapassword} /> ) : null}

    <button type="submit" className="submit-button">
      submit
    </button>
  </form>
    );
}
function ErrorMessage({ message }: { message: string }) {
    return <span className="error-message">{message}</span>;
}
