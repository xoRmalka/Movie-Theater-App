const Movie = require("../Models/Movie");
const Schedule = require("../Models/Schedule");

// Movies
async function getAllMovies() {
  return Movie.find();
}

async function getMovieById(id) {
  return Movie.findById(id);
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

module.exports = {
  getAllMovies,
  getAllSchedules,
  getMovieById,
  getScheduleById,
  updateSchedule,
};
