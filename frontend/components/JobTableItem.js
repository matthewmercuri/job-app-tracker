export default function JobTableItem ({ data }) {
  let badgeColor
  switch (data.status) {
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
      badgeColor = 'bg-pink-400'
      break
    case 'offer':
      badgeColor = 'bg-green-700'
      break
    default:
      badgeColor = 'bg-black'
  }
  return (
    <tr className='bg-gray-700 border-b-8 h-16'>
      <td className='text-center text-white font-light'>{data.appID}</td>
      <td className='text-center text-white font-bold'>{data.employer}</td>
      <td className='text-center text-white font-bold'>{data.position}</td>
      <td className='text-center text-white'>{data.dateUpdated}</td>
      <td className='text-center text-white'>{data.medium}</td>
      {/* cant apply box shadow */}
      <td><div className={`text-center text-white font-bold py-2 mx-2 rounded-md ${badgeColor}`}>{data.status}</div></td>
    </tr>
  )
}
