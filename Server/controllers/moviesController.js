// moviesController.js

const express = require('express');
const movieBll = require('../BLL/moviesBll');

const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await movieBll.getAllMoviesWithSchedules();
    res.json(movies);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all schedules with movies
router.get('/schedules', async (req, res) => {
  try {
    const schedulesWithMovies = await movieBll.getAllSchedulesWithMovies();
    const groupedSchedules = movieBll.groupSchedulesByDateAndMovie(
      schedulesWithMovies
    );
    res.json(groupedSchedules);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific movie by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await movieBll.getMovieById(req.params.id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
