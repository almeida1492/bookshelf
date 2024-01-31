import { TFormValues } from "./SignUp";
import { MATCH_PASSWORD, REQUIRED_FIELD, REQUIRED_FIELD_BOOLEAN } from "../labels";

export const isEmptyString = (errorMessage: string) => (value: string) => {
  let isValid = true;
  isValid = value !== "";
  return isValid ? "" : errorMessage;
};

export const isEmptyBoolean = (errorMessage: boolean) => (value: boolean) => {
  let isValid = true;
  isValid = value !== true;
  return isValid ? true : errorMessage;
};

export const validationRules: {[index: string]:any} = {
  name: isEmptyString(REQUIRED_FIELD),
  lastname: isEmptyString(REQUIRED_FIELD),
  gender: isEmptyString(REQUIRED_FIELD),
  maritalstatus: isEmptyString(REQUIRED_FIELD),
  driverlicense: isEmptyBoolean(REQUIRED_FIELD_BOOLEAN),
  carowner: isEmptyBoolean(REQUIRED_FIELD_BOOLEAN),
  username: isEmptyString(REQUIRED_FIELD),
  email: isEmptyString(REQUIRED_FIELD),
  password: isEmptyString(REQUIRED_FIELD),
  confirmpassword: isEmptyString(REQUIRED_FIELD),
};

export function validate(formValues: TFormValues) {
  const errors: {[index: string]:any} = {};
  for (const key in formValues) {
    const validationFunction = validationRules[key];
    const error  = validationFunction(formValues[key]);
    if (error) errors[key] = error;
  }
  return errors;
}



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
  

