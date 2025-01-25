import mongoose from "mongoose";

// Product schema
const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    originalprice:{
      type:Number,
      required:true,
      min:0
    },
    category: {
      type: [Number],
      required: true,
    },
    stock: { 
      type: Number, 
      required: true, 
      default: 0 
    },
    brand: { 
      type: String, 
      required: true 
    },
    images: [
      {
        url: { type: String, required: true }, 
        public_id: { type: String, required: true }
      }
    ],
    reviews: [  
      {
        username: { 
          type: String, 
          required: true 
        },
        ratings: {
          type: Number,
          min: 0,
          max: 5, 
        },
        feedback: {
          type: String,
          trim: true,
          required: true,
        },
        images: [
          {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
          }
        ],
        createdAt: { 
          type: Date, 
          default: Date.now 
        },
      }
    ],
    total_revenue:{
      type:Number,
      default:0
    },
    numReviews: {
      type: Number,
      default: 0 
    },
   
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Model for the product schema
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;