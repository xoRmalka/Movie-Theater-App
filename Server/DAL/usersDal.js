const User = require("../Models/User");

const getUserByUsername = async (username) => {
  return User.findOne({ username });
};

module.exports = {
  getUserByUsername,
};
