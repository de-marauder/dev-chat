// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("route hit");
  console.log(req.method);

  if (process.env.MONGO_URL) {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connected to database");
  } else {
    console.error({
      message: "Could not read environment variable [MONGO_URL]",
    });
  }

  const db = mongoose.connection;

  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    let user;
    try {
      const usersCollection = db.collection("users");
      user = await usersCollection.find(data).toArray();
      const actualPasswordHash = user[0].password;
      console.log(user);
      if (user.length === 1) {
        const match = await bcrypt.compare(data.password, actualPasswordHash);

        if (match) {
          res.send({ message: "User identified and authenticated" });
          console.log("response written");
          res.end();
        }
      } else {
        res.status(404).json({
          message:
            "User not found. Check details or Sign up with a new account",
        });
      }
    } catch (error: any) {
      console.error(`ERROR!!! ${error.stack}`);
    }
  } else {
    const data = {
      error: "Some error occured",
    };
    res.status(500).json(data);
  }
}
