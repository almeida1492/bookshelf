import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertButton } from './AlertButton';

export type TData = {
  cover_image: string;
  title: string;
  author: string;
  publication_year: string;
  genre: string[];
  description: string;
};
export function BookDetails() {
  // con queste due righe recupero i valori di query params
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  // con questo useState faccio lo storage dei dati
  const [book, setBook] = useState<TData>([]);

  // Fetch e gestione della no lettura dell'API
  const [status, setStatus] = useState<
    'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'
  >('IDLE');

  // se lo status è 200, vuole dire che è andato a buon fine
  useEffect(() => {
    setStatus('LOADING');
    fetch(`https://freetestapi.com/api/v1/books/${query.get('id')}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) => {
        setStatus('SUCCESS');
        setBook(data);
      })
      .catch((err) => {
        setStatus('ERROR');
        console.error(err);
      });
  }, []);

  return (
    <div>
      {status === 'SUCCESS' ? (
        <>
          <h2 className='titleH2'>Book Details</h2>
          {book !== undefined && (
            <>
              <img className='cover' src={book.cover_image} height={100} />
              <ul>
                <li><b>Title:</b> {book.title}</li>
                <li><b>Author:</b> {book.author}</li>
                <li><b>Year:</b> {book.publication_year}</li>
                <li><b>Genre:</b>
                  
                  {book.genre?.map((item) => <ol> {item} </ol>)}
                </li>
                <li><b>Description:</b> {book.description}</li>
              </ul>
            </>
          )}

          <div className='btn-details-book'>
            <Link to='/' className='btn-book-details'>
              Turn to Dashboard
            </Link>
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

// usando backtick (``) template literal, riesco a fare interpolazioni di variabili (${}), cioè a passare l'id (sul browser ?id=12345)

// Per fare la chiamata fetch(chiamata asincrona) dentro un component react, devo dichiarare prima un useEffect, perché tutte le chiamate devono essere sincrone.Prima abbiamo una funzione e dopo un array. Mi ritorna una promise(API di js), questa promise avrà come metodo then (potrebbe essere catch o finally), e questo metodo viene chiamato quando la chiamata asincrona viene risolta. Quindi il browser trova la riga dove c'è un fetch con argomento la URL https://freetestapi.com/api/v1/books/1, quindi il browser va a performare la chiamata http nella network che va sull'internet a cercare quell'endpoint(asincrono). Quindi il flusso dell'applicazione va avanti e quindi questa chiamata si apre in un nuovo proceso paralello al resto del browser per fare la richiesta. Il metodo then viene eseguito quando fetch("https://freetestapi.com/api/v1/books/1") finisce. Questi dati arrivano come string, quindi devono diventare json per essere leggibili(asincrono), mi ritorna un'altra promise e quindi devo chiamare di nuovo then per avere i dati . La variazione dei valori passerano string in variabili, li recupero con l'oggetto query, metodo get, prende como argomento la chiave del parametro

// useEffect(() => {
//   fetch(`https://freetestapi.com/api/v1/books/${query.get('id')}`)
//     .then((result) => result.json())
//     .then((data) => setBook(data));
// }, []);
