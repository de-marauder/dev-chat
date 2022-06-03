import type { NextPage } from "next";
import Head from "next/head";
import axios from 'axios';

import FullPost from "../../../components/Community/FullPost";

// type Props = {
//   post: {
//     id: number;
//     userId: number;
//     title: string;
//     body: string;
//   };
//   children: JSX.Element;
// };

type NextPostPage<
  P = {
    post: {
      id: number;
      author: string;
      title: string;
      body: string;
      content: string;
      comments: [] | [{ author: string; content: string; created_At: Date; }];
      created_At: Date;
    };
  },
  IP = P
> = NextPage<P, IP>;

const PostPage: NextPostPage = (props) => {
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
        <FullPost post={props.post} />
      </CommunityLayout>
    </>
  );
};

export default PostPage;

import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import CommunityLayout from "../../../components/Community/CommunityLayout";
import Error from "next/error";

// export const getStaticPaths: GetStaticPaths = async (context) => {
export const getStaticPaths = async () => {
  // const router = useRouter()
  // console.log("getStatitcPaths initiating...")
  let response;
  try {
    response = await axios.get(`${process.env.SITE_URL}/api/post`);
  } catch (error) {
    console.error(error)
  }
  // console.log(response);
  const posts = response?.statusText === "OK" ? response.data.posts : ["failed"];
  // console.log("getStaticPaths ==> ", posts);
  const paths = posts.map(
    (
      post: {
        id: number;
      },
      id: number
    ) => {
      return {
        params: {
          postId: `${post.id}`,
        },
      };
    }
  );
  // console.log("PATHS => postId", paths);
  return {
    paths: paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  
  // Define param type
  interface IParams extends ParsedUrlQuery {
    title: string;
  }
  
  const { postId } = context.params as IParams;
  
  // console.log("post page PROPS => title", postId);
  
  //fetch posts
  let response;
  try {
    response = await axios.get(`${process.env.SITE_URL}/api/post/${postId}`);
  } catch (err) {console.error(err)}
  // console.log(response);
  const post = response?.statusText==="OK" ? response.data.post : ["failed"];
  // console.log("post: ", post);
  return {
    props: {
      post: post[0]
    },
  };
};
