const express = require("express");
const movieBll = require("../BLL/moviesBll");

const router = express.Router();

// Get all movies with schedules
router.get("/movies-schedules", async (req, res) => {
  try {
    const movies = await movieBll.getAllMoviesWithSchedules();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Movies

// Get all Movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await movieBll.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific movie by ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await movieBll.getMovieById(req.params.id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a movie schedule by ID
router.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization: token } = req.headers;
    const updatedMovieData = req.body;
    const updatedMovie = await movieBll.updateMovie(
      id,
      updatedMovieData,
      token
    );
    res.json(updatedMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Create a movie
router.post("/movies", async (req, res) => {
  try {
    const { authorization: token } = req.headers;
    const newMovieData = req.body;
    const newMovie = await movieBll.createMovie(newMovieData, token);
    res.json(newMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete a movie and his schedule by ID
router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization: token } = req.headers;

    const deletedMovie = await movieBll.deleteMovie(id, token);

    res.json(deletedMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Schedules

// Get all schedules
router.get("/schedules", async (req, res) => {
  try {
    const schedules = await movieBll.getAllSchedules();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a schedule
router.post("/schedules", async (req, res) => {
  try {
    const { authorization: token } = req.headers;
    const newScheduleData = req.body;
    const newSchedule = await movieBll.createSchedule(newScheduleData, token);
    res.json(newSchedule);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update a specific schedule by ID
router.put("/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selectedSeat = req.body;
    const updatedSchedule = await movieBll.updateSchedule(id, selectedSeat);
    res.json(updatedSchedule);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization: token } = req.headers;

    const deleteSchedule = await movieBll.deleteSchedule(id, token);

    res.json(deleteSchedule);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get a specific schedule by ID
router.get("/schedules/:id", async (req, res) => {
  try {
    const schedule = await movieBll.getScheduleById(req.params.id);
    if (!schedule) {
      res.status(404).json({ error: "Schedule not found" });
    } else {
      res.json(schedule);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
