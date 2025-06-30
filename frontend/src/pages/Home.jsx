import React, { useContext , useEffect } from 'react';
import Navbar from '../components/Home/Navbar.jsx';
import HeroSection from '../components/Home/HeroSection.jsx';
import ChatFeature from '../components/Home/ChatFeature.jsx';
import Footer from '../components/Home/Footer.jsx';
import { SocketContext } from '../context/SocketContext';  // ✅ correct context import
import { getAllProducts} from '../actions/productAction.js' 
import { fetchCategories} from '../actions/categoryAction.js' 
import { fetchStates , fetchColleges } from '../actions/detailsAction.js' 
import {useSelector , useDispatch } from 'react-redux' 

const Home = () => {
  
   
   const dispatch = useDispatch() ; 
  
      useEffect(() => {
    
      dispatch(getAllProducts()) ;
      dispatch(fetchStates()) ;
      dispatch(fetchCategories()) ;
      
    } , [])


  return (
    <div className='h-full w-screen relative overflow-x-hidden bg-[#080b19f2] min-h-screen '>
      <Navbar />
      <HeroSection />
      <ChatFeature />
      <Footer/>
    </div>
  );
};

export default Home;
