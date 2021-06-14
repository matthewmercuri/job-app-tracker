import axios from 'axios'
import { useRouter } from 'next/router'

export default function Modify ({ app }) {
  const today = new Date()
  const router = useRouter()

  const onSubmitForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target) // eslint-disable-line
    const body = {}
    formData.forEach((value, property) => (body[property] = value))
    body.dateUpdated = today.toISOString().substr(0, 10) // just make equal to date applied?
    body.appID = app.appID

    if (body.status === 'unchanged') {
      body.status = app.status
    }

    axios.put('http://127.0.0.1:8000/update-app/', body, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res.data)
        router.push('/success')
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  return (
    <div className='bg-gray-800 w-6/12 h-4/5 flex flex-col items-center mr-10 py-4 px-8 rounded-md shadow-xl text-center'>
      <h2 className='text-white text-3xl font-bold mb-6'>Update Application</h2>
      <form className='flex flex-col justify-around h-full w-full' onSubmit={e => onSubmitForm(e)}>
        <label htmlFor='status'>
          <p className='text-white text-2xl mb-3'>Status:</p>
          <select className='mb-2 px-4 py-1 focus:outline-none bg-gray-700 rounded-md text-white border-0' id='status' name='status' required>
            <option value='unchanged'>Unchanged</option>
            <option value='applied'>Applied</option>
            <option value='planned'>Planned</option>
            <option value='rejected'>Rejected</option>
            <option value='interview'>Interview</option>
            <option value='detailed interview'>Detailed Interview</option>
            <option value='stale'>Stale</option>
            <option value='offer'>Offer</option>
          </select>
        </label>
        <label htmlFor='notes'>
          <p className='text-white text-2xl mb-3'>Notes (optional):</p>
          <textarea className=' text-white text-xl mb-2 px-4 py-1 w-full h-96 focus:outline-none bg-gray-700 rounded-md' type='date' id='notes' name='notes' defaultValue={app.notes} />
        </label>
        <button type='submit' className='bg-green-400 text-white mx-auto font-bold text-xl w-32 px-1 py-4 rounded-md hover:bg-green-500 focus:outline-none'>Update</button>
      </form>
    </div>
  )
}
