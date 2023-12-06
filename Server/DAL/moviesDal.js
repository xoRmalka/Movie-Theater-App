const Movie = require("../Models/Movie");
const Schedule = require("../Models/Schedule");

// Movies
async function getAllMovies() {
  return Movie.find();
}

async function getMovieById(id) {
  return Movie.findById(id);
}

async function updateMovieById(id, updatedMovieData) {
  try {
    const existingMovie = await Movie.findById(id);

    if (!existingMovie) {
      throw new Error("Movie not found");
    }

    // Update the existing movie with the new data
    existingMovie.set(updatedMovieData);

    // Save the updated movie
    const updatedMovie = await existingMovie.save();
  } catch (error) {
    throw error;
  }
}

async function createMovie(movieData) {
  try {
    const newMovie = new Movie(movieData);
    const createdMovie = await newMovie.save();
    return createdMovie;
  } catch (error) {
    throw error;
  }
}

async function deleteMovieById(id) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      throw new Error("Movie not found");
    }

    return deletedMovie;
  } catch (error) {
    throw error;
  }
}

// Schedules

async function getAllSchedules() {
  return Schedule.find();
}

async function getScheduleById(id) {
  return Schedule.findById(id);
}

async function updateSchedule(id, updatedSchedule) {
  try {
    const existingSchedule = await Schedule.findById(id);

    if (!existingSchedule) {
      throw new Error(`Schedule with ID ${id} not found`);
    }

    existingSchedule.seats_taken = updatedSchedule.seats_taken;

    await existingSchedule.save();
  } catch (error) {
    throw new Error(`Error updating schedule: ${error.message}`);
  }
}

async function deleteScheduleById(scheduleId) {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

    if (!deletedSchedule) {
      throw new Error(`Schedule with ID ${scheduleId} not found`);
    }

    return deletedSchedule;
  } catch (error) {
    throw new Error(`Error deleting schedule: ${error.message}`);
  }
}

async function deleteSchedulesByMovieId(movieId) {
  try {
    const deletedSchedules = await Schedule.deleteMany({ movie_id: movieId });

    return deletedSchedules;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMovies,
  getAllSchedules,
  getMovieById,
  getScheduleById,
  updateSchedule,
  updateMovieById,
  deleteMovieById,
  deleteSchedulesByMovieId,
  createMovie,
  deleteScheduleById,
};
