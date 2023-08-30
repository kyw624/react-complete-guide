import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function handleFetchMovies() {
    console.log('Clicked');

    if (movies.length !== 0) {
      console.log('INIT!');
      setMovies([]);
    }

    fetch('https://swapi.dev/api/films')
      .then((response) => {
        console.log('Fetching...');
        return response.json();
      })
      .then((data) => {
        console.log('Done!');

        const newData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });

        console.log(newData);
        setMovies(newData);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
