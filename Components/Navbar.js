import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className="bg-gray-950 text-white flex justify-between px-4 h-16 items-center">
      <div className="logo font-bold text-lg flex justify-center items-center ">
        <img src="/chai.gif" width={34} alt="" />
        <span>Get Me a Chai !</span>
        </div>
      {/* <ul className='flex justify-between gap-4'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Up</li>
        <li>Login </li>
      </ul> */}

      <div>
        <Link href="/login">
          <button type="button" className="text-white bg-gradient-to-br rounded-lg from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
