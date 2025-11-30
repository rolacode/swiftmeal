import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll use react-router-dom for navigation
import { FiMenu, FiX, FiSearch, FiShoppingCart } from 'react-icons/fi'; // For icons, you'll need to install react-icons

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //the logo from your assets
  const logoSrc = '/assets/products/logo2.png'; // Replace with your actual logo path or use text

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 ml-5">
          {/*logo image  */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            <img src={logoSrc} alt="Swift Meal Logo" className="h-30 ml-2" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-orange-600 hover:text-orange-700 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-orange-600 hover:text-orange-700 transition-colors">
            About Us
          </Link>
          <Link to="/tracker" className="text-orange-600 hover:text-orange-700 transition-colors">
            Order Tracker
          </Link>
          <Link to="/services" className="text-orange-600 hover:text-orange-700 transition-colors">
            Services
          </Link>
        </div> 

          {/* Login/Sign Up Buttons - visible on desktop */}
        <div className='flex items-center space-x-4'>  
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 border bg-black rounded-md text-white hover:bg-gray-400 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-white-500 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-700 transition-colors">
              Sign in
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white mt-4 space-y-2 pb-4 border-t border-gray-200">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link to="/tracker" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            Order Tracker
          </Link>
          <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          {/* Mobile specific search/cart/auth */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
            <button className="text-gray-600 hover:text-orange-500">
              <FiSearch size={20} /> Search
            </button>
            <button className="text-gray-600 hover:text-orange-500 ml-4">
              <FiShoppingCart size={20} /> Cart
            </button>
          </div>
          <div className="flex flex-col space-y-2 px-4 pt-2 border-t border-gray-100">
            <Link to="/login" className="w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600" onClick={() => setIsOpen(false)}>
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
