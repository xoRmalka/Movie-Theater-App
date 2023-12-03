const express = require("express");

require("./Config/database");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
