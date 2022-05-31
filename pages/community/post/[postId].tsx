import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

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

export const getStaticPaths: GetStaticPaths = async (context) => {
  // const router = useRouter()
  console.log("getStatitcPaths initiating...")
  const response = await fetch(`http://localhost:3000/api/post`);
  // console.log(response);
  const {posts} = await response.json();
  console.log("getStaticPaths ==> ", posts);
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
  console.log("PATHS => postId", paths);
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
  
  console.log("post page PROPS => title", postId);
  
  //fetch posts
  const response = await fetch(`http://localhost:3000/api/post/${postId}`);
  // console.log(response);
  const {post} = await response.json();
  console.log("post: ", post);
  return {
    props: {
      post: post[0]
    },
  };
};
