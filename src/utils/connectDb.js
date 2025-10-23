import mongoose  from "mongoose";

export const connectDb = async () => {

    mongoose.connect(process.env.MONGODB_URL ?? "");
}