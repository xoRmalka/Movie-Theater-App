import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axiosUtils from "../../Utils/axiosUtils";
import SeatMap from "./SeatMap/SeatMap";
import SeatOrder from "./SeatOrder/SeatOrder";

export default function MovieOrderPage() {
  const location = useLocation();
  const { state } = location;
  const { schedule, movie } = state;

  const scheduleUrl = `http://localhost:8001/schedules`;
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const getSchedule = async () => {
    const { data } = await axiosUtils.getItem(
      scheduleUrl,
      schedule.schedule_id
    );
    setScheduleData(data);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  //todo utils for dates
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div>
      <br />
      <img
        className="movie-image"
        src={movie.image}
        alt={movie.title}
        style={{ maxWidth: "100%" }}
      />{" "}
      <h2>{movie.title}</h2>
      <h3>{movie.description}</h3>
      <h3>{movie.duration} Minutes</h3>
      <h3>{formatDate(schedule.date)}</h3>
      <SeatMap
        seatsTaken={scheduleData.seats_taken}
        onSeatSelect={handleSeatSelect}
      />
      <SeatOrder
        selectedSeat={selectedSeat}
        scheduleData={scheduleData}
        scheduleUrl={scheduleUrl}
        movie={movie}
        date={formatDate(schedule.date)}
      />
    </div>
  );
}
