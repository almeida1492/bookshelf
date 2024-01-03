import React, { useEffect, useState } from "react";

export type TFormValues = { username: ""; password: "" };

export function LoginForm({
  changeContent,
}: {
  changeContent: (credentials: TFormValues) => void;
}) {
  const [formValues, setFormValues] = useState<TFormValues>({
    username: "",
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
    <form className="login-panel" onSubmit={handleSubmit}>
      <input id="username" placeholder="username" onChange={handleChange} />
      <input id="password" placeholder="password" onChange={handleChange} />
      <button type="submit" className="submit-button">
        submit
      </button>
    </form>
  );
}
