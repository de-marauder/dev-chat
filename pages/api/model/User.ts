import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

// module.exports = User
