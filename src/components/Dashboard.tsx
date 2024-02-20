import React, { useContext, useEffect, useMemo, useState } from "react";
import { StateContext } from "../App";

type TData = {cover_image:string; title: string; author: string; publication_year: string; genre: string; description: string }

export function Dashboard() {
  const { username } = useContext(StateContext);

  const [data, setData] = useState<TData[]>([]);
  const [selectedGenre, setSelectedGenre] = useState();

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((result) => result.json())
      .then((data) => setData(data));
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const options = useMemo( () => {return new Set (data.flatMap(item=>item.genre))}, [])

  return (
    <>
    <div className="welcome-user"> 
    
    Welcome to Geen.ai, {username}
     
    </div>

<div className="container">

<div className="select-option">
  <p>Select a SRH professional:</p>
  <select className="select-field" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
              {[...new Set(data.flatMap(item => item.genre))].sort().map(genre => (
            <option key={genre} value={genre} >{genre}</option>
            ))}

          </select>
        </div>


        <div className="bookshelf">
          {data.map((item) => {
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

