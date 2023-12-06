import React, { useState, useEffect } from "react";
import axiosUtils from "../../../Utils/axiosUtils";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, List } from "antd";
import Movie from "./Movie/Movie";

export default function SchedulePage() {
  const url = "http://localhost:8001";
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      const filtered = schedules
        .filter((schedule) => schedule.date_time.startsWith(formattedDate))
        .sort((a, b) => (a.date_time > b.date_time ? 1 : -1));

      // Map movie data to filtered schedules and calculate end date
      const schedulesWithMovies = filtered.map((schedule) => {
        const movie = movies.find((m) => m._id === schedule.movie_id);
        const endDate = new Date(schedule.date_time);
        endDate.setMinutes(endDate.getMinutes() + movie.duration);

        return {
          ...schedule,
          movie,
          endDate: endDate.toISOString(),
        };
      });

      setFilteredSchedules(schedulesWithMovies);
    } else {
      setFilteredSchedules([]);
    }
  };

  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(`${url}/movies`);
    setMovies(data);
  };

  const getSchedules = async () => {
    const { data } = await axiosUtils.getAllItems(`${url}/schedules`);
    setSchedules(data);
  };

  useEffect(() => {
    getMovies();
    getSchedules();
  }, []);

  const deleteSchedule = async (scheduleId) => {
    const token = localStorage.getItem("adminToken");

    await axiosUtils.deleteItem(`${url}/schedules`, scheduleId, token);
    setSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule._id !== scheduleId)
    );
    setFilteredSchedules((prevFilteredSchedules) =>
      prevFilteredSchedules.filter((schedule) => schedule._id !== scheduleId)
    );
  };

  return (
    <div>
      <h2>Pick a date of schedules</h2>
      <Space direction="vertical" style={{ width: "100%" }}>
        <DatePicker
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          placeholder="Select a date"
        />
        <div>
          {selectedDate && (
            <List
              dataSource={filteredSchedules}
              renderItem={(item) => (
                <List.Item>
                  <Movie
                    onDelete={(scheduleId) => deleteSchedule(scheduleId)}
                    schedule={item}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </Space>
    </div>
  );
}
