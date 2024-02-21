import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function BookDetails() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [book, setBook] = useState();

  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");

  useEffect(() => {
    setStatus("LOADING");
    fetch(`https://freetestapi.com/api/v1/books/${query.get("id")}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setStatus("SUCCESS");
        setBook(data);
      })
      .catch((err) => {
        setStatus("ERROR");
        console.error(err);
      });
  }, []);

  return (
    <div>
      {status === "SUCCESS" ? (
        <>
          <h2>Book Details</h2>
          {book !== undefined && (
            <>
              <img className="cover" src={book.cover_image} height={100} />
              <ul>
                <li>Titolo: {book.title}</li>
                <li>Autore: {book.author}</li>
                <li>Anno: {book.publication_year}</li>
                <li>
                  Genere:
                  <ul>
                    {book.genre?.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>Descrizione: {book.description}</li>
              </ul>
            </>
          )}
        </>
      ) : status === "ERROR" ? (
        <div>Ops... Something went wrong</div>
      ) : status === "LOADING" ? (
        <div>LOADING...</div>
      ) : null}
    </div>
  );
}
