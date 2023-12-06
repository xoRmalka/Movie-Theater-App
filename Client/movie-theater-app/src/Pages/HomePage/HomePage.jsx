import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import axiosUtils from "../../Utils/axiosUtils";
import { v4 as uuidv4 } from "uuid";
import Movie from "./Movie/Movie";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const defaultStartDate = dayjs(); // Current date and time
const defaultEndDate = dayjs().add(7, "day"); // End date is one week from now

export default function HomePage() {
  const moviesUrl = "http://localhost:8001/movies-schedules/";
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  // todo try catch and loading
  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(moviesUrl);
    setMovies(data);
    handleSorting(data, "desc");
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    // Default date range
    handleDateRangeChange([defaultStartDate, defaultEndDate]);
  }, [movies, defaultStartDate, defaultEndDate]);

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);

      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);

      // Filter movies based on the selected date range
      const filtered = movies.filter((movie) => {
        const movieDate = new Date(movie.date.split("/").reverse().join("-"));
        return movieDate >= startDate && movieDate <= endDate;
      });

      handleSorting(filtered, sortOrder);
    } else {
      // Reset filteredMovies
      handleSorting(movies, sortOrder);
    }
  };

  const handleSorting = (data, order) => {
    const sortedMovies = [...data];
    sortedMovies.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));

      return order === "asc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMovies(sortedMovies);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    handleSorting(filteredMovies, newSortOrder);
  };

  const login = () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate(`/admin/movies`);
    } else {
      navigate(`/login`);
    }
  };
  return (
    <div>
      <h1>Movie Theater App</h1>
      <RangePicker
        format="DD/MM/YYYY"
        onChange={handleDateRangeChange}
        defaultValue={[defaultStartDate, defaultEndDate]}
      />
      <Button onClick={handleSort}>{`Sort ${
        sortOrder === "asc" ? "Ascending" : "Descending"
      }`}</Button>
      <Button onClick={login}>
        <UserOutlined />
      </Button>{" "}
      <div>
        {filteredMovies.map((movie) => (
          <Movie key={uuidv4()} data={movie} />
        ))}
      </div>
    </div>
  );
}
