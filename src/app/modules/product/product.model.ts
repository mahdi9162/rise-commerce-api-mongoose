import { model, Schema, Types } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    createdById: {
      type: Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model('Product', productSchema);
