import Category from '../models/Category.js';

export const seedCategories = async (req, res) => {
  try {
    const already = await Category.find();
    if (already.length > 0) {
      return res.status(400).json({ message: "Categories already exist." });
    }

    const rawCategories = {
      Electronics: ["Mobile Phones", "Laptops", "Headphones", "Speakers", "Smart Watches", "Chargers", "Cables", "Calculators"],
      Books: ["Engineering", "Medical", "Novels", "Competitive Exams", "School Books", "Comics", "Magazines"],
      Furniture: ["Chairs", "Study Tables", "Beds", "Mattress", "Sofas", "Shelves", "Cupboards"],
      Stationery: ["Notebooks", "Pens", "Pencils", "Drawing Tools", "Files/Folders", "Staplers", "Markers"],
      Clothing: ["Men", "Women", "Winter Wear", "Traditional Wear", "Footwear", "Bags"],
      Sports: ["Cricket", "Badminton", "Football", "Gym Equipment", "Yoga Mats", "Cycles"],
      Appliances: ["Coolers", "Heaters", "Fans", "Extension Boards", "Table Lamps", "Kettles", "Irons"],
      Others: ["Project Supplies", "Lab Coats", "ID Card Holders", "Miscellaneous"]
    };

    const rootMap = {};

    for (const parentName in rawCategories) {
      const parent = await Category.create({ name: parentName });
      rootMap[parentName] = parent._id;

      for (const subName of rawCategories[parentName]) {
        await Category.create({ name: subName, parent: parent._id });
      }
    }

    res.status(201).json({ message: "Categories seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error while seeding", error: err.message });
  }
};





export const getCategories = async (req, res) => {
  try {
    const roots = await Category.find({ parent: null });
    const tree = await Promise.all(
      roots.map(async (cat) => {
        const children = await Category.find({ parent: cat._id });
        return {
          _id: cat._id,
          name: cat.name,
          subcategories: children.map(child => ({
            _id: child._id,
            name: child.name
          }))
        };
      })
    );
    res.status(200).json({ success: true, categories: tree });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
