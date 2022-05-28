import type { NextPage } from "next";
import Head from "next/head";

import Community from "../../components/Community";

const CommunityPage: NextPage = () => {
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
      <Community />
    </>
  );
};

export default CommunityPage;

export async function getStaticPaths() {
  // fetch posts and fix slug as param

  return {
    path: [
      {
        params: "",
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  // fetch posts and fix as prop
  
  return {
    props: {},
  };
}
