import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'
import { FaCheckCircle, FaExclamationCircle, FaHeart, FaRegHeart  } from "react-icons/fa";
import { toast } from "react-hot-toast";
const Product = ({ product , setToggle }) => {

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
    const [liked, setLiked] = useState(false);

  useEffect(() => {
  const likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];
  setLiked(likedItems.some((item) => item._id === _id));
}, [_id]);


  // Handle like toggle and persist to localStorage
 const toggleLike = (e) => {

  e.stopPropagation(); // prevents navigation when clicking the heart

  let likedItems = JSON.parse(localStorage.getItem("likedProducts")) || [];

  if (liked) {
    likedItems = likedItems.filter((item) => item._id !== _id);
    toast.success('Removed from Wishlist');
  } else {
    likedItems.push(product);
    toast.success('Added to Wishlist');
  }
  
  localStorage.setItem("likedProducts", JSON.stringify(likedItems));
  if(setToggle){
  setToggle(!liked)}
  
  setLiked(!liked);
};



  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transitions={{duration:0.5}}
      onClick={()=> {
        navigate(`/products/${product._id}` , {state:{product}})
      }}
      className="relative p-4   shadow-cyan-400 text-white  rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-3 w-full max-w-sm"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
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
          {isSpam ? (
            <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full flex items-center gap-1">
              <FaExclamationCircle className="text-xs" />
              Spam
            </span>
          ): (
            <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full flex items-center gap-1">
           <FaCheckCircle className="text-xs" />
             Genuine
          </span>

          )}
        </div>

          {/* Like Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleLike}
            className="bg-white p-1 rounded-full shadow-md hover:scale-110 transition"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
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

      {/* User Info */}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full overflow-hidden bg-black text-white text-center text-sm font-bold flex items-center justify-center">
         <img src={postedBy?.profilePic}  alt="" /> 
        </div>
        <div>
          <p className="text-sm font-semibold">{postedBy?.fullName}</p>
          <p className="text-xs text-gray-500">{postedBy?.college}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
