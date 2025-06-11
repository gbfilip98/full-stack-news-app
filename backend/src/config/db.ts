import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (err: unknown) {
    let errorMessage = "";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = 'DB connection error.';
    }
    console.error(errorMessage);
    process.exit(1);
  }
};