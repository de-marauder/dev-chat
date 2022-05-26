import type { NextPage } from 'next'
import Head from 'next/head'

import Login from '../../components/Auth/login'

const login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dev Chat</title>
        <meta name="description" content="Developers unite, come share ideas!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}

export default login
