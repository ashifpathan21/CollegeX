import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';

config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/college', collegeRoutes);

app.get('/', (req, res) => {
  res.send('CollegeX API is running 🚀');
});

export default app;
