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
      userId: number;
      title: string;
      body: string;
    };
    dateStr: string;
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
        <FullPost dateStr={props.dateStr} post={props.post} />
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
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  // console.log(response);
  const posts = await response.json();
  console.log(context);
  const paths = posts.map(
    (
      post: {
        id: number;
      },
      id: number
    ) => {
      return {
        params: {
          postId: `${post.id}-${(new Date()).toString().split(' ').slice(0, 4).join('_')}`,
        },
      };
    }
  );
  // console.log("PATHS => postId", paths);
  return {
    paths: paths.slice(0, 10),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  //fetch post

  interface IParams extends ParsedUrlQuery {
    postId: string;
  }

  const { postId } = context.params as IParams;

  console.log("PROPS => postId", postId);

  const id = postId.split("-")[0];

  console.log("PROPS => id", id);

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  // console.log(response);
  const post = await response.json();
  console.log("post: ", postId);
  return {
    props: {
      post: post,
      dateStr: postId.split("-")[1].split("_").join(" "),
    },
  };
};
