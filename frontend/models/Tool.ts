import { Schema, model, models } from 'mongoose';

const ToolSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tool display name is required.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Tool URL slug identifier is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category domain classification is required.'],
    enum: ['Finance', 'Developer', 'Utility', 'Text', 'Image'],
  },
  description: {
    type: String,
    required: [true, 'Long-form description is required for technical SEO value.'],
  },
  seoTitle: {
    type: String,
    trim: true,
  },
  seoDescription: {
    type: String,
    maxLength: [160, 'Meta descriptions must stay below the 160 character boundary.'],
    trim: true,
  },
  thumbnail: {
    type: String, 
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, { 
  timestamps: true 
});

export const Tool = models.Tool || model('Tool', ToolSchema);