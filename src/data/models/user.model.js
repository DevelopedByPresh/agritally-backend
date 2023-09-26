// models/User.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "staff",
  },
},
{
  timestamps: true,
},
);

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, role:this.role }, process.env.JWT_SECRET_KEY || 'MyScureKey', {expiresIn: "15h"});
    return token;
}

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
