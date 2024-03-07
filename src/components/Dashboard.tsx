import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((result) => result.json())
      .then((obj) => setData(obj));

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: jwt,
        },
      })
        .then((res) => res.json())
        .then((res) => setName(res.firstName));
    }
  }, []);

  return (
    <div>
      <div style={{ textAlign: "end", margin: 16 }}>
        <button
          onClick={() => {
            localStorage.removeItem("jwt");
            navigate("/login");
          }}
        >
          log out
        </button>
      </div>
      <div>
        <h2>Welcome {name}</h2>
      </div>
      <div className="bookshelf">
        {data.map((item) => (
          <div
            className="book"
            key={item.id}
            onClick={() => navigate(`/details?id=${item.id}`)}
          >
            <img className="cover" src={item.cover_image} height={100} />
            <div>
              <b>Titolo:</b> {item.title}
            </div>
            <div>
              <b>Autore:</b> {item.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
