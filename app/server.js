const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "testest1" });
});

require("../routes/notes.router")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Запустился  ${PORT}.`);
});