import Head from "next/head";
import Chat from "../../components/Chat";

type NextChatPage<
  P = { contact: string, chats: string },
  IP = P
  > = NextPage<P, IP>;

const ChatPage: NextChatPage = ({ contact, chats }) => {
  return (
    <>
      <Head>
        <title>Dev Chat</title>
        <meta
          name="description"
          content="Developers unite, come share ideas!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat chats={JSON.parse(chats)} contact={JSON.parse(contact)} />
    </>
  );
};

export default ChatPage;



import type { GetStaticPaths, GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import mongoose, { AnyObject } from "mongoose";
import { WithId } from "mongodb";
import { getSession } from "next-auth/react";

// export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {

//   // open mongoose connection
//   let users: WithId<mongoose.AnyObject>[] | [] = [];
//   try {
//     if (process.env.MONGO_URL) {
//       await mongoose.connect(process.env.MONGO_URL);
//       console.log("Connected to database");
//     } else {
//       console.log("Error connecting to database. URL invalid");
//     }

//     const db = mongoose.connection;

//     const usersCollection = db.collection('users');
//     users = await usersCollection.find().toArray();
//   } catch (error) {
//     console.error(error);
//   }
//   // Create paths from user id
//   const paths = users.map((user) => {
//     return {
//       params: {
//         contactId: `${user.id}`
//       }
//     }
//   });
  
//   return {
//     paths: paths,
//     fallback: false
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const session = await getSession(context);
  // console.log("session: ", session);
  // Define contact and chats type
  interface ContactType extends WithId<AnyObject> {
    contact: {}
  }
  // interface ChatType extends WithId<AnyObject> {
  //   chats: []
  // }

  // define contact variable
  let contact: ContactType | null = null;
  let senderChats: WithId<AnyObject>[] | [] = [];
  let receiverChats: WithId<AnyObject>[] | [] = [];

  // Extract contact id from url param
  interface IParams extends ParsedUrlQuery {
    contactId: string;
  }
  const { contactId } = context.params as IParams;


  // Initiate mongoDb connection
  if (process.env.MONGO_URL) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database...");
    } catch (error) {
      console.log("Problem connecting to database...");
      console.error(error);
    }

    // open Db
    try {
      const db = mongoose.connection;
      console.log("db fetched");
      // Getting users
      const userCollection = db.collection("users");
      console.log("users collecton fetched");
      
      // get contact's details
      contact = await userCollection.findOne({ id: contactId }) as ContactType;
      
      // Getting chats
      const chatsCollection = db.collection("chats");
      console.log("chats collecton fetched");
      
      // console.log("user [contactId]: ", session?.user)
      // console.log("contact [contactId]: ", contact)
      senderChats = await chatsCollection.find({from: session?.user?.email, to: contact.email}).toArray();
      receiverChats = await chatsCollection.find({to: session?.user?.email, from: contact.email}).toArray();
      // console.log("chats: ", chats);
      
    } catch (error) {
      console.log("Problem reading users from database...");
      console.error(error);
    }

  }
  // console.log("senderChats: ", senderChats);
  // console.log("receiverChats: ", receiverChats);
  // console.log("ok");
  return {
    props: {
      contact: JSON.stringify(contact),
      chats: JSON.stringify([senderChats, receiverChats])
    },
  };
}