import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { AlertButton } from './AlertButton';

export type TData = {
  cover_image: string;
  title: string;
  author: string;
  publication_year: string;
  genre: string[];
  description: string;
};

export function Dashboard() {
  const { username } = useContext(StateContext);

  const [data, setData] = useState<Array<any>>([]);

  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();

  // fetch fa una chiamata asincrona
  // useEffect(() => {
  //   fetch("https://freetestapi.com/api/v1/books")
  //     .then((result) => result.json())
  //     .then((data) => setData(data));
  // }, []);
  const [status, setStatus] = useState<
    'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'
  >('IDLE');

  // se lo status è 200, vuole dire che è andato a buon fine
  useEffect(() => {
    setStatus('LOADING');
    fetch('https://freetestapi.com/api/v1/books')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => {
        setStatus('SUCCESS');
        setData(data);
      })
      .catch((err) => {
        setStatus('ERROR');
        console.error(err);
      });
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };
  // flatMap(): per mappare ogni elemento dell'array data in un array di generi.
  // new Set(): per rimuovere i duplicati dal nuovo array generato.
  // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  const options = useMemo(() => {
    return new Set(data.flatMap((item) => item.genre));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      {status === 'SUCCESS' ? (
        <>
          <h1>Bookshelf</h1>

          <div className='container'>
            <div className='select-option'>
              <p>Select a genre option of your interest:</p>
              {/* con questo indico il genre da selezionare per fare il filtro 
              
              map(): per trasformare ogni genere unico in un'opzione nel menu a discesa   */}
              <select
                className='select-field'
                value={selectedGenre}
                onChange={handleGenreChange}
              >
                <option value=''>All</option>
                {[...options].sort().map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className='bookshelf'>
              {data.map((item) => {
                // Per verificare se il genre del libro corrisponde al genre selezionato

                if (!selectedGenre || item.genre.includes(selectedGenre)) {
                  return (
                    <>
                      <div className='book' key={item.id}>
                        <div className='image-space'>
                          <img src={item.cover_image} />
                        </div>
                        <div className='block-text'>
                          <div className='text'>
                            <b>Title:</b> {item.title}
                          </div>
                          <div className='text'>
                            <b>Author:</b> {item.author}
                          </div>
                          <div className='text'>
                            <b>Year:</b> {item.publication_year}
                          </div>
                          <div className='text'>
                            <b>Genre:</b> {item.genre[0]}, {item.genre[1]}
                          </div>
                          <div className='text'>
                            <b>Description:</b> {item.description}
                          </div>
                        </div>
                        <div className='btn-details'>
                          <button
                            type='button'
                            className='btn-book-details'
                            onClick={() =>
                              navigate(`/bookdetails?id=${item.id}`)
                            }
                          >
                            Book details
                          </button>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </>
      ) : status === 'ERROR' ? (
        <AlertButton />
      ) : status === 'LOADING' ? (
        <div>
          <div className='loader'></div>
        </div>
      ) : null}
    </div>
  );
}
