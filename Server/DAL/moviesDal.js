const Movie = require("../Models/Movie");
const Schedule = require("../Models/Schedule");

async function getAllMovies() {
  return Movie.find();
}

async function getAllSchedules() {
  return Schedule.find();
}

async function getMovieById(id) {
  return Movie.findById(id);
}
async function getScheduleById(id) {
  return Schedule.findById(id);
}

module.exports = {
  getAllMovies,
  getAllSchedules,
  getMovieById,
  getScheduleById,
};
