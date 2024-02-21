import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { username } = useContext(StateContext);
  const navigate = useNavigate();

  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((result) => result.json())
      .then((obj) => setData(obj));
  }, []);

  return (
    <div>
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
