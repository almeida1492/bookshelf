import React, { useEffect, useState } from "react";
import { VscSignIn } from "react-icons/vsc";

export type TFormValues = { username: ""; email: ""; password: "" };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeContent(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setFormValues((prevState) => ({ ...prevState, [id]: value }));
  };

  useEffect(() => {
    console.log("The component LoginForm was mounted");
    return () => console.log("The component LoginForm was unmounted");
  }, []);

  return (
    <form action="index.php" onSubmit={handleSubmit} className="login-panel">
            <h1 className="titleH1">Welcome!</h1>
            <p className="paragraph">Enter your credentials to log in:</p>

            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" name="username" id="username" className="form-control username" onChange={handleChange}  />

            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" name="email" id="email" className="form-control email" onChange={handleChange} />

            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" name="password" id="password" className="form-control password" onChange={handleChange} />

            <div className="div-btn">
                <button type="submit" className="btn">Sign in <VscSignIn className="icon"/></button>
            </div>
            
        </form>
  );
}
