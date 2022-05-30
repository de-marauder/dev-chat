// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../model/Post";
type Data = {
  name: string;
};

if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connected to database...");

} else {
  console.log("Couldn't connect to database...");
}

const db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Database error ==> ${error}`)
})
db.once('open', ()=>{
    console.log(`Database open.`)
})
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if (req.method === "POST") {
      console.log("post route hit");

      const post = new Post({ content: req.body.content });
    }
  }
