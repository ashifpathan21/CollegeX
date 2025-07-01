import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateProduct, deleteProduct } from '../../actions/productAction';

const EditModal = ({ product,token ,  onClose }) => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const states = useSelector((state) => state.details?.states || []);

  const [selectedCategory, setSelectedCategory] = useState(product.category);
  const [selectedSubCategory, setSelectedSubCategory] = useState(product.subcategory || '');
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    condition: product.condition,
    description: product.description,
    location: product.location,
  });

  useEffect(() => {
    const found = categories.find((cat) => cat._id === selectedCategory);
    setSubCategories(found?.subcategories || []);
  }, [selectedCategory, categories]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const dataToUpdate = {
      ...formData,
      category: selectedCategory,
      subcategory: selectedSubCategory,
    };
    await dispatch(updateProduct(product._id, dataToUpdate, token));
    toast.success("Product updated");
    onClose();
  };

  const handleDelete = async () => {
    await dispatch(deleteProduct(product._id, token));
    toast.success("Product deleted");
    onClose();
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll p-2   fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">

      <div className='mt-40  h-full w-full justify-center flex items-center '>
          <div className="bg-[#0f172a]  text-white w-full max-w-lg p-6 rounded-xl space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-center mt-50  text-cyan-400">Edit Product</h2>

        {/* Title */}
        <div>
          <label className="text-sm mb-1 block">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm mb-1 block">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('');
            }}
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {subCategories.length > 0 && (
          <div>
            <label className="text-sm mb-1 block">Subcategory</label>
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
            >
              <option value="">Select subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Condition */}
        <div>
          <label className="text-sm mb-1 block">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm mb-1 block">Location (State)</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          >
            <option value="">Select state</option>
            {states.map((state, idx) => (
              <option key={idx} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm mb-1 block">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm mb-1 block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Product details..."
            className="w-full bg-slate-800 border border-cyan-400 rounded px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-2">
          <button
            onClick={handleUpdate}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default EditModal;
