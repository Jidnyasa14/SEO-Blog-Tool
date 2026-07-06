import mongoose from 'mongoose';

export const connectDatabaseClient = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) throw new Error("Missing MONGODB_URI in your environment variables.");
    
    await mongoose.connect(connStr);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};