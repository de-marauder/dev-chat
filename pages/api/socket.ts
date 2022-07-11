// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as socketio from 'socket.io';
import { NextApiResponseServerIO } from "../../types/next";
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from "http";
import mongoose from 'mongoose';

import Chat from './model/Chat';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  console.log("RESPONSE SOCKET OBJECT: ", res.socket)
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const httpServer: NetServer = res.socket.server as any;
    const io = new socketio.Server(httpServer, {
      path: '/api/socket'
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
    console.log("io", res.socket.server.io)

    io.on('connection', (socket: socketio.Socket) => {
      console.log('io connection');

      socket.on('chat message', async (socketId: string, message: {}) => {

        console.log(message)
        socket.emit('chat-message', socketId, message); // send message to client

        // Create a Chat document and save to database
        // const chatDoc = new Chat(message);

        // if (process.env.MONGO_URL) {
        // try {
        //   await mongoose.connect(process.env.MONGO_URL);
        //   console.log("Connected to database");
        // } catch (error) {
        //   console.log("Error opening database connection");
        //   console.error(error);
        // }

        // try {
        //   const db = mongoose.connection;
        //   console.log("db fetched")
        //   const chatCollection = db.collection("chats");

        //   // Add chat to database
        //   await chatCollection.insertOne(chatDoc);
        // } catch (error) {
        //   console.log("Error reading Database");
        //   console.error(error);
        // }
        // }
      })


      socket.on('disconnect', () => {
        console.log('client disconnected');
      })
    });
  }
  res.end()
}

export default SocketHandler;