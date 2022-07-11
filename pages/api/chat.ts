import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import Chat from "./model/Chat";

if (process.env.MONGO_URL) {
  try {
    (async () => { await mongoose.connect(process.env.MONGO_URL!) })()
    console.log("Connected to database");
  } catch (error) {
    console.log("Error opening database connection");
    console.error(error);
  }
};
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const message = req.body;
    console.log("chat api", message);
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);


    // Create a Chat document and save to database
    const chatDoc = new Chat(message);

    try {
      const db = mongoose.connection;
      console.log("db fetched")
      const chatCollection = db.collection("chats");

      // Add chat to database
      await chatCollection.insertOne(chatDoc);
    } catch (error) {
      console.log("Error reading Database");
      console.error(error);
    }

    
    // return message
    res.status(201).json(message);
  }

}
