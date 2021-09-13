import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  // const [deleteMovie, setDeleteMovie] = useState();

  function deleteHandler(id) {
    // setDeleteMovie({deleteMovie:movie.id});
    props.onRemove(id)
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie onRemove={deleteHandler.bind(movie.id)}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
