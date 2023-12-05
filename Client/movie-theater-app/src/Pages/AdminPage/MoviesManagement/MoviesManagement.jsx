import React, { useState, useEffect } from "react";
import axiosUtils from "../../../Utils/axiosUtils";
import Movie from "./Movie/Movie";

export default function MoviesManagement() {
  const moviesUrl = "http://localhost:8001/movies/";
  const [movies, setMovies] = useState([]);

  // todo try catch and loading
  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(moviesUrl);
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className="movies-container">
        {movies?.map((movie) => {
          return <Movie data={movie} key={movie._id} />;
        })}
      </div>
    </div>
  );
}
