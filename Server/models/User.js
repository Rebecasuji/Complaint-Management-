const mongoose = require('mongoose');

// Create the User schema
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Google ID must be unique to avoid duplicate accounts
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ['teacher', 'admin','student'],
    default: 'student', // Default role is customer
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userdb = new mongoose.model("users",UserSchema);

module.exports = userdb;
