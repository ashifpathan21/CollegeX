import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColleges } from '../../actions/detailsAction';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { FaPencilAlt } from 'react-icons/fa';
import {toast} from 'react-hot-toast'
const EditProfileModal = ({ user, onClose, onSave }) => {
  const dispatch = useDispatch();
  const colleges = useSelector((state) => state.details.colleges);
  const [loading , setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    college: user.college || '',
    collegeEmail: user.collegeEmail || '',
    branch: user.branch || '',
    year: user.year || '',
    contactNumber: user.contactNumber || '',
    profilePic: user.profilePic || '',
  });

  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'college') {
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        dispatch(fetchColleges(value));
      }, 300);
      setDebounceTimer(timer);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (colleges?.length) setSuggestions(colleges);
    else setSuggestions([]);
  }, [colleges]);

  const handleImageChange = async (e) => {
    setLoading(true)
    toast.loading('Uploadig...')
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);

    setFormData((prev) => ({ ...prev, profilePic: url }));
    setLoading(false)
    toast.dismiss()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#080b19] p-6 rounded-xl shadow-lg shadow-cyan-400 w-[90%] max-w-md text-white relative">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Profile Image with Pencil Icon */}
          <div className="relative w-fit mx-auto mb-2">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border border-cyan-400"
            />
            <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-1 cursor-pointer">
              <FaPencilAlt className="text-xs text-black" />
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400"
            required
          />

          {/* College Autocomplete */}
          <div className="relative">
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College Name"
              autoComplete="off"
              className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400 w-full"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 rounded-md bg-[#080b19] border border-cyan-400 k mt-1  shadow-md max-h-40 overflow-y-auto w-full">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        college: item,
                      }));
                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="email"
            name="collegeEmail"
            value={formData.collegeEmail}
            onChange={handleChange}
            placeholder="College Email"
            className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400"
            required
          />

          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Branch"
            className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400"
            required
          />

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400"
            required
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>

          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="px-3 py-2 rounded-md bg-[#080b19] border border-cyan-400"
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Cancel
            </button>
            <button
            disabled={loading}
              type="submit"
              className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
