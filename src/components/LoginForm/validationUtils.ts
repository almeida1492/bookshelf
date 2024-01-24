import { TFormValues } from "./LoginForm";

export const isEmptyString = (errorMessage: string) => (value: string) => {
  let isValid = true;
  isValid = value !== "";
  return isValid ? "" : errorMessage;
};

export const validationRules = {
  username: isEmptyString("Required"),
  password: isEmptyString("Required"),
};

export function validate(formValues: TFormValues) {
  const errors = {};
  for (const key in formValues) {
    const validationFunction = validationRules[key];
    const error = validationFunction(formValues[key]);
    if (error) errors[key] = error;
  }
  return errors;
}
