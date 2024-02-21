import React, { useContext, useEffect, useMemo, useState, } from "react";
import { StateContext } from "../App";
import { BrowserRouter, Route, RouterProvider, Routes, 
    createBrowserRouter, useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { App } from "../App";


type TData = {id: string; cover_image:string; title: string; author: string; 
    publication_year: string; genre: string; description: string }

export function BookDetails () {
  
 
  const [selectedId, setSelectedId] = useState();
  const [data, setData] = useState<TData[]>([]);

    useEffect(() => {
        fetch("https://freetestapi.com/api/v1/books")
          .then((result) => result.json())
          .then((data) => setData(data));
      }, []);

      const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value);
      };

      const options = useMemo( () => {return new Set (data.flatMap(item=>item.genre))}, [])
   

  const navigate = useNavigate();



  return (
<>
    <div className="container">

    <div className="select-option">
      <p>Select a SRH professional:</p>
      <select className="select-field" value={selectedId} onChange={handleIdChange}>
                <option value="">All</option>
                  {[...options].sort().map(id => (
                <option key={id} value={id} > {id} </option>
                ))}
    
              </select>
    
            </div>
    
    
            <div className="bookshelf">
              {data.map((item) => {
     if (!selectedId || item.genre.includes(selectedId)) {
      return (
        <div className="book">
    
          <div className="image-space">
            <img className="book-cover" src={item.cover_image}  />
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
      

  <div className="return-btn">
<div className="div-btn">
<button type="submit" className="btn"> 
<a href="" 
onClick ={() => navigate("/")}>Go back to the dashboard</a></button>
  </div>
  </div>
</>
)};