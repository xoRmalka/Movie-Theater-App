// controllers/loginController.js
const express = require("express");
const jwt = require("jsonwebtoken");
const usersBll = require("../BLL/usersBll");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersBll.authenticateAdmin(username, password);

    // Generate JWT with user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "code-lovers",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.get("/verify/admin", async (req, res) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const decoded = jwt.verify(token, "code-lovers");

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    res.json({ admin: true });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      console.error("Error in /verify/admin route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

module.exports = router;
