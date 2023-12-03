const mongoose = require("mongoose");

const seatTakenSchema = new mongoose.Schema(
  {
    row: Number,
    seatNumber: Number,
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    date_time: {
      type: Date,
      required: true,
    },
    seats_taken: [seatTakenSchema],
  },
  { versionKey: false }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
