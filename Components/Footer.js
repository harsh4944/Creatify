import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-white  px-4 h-16 flex items-center justify-center">
        <p className="text-center">Copyright &copy; {currentYear} Creatify - All rights reserved.</p>
    </footer>
  )
}

export default Footer
