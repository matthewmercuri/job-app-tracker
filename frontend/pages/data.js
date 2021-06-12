import axios from 'axios'
import useSWR from 'swr'

import JobTableItem from '../components/JobTableItem'

const fetcher = url => axios.get(url).then(res => res.data)

export default function data () {
  const { data, error } = useSWR('http://127.0.0.1:8000/get-all-apps/', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div>
      {console.log(data)}
      {data.map(
        d => <JobTableItem key={d.appID} data={d} />
      )}
    </div>
  )
}
