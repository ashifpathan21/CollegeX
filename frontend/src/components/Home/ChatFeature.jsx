import React from 'react';
import chat from '../../assets/chat.png'; // your uploaded chat image
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquareLock, Ban } from 'lucide-react'; // optional icons

const ChatFeature = () => {
    
const OrbitingIcon = ({ icon: Icon, radius = 120, duration = 6, size = 40, color = 'text-red-600', delay = 0 }) => {
  return (
    <motion.div
      className="absolute top-1 left-1/4"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration, ease: 'linear', delay }}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <motion.div
        className="absolute"
        style={{
          top: 0,
          left: '50%',
          transform: `translateX(-50%)`,
        }}
        animate={{
          opacity: [1, 0.6, 0.2, 0.6, 1],   // simulate going behind
          scale: [1, 0.95, 0.9, 0.95, 1],  // slight zoom to feel depth
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: 'linear',
          delay,
        }}
      >
        <div
          className="bg-white p-2 rounded-full shadow-md flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <Icon className={`${color} w-5 h-5`} />
        </div>
      </motion.div>
    </motion.div>
  );
};



  return (
    <div className="w-full py-12 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left: Feature Text */}
        <div className="md:w-1/2 px-6 text-white flex flex-col gap-6">
          <h2 className="text-4xl font-bold ">
            Secure & Spam-Free Chat
          </h2>
          <p className="text-gray-400 text-lg">
            Our chat system is <strong className='text-gray-200'>end-to-end encrypted</strong>, ensuring that your messages stay private and secure. With advanced spam filters, you only get real and relevant conversations.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> End-to-End Encryption
            </li>
            <li className="flex items-center gap-2">
              <Ban className="text-red-500" /> Spam-Free Conversations
            </li>
            <li className="flex items-center gap-2">
              <MessageSquareLock className="text-blue-600" /> Verified Real-Time Messaging
            </li>
          </ul>
        </div>

        {/* Right: Animated Chat Image */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
            <motion.div
  className="top-0 left-1/2 overflow-hidden "
  animate={{
    y: [0, -10, 0],
    rotate: [0, 360], // 🌍 slow self-rotation
  }}
  transition={{
    y: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      duration: 60, // slow spin
      ease: "linear",
    },
  }}
>
  <img
    src={chat}
    alt="Chat Feature"
    className="w-full max-w-md mx-auto"
  />
</motion.div>


            {/* Orbital Rings */}
<svg
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
  width="500"
  height="500"
  viewBox="0 0 500 500"
>
  <circle
    cx="250"
    cy="250"
    r="120"
    fill="none"
    stroke="#ffffff33"
    strokeWidth="1"
    strokeDasharray="4 4"
  />
  <circle
    cx="250"
    cy="250"
    r="150"
    fill="none"
    stroke="#ffffff33"
    strokeWidth="1"
    strokeDasharray="4 4"
  />
  <circle
    cx="250"
    cy="250"
    r="180"
    fill="none"
    stroke="#ffffff33"
    strokeWidth="1"
    strokeDasharray="4 4"
  />
</svg>


             <OrbitingIcon icon={ShieldCheck} radius={120} duration={6} color="text-green-600" />
             <OrbitingIcon icon={Ban} radius={150} duration={8} color="text-red-500" delay={0.5} />
             <OrbitingIcon icon={MessageSquareLock} radius={180} duration={10} color="text-blue-600" delay={0.8} />



          
        </motion.div>
      </div>
    </div>
  );
};

export default ChatFeature;
