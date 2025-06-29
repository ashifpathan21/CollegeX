import React, { useState } from "react";
import { useSelector } from "react-redux";

const Filter = () => {
  const { categories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [toSubCat , setToSubCat] = useState({}) 


  const handleCategoryChange = (e) => {
    const parent = categories?.find((cat) => cat._id === e.target.value)

    setSelectedCategory(e.target.value);
    setToSubCat(parent)

    setSelectedSubCategory(""); // reset subcategory
  };

   

  return (
    <div className="p-4 mt-3 flex flex-col md:flex-row gap-4 w-full items-start md:items-center  shadow-md rounded-xl">
      {/* Main Category Dropdown */}
      <div className="flex flex-col w-full md:w-1/2">
        <label className="mb-1 font-semibold text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option className='' key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Dropdown */}
      {toSubCat?.subcategories?.length > 0 && (
        <div className="flex flex-col w-full md:w-1/2">
          <label className="mb-1 font-semibold text-gray-700">Subcategory</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="p-2 border  text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a subcategory</option>
            {toSubCat?.subcategories?.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Filter;
