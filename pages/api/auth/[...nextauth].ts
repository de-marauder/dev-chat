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
      try {
        await mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "");
        console.log("mongo connected...")
      } catch (error) {
        console.log("Problem connecting to database");
        console.error(error);
      }
      let userDoc: object[] = [];
      let usersCollection: mongoose.Collection<mongoose.AnyObject> | undefined = undefined;
      
      try {  
        const db = mongoose.connection;
        usersCollection = db.collection("users");
        
        userDoc = await usersCollection.find({email: user.email}).toArray();        
      } catch (error) {
        console.log("Problem reading database");
        console.error(error);
      }

      if (userDoc.length === 0) {
        console.log("user does not exist")
        const newUser = new User(user)
        try {
          await usersCollection?.insertOne(newUser);
          // console.log("New user added to DB");
        } catch (e) {
          console.error(e);
        }
      } //else {
      //   console.log("user already exists in DB");
      // }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
