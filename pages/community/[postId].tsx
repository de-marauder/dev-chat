import type { NextPage } from "next";
import Head from "next/head";

import FullPost from "../../components/Community";

const PostPage: NextPage = () => {
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
      <FullPost />
    </>
  );
};

export default PostPage;

// export async function getStaticPaths() {
//   return {
//     path: [
//       {
//         params: "",
//       },
//     ],
//     fallback: false
//   };
// }
// export async function getStaticProps() {
//   return {
//     props: "",
//   };
// }
