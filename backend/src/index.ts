import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite default
    credentials: true, // if using cookies or headers
  })
);
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes";
// import User from "./models/User"

// dotenv.config();
// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// mongoose
//   .connect(process.env.MONGO_URI || "")
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server running on port ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch((err) => console.error(err));

// app.get("/getUsers", (req, res) => {
//   User.find().then((users) => {
//     res.json(users)
//   }).catch((err) => {
//     console.log(err)
//   })
// })
