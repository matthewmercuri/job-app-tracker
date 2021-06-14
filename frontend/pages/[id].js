import axios from 'axios'

import App from '../components/App'

export default function id ({ app }) {
  return (
    <App app={app} />
  )
}

export async function getStaticProps ({ params }) {
  const _app = await axios.get(`http://127.0.0.1:8000/get-app/${params.id}/`)
  const app = _app.data

  return {
    props: {
      app
    }
  }
}

export async function getStaticPaths () {
  const data = await axios.get('http://127.0.0.1:8000/get-all-apps/')

  const paths = data.data?.map((d) => ({
    params: { id: d.appID.toString() }
  }))

  return { paths, fallback: false }
}
