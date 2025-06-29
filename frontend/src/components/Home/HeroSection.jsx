import React, { useEffect } from "react";
import hero from "../../assets/hero.png";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

 
  

  useEffect(() => {
    const texts = [
      "Buy Anything from Anywhere",
      "Sell Anything from Anywhere",
      "Your mini OLX",
    ];
    let index = 0;

    const changeText = () => {
      gsap.to(".changing-text", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          index = (index + 1) % texts.length;
          document.querySelector(".changing-text").innerText = texts[index];
          gsap.to(".changing-text", { opacity: 1, duration: 0.5 });
        },
      });
    };

    const interval = setInterval(changeText, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
        }}
      />

      {/* Content */}
      <div className="z-20 text-center px-6">
        <h1 className="text-3xl md:text-5xl changing-text lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 drop-shadow-md flex justify-center gap-2">
          Buy Anything from Anywhere
        </h1>

        <p className="mt-3 text-white text-md md:text-lg font-medium">
          CollegeX – Your Spam-Free Student Marketplace
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          onClick={() => navigate("/products")}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore Products
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
