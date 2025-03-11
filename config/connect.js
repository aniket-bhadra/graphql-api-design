import mongoose from "mongoose";
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MONGODB connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectDB;
