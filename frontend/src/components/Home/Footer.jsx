import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">CollegeX</h2>
          <p className="text-sm mt-2 text-gray-400">
            A spam-free student marketplace to buy and sell anything from anywhere, securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Browse Products</Link></li>
            <li><Link to="/sell" className="hover:text-white transition">Sell Your Product</Link></li>
            <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="mailto:support@ashifbgmiking.com" className="hover:text-white transition">
              <FaEnvelope />
            </a>
            <a href="https://github.com/ashifpathan21/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/ashifpathan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CollegeX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
