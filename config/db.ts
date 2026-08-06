// import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI || '';

// if (!MONGO_URI) {
//   throw new Error('Please configure the MONGO_URI string inside your .env file');
// }

// interface GlobalMongoose {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// const globalWithMongoose = global as unknown as { mongoose: GlobalMongoose };

// let cached = globalWithMongoose.mongoose;

// if (!cached) {
//   cached = globalWithMongoose.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     console.log('⚡ Using cached MongoDB connection pool.'); // <-- Add this log
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

    
//     cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
//       console.log('MongoDB Connected Successfully!');
//       return m;
//     });
//   }
  
//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || '';

if (!MONGO_URI) {
  throw new Error('Please configure MONGO_URI in your environment file.');
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
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 to prevent local IPv6 routing drops
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log('🚀 MongoDB Atlas Connected Successfully!');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;