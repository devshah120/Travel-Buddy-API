const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  place:{
    type: String,
    required:true,
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
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},checkIn: {
    type: String,
    required:true
},checkOut: {
    type: String,
    required:true   
}
});
module.exports = mongoose.model("Reservation", reservationSchema);
