import React, { useEffect, useState } from "react";
import "./app.css";

type TUsers = { id: string; name: string; email: string };

export function App() {
  const [users, setUsers] = useState<TUsers[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  return (
    <div className="app">
      <h1>Bookshelf App</h1>
      <h2>This is a starter app template</h2>
      <br />
      <div>
        <p>
          The <b>React application</b> is served on port 1234, while the{" "}
          <b>SQLite</b> database is served on port 3000. The data you see below
          comes from a .db file, and you can find it within the repository, at
          prisma/.db.
        </p>
        <p>
          At the moment, you can edit the data inside the db by running{" "}
          <b>Prisma Studio</b> with the following command:
        </p>
        <ul>
          <li>
            <i>npx prisma studio</i>
          </li>
        </ul>
        <br />
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
