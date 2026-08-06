import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error('Please configure the MONGO_URI string inside your .env file');
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as unknown as { mongoose: GlobalMongoose };

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('⚡ Using cached MongoDB connection pool.'); // <-- Add this log
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    
    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log('MongoDB Connected Successfully!');
      return m;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}