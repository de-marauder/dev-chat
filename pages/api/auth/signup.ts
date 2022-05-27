// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Console } from "console";

mongoose.connect(
  "mongodb+srv://de-marauder:qhv9qaHFbsF1Bkjp@dev-chat.bhbn6.mongodb.net/?retryWrites=true&w=majority"
);
console.log("mongoose connected to database");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
4;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("route hit");
  console.log(req.method);

  if (req.method === "POST") {
    // console.log(req.body);
    const { username, password1, password2 } = req.body;
    console.log("signup route hit");

    if (username && password1 && password2) {
      if (password1 !== password2) {
        res.json({ message: "passwords don't match" });
        res.end();
        return;
      }

      // Hash password and send to database
      const hash = await bcrypt.hash(req.body.password1, 10);
      console.log(`hASH CREATED!!! -<${hash}>-`);
      
      const data = {
        username: req.body.username,
        password: hash,
      };

      const usersCollection = db.collection("users");
      let users: Object[];
      try {
        users = await usersCollection.find({username: data.username}).toArray();
        console.log(`users ${users} obtained!`);
        if (users.length === 0) {
          await usersCollection.insertOne(data);

          res.status(200).json({ message: "success" });
        } else {
          res.status(200).json({ message: `User with username ${data.username} already exists` });
        }
      } catch (error: any) {
        console.error(error.stack);
        res.json({ error: "Couldn't connect to database" });
        return;
      }
    } else {
      res.json({ message: "Incomplete data" });
    }
  } else {
    res.status(500).json({ error: "sign up failed" });
  }
}
