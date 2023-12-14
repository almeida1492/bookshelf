import React from "react";

export function Header(props: { title: string }) {
  return (
    <div className="header">
      <h1>{props.title} hey this is an update</h1>
    </div>
  );
}
