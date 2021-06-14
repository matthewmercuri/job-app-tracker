import Head from 'next/head'
import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Job App Tracker</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
