import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      {/* Navbar */}
      <div className='w-full shadow shadow-slate-500 p-3 flex items-center justify-between bg-[#050915] md:px-8'>
        {/* Logo */}
        <div className='flex items-center gap-2 text-white font-bold text-2xl cursor-pointer' onClick={() => navigate('/')}>
       College<span className='text-2xl bg-gradient-to-b from-lime-500 via-cyan-400 to-emerald-400 text-transparent -ml-2 bg-clip-text'>X</span>
        </div>

        {/* Desktop Search + Links */}
        <div className='hidden md:flex items-center gap-6'>
          <div className='flex shadow shadow-gray-500 rounded-lg'>
            <input type="text" placeholder='Search here' className='py-1 bg-white px-4 rounded-l-lg' />
            <button className='px-3 bg-black text-white rounded-r-lg'><i className="ri-search-line"></i></button>
          </div>
          <button onClick={() => navigate('/products')} className='text-white font-semibold hover:text-blue-400'>Products</button>
          <button onClick={() => navigate('/sell')} className='text-white font-semibold hover:text-blue-400'>Sell</button>
          <button onClick={() => navigate('/liked-products')} className='text-white font-semibold hover:text-blue-400'>
            <i className="ri-heart-2-fill"></i>
          </button>
          {user ? (
            <img src={user?.avatar || ''} className='h-10 w-10 rounded-full object-cover' alt="avatar" />
          ) : (
            <>
              <button onClick={() => navigate('/login')} className='text-white font-semibold hover:text-blue-400'>Login</button>
              <button onClick={() => navigate('/signup')} className='text-white font-semibold hover:text-blue-400'>Signup</button>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden text-white text-2xl cursor-pointer' onClick={toggleDrawer}>
          <i className='ri-menu-line'></i>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#0f172a] text-white z-50 shadow-2xl transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Close Button */}
        <div className='flex justify-end p-4'>
          <button onClick={closeDrawer} className='text-2xl'><i className='ri-close-line'></i></button>
        </div>

        {/* Drawer Items */}
        <div className='flex flex-col gap-6 px-6'>
          <input type="text" placeholder='Search here' className='py-2 px-4 bg-white text-black rounded-lg' />
          <button onClick={() => { navigate('/products'); closeDrawer(); }} className='hover:text-blue-400'>Products</button>
          <button onClick={() => { navigate('/sell'); closeDrawer(); }} className='hover:text-blue-400'>Sell</button>
          <button onClick={() => { navigate('/liked-products'); closeDrawer(); }} className='hover:text-blue-400'>
            <i className="ri-heart-2-fill"></i> Liked
          </button>
          {user ? (
            <img src={user?.avatar || ''} className='h-12 w-12 rounded-full object-cover' alt="avatar" />
          ) : (
            <>
              <button onClick={() => { navigate('/login'); closeDrawer(); }} className='hover:text-blue-400'>Login</button>
              <button onClick={() => { navigate('/signup'); closeDrawer(); }} className='hover:text-blue-400'>Signup</button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop when drawer open */}
      {isDrawerOpen && (
        <div onClick={closeDrawer} className='fixed inset-0 bg-black bg-opacity-30 z-40'></div>
      )}
    </>
  )
}

export default Navbar
