import React ,{useEffect , useState} from 'react'
import {useSelector , useDispatch } from 'react-redux' 
import Product from '../components/Product/Product.jsx'
import Filter from '../components/Product/Filter.jsx'
import Navbar from '../components/Home/Navbar.jsx' 


const Products = () => {
   const dispatch = useDispatch() ; 
   const {allProducts} = useSelector(state => state.product) ;
  console.log(allProducts)
  const [products , setProducts] = useState(allProducts || []) 

  return (
    <div className='h-full  w-screen overflow-x-hidden bg-[#080b19f2] min-h-screen '> 
      <Navbar/>
     <Filter/>


    <div className='grid grid-cols-1 p-4 px-8 md:grid-cols-2 lg:grid-cols-3 mt-10 '>
     {
      products?.map(product => 
        <Product product={product} />
      )
     }

    </div>
     

      
    </div>
  )
}

export default Products
