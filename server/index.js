const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

// PORT
const port = 8080;

// Body Parser
app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "100mb",
  })
);

app.use(bodyparser.json({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Connecting to MONGODB
mongoose
  .connect(process.env.MONGODB_HOST)
  .then(() => {
    app.listen(8080, () => {
      console.log(`Database Connected & Listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Connecting to routers
app.use("/api/counter", require("./routes/count"));
