import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
      trim: true,
    },
    title: {
      type: String,
      required: "Please set a title for your post",
    },
    content: {
      type: String,
      required: "Create some ontent for your post",
    },
    comments: {
      type: [{content: String, author: String}],
      // ref: "Comment",
    },
    created_At: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
