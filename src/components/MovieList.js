import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;


  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex  m-3" >
          {movie.Poster!=="N/A"?<img src={movie.Poster} alt="movie"></img> : <div style={{width:"101px", height:"153px",fontSize:"0.8em", textAlign:"center", paddingTop:"50px", background:"#2E372C"}}>{movie.Title}</div>}

          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
