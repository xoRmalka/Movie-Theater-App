import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosUtils from "../../../../Utils/axiosUtils";
import dayjs from "dayjs";
import MovieSelect from "./MovieSelect.jsx/MovieSelect";
import TimeSelection from "./TimeSelection/TimeSelection";

export default function AddSchedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, movies, filteredSchedules } = location.state;

  const [schedule, setSchedule] = useState({
    movie_id: null,
    date_time: null,
    end_date: null,
  });

  const handleTimeChange = (time, timeString) => {
    if (time) {
      const combinedDateTime = dayjs(`${selectedDate} ${timeString}`).toDate();

      const formattedDateTime = dayjs(combinedDateTime).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );

      // Find the selected movie
      const movie = movies.find((m) => m._id === schedule.movie_id);

      if (movie) {
        // Calculate end date based on selected movie's duration
        const endDate = dayjs(combinedDateTime).add(movie.duration, "minutes");
        const formattedEndDate = endDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          date_time: formattedDateTime,
          end_date: formattedEndDate,
        }));
      } else {
        // Handle the case where the selected movie is not found
        console.error("Selected movie not found");
      }
    } else {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        date_time: null,
        end_date: null,
      }));
    }
  };

  const handleMovieChange = (event) => {
    const selectedMovieId = event.target.value;

    const movie = movies.find((m) => m._id === selectedMovieId);

    if (schedule.date_time) {
      // Calculate end date based on selected movie's duration
      const endDate = dayjs(schedule.date_time).add(movie.duration, "minutes");
      const formattedEndDate = endDate.toISOString();

      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        movie_id: selectedMovieId,
        end_date: formattedEndDate,
      }));
    } else {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        movie_id: selectedMovieId,
        end_date: null,
      }));
    }
  };

  const addSchedule = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      // Check if movie_id and date_time are present and not null or empty
      if (!schedule.movie_id || !schedule.date_time) {
        console.error("Movie and date/time are required.");
        // You might want to display an error message to the user.
        return;
      }

      // Check for conflicts with existing schedules
      const bufferMinutes = 10;

      // Convert schedule dates to UTC with buffer
      const newStartDate = new Date(schedule.date_time);
      const newEndDate = new Date(schedule.end_date);

      const newStartDateWithBuffer = new Date(newStartDate);
      newStartDateWithBuffer.setMinutes(
        newStartDateWithBuffer.getMinutes() - bufferMinutes
      );

      const newEndDateWithBuffer = new Date(newEndDate);
      newEndDateWithBuffer.setMinutes(
        newEndDateWithBuffer.getMinutes() + bufferMinutes
      );

      const newStartDateUTC = newStartDateWithBuffer.toISOString();
      const newEndDateUTC = newEndDateWithBuffer.toISOString();

      const hasConflict = filteredSchedules.some((existingSchedule) => {
        const existingStartDate = new Date(existingSchedule.date_time);
        const existingEndDate = new Date(existingSchedule.end_date);

        // Convert existing schedule dates to UTC
        const existingStartDateUTC = existingStartDate.toISOString();
        const existingEndDateUTC = existingEndDate.toISOString();

        // Check for conflicts with a buffer of 10 minutes before and after
        const conflict =
          (newStartDateUTC < existingEndDateUTC &&
            newEndDateUTC > existingStartDateUTC) ||
          (existingStartDateUTC < newEndDateUTC &&
            existingEndDateUTC > newStartDateUTC);

        return conflict;
      });

      if (hasConflict) {
        // Show relevant modal
        console.error("Schedule conflict! There is a movie at that time.");
        // Show relevant modal
        navigate("/admin/schedule");
      } else {
        const { end_date, ...scheduleToSend } = schedule;
        // No conflict, proceed to add schedule
        await axiosUtils.createItem(
          "http://localhost:8001/schedules",
          scheduleToSend,
          token
        );
        console.log("Schedule has been set!");
        navigate("/admin/schedule");
      }
    } catch (error) {
      console.log("Error creating schedule: ", error);
      navigate("/admin/schedule");
    }
  };

  return (
    <div>
      <div>
        <h2>Create Schedule:</h2>
        <h2>{dayjs(selectedDate).format("DD/MM/YYYY")}</h2>
        <MovieSelect
          schedule={schedule}
          movies={movies}
          handleMovieChange={handleMovieChange}
        />
        <TimeSelection
          schedule={schedule}
          handleTimeChange={handleTimeChange}
        />
        <button onClick={addSchedule}>Add Schedule</button>
        <button onClick={() => navigate("/admin/schedule")}>Cancel</button>
      </div>
    </div>
  );
}
