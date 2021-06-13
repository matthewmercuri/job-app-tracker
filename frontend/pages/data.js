import axios from 'axios'
import useSWR from 'swr'

import JobTableItem from '../components/JobTableItem'

const fetcher = url => axios.get(url).then(res => res.data)

export default function data () {
  const { data, error } = useSWR('http://127.0.0.1:8000/get-all-apps/', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className='flex flex-col w-4/5 mx-auto my-10'>
      <table>
        <tr className='bg-gray-800 border-b-8'>
          <th className='text-white'>App ID</th>
          <th className='text-white'>Employer</th>
          <th className='text-white'>Position</th>
          <th className='text-white'>Date Updated</th>
          <th className='text-white'>Medium</th>
          <th className='text-white'>Status</th>
        </tr>
        {data.map(
          d => <JobTableItem key={d.appID} data={d} />
        )}
      </table>
    </div>
  )
}
