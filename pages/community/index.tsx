import type { NextPage } from "next";
import Head from "next/head";
import axios from 'axios'

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
  let response;
  try {

    response = await axios.get(`${process.env.SITE_URL}/api/post`, {
      headers: {
        "content-type": "application/json",
      },
    });
    // response = await fetch(`${process.env.SITE_URL}/api/post`, {
    //   method: "GET",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
  } catch (err) {console.error(err)};
  
  const posts = response?.statusText==='OK' ? response.data.posts : ["failed"];
  // const {posts} = response?.ok ? await response.json() : ["failed"];

  // console.log("Community page get static props: ", posts)
  // console.log('post type: ', typeof(posts))

  return {
    props: {
      posts: posts,
      // posts: [],
    },
  };
}
