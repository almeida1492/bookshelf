import React, { Fragment, useEffect, useState, } from "react";
import {
  useLocation, useNavigate, useParams,
} from "react-router-dom";

export function BookDetails() {

  const navigate = useNavigate();
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
    <div className="container">

      {status === "SUCCESS" ? (
        <>

          {book !== undefined && (
            <>
              <h1> Book #{book.id} </h1>
              <div className="book">
                <div className="image-space">
                  <img className="book-cover" src={book.cover_image} />
                </div>

                <div className="testo">
                  <b>Titolo:</b> {book.title}
                </div>
                <div className="testo">
                  <b>Autore:</b> {book.author}
                </div>
                <div className="testo">
                  <b>Anno:</b> {book.publication_year}
                </div>
                <div className="testo">
                  <b>Genere:</b>
                  {book.genre?.map((item) => (
                    <li>{book.genre}</li>))}
                </div>
                <div className="testo">
                  <b>Descrizione:</b> {book.description}
                </div>

              </div>
            </>
          )}

        </>
      ) : status === "ERROR" ? (

        <div>Ops...something went wrong</div>

      ) : status === "LOADING" ? (
        <div className="loader"> <p className="loader-text">LOADING...</p></div>
      ) : null}


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