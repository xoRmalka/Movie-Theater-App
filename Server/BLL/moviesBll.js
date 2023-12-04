const movieDal = require("../dal/moviesDal");

// Movies
async function getAllMovies() {
  return movieDal.getAllMovies();
}

async function getMovieById(id) {
  return movieDal.getMovieById(id);
}

// Schedules
async function getAllSchedules() {
  return movieDal.getAllSchedules();
}

async function getScheduleById(id) {
  return movieDal.getScheduleById(id);
}

async function updateSchedule(id, selectedSeat) {
  try {
    const schedule = await movieDal.getScheduleById(id);
    const existingSchedule = schedule.toObject();

    // Check if the selected seat is already in the seats_taken array
    const seatExists = existingSchedule.seats_taken.some(
      (seat) =>
        Number(seat.row) === Number(selectedSeat.row) &&
        Number(seat.seat) === Number(selectedSeat.seat)
    );

    if (!seatExists) {
      // If the seat doesn't exist, add it to the seats_taken array
      const updatedSeats = [...existingSchedule.seats_taken, selectedSeat];

      await movieDal.updateSchedule(id, {
        ...existingSchedule,
        seats_taken: updatedSeats,
      });

      // Successful order
      return { success: true };
    } else {
      // If the seat already taken
      return { success: false };
    }
  } catch (error) {
    throw error;
  }
}

async function getAllMoviesWithSchedules() {
  const allMovies = await movieDal.getAllMovies();
  const allSchedules = await movieDal.getAllSchedules();

  // Group schedules by movie_id and date
  const schedulesByMovieAndDate = allSchedules.reduce((acc, schedule) => {
    const dateKey = schedule.date_time.toISOString().split("T")[0]; // Use date part of ISO string as key
    const movieKey = schedule.movie_id.toString();

    if (!acc[movieKey]) {
      acc[movieKey] = {};
    }

    if (!acc[movieKey][dateKey]) {
      acc[movieKey][dateKey] = [];
    }

    acc[movieKey][dateKey].push(schedule);

    return acc;
  }, {});

  // Format the result
  const result = allMovies.flatMap((movie) => {
    const movieId = movie._id.toString();
    return Object.entries(schedulesByMovieAndDate[movieId] || {}).map(
      ([date, schedules]) => ({
        date,
        _id: movieId,
        title: movie.title,
        image: movie.image,
        description: movie.description,
        duration: movie.duration,
        schedules: schedules.map((schedule) => ({
          date: schedule.date_time,
          schedule_id: schedule._id,
        })),
      })
    );
  });

  return result;
}

module.exports = {
  getAllMovies,
  getAllSchedules,
  getMovieById,
  getAllMoviesWithSchedules,
  getScheduleById,
  updateSchedule,
};
