import mongoose from "mongoose";

const DB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      // If the connection is not already established, connect to the database
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("Connected to mongodb");
    } else {
      console.log("already Connected to mongodb");
    }
  } catch (error: any) {
    throw error.message;
  }
};

export default DB;
