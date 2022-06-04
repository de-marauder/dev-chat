import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
const User = require("../model/User");


// const secret = process.env.NEXTAUTH_SECRET;


export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "",
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "");
      const db = mongoose.connection;

      const usersCollection = db.collection("users");

      const userDoc = await usersCollection.find(user).toArray();

      if (userDoc.length === 0) {
          const newUser = new User(user)
        await usersCollection.insertOne(newUser);
        console.log("New user added to DB");
      } else {
        console.log("user already exists in DB");
      }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
