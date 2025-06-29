import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductDetail/>} />
      </Routes>
      
    </div>
  )
}

export default App
