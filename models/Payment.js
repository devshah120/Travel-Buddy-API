const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cardname: {
    type: String,
    required: true,
  },
  cardnumber: {
    type: String,
    required: true,
  },
  expdate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
createdAt: {
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model("Payment", paymentSchema);
