import React, { useState, useEffect } from "react";
import axiosUtils from "../../../Utils/axiosUtils";
import Movie from "./Movie/Movie";
import { useNavigate } from "react-router-dom";

export default function MoviesManagement() {
  const moviesUrl = "http://localhost:8001/movies";
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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

  const addMovie = () => {
    navigate("/admin/movies/add");
  };

  return (
    <div>
      <button onClick={addMovie}>Add Movie</button>
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
