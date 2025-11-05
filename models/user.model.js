import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please add a valid email"], //example@example.com
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false, // add this line to exclude password from response
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// {name:"John Doe",email:"example@example.com",password:"123456"}

const User = mongoose.model("User", userSchema);
export default User;
