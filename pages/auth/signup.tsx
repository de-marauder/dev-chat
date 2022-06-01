import type { NextPage } from 'next'
import Head from 'next/head'
import Signup from '../../components/Auth/signup'


const signup: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dev Chat</title>
        <meta name="description" content="Developers unite, come share ideas!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup />
    </div>
  )
}

export default signup;
