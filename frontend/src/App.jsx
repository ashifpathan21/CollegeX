import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
import LikedProducts from './pages/LikedProducts.jsx'
import Signup from './pages/Signup.jsx'
import OtherPage from './pages/OtherPage.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        
        <Route path='*' element={<OtherPage/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/liked-products' element={
          <UserProtectedWrapper>
          <LikedProducts/>
          </UserProtectedWrapper>
          } />

        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductDetail/>} />
      </Routes>
      
    </div>
  )
}

export default App
