const express = require("express");
const movieBll = require("../BLL/moviesBll");

const router = express.Router();

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await movieBll.getAllMoviesWithSchedules();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all schedules with movies
router.get("/schedules", async (req, res) => {
  try {
    const schedules = await movieBll.getAllSchedules();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific schedule by ID
router.get("/schedules/:id", async (req, res) => {
    try {
      const movie = await movieBll.getScheduleById(req.params.id);
      if (!movie) {
        res.status(404).json({ error: "Movie not found" });
      } else {
        res.json(movie);
      }
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

module.exports = router;
