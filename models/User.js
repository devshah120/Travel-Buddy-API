const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confpass: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
