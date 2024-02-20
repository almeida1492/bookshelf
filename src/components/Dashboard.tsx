import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";

export function Dashboard() {
  const { username } = useContext(StateContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((result) => result.json())
      .then((obj) => setData(obj));
  }, []);

  return (
    <div className="bookshelf">
      {data.map((item) => (
        <div className="book">
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
  );
}
