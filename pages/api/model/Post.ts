import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // author: {
    //   type: String,
    //   required: true,
    // },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema)

export default Post
