import React from "react";

export function ErrorMessage({ message }: { message: string }) {
  return <span className="error-message">{message}</span>;
}
