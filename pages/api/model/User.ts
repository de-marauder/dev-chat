import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    },
    name: {
      type: String,
      required: true,
    },
    contacts: {
      type: [
        {
          name: String,
          image: String,
          email: String,
          id: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
