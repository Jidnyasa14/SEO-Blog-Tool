import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['admin'], 
      default: 'admin' 
    }
  },
  { timestamps: true }
);

// Pre-save hook using clean Async/Await without 'next'
UserSchema.pre('save', async function () {
  // Check if password field was modified
  if (!this.isModified('password')) return;

  // Hash password seamlessly; Mongoose will catch any thrown errors automatically
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model('User', UserSchema);