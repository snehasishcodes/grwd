import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;
const cached: { connection?: any, promise?: any } = {}; // we will store the first connection here (caching)

export default async function connectMongoDB() {
    if (!mongodbUri) {
        throw new Error("MongoDB URI not found.");
    }

    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(mongodbUri, {
            bufferCommands: false
        });
        console.log("New Connection to MongoDB.");
    }
    try {
        cached.connection = await cached.promise;
        // console.log("Using MongoDB Existing Connection.");
    } catch (err) {
        cached.promise = undefined;
        throw err;
    }

    return cached.connection;
}
