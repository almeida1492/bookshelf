import React from "react";

export function Dashboard({ username }: { username: string }) {
  return (
    <div>
      <p>Welcome {username}!</p>
    </div>
  );
}
