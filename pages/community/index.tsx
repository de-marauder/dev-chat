import type { NextPage } from "next";
import Head from "next/head";

import Community from "../../components/Community";

type NextPageWithSlug<P = { posts: [] }, IP = P> = NextPage<P, IP>;

const CommunityPage: NextPageWithSlug = (props) => {
  const CommunityLayout = Community.Layout;
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
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts: posts.slice(0, 10),
    },
  };
}
