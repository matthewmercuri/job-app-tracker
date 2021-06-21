import Modify from '../components/Modify'

export default function App ({ app }) {
  app = app[0]

  let badgeColor
  switch (app.status) {
    case 'planned':
      badgeColor = 'bg-purple-600'
      break
    case 'applied':
      badgeColor = 'bg-green-500'
      break
    case 'rejected':
      badgeColor = 'bg-red-600'
      break
    case 'interview':
      badgeColor = 'bg-blue-600'
      break
    case 'detailed interview':
      badgeColor = 'bg-blue-700'
      break
    case 'stale':
      badgeColor = 'bg-yellow-500'
      break
    case 'offer':
      badgeColor = 'bg-green-700'
      break
    default:
      badgeColor = 'bg-black'
  }

  return (
    <div className='flex-grow flex items-center justify-center'>
      <Modify app={app} />
      <div className='bg-gray-800 w-2/6 flex flex-col items-center justify-center py-4 px-8 h-2/5 rounded-md shadow-xl text-center text-white'>
        <p className={`text-center w-3/5 font-bold capitalize text-2xl ${badgeColor} py-2 rounded-md`}>{app.status}</p>
        <div className='text-xl my-6 flex justify-center'>
          <p className='mr-16 font-light'>Date Applied: <span className='font-bold'>{app.dateApplied}</span></p>
          <p className='font-light'>Last Updated: <span className='font-bold'>{app.dateUpdated}</span></p>
        </div>
        <div className='w-4/5 bg-gray-700 py-2 rounded-md'>
          <p className='text-xl text-gray-400'>{app.employer}</p>
          <p className='text-3xl font-bold'>{app.position}</p>
        </div>
        <p className='mt-6 font-light text-xl'>Applied Through: <span className='font-bold'>{app.medium}</span></p>
      </div>
    </div>
  )
}
