import Head from 'next/head'

import CreateApp from '../components/CreateApp'

// form-data npm / react-hook-form
export default function Home () {
  return (
    <>
      <Head>
        <title>Job App Tracker</title>
      </Head>
      <CreateApp />
    </>
  )
}
