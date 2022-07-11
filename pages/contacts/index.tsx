import { WithId } from "mongodb";
import mongoose, { AnyObject } from "mongoose";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";

import Contacts from "../../components/Contacts";
import classes from "../../styles/Landing/Hero.module.scss";

type NextContactPage<
  P = { users: string; contacts: string },
  IP = P
  > = NextPage<P, IP>;

const ContactPage: NextContactPage = (props) => {
  const { data: session } = useSession();

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
      {
        session?.user ?
          <Contacts
            contacts={props.contacts ? JSON.parse(props.contacts) : []}
            users={props.users ? JSON.parse(props.users) : []}
          /> :

          (
            <div style={{ textAlign: "center", paddingTop: "8rem" }}>
              <h1 style={{ marginBottom: "2rem" }}>Login To View your contacts</h1>
              <button
                onClick={() => {
                  signIn("google");
                }}
                className={`${classes.btn} ${classes.pri_btn} ${classes.hero_btn}`}
              >
                Get Started
              </button>
            </div>)
      }
    </>
  );
};

export default ContactPage;

type User = {
  image: string;
  name: string;
  email: string;
  id: Number;
  contacts: [];
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  // console.log("session: ", session);

  // Initialize all users and logged in user as null
  let users: WithId<AnyObject>[] | [] = [];
  let loggedUser: User | WithId<mongoose.AnyObject> | null = null;

  // Initialize contacts array
  let loggedUserContacts: [] = [];

  // Open database connection if user is logged in
  if (process.env.MONGO_URL && session?.user) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database...");
    } catch (error) {
      console.log("Problem connecting to database...");
      console.error(error);
    }

    // Get logged in user details and users not currently in their contact list.
    try {
      const db = mongoose.connection;
      console.log("db fetched");
      const userCollection = db.collection("users");
      console.log("collecton fetched");
      loggedUser = await userCollection.findOne({
        // name: session?.user?.name,
        email: session?.user?.email,
        // image: session?.user?.image,
      });
      // console.log("loggedUser: ", loggedUser);

      loggedUserContacts = loggedUser ? loggedUser?.contacts : [];
      // console.log("loggedUserContacts: ", loggedUserContacts)
      const loggedUserContactsId = loggedUserContacts ? loggedUserContacts.map(
        (contact: User) => contact.id
      ) : [];

      // Use the contact ids to filter out loged users contact from users to be displayed.
      users = loggedUserContactsId.length === 0 ? await userCollection
        .find({ id: { $nin: [ loggedUser?.id]} })
        .toArray() : await userCollection
        .find({ id: { $nin: [...loggedUserContactsId, loggedUser?.id]} })
        .toArray();

      // console.log("users: ", users);
    } catch (error) {
      users = [];
      loggedUserContacts = [];
      loggedUser = null;
      console.log("Problem reading users from database...");
      console.error(error);
    }
    // console.log("all users: ", users);
    // console.log("logged user is: ", loggedUser);

  }
  return {
    props: {
      users: session?.user ? JSON.stringify(users) : `${[]}`,
      contacts: session?.user ? JSON.stringify(loggedUserContacts) : `${[]}`,
    },
  };
};
