import validator from "validator";
import mongoose from "mongoose";

const SignupsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    validate: {
      validator: validator.isEmail,
      message: "Sorry, please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validator.isStrongPassword,
      message: "Please ensure that you have entered a strong password",
    },
  },
  phone: {
    type: String, 
    validate: {
      validator: (value) => validator.isMobilePhone(value, "any"), 
      message: "Please ensure you have entered a valid phone number",
    },
  },
  role: {
    type: String,
    default: "customer",
  },
  address:{
    type:[String],
    default:[]
  }
});

const Customer = mongoose.model("CustomerAuth", SignupsSchema);

export default Customer;
