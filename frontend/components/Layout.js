import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout ({ children }) {
  const router = useRouter()
  return (
    <div className='min-h-screen flex bg-gray-200'>
      <div className='h-screen fixed flex flex-col justify-start items-center w-16 bg-blue-800'>
        <Link href='/'><a className='w-2/3 my-6'><img src={router.pathname === '/' ? 'nav/home-solid-active.svg' : 'nav/home-solid.svg'} /></a></Link>
        <Link href='/data'><a className='w-2/3 my-6'><img src={router.pathname === '/data' ? 'nav/table-solid-active.svg' : 'nav/table-solid.svg'} /></a></Link>
      </div>
      {children}
    </div>
  )
}
