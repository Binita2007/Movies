import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  
  function movieDeHandler (event){
    const id = props.id;
    props.onRemove(id)
  }

  
  return (
    <li id={props.key} onClick= {movieDeHandler} className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;


// https://swapi.dev/api/