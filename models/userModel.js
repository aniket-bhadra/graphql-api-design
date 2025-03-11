import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    gender: { type: String, enum: ["male", "female"] },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
    watching: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    watched: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    verificationToken: { type: String },
    verificationExpire: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
