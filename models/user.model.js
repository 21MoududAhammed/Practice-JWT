const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('Test', userSchema);
