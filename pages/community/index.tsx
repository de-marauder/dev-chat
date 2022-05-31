import type { NextPage } from "next";
import Head from "next/head";

import Community from "../../components/Community";
import CommunityLayout from "../../components/Community/CommunityLayout";

type NextPageWithSlug<P = { posts: [] }, IP = P> = NextPage<P, IP>;

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
        <Community {...props} />
      </CommunityLayout>
    </>
  );
};

export default CommunityPage;

export async function getStaticProps() {
  // fetch posts and fix as prop
  const response = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const {posts} = response.ok ? await response.json() : ["failed"];

  console.log("Community page get static props: ", posts)
  // console.log('post type: ', typeof(resJson.posts))

  return {
    props: {
      posts: posts,
    },
  };
}
