import React, { useEffect } from "react";

export function App() {
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => console.log(users));
  }, []);
  return <div>App</div>;
}
