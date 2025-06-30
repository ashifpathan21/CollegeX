import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'
import { FaCheckCircle, FaExclamationCircle, FaHeart, FaRegHeart   } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-hot-toast";
const MyProduct = ({ product , setEditModal , setSelectedProduct }) => {

  const {
    title,
    price,
    priceEstimate,
    images,
    description,
    condition,
    location,
    isVerifiedRealPhoto,
    isSpam,
    isSold,
    postedBy,
    _id
  } = product;

     
  if(!title || !price || !images || !description || !condition || !postedBy || !_id){
      return 
    }
    const navigate  = useNavigate() ; 


 



  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transitions={{duration:0.5}}
      className="relative p-4   shadow-cyan-400 text-white  rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-3 w-full max-w-sm"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
         
         <div onClick={()=>{
          setSelectedProduct(product)
          setEditModal(true)}} className='h-10 text-black  text-2xl w-10 bg-white font-semibold flex justify-center items-center absolute top-4 right-2 rounded-full ' >
             <MdOutlineModeEdit />
         </div>
    
        <img
          src={images[0]}
          alt={title}
          className="object-contain w-full h-full"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isVerifiedRealPhoto && (
            <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full flex items-center gap-1">
              <FaCheckCircle className="text-xs" />
              Verified
            </span>
          )}
          {isSpam && (
            <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full flex items-center gap-1">
              <FaExclamationCircle className="text-xs" />
              Spam
            </span>
          )}
        </div>

          

        {isSold && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white font-bold text-xl rounded-xl">
            SOLD
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold ">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <p className="text-blue-600 font-bold text-xl">₹{price}</p>
         
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Condition: <span className="font-medium">{condition}</span>
        </p>
        <p className="text-xs text-gray-500">
          Location: <span className="font-medium">{location}</span>
        </p>
      </div>

    
    </motion.div>
  );
};

export default MyProduct;
