import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Article headline is required.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'URL slug is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Rich text content body payload cannot be empty.'],
  },
  category: {
    type: String,
    required: [true, 'A primary target category classification is required.'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String, 
  },
  seoTitle: {
    type: String,
    maxLength: [60, 'SEO Meta titles should target a maximum of 60 characters.'],
    trim: true,
  },
  seoDescription: {
    type: String,
    maxLength: [160, 'SEO Meta descriptions should target a maximum of 160 characters.'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  readingTime: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true 
});

export const Blog = models.Blog || model('Blog', BlogSchema);