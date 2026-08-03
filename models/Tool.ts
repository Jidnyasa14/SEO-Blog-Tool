import mongoose, { Schema, model, models } from 'mongoose';

export interface IToolInputField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select';
  defaultValue?: string | number;
  options?: string[];
}

export interface IToolConfig {
  inputs: IToolInputField[];
  operationType: 'math_expression' | 'text_uppercase' | 'text_lowercase' | 'word_count';
  formula?: string;
  outputLabel: string;
}

export interface IFAQItem {
  question: string;
  answer: string;
}

export interface ITool {
  name: string;
  slug: string;
  category: string;
  description: string;
  componentKey?: string;
  toolType?: string;
  config?: IToolConfig | null;
  seoTitle?: string;
  seoDescription?: string;
  howToUse?: string[];
  benefits?: string[];
  faqs?: IFAQItem[];
  tags?: string[] | string;
  isActive?: boolean;
}

const ToolSchema = new Schema<ITool>(
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
    howToUse: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    tags: {
      type: Schema.Types.Mixed,
      default: [],
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

export const Tool = models.Tool || model<ITool>('Tool', ToolSchema);