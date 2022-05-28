import type { NextPage } from 'next'
import Head from 'next/head'

import Landing from '../components/Landing'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dev Chat</title>
        <meta name="description" content="Developers unite, come share ideas!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  )
}

export default Home
