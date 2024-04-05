import mongoose from "mongoose";

const { MONGO_URI = "" } = process.env;
console.log("uri", MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (Error) {
    console.log("unable to connecto to mongodb", Error);
  }
};

export default connectDB();
