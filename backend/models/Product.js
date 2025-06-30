import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // URL to Cloudinary or local storage
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Like New', 'Used', 'Old' , 'Damaged'],
      default: 'Used',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
     ref:"Category"
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    college: {
      type: String,
      required: true, // optional if you get it from user.profile.college
    },
    location: {
      type: String,
      default: '', // Optional: for specifying hostel/block
    },
    isSold: {
      type: Boolean,
      default: false,
    },
   isSpam: {
    type: Boolean,
    default: false,
  },
  isVerifiedRealPhoto: {
    type: Boolean,
    default: false,
  },
  priceEstimate: {
    type: Number,
  }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
