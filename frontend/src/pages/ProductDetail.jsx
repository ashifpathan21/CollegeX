import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Home/Navbar.jsx'

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleMessageSeller = () => {
    navigate(`/chat`, {
      state: {
        receiverId: product.postedBy?._id,
        product,
      },
    });
  };

  return (<div className='bg-[#080b19f2]  '>
     <Navbar/>
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <div className="  rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Image Slider */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-96 overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={product.images[currentImage]}
                alt="product"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain overflow-hidden  rounded-xl"
              />
            </AnimatePresence>
          </div>

          {/* Prev / Next Buttons */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl text-amber-100 font-bold">{product.title}</h1>
          <p className="text-amber-50">{product.description}</p>
          <p className="text-lg font-semibold text-green-600">₹ {product.price}</p>
          <p className="text-sm text-gray-300 capitalize">Condition: {product.condition}</p>
          <p className="text-sm text-gray-300 capitalize">Posted by: {product.postedBy?.fullName}</p>
          <p className="text-sm text-gray-300 capitalize">College: {product.college}</p>
          <p className="text-sm text-gray-300 capitalize">Location: {product.location}</p>

          <button
            onClick={handleMessageSeller}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Message Seller
          </button>
        </div>
      </div>
    </div>
    </div >
  );
};

export default ProductDetail;
