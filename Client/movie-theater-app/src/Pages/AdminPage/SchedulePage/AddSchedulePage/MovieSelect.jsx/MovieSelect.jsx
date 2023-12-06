import React from "react";

export default function MovieSelect({ schedule, movies, handleMovieChange }) {
  return (
    <>
      <label>
        Select Movie:{" "}
        <select value={schedule.movie_id || ""} onChange={handleMovieChange}>
          <option disabled={schedule.movie_id != ""} value="">
            Select a Movie
          </option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
    </>
  );
}
