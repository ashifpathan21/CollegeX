import React, { useState, useEffect } from 'react';
import Product from '../components/Product/Product.jsx';
import Navbar from '../components/Home/Navbar.jsx';

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [toogle , setToggle] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('likedProducts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log(parsed)
        setLikedProducts(parsed);
      } catch (e) {
        console.error("Failed to parse likedProducts:", e);
        setLikedProducts([]);
      }
    }
  }, [ toogle ]); // run only once

  return (
    <div className="min-h-screen w-screen bg-[#080b19f2]">
      <Navbar />
      {likedProducts.length > 0 ? (
        <div className="grid grid-cols-1 p-4 px-8 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
          {likedProducts.map((product, idx) => (
            <Product key={idx} product={product}  setToggle={setToggle} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-10">No liked products found.</p>
      )}
    </div>
  );
};

export default LikedProducts;
