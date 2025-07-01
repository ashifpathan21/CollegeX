import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import MyProducts from './pages/MyProducts.jsx'
import Sell from './pages/Sell.jsx'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
import SearchProduct from './pages/SearchProduct.jsx'
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
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/profile' element={
           <UserProtectedWrapper>
          <Profile/>
          </UserProtectedWrapper>
        
          } />
        <Route path='/liked-products' element={
          <UserProtectedWrapper>
          <LikedProducts/>
          </UserProtectedWrapper>
          } />

        <Route path='/products' element={<Products/>} />
        <Route path='/searchProducts' element={<SearchProduct/>} />
        <Route path='/myProducts' element={
            <UserProtectedWrapper>
             <MyProducts/>
         </UserProtectedWrapper>
      } />
        <Route path='/sell' element={
            <UserProtectedWrapper>
             <Sell/>
         </UserProtectedWrapper>
      } />
        <Route path='/chat' element={
            <UserProtectedWrapper>
             <Chat/>
         </UserProtectedWrapper>
      } />
        <Route path='/products/:id' element={<ProductDetail/>} />
      </Routes>
      
    </div>
  )
}

export default App
