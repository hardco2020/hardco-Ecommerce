import { Product } from '@/interfaces/product.interface';
import { model, Schema, Document } from 'mongoose';

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      require: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ProductModel = model<Product & Document>('Product', ProductSchema);

export default ProductModel;
