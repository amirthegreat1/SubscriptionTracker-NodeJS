import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // signup logic
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsers = await User.create([
      { name, email, password: hashedPassword },
    ]);
    // create token
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // send response
    await session.commitTransaction();
    await session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUsers[0],
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password || "",
      user.password
    );
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // remove password before sending user object
    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: userSafe,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
