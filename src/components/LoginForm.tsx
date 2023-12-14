import React, { useState } from "react";

export function LoginForm() {
  return (
    <form className="login-panel">
      <input placeholder="username" />
      <input placeholder="password" />
      <button className="submit-button">submit</button>
    </form>
  );
}
