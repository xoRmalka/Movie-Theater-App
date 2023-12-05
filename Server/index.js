const express = require("express");

require("./Config/database");

const app = express();
const cors = require("cors");
const port = 8001;

app.use(express.json());
app.use(cors());

const movieController = require("./controllers/moviesController");
const usersController = require("./controllers/usersController");

app.use("/", movieController);
app.use("/users", usersController);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
