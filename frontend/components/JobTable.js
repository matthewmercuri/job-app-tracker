import axios from 'axios'
import useSWR from 'swr'
import { useState, useEffect } from 'react'

import JobTableItem from '../components/JobTableItem'

const fetcher = url => axios.get(url).then(res => res.data)

export default function JobTable () {
  const { data, error } = useSWR('http://127.0.0.1:8000/get-all-apps/', fetcher)

  const [sortType, setSortType] = useState('appID')

  const sortID = () => data.sort((a, b) => {
    return a.appID - b.appID
  })

  const sortUpdated = () => data.sort((a, b) => {
    return new Date(a.dateUpdated) - new Date(b.dateUpdated)
  })

  const sortApplied = () => data.sort((a, b) => {
    return new Date(a.dateApplied) - new Date(b.dateApplied)
  })

  // why do we need this? why does this work?
  if (data && sortType === 'appID') {
    sortID()
  } else if (sortType === 'dateUpdated' && data) {
    sortUpdated()
  } else if (sortType === 'dateApplied' && data) {
    sortApplied()
  }

  useEffect(() => {
    if (sortType === 'appID' && data) {
      sortID()
    } else if (sortType === 'dateUpdated' && data) {
      sortUpdated()
    } else if (sortType === 'dateApplied' && data) {
      sortApplied()
    }
  }, [sortType])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <table>
      <thead>
        <tr className='bg-gray-800 border-b-8'>
          <th className='text-white cursor-pointer' onClick={() => setSortType('appID')}>App ID</th>
          <th className='text-white'>Employer</th>
          <th className='text-white'>Position</th>
          <th className='text-white cursor-pointer' onClick={() => setSortType('dateApplied')}>Date Applied</th>
          <th className='text-white cursor-pointer' onClick={() => setSortType('dateUpdated')}>Date Updated</th>
          <th className='text-white'>Medium</th>
          <th className='text-white'>Status</th>
        </tr>
      </thead>
      <tbody>
        {[...data].map(
          d => <JobTableItem key={d.appID} data={d} />
        )}
      </tbody>
    </table>
  )
}
