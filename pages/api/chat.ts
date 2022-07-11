import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const message = req.body;
console.log("chat api", message);
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};