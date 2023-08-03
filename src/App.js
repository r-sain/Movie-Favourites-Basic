import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  console.log(favourites)

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
      const filteredList=removeDuplicatesById(movieFavourites)
      setFavourites(filteredList);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const saveToLocalStorage2 = (items) => {
    localStorage.setItem("react-movie-app-favourites2", JSON.stringify(items));
  };

  function removeDuplicatesById(array) {
    const uniqueIds = new Set();
    return array.filter(item => {
      if (!uniqueIds.has(item.imdbID)) {
        uniqueIds.add(item.imdbID);
        return true;
      }
      return false;
    });
  }
  
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    const uniqueNewFavouriteList=removeDuplicatesById(newFavouriteList)
    setFavourites(uniqueNewFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div style={{}}>
      {/* name and searchbox  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 10px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3em" }}>MovieList</h1>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div style={{ margin: "15px 15px" }}>
        {/* Movies list to search and add from  */}
        <div
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        </div>
        <div
          style={{
            fontSize: "3em",
            fontFamily:"sans-serif",
            fontWeight:"550"
          }}
        >
          FAVOURITES
        </div>

        <div
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
