import mongoose, { Schema, model, models } from 'mongoose';

const ToolSchema = new Schema(
  {
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
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    componentKey: {
      type: String,
      trim: true,
      default: '',
    },
    toolType: {
      type: String,
      default: 'dynamic',
    },
    config: {
      type: Schema.Types.Mixed,
      default: null,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

if (models.Tool) {
  delete models.Tool;
}

export const Tool = models.Tool || model('Tool', ToolSchema);