
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import petRoutes from './routes/petRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(cors({         //This is for cross origin requests which is disabled by default in browsers
  origin: "http://localhost:5000",  // Frontend origin
  credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// API Routes
app.use('/api', petRoutes);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
export default app;
