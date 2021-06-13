import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CreateApp () {
  const today = new Date()
  const [failure, setFailure] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const onSubmitForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target) // eslint-disable-line
    const body = {}
    formData.forEach((value, property) => (body[property] = value))
    body.dateUpdated = today.toISOString().substr(0, 10)
    // body.dateUpdated = '2021-06-12'
    axios.post('http://127.0.0.1:8000/create-app/', body, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res.data)
        router.push('/success')
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.detail)
        setFailure(true)
      })
  }

  return (
    <div className='min-h-full flex-grow flex flex-col justify-center items-center'>
      {failure ? <div className='w-1/2 h-10 my-1 flex justify-center items-center rounded-md bg-red-500'><h3 className='text-xl text-white'>Error: {errorMessage}</h3></div> : null}
      <form className='flex flex-col w-1/2 bg-blue-800 p-4 rounded-md' onSubmit={e => onSubmitForm(e)}>
        <label htmlFor='appID'>
          <p className='text-white mb-1'>App ID:</p>
          <input className='mb-2 px-4 py-1 focus:outline-none' type='number' id='appID' name='appID' placeholder='App ID' min={0} required />
        </label>
        <label htmlFor='employer'>
          <p className='text-white mb-1'>Employer:</p>
          <input className='mb-2 px-4 py-1 focus:outline-none' type='text' id='employer' name='employer' placeholder='employer' required />
        </label>
        <label htmlFor='position'>
          <p className='text-white mb-1'>Position:</p>
          <input className='mb-2 px-4 py-1 focus:outline-none' type='text' id='position' name='position' placeholder='position' required />
        </label>
        <label htmlFor='industry'>
          <p className='text-white mb-1'>Industry:</p>
          <input className='mb-2 px-4 py-1 focus:outline-none' type='text' id='industry' name='industry' placeholder='industry' required />
        </label>
        <label htmlFor='resumeFileName'>
          <p className='text-white mb-1 mt-9'>Resume File Name:</p>
          <input className='mb-2 w-1/3 px-4 py-1 focus:outline-none' type='text' id='resumeFileName' name='resumeFileName' placeholder='resume file name' required />
        </label>
        <label htmlFor='coverLetterFileName'>
          <p className='text-white mb-1'>Cover Letter File Name:</p>
          <input className='mb-2 w-1/3 px-4 py-1 focus:outline-none' type='text' id='coverLetterFileName' name='coverLetterFileName' placeholder='cover letter file name' required />
        </label>
        <label htmlFor='dateApplied'>
          <p className='text-white mb-1 mt-9'>Date Applied:</p>
          <input className='mb-2 px-4 py-1 focus:outline-none' type='date' id='dateApplied' name='dateApplied' required />
        </label>
        <label htmlFor='status'>
          <p className='text-white mb-1'>Status:</p>
          <select className='w-1/3 mb-2 px-4 py-1 focus:outline-none' id='status' name='status' required>
            <option value='applied'>Applied</option>
            <option value='planned'>Planned</option>
            <option value='rejected'>Rejected</option>
            <option value='interview'>Interview</option>
            <option value='detailed interview'>Detailed Interview</option>
            <option value='stale'>Stale</option>
            <option value='offer'>Offer</option>
          </select>
        </label>
        <label htmlFor='medium'>
          <p className='text-white mb-1'>Medium:</p>
          <select className='w-1/3 mb-2 px-4 py-1 focus:outline-none' id='medium' name='medium' required>
            <option value='linkedin'>LinkedIn</option>
            <option value='indeed'>Indeed</option>
            <option value='direct'>Direct</option>
            <option value='other'>Other</option>
          </select>
        </label>
        <label htmlFor='notes'>
          <p className='text-white mb-1 mt-9'>Notes (optional):</p>
          <textarea className='mb-2 h-28px-4 py-1 px-1 w-1/2 focus:outline-none' type='date' id='notes' name='notes' />
        </label>
        <button type='submit' className='bg-green-400 text-white font-bold w-28 px-1 py-2 rounded-md hover:bg-green-500 focus:outline-none'>Submit</button>
      </form>
    </div>
  )
}
