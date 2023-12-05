import React from "react";
import { useNavigate } from "react-router-dom";

export default function Movie({ data }) {
  const { title, image, description, duration, _id } = data;
  const navigate = useNavigate();

  const editMovie = () => {
    navigate(`/admin/movies/edit/${_id}`, { state: { data } });
  };

  return (
    <div className="movie-container" style={{ border: "1px solid purple" }}>
      <h2>{title},</h2>
      <img src={image} />
      <br />
      <button onClick={editMovie}>Edit</button> <button>Delete</button>
      <br />
      <br />
    </div>
  );
}
