import Link from 'next/link'

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
      badgeColor = 'bg-red-500'
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

  const today = new Date()
  const daysSinceCalc = () => {
    const ONEDAY = 1000 * 60 * 60 * 24
    const differenceMs = Math.abs(today - (new Date(data.dateApplied)))
    return Math.round(differenceMs / ONEDAY)
  }

  const daysSince = daysSinceCalc()

  let daysSinceColour
  if (daysSince >= 14) {
    daysSinceColour = 'bg-red-500'
  } else if (daysSince > 10) {
    daysSinceColour = 'bg-yellow-500'
  } else {
    daysSinceColour = 'bg-green-500'
  }

  return (
    <Link href={`/app/${data.appID}`}>
      <tr className='bg-gray-700 border-b-8 h-16 cursor-pointer'>
        <td className='text-center text-white font-light'>{data.appID}</td>
        <td className='text-center text-white font-bold'>{data.employer}</td>
        <td className='text-center text-white font-bold'>{data.position}</td>
        <td className='text-center text-white'>{data.dateApplied}</td>
        <td className='text-center text-white'>{data.dateUpdated}</td>
        <td className='text-center text-white'>{data.medium}</td>
        <td className='text-center text-white font-bold flex flex-col h-16 justify-center items-center'><div className={`rounded-md py-2 w-1/2 ${daysSinceColour}`}>{daysSince}</div></td>
        {/* cant apply box shadow */}
        <td className='text-center text-white font-bold'><div className={`py-2 mx-2 rounded-md ${badgeColor}`}>{data.status}</div></td>
      </tr>
    </Link>
  )
}
