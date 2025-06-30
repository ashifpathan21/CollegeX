import React ,{useEffect , useState} from 'react'
import {useSelector , useDispatch } from 'react-redux' 
import {useNavigate } from 'react-router-dom'
import MyProduct from '../components/Product/MyProduct.jsx'
import EditModal from '../components/Product/EditModal.jsx'
import Filter from '../components/Product/Filter.jsx'
import Navbar from '../components/Home/Navbar.jsx' 
import {getMyProducts} from '../actions/productAction.js'


const MyProducts = () => {
    const navigate = useNavigate()
    const [editModal , setEditModal] = useState(false) 
    const [selectedProduct , setSelectedProduct] = useState({})
   const dispatch = useDispatch() ; 
   const token = localStorage.getItem('token')
   useEffect(() => {
     async function getProduct() {
       const myProducts =  await dispatch(getMyProducts(token)) ; 
       setProducts(myProducts)
     }
     getProduct()
   }, [])
   
   const {myProducts} = useSelector(state => state.product) ;
  const [products , setProducts] = useState(myProducts || []) 

const onClose = ()=> {
  setEditModal(false)
}

  return (
    <div className='h-full z-0 relative  w-screen overflow-x-hidden bg-[#080b19f2] min-h-screen '> 
      <Navbar/>

{
editModal && (
   <EditModal product={selectedProduct} token={token}  onClose={onClose}/>
)
}




<h2 className='p-2 w-full text-2xl  text-center py-4 text-white font-semibold '>
    My Products
</h2>

   {products.length>0 ?  <div className='grid grid-cols-1 p-4 px-8 md:grid-cols-2 lg:grid-cols-3 mt-10 '>
     {
      products?.map((product , i )=> 
        <MyProduct key={i} product={product} setEditModal={setEditModal} setSelectedProduct={setSelectedProduct} />
      )
     }

    </div> : <div className='p-4 flex  text-white flex-col h-screen justify-center items-center gap-4 '>
        <p className='text-2xl font-semibold  '>You Have Not Sell Any Product</p>
        <button onClick={() => navigate('/sell')} className='p-3 shadow shadow-cyan-300'>Sell Now</button>

    </div>
}
     

      
    </div>
  )
}

export default MyProducts
