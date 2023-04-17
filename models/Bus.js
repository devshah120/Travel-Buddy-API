const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
  },
email: {
    type: String,
    required: true,
  },
from: {
    type: String,
    required: true,
  },
to: {
    type: String,
    required: true,
  },
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
date: {
    type: String,
    require:true,
},
time:{
    type:String,
    require:true,
},
class:{
    type:String,
    require:true,
}
});
module.exports = mongoose.model("Bus", busSchema);
