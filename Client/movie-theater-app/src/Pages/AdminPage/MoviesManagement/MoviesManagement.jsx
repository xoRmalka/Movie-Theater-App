import React, { useState, useEffect } from "react";
import axiosUtils from "../../../Utils/axiosUtils";
import Movie from "./Movie/Movie";

export default function MoviesManagement() {
  const moviesUrl = "http://localhost:8001/movies";
  const [movies, setMovies] = useState([]);

  // todo try catch and loading
  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(moviesUrl);
    setMovies(data);
  };

  const deleteMovie = async (movieId) => {
    const token = localStorage.getItem("adminToken");

    await axiosUtils.deleteItem(moviesUrl, movieId, token);
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie._id !== movieId)
    );
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className="movies-container">
        {movies?.map((movie) => {
          return (
            <Movie
              data={movie}
              key={movie._id}
              onDelete={() => deleteMovie(movie._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
