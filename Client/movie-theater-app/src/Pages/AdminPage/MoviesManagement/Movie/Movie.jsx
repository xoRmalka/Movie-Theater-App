import React from "react";
import { useNavigate } from "react-router-dom";

export default function Movie({ data, onDelete }) {
  const { title, image, description, duration, _id } = data;
  const navigate = useNavigate();

  const editMovie = () => {
    navigate(`/admin/movies/edit/${_id}`, { state: { data } });
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div className="movie-container" style={{ border: "1px solid purple" }}>
      <h2>{title},</h2>
      <img src={image} />
      <br />
      <button onClick={editMovie}>Edit</button>{" "}
      <button onClick={handleDelete}>Delete</button>
      <br />
      <br />
    </div>
  );
}
