"use client"
import React, {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  
  return (
    <nav className="bg-gray-950 text-white flex justify-between px-4 md:h-16 items-center md:flex-row ">
        <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
          <img className='invertImg' src="/chai.gif" width={34} alt="" />
          <span className='text-xl md:text-base my-3 md:my-0'>Get Me a Chai !</span>
        </Link>

      <div className="relative flex flex-col md:block gap-4 ">
        {session && <><button onClick={() => setShowdropdown(!showdropdown)}  id="dropdownHoverButton" onBlur={() => {
  setTimeout(() => {setShowdropdown(false)}, 100)}} data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="inline-flex items-center justify-center text-white bg-blue-700  box-border rounded-lg border border-transparent hover:bg-blue-strong focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-900 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
  Welcome {session.user.email} 
  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
</button>
<div id="dropdownHover" className={` ${showdropdown ? "block" : "hidden"} z-10 mt-2 absolute left-[125px] bg-white divide-y  divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800`}>
    <ul className="p-2  text-sm text-body font-medium" aria-labelledby="dropdownHoverButton">
      <li>
        <Link href="/dashboard" onClick={() => setShowdropdown(false)}
  className="block w-full p-2 text-white hover:bg-gray-700 rounded cursor-pointer">Dashboard</Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`} onClick={() => setShowdropdown(false)}
  className="block w-full p-2 text-white hover:bg-gray-700 rounded cursor-pointer">Your Page</Link>
      </li>
      <li>
        <button className='inline-flex items-center w-full p-2 hover:bg-gray-700 rounded cursor-pointer' onClick={() => signOut()}> Sign out</button>
      </li>
    </ul>
</div></>
}

        {session &&<button type="button" className="text-white ml-2 bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5" onClick={() => signOut()}>
          Logout
        </button>}
        {!session &&<Link href="/login">
          <button type="button" className="text-white ml-2 bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Login</button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar
