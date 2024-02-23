import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  useLocation, useNavigate, useParams,
} from "react-router-dom";


type TData = { id: string; cover_image: string; title: string; author: string; publication_year: string; genre: string; description: string }

export function BookDetails() {


  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [book, setBook] = useState<TData[]>([]);


  useEffect(() => {
    fetch(`https://freetestapi.com/api/v1/books/${query.get("id")}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, []);

  return (
    <div className="container">
      <h1> Book #{book.id} </h1>

      {book !== undefined && (
        <>
          <div className="book">
            <div className="image-space">
              <img className="book-cover" src={book.cover_image} />
            </div>
            <ul>
              <div className="testo">
                <b> Titolo:</b> {book.title}
              </div>
              <div className="testo">
                <b>Autore:</b> {book.author}
              </div>
              <div className="testo">
                <b>Anno:</b> {book.publication_year}
              </div>
              <div className="testo">
                <b>Genere:</b> {book.genre},
              </div>
              <div className="testo">
                <b>Descrizione:</b> {book.description}
              </div>
            </ul>
          </div>
        </>
      )}

      <div className="return-btn">
        <div className="div-btn">
          <button type="submit" className="btn">
            <a href=""
              onClick={() => navigate("/")}>Go back to the dashboard</a></button>
        </div>
      </div>

    </div>

  );









}