import type { NextPage } from "next";
import Head from "next/head";

import FullPost from "../../../components/Community/FullPost";

type NextPostPage<
  P = {
    post: string
  },
  IP = P
> = NextPage<P, IP>;

const PostPage: NextPostPage = ({post}) => {

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
        <FullPost post={JSON.parse(post)} />
      </CommunityLayout>
    </>
  );
};

export default PostPage;

import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import CommunityLayout from "../../../components/Community/CommunityLayout";
import mongoose from "mongoose";

export const getStaticPaths = async () => {
  let posts;
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database");
    } else {
      console.log("Error connecting to database. URL invalid");
    }

    const db = mongoose.connection;

    const postsCollection = db.collection('posts');
    posts = await postsCollection.find().toArray()
  } catch (error) {
    console.error(error);
  }
  
  const paths = posts?.map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  
  // Define param type
  interface IParams extends ParsedUrlQuery {
    postId: string;
  }

  const { postId } = context.params as IParams;

  //fetch posts
  let post: {} = {};
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database");
    } else {
      console.log("Error connecting to database. URL invalid");
    }

    const db = mongoose.connection;
    const postsCollection = db.collection("posts");

    const postList = await postsCollection.find({id: parseInt(postId)}).toArray();
    post = postList[0];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      post: JSON.stringify(post),
    },
  };
};
