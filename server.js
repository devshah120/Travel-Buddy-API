const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

app.use(morgan("dev"));

app.use(express.json({}));
app.use(
  express.json({
    extended: true,
  })
);
dotenv.config({
  path: "./config/config.env",
});

connectDB();
//
app.use("/api/travel/auth", require("./routes/user"));

//SHivam
//Create cards
app.use('/api/cards', require('./routes/cards'));

app.use('/api/reservation', require('./routes/reservation'));

app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.red.underline.bold)
);
