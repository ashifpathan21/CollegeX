import React from "react";

const Filter = ({
  categories = [],
  states = [],
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedState,
  setSelectedState,
}) => {
  const selectedCategoryObj = categories?.find((cat) => cat._id === selectedCategory);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubCategory(""); // Reset subcategory
  };

  return (
    <div className="p-4 mt-3 flex flex-col md:flex-row gap-4 w-full items-start md:items-center shadow-md rounded-xl">
      {/* State Dropdown */}
      <div className="flex flex-col w-full md:w-1/3">
        <label className="mb-1 font-semibold text-gray-700">State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a state</option>
          {states.map((state, idx) => (
            <option key={idx} value={state.id}>
              {state?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Category Dropdown */}
      <div className="flex flex-col w-full md:w-1/3">
        <label className="mb-1 font-semibold text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Dropdown */}
      {selectedCategoryObj?.subcategories?.length > 0 && (
        <div className="flex flex-col w-full md:w-1/3">
          <label className="mb-1 font-semibold text-gray-700">Subcategory</label>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="p-2 border text-cyan-300 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a subcategory</option>
            {selectedCategoryObj.subcategories.map((child) => (
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
