import { TFormValues } from "./LoginForm";
import { REQUIRED_FIELD } from "../labels";

export const isEmptyString = (errorMessage: string) => (value: string) => {
  let isValid = true;
  isValid = value !== "";
  return isValid ? "" : errorMessage;
};

export const validationRules: {[index: string]:any} = {
  username: isEmptyString(REQUIRED_FIELD),
  email: isEmptyString(REQUIRED_FIELD),
  password: isEmptyString(REQUIRED_FIELD),
};

export function validate(formValues: TFormValues) {
  const errors:{[index: string]:any} = {};
  for (const key in formValues) {
    const validationFunction = validationRules[key];
    const error = validationFunction(formValues[key]);
    if (error) errors[key] = error;
  }
  return errors;
}

// const isNameValid = validateValue(formValues.name);
//     if (!isNameValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         name: REQUIRED_FIELD,
//       }));
//     }

//     const isLastnameValid = validateValue(formValues.lastname);
//     if (!isLastnameValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         lastname: REQUIRED_FIELD,
//       }));
//     }

//     const isUsernameValid = validateValue(formValues.username);
    
//     if (!isUsernameValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         username: REQUIRED_FIELD,
//       }));
//     } 

//     const isEmailValid = validateValue(formValues.email);
//     const validEmail = RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

//     if (!isEmailValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         email: REQUIRED_FIELD,
//       }));
//     } else {
//       if (!formValues.email.match(validEmail)) {
//         setFormErrors((prevState: any) => ({
//           ...prevState, 
//           email: INVALID_EMAIL,
//         }));
//     } 
//   }
      
//     const isPasswordValid = validateValue(formValues.password);
//     if (!isPasswordValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         password: REQUIRED_FIELD,
//       }));
//     }

//     const isConfirmPasswordValid = validateValue(formValues.confirmpassword);
    
//     if (!isConfirmPasswordValid) {
//       setFormErrors((prevState: any) => ({
//         ...prevState, 
//         confirmpassword: REQUIRED_FIELD,
//       }));
//     } else {
//      if (formValues.password !== formValues.confirmpassword) {
//           setFormErrors((prevState: any) => ({
//             ...prevState, 
//             confirmpassword: MATCH_PASSWORD,
//           }));
//     }
//   }
  
//     if (isNameValid && isLastnameValid && isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
//       changeContent(formValues);
//     }
        
//   };
