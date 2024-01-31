import React, { useContext } from "react";
import { StateContext } from "../App";

export function Dashboard() {
  const { username } = useContext(StateContext);
  return <div>Welcome {username}</div>;
}
