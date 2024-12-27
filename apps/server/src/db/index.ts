import mongoose, { Mongoose } from "mongoose";

const DB_NAME = "pomomate";

export let dbInstance: Mongoose | undefined = undefined;

const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        dbInstance = connectionInstance;
        console.info(
            `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
        );
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
};

export default connectDB;
