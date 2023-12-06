import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  const { schedule, onDelete } = props;
  const navigate = useNavigate();
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      return "";
    } else {
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      return parsedDate.toLocaleTimeString("en-US", {
        ...options,
        timeZone: "UTC",
      });
    }
  };

  useEffect(() => {
    setFormattedTime(formatDate(schedule.date_time));
    setFormattedEndTime(formatDate(schedule.endDate));
  }, [schedule.date_time, schedule.endDate]);

  const handleDelete = () => {
    onDelete(schedule._id);
  };

  return (
    <div
      className="movie-container"
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        display: "flex",
      }}
    >
      <img
        className="movie-image"
        alt={schedule.movie.title}
        style={{ maxWidth: "100%" }}
        src={schedule.movie.image}
      />
      <div>
        <h2>{schedule.movie.title}</h2>

        <h2>
          {formattedTime} - {formattedEndTime}
        </h2>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <br />
      <br />
    </div>
  );
}
