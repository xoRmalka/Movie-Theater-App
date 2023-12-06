import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../../Utils/dateUtils";

export default function Movie(props) {
  const { schedule, onDelete } = props;
  const navigate = useNavigate();
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  useEffect(() => {
    setFormattedTime(formatDate.formatDate(schedule.date_time));
    setFormattedEndTime(formatDate.formatDate(schedule.end_date));
  }, [schedule.date_time, schedule.end_date]);

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
