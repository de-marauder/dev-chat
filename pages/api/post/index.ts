// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../model/Post";


if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connected to database...");
} else {
  console.log("Couldn't connect to database...");
}

const db = mongoose.connection;
// db.on("error", (error) => {
//   console.log(`Database error ==> ${error}`);
// });
// db.once("open", () => {
//   console.log(`Database open.\n Connected to mongoose`);
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const postCollection = db.collection("posts");

  //!*** GET METHOD ***!//
  if (req.method === "GET") {

    console.log("posts GET route hit!")
    const posts = await postCollection.find().toArray()

    // console.log(posts)

    res.status(200).json({posts: posts})
  }


  //!*** POST METHOD ***!//
  if (req.method === "POST") {
    console.log("post route hit");

    const allPosts = await postCollection.find().toArray();
    const date = new Date()
    const post = new Post({
      id: allPosts.length,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      created_At: date.toISOString()
    });

    const postMatch = await postCollection.find(post).toArray();

    if (postMatch.length === 0) {
      await postCollection.insertOne(post)
    } else {
      console.log("This post already exists. Cannot create duplicate posts")
    }
    res.status(200).json({message: "success"})
  }
}
