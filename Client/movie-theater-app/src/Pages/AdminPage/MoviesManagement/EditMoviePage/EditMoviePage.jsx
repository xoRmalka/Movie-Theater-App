import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosUtils from "../../../../Utils/axiosUtils";

export default function EditMoviePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(
    location.state?.data || {
      title: "",
      description: "",
      image: "",
      duration: "",
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const updateState = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      await axiosUtils.updateItem(
        "http://localhost:8001/movies",
        movie._id,
        movie,
        token
      );
    } catch (error) {
      console.log("Error updating movie: ", error);
    }
    navigate("/admin/movies");
  };

  return (
    <div>
      <div>
        <h2>Edit Movie: {movie.name}</h2>
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
        <button onClick={updateState}>Update</button>{" "}
        <button onClick={() => navigate("/admin/movies")}>Cancel</button>
      </div>
    </div>
  );
}
