import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";

type TData = {cover_image:string; title: string; author: string; publication_year: string; genre: string; description: string }

export function Dashboard() {
  const { username } = useContext(StateContext);
  
  const [data, setData] = useState<TData[]>([]);
  const [selectedGenre, setSelectedGenre] = useState();

  // chiamata asincrona
  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((result) => result.json())
      .then((data) => setData(data));
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <>
      <h1>Bookshelf</h1>
      
      <div className="container">
        <div className="select-option">
          <p>Select a genre option of your interest:</p>
          {/* con questo indico il genre da selezionare per fare il filtro 
              flatMap(): per mappare ogni elemento dell'array data in un array di generi.
              new Set(): per rimuovere i duplicati dal nuovo array generato.
              map(): per trasformare ogni genere unico in un'opzione nel menu a discesa   */}
          <select className="select-field" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
              {[...new Set(data.flatMap(item => item.genre))].sort().map(genre => (
            <option key={genre} value={genre} >{genre}</option>
            ))}64

          </select>
        </div>
        <div className="bookshelf">
          {data.map((item) => {
            // Per verificare se il genre del libro corrisponde al genre selezionato
            
            if (!selectedGenre || item.genre.includes(selectedGenre)) {
              return (
                <div className="book">
                  <div className="image-space">
                    <img className="cover" src={item.cover_image}  />
                  </div>
                  <div>
                    <div className="testo">
                      <b>Titolo:</b> {item.title}
                    </div>
                    <div className="testo">
                      <b>Autore:</b> {item.author}
                    </div>
                    <div className="testo">
                      <b>Anno:</b> {item.publication_year}
                    </div>
                    <div className="testo">
                      <b>Genere:</b> {item.genre[0]}, {item.genre[1]}
                    </div>
                    <div className="testo">
                      <b>Descrizione:</b> {item.description}
                    </div>
                  </div>
                </div>
              );
            }
            
          })}
        </div>
      </div>
    </>
  );
}
