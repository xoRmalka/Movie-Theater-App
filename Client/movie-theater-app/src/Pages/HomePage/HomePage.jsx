import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import axiosUtils from "../../Utils/axiosUtils";
import { v4 as uuidv4 } from "uuid";
import Movie from "./Movie/Movie";

const { RangePicker } = DatePicker;

export default function HomePage() {
  const moviesUrl = "http://localhost:8001/movies/";
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axiosUtils.getAllItems(moviesUrl);
    setMovies(data);
    setFilteredMovies(data); // Initialize filteredMovies with all movies
  };

  useEffect(() => {
    getMovies();
  }, []);

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

      setFilteredMovies(filtered);
    } else {
      // Reset filteredMovies
      setFilteredMovies(movies);
    }
  };

  return (
    <div>
      <h1>Movie Theater App</h1>
      <RangePicker format="DD/MM/YYYY" onChange={handleDateRangeChange} />
      <div>
        {filteredMovies.map((movie) => (
          <Movie key={uuidv4()} data={movie} />
        ))}
      </div>
    </div>
  );
}
