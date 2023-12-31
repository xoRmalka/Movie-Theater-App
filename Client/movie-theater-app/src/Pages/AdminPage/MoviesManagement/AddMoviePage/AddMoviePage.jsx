import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosUtils from "../../../../Utils/axiosUtils";

export default function AddMoviePage() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const addMovie = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axiosUtils.createItem("http://localhost:8001/movies", movie, token);
    } catch (error) {
      console.log("Error creating movie: ", error);
    }
    navigate("/admin/movies");
  };

  return (
    <div>
      <div>
        <h2>Add Movie: </h2>
        <label>
          Title:
          <input
            name="title"
            value={movie.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            name="description"
            value={movie.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            name="image"
            value={movie.image}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            name="duration"
            type="number"
            value={movie.duration}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <br />
        <button onClick={addMovie}>Add</button>{" "}
        <button onClick={() => navigate("/admin/movies")}>Cancel</button>
      </div>
    </div>
  );
}
