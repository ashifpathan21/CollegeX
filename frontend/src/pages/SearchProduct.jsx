import React ,{useEffect , useState} from 'react'
import {useSelector , useDispatch } from 'react-redux' 
import {useLocation} from 'react-router-dom'
import Product from '../components/Product/Product.jsx'
import Filter from '../components/Product/Filter.jsx'
import Navbar from '../components/Home/Navbar.jsx' 
import { getAllProducts} from '../actions/productAction.js' 
import { fetchCategories} from '../actions/categoryAction.js' 


const SearchProduct= () => {
   const dispatch = useDispatch() ; 
 const location = useLocation()

 const allProducts = location.state
  const { categories } = useSelector((state) => state.category);
  const states = useSelector((state) => state.details?.states);



  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");

useEffect(() => {
  let filtered = allProducts;

  if (selectedCategory) {
    filtered = filtered?.filter((p) => p?.category === selectedCategory);
  }
  if (selectedSubCategory) {
    filtered = filtered?.filter((p) => p?.subcategory === selectedSubCategory);
  }
  if (selectedState) {
    filtered = filtered?.filter((p) =>
      p?.college?.includes(selectedState) || p?.location?.includes(selectedState)
    );
  }

  setProducts(filtered);

}, [selectedCategory, selectedSubCategory, selectedState, allProducts]);

  


  const [products , setProducts] = useState(allProducts || []) 

  return (
    <div className='h-full  w-screen overflow-x-hidden bg-[#080b19f2] min-h-screen '> 
      <Navbar/>
    <Filter
      categories={categories}
      states={states}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubCategory={selectedSubCategory}
      setSelectedSubCategory={setSelectedSubCategory}
      selectedState={selectedState}
      setSelectedState={setSelectedState}
    />


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

export default SearchProduct
