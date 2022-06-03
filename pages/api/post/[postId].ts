// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // !*** Initiate MONGODB ***!
  if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database...");
  } else {
    console.log("Couldn't connect to database...");
  }

  const db = mongoose.connection;

  console.log("post route hit...");
  const postCollection = db.collection("posts");

  //!*** GET METHOD ***!//
  if (req.method === "GET") {
    console.log("Post GET route hit...");
    // console.log("REQ ==> ", req.query);
    
    const id = req.query.postId as string;
    
    const post = await postCollection.find({ id: parseInt(id) }).toArray();
    
    // console.log(post);
    
    res.status(200).json({ post: post });
  }
  
  //!*** POST METHOD ***!//
  if (req.method === "POST") {
    console.log("Post POST route hit...");
    
    const date = new Date()
    // console.log(date.toISOString())
    const comment = {
      content: req.body.content,
      author: req.body.author,
      created_At: date.toISOString()
    };

    const id = req.query.postId as string;

    const post = await postCollection.updateOne({id: parseInt(id)}, {$push: {comments: comment}})

    // console.log(post);
    res.json({message: "success"});
  }
}
