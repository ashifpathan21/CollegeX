import Product from '../models/Product.js';
import User from '../models/User.js';
import { estimatePriceWithGemini, verifyLiveImage } from '../utils/geminiML.js';

// ========== CREATE PRODUCT ==========
export const createProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      images,
      price,
      condition,
      category,
      location,
      liveImageUrl // optional
    } = req.body;

    if (!title || !description || !images || !price || !condition || !category) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ==== Gemini ML: Estimate Price ====
    const estimatedPrice = await estimatePriceWithGemini({ title, description, condition, category });
    const priceRatio = price / estimatedPrice;
    const isSpam = priceRatio < 0.2 || priceRatio > 1;

    // ==== Gemini ML: Live Image Verification ====
    let isVerifiedRealPhoto = false;
    if (liveImageUrl) {
      isVerifiedRealPhoto = await verifyLiveImage(liveImageUrl, title, category);
    }

    const product = await Product.create({
      title,
      description,
      images,
      price,
      condition,
      category,
      location,
      postedBy: user._id,
      college: user.college,
      isSpam,
      priceEstimate: estimatedPrice,
      isVerifiedRealPhoto
    });

    user.products.push(product._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to list product", error: error.message });
  }
};

// ========== UPDATE PRODUCT ==========
export const updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.postedBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    Object.assign(product, updates);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
  }
};

// ========== DELETE PRODUCT ==========
export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.postedBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Product.findByIdAndDelete(productId);
    await User.findByIdAndUpdate(userId, { $pull: { products: productId } });

    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
  }
};

// ========== GET MY PRODUCTS ==========
export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ postedBy: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get products", error: error.message });
  }
};

// ========== GET ALL PRODUCTS ==========
export const getAllProducts = async (req, res) => {
  try {
    const { category, college, condition, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (college) filter.college = college;
    if (condition) filter.condition = condition;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter)
      .populate('postedBy', 'fullName college profilePic year branch')
      .sort({
        isVerifiedRealPhoto: -1,
        createdAt: -1
      });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};