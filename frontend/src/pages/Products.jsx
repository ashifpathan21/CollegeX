import React ,{useEffect , useState} from 'react'
import {useSelector , useDispatch } from 'react-redux' 
import Product from '../components/Product/Product.jsx'
import Filter from '../components/Product/Filter.jsx'
import Navbar from '../components/Home/Navbar.jsx' 
import { getAllProducts} from '../actions/productAction.js' 
import { fetchCategories} from '../actions/categoryAction.js' 


const Products = () => {
   const dispatch = useDispatch() ; 
   const {allProducts} = useSelector(state => state.product) ;
 
  
    useEffect(() => {
    const getProduct = async  () => {
    
     const productDB = await  dispatch(getAllProducts()) ;
     setProducts(productDB)
     await dispatch(fetchCategories()) ;
      
    }

    getProduct()
    } , [])


  const [products , setProducts] = useState(allProducts || []) 

  return (
    <div className='h-full  w-screen overflow-x-hidden bg-[#080b19f2] min-h-screen '> 
      <Navbar/>
     <Filter/>


    <div className='grid grid-cols-1 p-4 px-8 md:grid-cols-2 lg:grid-cols-3 mt-10 '>
     {
      products?.map((product , i )=> 
        <Product key={i} product={product} />
      )
     }

    </div>
     

      
    </div>
  )
}

export default Products
