import type { NextPage } from "next";
import Head from "next/head";

import Community from "../../components/Community";
import CommunityLayout from "../../components/Community/CommunityLayout";
import mongoose from "mongoose";

type NextPageWithSlug<P = { posts: string }, IP = P> = NextPage<P, IP>;

const CommunityPage: NextPageWithSlug = (props) => {
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
      <CommunityLayout>
        <Community posts = {JSON.parse(props.posts)} />
      </CommunityLayout>
    </>
  );
};

export default CommunityPage;

export async function getStaticProps() {
  
  let posts;
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database")
    } else {
      console.log("Error connecting to database")
    }

    const db = mongoose.connection;

    const postsCollection = db.collection('posts');
    posts = await postsCollection.find().toArray()

  } catch (err) {console.error(err)};

  return {
    props: {
      posts: JSON.stringify(posts),
    },
  };
}
