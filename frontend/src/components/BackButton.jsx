// BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="absolute top-4 left-4 p-2 rounded-full bg-white text-black shadow-lg hover:bg-gray-200"
    >
      <Home className="w-5 h-5" />
    </button>
  );
};

export default BackButton;