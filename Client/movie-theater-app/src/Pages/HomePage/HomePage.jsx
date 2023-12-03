import React, { useState, useEffect } from "react";
import axiosUtils from "../../Utils/axiosUtils";
import { v4 as uuidv4 } from 'uuid';
import Movie from "./Movie/Movie";

export default function HomePage() {
  const moviesUrl = "http://localhost:8001/movies/";
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(moviesUrl);
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      HomePage
      <div>
        {movies.map((movie) => (
          <Movie key={uuidv4()} data={movie} />
        ))}
      </div>
    </div>
  );
}
