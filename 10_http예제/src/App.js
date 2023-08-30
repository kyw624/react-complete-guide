import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFetchMovies() {
    console.log('Clicked');

    console.log('Loading...');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films');
      console.log('Fetching...');

      if (!response.ok) {
        throw new Error('Error! Something went wrong!');
      }

      const data = await response.json();
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
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
