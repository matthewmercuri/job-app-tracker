import Link from 'next/link'
export default function Layout ({ children }) {
  return (
    <div className='min-h-screen flex bg-gray-200'>
      <div className='min-h-screen flex flex-col justify-start items-center w-16 bg-blue-800'>
        <Link href='/'><a className='w-2/3 my-6'><img src='nav/home-solid.svg' /></a></Link>
        <Link href='/data'><a className='w-2/3 my-6'><img src='nav/table-solid.svg' /></a></Link>
      </div>
      {children}
    </div>
  )
}
