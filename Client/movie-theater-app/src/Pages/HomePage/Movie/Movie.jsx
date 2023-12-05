import React from "react";
import MovieOrderBtn from "./MovieOrderBtn/MovieOrderBtn";
import { v4 as uuidv4 } from "uuid";
import "./Movie.css";
export default function Movie({ data }) {
  const { title, image, description, duration, date, schedules } = data;
  const movie = { title, image, description, duration };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        display: "flex",
      }}
    >
      {" "}
      <img
        className="movie-image"
        src={image}
        alt={title}
        style={{ maxWidth: "100%" }}
      />
      <div>
        {" "}
        <h2>{title}</h2>
        <h3>{date}</h3>
        <div>
          {schedules.map((schedule) => (
            <MovieOrderBtn key={uuidv4()} data={schedule} movie={movie} /> //key- schedule id
          ))}
        </div>
      </div>
      {/* <p>{description}</p> */}
      {/* <p>Duration: {duration} minutes</p> */}
    </div>
  );
}
