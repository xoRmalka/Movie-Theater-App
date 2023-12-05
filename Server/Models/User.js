const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Add a role field
},
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
