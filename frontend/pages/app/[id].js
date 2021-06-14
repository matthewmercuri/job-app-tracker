import axios from 'axios'

import App from '../../components/App'

export default function id ({ app }) {
  return (
    <App app={app} />
  )
}

export async function getServerSideProps ({ params }) {
  const _app = await axios.get(`http://127.0.0.1:8000/get-app/${params.id}/`)
  const app = _app.data

  if (!app) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      app
    }
  }
}
