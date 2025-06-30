import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productAction';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Home/Navbar';

const Sell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    condition: '',
    description: '',
    location: '',
    images: [],
    liveImageUrl: '',
  });

  const [rawFiles, setRawFiles] = useState([]);
  const [liveFile, setLiveFile] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [toSubCat, setToSubCat] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setRawFiles(files);
    setFormData(prev => ({ ...prev, images: previews }));
  };

  const handleCaptureLiveImage = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    document.body.appendChild(video);

    setTimeout(() => {
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        setLiveFile(blob);
        const url = URL.createObjectURL(blob);
        setFormData(prev => ({ ...prev, liveImageUrl: url }));
        toast.success("Live image captured!");
      }, 'image/jpeg');

      stream.getTracks().forEach(track => track.stop());
      video.remove();
      canvas.remove();
    }, 2000);
  };

  const handleCategoryChange = (e) => {
    const parent = categories.find((cat) => cat._id === e.target.value);
    setSelectedCategory(e.target.value);
    setToSubCat(parent);
    setSelectedSubCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Uploading images ...");

    try {
      const uploadedImages = await Promise.all(
        rawFiles.map(file => uploadToCloudinary(file))
      );

      let uploadedLiveImage = '';
      if (liveFile) {
        uploadedLiveImage = await uploadToCloudinary(liveFile);
      }

      const finalData = {
        ...formData,
        images: uploadedImages,
        liveImageUrl: uploadedLiveImage,
        category: selectedSubCategory || selectedCategory,
      };

      await dispatch(createProduct(finalData, token, navigate));
    } catch (error) {
      toast.error("Image upload failed");
;
    }

    toast.dismiss();
  };

  return (
    <div className="min-h-screen w-screen bg-[#080b19f2] text-white">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 mt-8 bg-[#0f172a] rounded-xl shadow-lg shadow-cyan-400">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Sell a Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white"
            />
          </div>

          {/* Condition Dropdown */}
          <div>
            <label className="block text-sm mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
              <option value="Old">Old</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
           className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
       >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          {toSubCat?.subCategories?.length > 0 && (
            <div>
              <label className="block text-sm mb-1">Sub Category</label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
     >
                <option value="">Select Sub Category</option>
                {toSubCat.subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full bg-transparent border border-cyan-400 px-3 py-2 rounded text-white file:text-white file:bg-cyan-600"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.images.map((img, i) => (
                <img key={i} src={img} alt={`preview-${i}`} className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          )}

          {/* Live Image Capture */}
          <div>
            <label className="block text-sm mb-1">Verify via Camera</label>
            <button type="button" onClick={handleCaptureLiveImage} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded">
              Capture Live Image
            </button>
            {formData.liveImageUrl && (
              <img src={formData.liveImageUrl} alt="live" className="mt-2 w-24 h-24 rounded object-cover border border-cyan-400" />
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mt-4">
            Post Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
