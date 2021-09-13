import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';


function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback(() =>{
    setIsLoading(true)
    setError(null)
    // fetch('https://swapi.dev/api/films')
    fetch('https://rest-api-4a5f4-default-rtdb.firebaseio.com/movies.json')
    .then((response) => {
  if (!response.ok) {
    throw new Error('NO List Found')
  }      
  return response.json();
    })
    .then((data) => {
      console.log(data);
      const loadedMovies = [];
     for(const key in data){
       loadedMovies.push({
         id: key,
         title: data[key].title,
         openingText: data[key].openingText,
         releaseDate: data[key].releaseDate
       });
     };

      // const transformedMovies = movies.name.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   }
      // });
      setMovies(loadedMovies)
      setIsLoading(false)
    }).catch((error) => {
       return setError(error.message)
    });
    console.log(error);
  },[]);  

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const deleteMovieHandler = async (id) => {
    try{
      await fetch(`https://rest-api-4a5f4-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: 'DELETE'
        }
      );

      setMovies(movies.filter((movie) => movie.id !== id));
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
    
   
  };

  async function addMovieHandler(movie) {
   const response = await fetch('https://rest-api-4a5f4-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body : JSON.stringify(movie),
      headers : {
        'Content-Type' : 'application/json' 
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p> Found No Movies!</p>;
  if (movies.length > 0) {
    content = <MoviesList onRemove={deleteMovieHandler} movies={movies} />
  }
  if (isLoading) {
    content = <p> Loading ...</p>
  }
  if (error) {
    content = <p>{error}</p>
  }
  // alternative Approach to .then block chains

  // const fetchMoviesHandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  // try {
  // const response = await fetch('https://swapi.dev/api/films')

  //   if (!response.ok) {
  //     throw new Error('NO List Found')
  //   }
  //    const data = await response.json();

  //   const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date
  //         }
  //       });
  //       setMovies(transformedMovies)
  //          setIsLoading(false);
  //          } catch(error) {
  //          setError(error.message)
  //          }  
  //         setIsLoading(false)
  // },[])

  // useEffect(() => {
  //   fetchMoviesHandler();
  // }, [fetchMoviesHandler])

  // let content = <p> Found No Movies!</p>;
  // if (movies.length > 0){
  //   content = <MoviesList movies={movies} />
  // }
  // if(error){
  //   content = <p>{error}</p>
  // }
  // if(isLoading){
  //   content = <p> Loading ...</p>
  // }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p> Loading ...</p>}
       */}
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;