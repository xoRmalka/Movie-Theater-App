const movieDal = require("../DAL/moviesDal");
const axios = require("axios");

// Admin
async function verifyAdmin(token) {
  try {
    const response = await axios.get(
      "http://localhost:8001/users/verify/admin",
      {
        headers: {
          authorization: token,
        },
      }
    );

    // Check if the user is an admin
    return { isAdmin: response.data.admin };
  } catch (error) {
    return error.response.data;
  }
}

// Movies
async function getAllMovies() {
  return movieDal.getAllMovies();
}

async function getMovieById(id) {
  return movieDal.getMovieById(id);
}

async function updateMovie(id, obj, token) {
  try {
    const { isAdmin } = await verifyAdmin(token);
    if (isAdmin) {
      return movieDal.updateMovieById(id, obj);
    }
    if (!isAdmin) {
      throw error(error.response.data);
    }
  } catch (error) {
    throw error;
  }
}

async function createMovie(obj, token) {
  try {
    const { isAdmin } = await verifyAdmin(token);
    if (isAdmin) {
      return movieDal.createMovie(obj);
    } else {
      throw new Error("Unauthorized: User is not an admin");
    }
  } catch (error) {
    throw error;
  }
}

async function deleteMovie(id, token) {
  try {
    // Verify admin status
    const { isAdmin } = await verifyAdmin(token);

    if (!isAdmin) {
      throw new Error("Unauthorized: User is not an admin");
    }

    // Delete the movie
    const deletedMovie = await movieDal.deleteMovieById(id);

    // Delete all schedules with the same movie_id
    await movieDal.deleteSchedulesByMovieId(id);

    return deletedMovie;
  } catch (error) {
    throw error;
  }
}

// Schedules
async function getAllSchedules() {
  return movieDal.getAllSchedules();
}

async function getScheduleById(id) {
  return movieDal.getScheduleById(id);
}

async function deleteSchedule(id, token) {
  try {
    const { isAdmin } = await verifyAdmin(token);

    if (!isAdmin) {
      throw new Error("Unauthorized: User is not an admin");
    }

    const deletedSchedule = await movieDal.deleteScheduleById(id);
    return deletedSchedule;
  } catch (error) {
    throw error;
  }
}

async function createSchedule(scheduleData, token) {
  try {
    const { isAdmin } = await verifyAdmin(token);

    if (!isAdmin) {
      throw new Error("Unauthorized: User is not an admin");
    }

    const createdSchedule = await movieDal.createSchedule(scheduleData);

    return createdSchedule;
  } catch (error) {
    throw error;
  }
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
        date: new Date(date).toLocaleDateString("en-GB"), // Format date as "dd/mm/yyyy"
        _id: movieId,
        title: movie.title,
        image: movie.image,
        description: movie.description,
        duration: movie.duration,
        schedules: schedules.map((schedule) => ({
          date: schedule.date_time.toISOString(),
          schedule_id: schedule._id,
          end_time: new Date(
            schedule.date_time.getTime() + movie.duration * 60000
          ).toISOString(),
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
  updateMovie,
  deleteMovie,
  createMovie,
  deleteSchedule,
  createSchedule,
};
