const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},createdAt: {
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model("Reservation", reservationSchema);
