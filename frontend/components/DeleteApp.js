import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function DeleteApp ({ appID }) {
  const [deleted, setDeleted] = useState(false)
  const router = useRouter()

  if (deleted) {
    axios.delete(`http://127.0.0.1:8000/delete-app/${appID}/`)
    router.push('/success')
  }

  return (
    <div onClick={() => setDeleted(true)} className='w-4/5 h-10 py-6 text-white bg-red-600 hover:bg-red-700 font-bold rounded-md flex justify-center items-center text-2xl cursor-pointer'>
      Delete Application
    </div>
  )
}
