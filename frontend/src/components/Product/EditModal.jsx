import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../../actions/productAction.js';
import toast from 'react-hot-toast';

const EditModal = ({ product, token, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    condition: product.condition,
    description: product.description,
    location: product.location,
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    await dispatch(updateProduct(product._id, formData, token));
    toast.success("Product updated");
    onClose();
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(product._id, token));
    toast.success("Product deleted");
    onClose();
  };

  return (
    <div className="absolute inset-0 min-h-screen top-0 py-10   bg-[#080b19f2] z-50 flex justify-center items-center">
      <div className="bg-[#0f172a] text-white p-6 rounded-xl mt-20  w-96 space-y-4 shadow-lg shadow-cyan-400">
        <h2 className="text-xl font-bold text-center text-cyan-400">Edit Product</h2>

        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white placeholder-gray-400"
            placeholder="Product title"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white placeholder-gray-400"
            placeholder="₹ Price"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm mb-1">Condition</label>
          <input
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white placeholder-gray-400"
            placeholder="e.g. New, Used"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white placeholder-gray-400"
            placeholder="City or Area"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white placeholder-gray-400"
            placeholder="Write about the product..."
            rows={3}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handleUpdate} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white">
            Update
          </button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
            Delete
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
