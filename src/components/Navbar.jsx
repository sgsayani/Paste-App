import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const NavLinkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-medium transition-all duration-300  
     ${isActive 
        ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg" 
        : "text-black hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 hover:text-white hover:shadow-lg"
     }`;

  return (
    <nav className="bg-white shadow-md p-4 w-full">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          PasteApp
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink to="/" className={NavLinkStyles} >
            Home
          </NavLink>
          <NavLink to="/pastes" className={NavLinkStyles}>
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
