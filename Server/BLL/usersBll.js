const usersDal = require("../DAL/usersDal");

const authenticateAdmin = async (username, password) => {
  const admin = await usersDal.getUserByUsername(username);

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  if (!(admin.password === password) || !password) {
    throw new Error("Invalid credentials");
  }

  return admin;
};

module.exports = {
  authenticateAdmin,
};
