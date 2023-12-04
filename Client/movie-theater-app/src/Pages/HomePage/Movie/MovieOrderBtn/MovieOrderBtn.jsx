import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieOrderBtn({ data, movie }) {
  const { date, schedule_id } = data;
  

  const navigate = useNavigate();

  const orderMovie = () => {
    navigate(`/movie_order/${schedule_id}`, { state: { schedule: data, movie: movie } });
  };


  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const parsedDate = new Date(date);

    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const formattedTimeString = parsedDate.toLocaleTimeString("en-US", options);

    setFormattedTime(formattedTimeString);
  }, [date]);

  return <button onClick={orderMovie}>{formattedTime}</button>;
}
