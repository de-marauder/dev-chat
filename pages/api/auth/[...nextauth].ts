import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
const User = require("../model/User");
// import EmailProvider from 'next-auth/providers/email'

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
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "");
      const db = mongoose.connection;

      db.on("error", (error) => {
        console.log(
          `An error has occured trying to connect to Database. \n${error}`
        );
      });
      db.once("open", () => {
        console.log("Connected to database");
      });

      const usersCollection = db.collection("users");

      const userDoc = await usersCollection.find(user).toArray();

      if (userDoc.length === 0) {
          const newUser = new User(user)
        await usersCollection.insertOne(newUser);
        console.log("New user added to DB");
      } else {
        console.log("user already exists in DB");
      }

    //   console.log("userDoc => ", userDoc);

    //   console.log("profile ==> ", profile);
    //   console.log("account ==> ", account);
    //   console.log("user ==> ", user);
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
