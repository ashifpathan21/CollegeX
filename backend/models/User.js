import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  collegeEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
friends: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      }
    ],
  }
],
  password: {
    type: String,
    required: true,
    select:false
  },
  socketId:{
   type:String
  },
  college: {
    type: String,
    required: true
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th'],
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ''
  },
  active:{
       type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role:{
    type:String,
    enum:['User' , 'Admin'],
    default:'User'
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  isSpammer:{
    type:Boolean,
    default:false 
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
