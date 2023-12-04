const express = require("express");

require("./Config/database");
const cors = require("cors");

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());

const movieController = require("./controllers/moviesController");

app.use("/", movieController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
