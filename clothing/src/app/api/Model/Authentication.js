import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["HOME", "WORK", "OTHER"], default: "HOME" }, 
});


const purchaseHistorySchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      size: { type: [String], required: true },
  color: { type: [String], required: true },
      status:{
        type: String,
    default: "pending",
    enum: ["pending", "cancelled"], 
      }
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  purchaseTime: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location", 
  },
  invoice:{
    type:"String"
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "dispatched", "cancelled"], 
  },
});


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phone: { type: String },
  password: { type: String },
  address: { type: [addressSchema], default: [] }, 
  role: { type: String, default: "customer" },
  purchaseHistory: { type: [purchaseHistorySchema], default: [] }, 
});


const Address = mongoose.models.location || mongoose.model("location", addressSchema); 
const User = mongoose.models.User || mongoose.model("User", userSchema); 

export { User, Address };
